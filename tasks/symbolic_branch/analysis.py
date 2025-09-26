#!/usr/bin/env python3
"""
Static analysis tool to estimate symbolic branching reduction in miniapps.
Analyzes JavaScript/TypeScript files to count branches dependent on external inputs.
"""

import os
import re
import json
from pathlib import Path
import argparse
from typing import Dict, List, Set, Tuple

class BranchAnalyzer:
    def __init__(self):
        # Patterns for external inputs (common in miniapps)
        self.external_patterns = [
            # User inputs
            r'\b(?:wx\.)?getUserInfo\b',
            r'\b(?:wx\.)?getLocation\b', 
            r'\bthis\.data\.\w+',  # WeChat miniapp data binding
            r'\be\.detail\.value\b',  # Form inputs
            r'\be\.currentTarget\.dataset\b',  # Element data
            r'\boptions\.\w+',  # Page options/parameters
            r'\breq\.data\b',  # Request data
            r'\bres\.data\b',  # Response data
            # Server responses
            r'\bwx\.request\b.*success',
            r'\bwx\.downloadFile\b',
            r'\bwx\.uploadFile\b',
            r'\.then\s*\(',  # Promise responses
            r'success\s*:\s*function',  # Callback success
            # Storage/Cache
            r'\bwx\.getStorage\b',
            r'\bwx\.getSystemInfo\b',
            # Network state
            r'\bwx\.getNetworkType\b',
            # Other external sources
            r'\bDate\s*\(',
            r'\bMath\.random\s*\(',
            r'\bnew\s+Date\s*\(',
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
        
        # Common internal variable patterns (likely concrete)
        self.internal_patterns = [
            r'\btrue\b|\bfalse\b',  # boolean literals
            r'\b\d+\b',  # numeric literals
            r'["\']\w*["\']',  # string literals
            r'\bthis\.\w+\s*\(',  # method calls
            r'\b\w+\.length\b',  # array/string length
            r'\btypeof\s+\w+',  # typeof checks
        ]

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

    def is_external_dependent(self, condition: str) -> bool:
        """Check if a condition depends on external inputs."""
        # Check for direct external patterns
        for pattern in self.external_patterns:
            if re.search(pattern, condition, re.IGNORECASE):
                return True
        
        # Extract variables and check if they might be external
        variables = self.extract_variables_from_condition(condition)
        for var in variables:
            # Common external variable naming patterns
            if (any(keyword in var.lower() for keyword in 
                   ['user', 'data', 'response', 'result', 'input', 'form', 'req', 'res']) or
                var.startswith('e.') or var.startswith('event.')):
                return True
                
        return False

    def analyze_file(self, filepath: str) -> Dict:
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
                is_external = self.is_external_dependent(condition)
                
                branch_info = {
                    "line": content[:match.start()].count('\n') + 1,
                    "type": pattern,
                    "condition": condition[:100],  # Truncate for readability
                    "external_dependent": is_external
                }
                
                results["branches"].append(branch_info)
                results["total_branches"] += 1
                
                if is_external:
                    results["external_dependent"] += 1
                else:
                    results["internal_dependent"] += 1

        return results

    def analyze_directory(self, directory: str) -> Dict:
        """Analyze all JavaScript/TypeScript files in a directory."""
        results = {
            "directory": directory,
            "files_analyzed": 0,
            "total_branches": 0,
            "external_dependent": 0,
            "internal_dependent": 0,
            "files": []
        }

        # Find all JS/TS files
        extensions = ['.js', '.ts', '.wxs', '.json']
        
        for root, dirs, files in os.walk(directory):
            for file in files:
                if any(file.endswith(ext) for ext in extensions):
                    filepath = os.path.join(root, file)
                    file_results = self.analyze_file(filepath)
                    
                    if "error" not in file_results:
                        results["files"].append(file_results)
                        results["files_analyzed"] += 1
                        results["total_branches"] += file_results["total_branches"]
                        results["external_dependent"] += file_results["external_dependent"]
                        results["internal_dependent"] += file_results["internal_dependent"]

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
        results = analyzer.analyze_file(args.path)
        results = {"files": [results]} if "error" not in results else results
    else:
        results = analyzer.analyze_directory(args.path)
    
    # Calculate reduction estimate
    if "error" not in results:
        reduction_info = analyzer.calculate_reduction_estimate(results)
        results["reduction_estimate"] = reduction_info
        
        # Print summary
        print("\n=== Symbolic Branching Reduction Analysis ===")
        print(f"Path: {args.path}")
        print(f"Files analyzed: {results.get('files_analyzed', 1)}")
        print(f"Total branches: {reduction_info['total_branches']}")
        print(f"External-dependent: {reduction_info['external_dependent']}")
        print(f"Internal/concrete: {reduction_info['internal_dependent']}")
        print(f"Estimated reduction: {reduction_info['reduction_percentage']:.1f}%")
        print(f"\n{reduction_info['explanation']}")
        
        if args.detailed:
            print(f"\n=== Detailed Branch Analysis ===")
            for file_result in results.get("files", []):
                if file_result.get("total_branches", 0) > 0:
                    print(f"\nFile: {file_result['file']}")
                    for branch in file_result["branches"]:
                        dep_type = "EXTERNAL" if branch["external_dependent"] else "INTERNAL"
                        print(f"  Line {branch['line']}: [{dep_type}] {branch['condition']}")
    
    # Save to file if requested
    if args.output:
        with open(args.output, 'w') as f:
            json.dump(results, f, indent=2)
        print(f"\nResults saved to: {args.output}")

if __name__ == "__main__":
    main()