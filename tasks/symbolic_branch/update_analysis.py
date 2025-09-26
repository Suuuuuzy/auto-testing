#!/usr/bin/env python3
"""
Static analysis tool to estimate symbolic branching reduction in miniapps.
Analyzes JavaScript/TypeScript and WXML files to count branches dependent on external inputs.
"""

import os
import re
import json
from pathlib import Path
import argparse
from typing import Dict, List, Set, Tuple
import xml.etree.ElementTree as ET

class BranchAnalyzer:
    def __init__(self):
        # User input patterns from WXML elements
        self.user_input_elements = [
            'input', 'textarea', 'picker', 'picker-view', 'slider', 
            'switch', 'checkbox', 'radio', 'button', 'form'
        ]
        
        # Server response patterns 
        self.server_patterns = [
            r'\bwx\.request\b',
            r'\bwx\.downloadFile\b',
            r'\bwx\.uploadFile\b',
            r'\.then\s*\(',  # Promise responses
            r'success\s*:\s*function',  # Callback success
            r'fail\s*:\s*function',  # Callback failure
            r'\bres\.data\b',  # Response data
            r'\bresponse\.data\b',
            r'\bresult\.data\b',
        ]
        
        # Combined external patterns (for backward compatibility)
        self.external_patterns = self.server_patterns + self.user_input_elements
        
        # User input patterns from JS (based on WXML analysis)
        self.user_input_patterns = [
            r'\be\.detail\.value\b',  # Input events
            r'\be\.currentTarget\.dataset\b',  # Element data
            r'\bthis\.data\.\w+',  # Data binding variables
            r'\bthis\.setData\s*\(',  # Setting user data
            r'bindtap\s*=\s*["\'](\w+)["\']',  # Tap handlers
            r'bindinput\s*=\s*["\'](\w+)["\']',  # Input handlers
            r'bindchange\s*=\s*["\'](\w+)["\']',  # Change handlers
        ]
        
        # Patterns for conditional branches
        self.branch_patterns = [
            r'\bif\s*\(',  # if statements
            r'\belse\s+if\s*\(',  # else if
            r'\bswitch\s*\(',  # switch statements  
            r'\bwhile\s*\(',  # while loops
            r'\bfor\s*\(',  # for loops
            r'\?\s*[^:]+\s*:',  # ternary operators
            r'&&|\|\|',  # logical operators in conditions
        ]

    def analyze_wxml_file(self, filepath: str) -> Set[str]:
        """Analyze WXML file to find user input elements and their bound variables."""
        user_vars = set()
        
        try:
            with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
            
            # Parse user input elements
            for element in self.user_input_elements:
                # Find elements with data binding
                pattern = r'<{}\s+[^>]*(?:value|model:value)\s*=\s*["\']{{{{([^}}]+)}}}}["\'][^>]*>'.format(element)
                matches = re.finditer(pattern, content, re.IGNORECASE)
                for match in matches:
                    var_name = match.group(1).strip()
                    user_vars.add(var_name)
                
                # Find elements with event handlers
                event_pattern = r'<{}\s+[^>]*(?:bind\w+|catch\w+)\s*=\s*["\'](\w+)["\'][^>]*>'.format(element)
                matches = re.finditer(event_pattern, content, re.IGNORECASE)
                for match in matches:
                    handler_name = match.group(1)
                    user_vars.add(handler_name + '_handler')  # Mark as user input handler
            
            # Find wx:for loops (list data binding)
            for_pattern = r'wx:for\s*=\s*["\']{{{{([^}}]+)}}}}'
            matches = re.finditer(for_pattern, content, re.IGNORECASE)
            for match in matches:
                var_name = match.group(1).strip()
                user_vars.add(var_name)
                
        except Exception as e:
            print("Warning: Could not parse WXML file {}: {}".format(filepath, e))
            
        return user_vars

    def collect_user_variables(self, directory: str) -> Set[str]:
        """Collect all user-input related variables from WXML files in directory."""
        user_vars = set()
        
        for root, dirs, files in os.walk(directory):
            for file in files:
                if file.endswith('.wxml'):
                    filepath = os.path.join(root, file)
                    file_vars = self.analyze_wxml_file(filepath)
                    user_vars.update(file_vars)
        
        return user_vars

    def extract_variables_from_condition(self, condition: str) -> Set[str]:
        """Extract variable names from a conditional expression."""
        # Remove operators and parentheses to isolate variables
        cleaned = re.sub(r'[()&|!<>=+\-*/%]', ' ', condition)
        cleaned = re.sub(r'["\']\w*["\']', '', cleaned)  # Remove strings
        cleaned = re.sub(r'\b\d+\b', '', cleaned)  # Remove numbers
        
        # Extract potential variable names
        variables = set()
        for word in cleaned.split():
            if (word and 
                not word in ['true', 'false', 'null', 'undefined', 'typeof', 'new'] and
                re.match(r'^[a-zA-Z_$][a-zA-Z0-9_$.]*$', word)):
                variables.add(word)
        
        return variables

    def is_external_dependent(self, condition: str, user_variables: Set[str]) -> Tuple[bool, str]:
        """Check if a condition depends on external inputs (user or server)."""
        # Check for server response patterns
        for pattern in self.server_patterns:
            if re.search(pattern, condition, re.IGNORECASE):
                return True, "server_response"
        
        # Check for user input patterns
        for pattern in self.user_input_patterns:
            if re.search(pattern, condition, re.IGNORECASE):
                return True, "user_input"
        
        # Check if condition uses variables identified from WXML
        condition_vars = self.extract_variables_from_condition(condition)
        for var in condition_vars:
            # Direct match with WXML variables
            if var in user_variables:
                return True, "user_input"
            # Check for common data binding patterns
            if (var.startswith('this.data.') or 
                any(user_var in var for user_var in user_variables)):
                return True, "user_input"
        
        # Check for common external variable patterns
        for var in condition_vars:
            if (any(keyword in var.lower() for keyword in 
                   ['user', 'input', 'form', 'response', 'result', 'data']) or
                var.startswith('e.') or var.startswith('event.')):
                return True, "user_input"
                
        return False, "internal"

    def analyze_file(self, filepath: str, user_variables: Set[str]) -> Dict:
        """Analyze a single JavaScript/TypeScript file."""
        try:
            with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
        except Exception as e:
            return {"error": str(e)}

        # Remove comments to avoid false matches
        content = re.sub(r'//.*?\n', '\n', content)  # Single line comments
        content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)  # Multi-line comments

        results = {
            "file": filepath,
            "total_branches": 0,
            "external_dependent": 0,
            "internal_dependent": 0,
            "user_input_dependent": 0,
            "server_response_dependent": 0,
            "branches": []
        }

        # Find all conditional statements
        for pattern in self.branch_patterns:
            matches = re.finditer(pattern, content, re.IGNORECASE | re.MULTILINE)
            
            for match in matches:
                # Extract the condition part
                start = match.end()
                paren_count = 0
                condition_end = start
                
                # For if/while/for statements, find the full condition in parentheses
                if pattern.startswith(r'\b(if|while|for|switch)'):
                    for i, char in enumerate(content[start:], start):
                        if char == '(':
                            paren_count += 1
                        elif char == ')':
                            paren_count -= 1
                            if paren_count == 0:
                                condition_end = i
                                break
                    condition = content[start:condition_end]
                else:
                    # For ternary and logical operators, get surrounding context
                    line_start = content.rfind('\n', 0, match.start()) + 1
                    line_end = content.find('\n', match.end())
                    if line_end == -1:
                        line_end = len(content)
                    condition = content[line_start:line_end].strip()

                # Analyze if condition depends on external inputs
                is_external, ext_type = self.is_external_dependent(condition, user_variables)
                
                branch_info = {
                    "line": content[:match.start()].count('\n') + 1,
                    "type": pattern,
                    "condition": condition[:100],  # Truncate for readability
                    "external_dependent": is_external,
                    "dependency_type": ext_type
                }
                
                results["branches"].append(branch_info)
                results["total_branches"] += 1
                
                if is_external:
                    results["external_dependent"] += 1
                    if ext_type == "user_input":
                        results["user_input_dependent"] += 1
                    elif ext_type == "server_response":
                        results["server_response_dependent"] += 1
                else:
                    results["internal_dependent"] += 1

        return results

    def analyze_directory(self, directory: str) -> Dict:
        """Analyze all JavaScript/TypeScript files in a directory."""
        # First, collect user variables from WXML files
        print("Analyzing WXML files for user input elements...")
        user_variables = self.collect_user_variables(directory)
        print("Found {} user-related variables from WXML".format(len(user_variables)))
        
        results = {
            "directory": directory,
            "files_analyzed": 0,
            "total_branches": 0,
            "external_dependent": 0,
            "internal_dependent": 0,
            "user_input_dependent": 0,
            "server_response_dependent": 0,
            "user_variables_found": list(user_variables),
            "files": []
        }

        # Find all JS/TS files
        extensions = ['.js', '.ts', '.wxs']
        
        for root, dirs, files in os.walk(directory):
            for file in files:
                if any(file.endswith(ext) for ext in extensions):
                    filepath = os.path.join(root, file)
                    file_results = self.analyze_file(filepath, user_variables)
                    
                    if "error" not in file_results:
                        results["files"].append(file_results)
                        results["files_analyzed"] += 1
                        results["total_branches"] += file_results["total_branches"]
                        results["external_dependent"] += file_results["external_dependent"]
                        results["internal_dependent"] += file_results["internal_dependent"]
                        results["user_input_dependent"] += file_results["user_input_dependent"]
                        results["server_response_dependent"] += file_results["server_response_dependent"]

        return results

    def calculate_reduction_estimate(self, results: Dict) -> Dict:
        """Calculate estimated symbolic branching reduction."""
        total = results["total_branches"]
        external = results["external_dependent"]
        internal = results["internal_dependent"]
        
        if total == 0:
            return {"reduction_percentage": 0, "explanation": "No branches found"}
        
        # In selective concolic execution, only external-dependent branches are symbolic
        # Internal branches remain concrete, reducing symbolic exploration
        reduction_percentage = (internal / total) * 100
        
        return {
            "total_branches": total,
            "external_dependent": external,
            "internal_dependent": internal,
            "reduction_percentage": round(reduction_percentage, 2),
            "explanation": "Out of {} branches, {} ({:.1f}%) can remain concrete in selective concolic execution".format(
                total, internal, reduction_percentage)
        }

def main():
    parser = argparse.ArgumentParser(description='Analyze symbolic branching reduction potential')
    parser.add_argument('path', help='Directory or file path to analyze')
    parser.add_argument('--detailed', '-d', action='store_true', 
                       help='Show detailed branch-by-branch analysis')
    parser.add_argument('--output', '-o', help='Output results to JSON file')
    
    args = parser.parse_args()
    
    analyzer = BranchAnalyzer()
    
    if os.path.isfile(args.path):
        user_variables = analyzer.collect_user_variables(os.path.dirname(args.path))
        results = analyzer.analyze_file(args.path, user_variables)
        results = {"files": [results]} if "error" not in results else results
    else:
        results = analyzer.analyze_directory(args.path)
    
    # Calculate reduction estimate
    if "error" not in results:
        reduction_info = analyzer.calculate_reduction_estimate(results)
        results["reduction_estimate"] = reduction_info
        
        # Print summary
        print("=== Symbolic Branching Reduction Analysis ===")
        print("Path: {}".format(args.path))
        print("Files analyzed: {}".format(results.get('files_analyzed', 1)))
        print("Total branches: {}".format(reduction_info['total_branches']))
        print("External-dependent: {} (User: {}, Server: {})".format(
            reduction_info['external_dependent'],
            results.get('user_input_dependent', 0),
            results.get('server_response_dependent', 0)
        ))
        print("Internal/concrete: {}".format(reduction_info['internal_dependent']))
        print("Estimated reduction: {:.1f}%".format(reduction_info['reduction_percentage']))
        print("\n{}".format(reduction_info['explanation']))
        
        if args.detailed:
            print("=== Detailed Branch Analysis ===")
            for file_result in results.get("files", []):
                if file_result.get("total_branches", 0) > 0:
                    print("\nFile: {}".format(file_result['file']))
                    for branch in file_result["branches"]:
                        dep_type = "USER_INPUT" if branch["dependency_type"] == "user_input" else \
                                  "SERVER_RESP" if branch["dependency_type"] == "server_response" else "INTERNAL"
                        print("  Line {}: [{}] {}".format(branch['line'], dep_type, branch['condition']))
    
    # Save to file if requested
    if args.output:
        with open(args.output, 'w') as f:
            json.dump(results, f, indent=2)
        print("Results saved to: {}".format(args.output))

if __name__ == "__main__":
    main()
