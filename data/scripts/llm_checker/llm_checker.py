import os
from openai import OpenAI
import logging
import re
import json

OPENAI_CLIENT = OpenAI() # Defaults to os.environ.get("OPENAI_API_KEY")

class MiniAppAnalyzer:
  def __init__(self, source_folder, folder_filter, max_count, patterns, output_folder, context_chars=100, openai_client=None, model="gpt-4o"):
    self.source_folder = source_folder
    self.output_folder = output_folder
    self.output_file = os.path.join(output_folder, "results-last-dance-1.json")
    self.log_file = os.path.join(output_folder, "llm_checker.log")
    self.folder_filter = folder_filter
    self.max_count = max_count
    
    self.patterns = patterns
    self.context_chars = context_chars
    
    self.batch_results = []
    self.batch_size = 1
    
    with open("query_template.txt", "r") as f:
      self.query_template = f.read()

    if openai_client:
      self.openai_client = openai_client
      self.model = model
    else:
      raise ValueError("An OpenAI API key must be provided.")
    
    if not os.path.exists(output_folder):
      os.makedirs(output_folder)
      
    if not os.path.exists(self.log_file):
      open(self.log_file, 'w').close()
                       
    self.logger = self._prepare_logger()

  def _prepare_logger(self):
    logging.basicConfig(
      level=logging.INFO,
      format="%(asctime)s - %(levelname)s - %(message)s",
      handlers=[
        logging.FileHandler(os.path.join(output_folder, "llm_checker.log")),
        logging.StreamHandler()
      ]
    )
    
    return logging.getLogger(__name__)
  
  def _get_code_context(self, code, index):
    """Extracts context around the function call within the specified character limit."""
    start = max(0, index - self.context_chars)
    end = min(len(code), index + self.context_chars)
    return code[start:end]

  def _check_sensitive_data(self, context):
    """Queries the ChatGPT API to check for sensitive data in the given code context."""
    try:
      response = self.openai_client.chat.completions.create(
        model=self.model,
        messages=[
          {
            "role": "system",
            "content": self.query_template,
          },
          {
            "role": "user",
            "content": f"Code Snippet For Analysis:\n {context}",
          },
        ]
      )
      result = response.choices[0].message.content.strip()
      # self.logger.info(f"Code Snippet For Analysis: {context.replace("\n", "\\n")}")
      # self.logger.info(f"OpenAI API response: {result}")
      
      if re.search(r"\[yes\]", result, re.IGNORECASE):
        return result
      else:
        return None

    except Exception as e:
      self.logger.error(f"Error querying OpenAI API: {e}")
      return None

  def analyze_file(self, file_path, appid):
    """Analyzes a single JavaScript file for calls in self.patterns."""
    with open(file_path, 'r', encoding='utf-8') as file:
      code = file.read().replace("  ", "")

      for pattern in self.patterns:
        index = code.find(pattern)
        while index != -1:
          context = self._get_code_context(code, index)
          api_result = self._check_sensitive_data(context)
          
          if api_result:
              result = {
                  "appid": appid,
                  "file": file_path,
                  "position": index,
                  "context": context,
                  "pattern": pattern,  # Add pattern to result for clarity
                  "api_result": api_result
              }
              self.batch_results.append(result)
              self.logger.info(f"Sensitive data found in file '{file_path}' at position {index} for pattern '{pattern}'.")

              # Write to file if batch size is reached
              if len(self.batch_results) >= self.batch_size:
                  self.save_batch_to_json()

          # Move to the next occurrence of the pattern
          index = code.find(pattern, index + 1)

  def save_batch_to_json(self):
    """Appends the batch results to the JSON output file."""
    try:
      if os.path.exists(self.output_file):
        with open(self.output_file, "r") as f:
          if os.stat(self.output_file).st_size == 0:
            data = []
          else:
            data = json.load(f)
      else:
        data = []

      data.extend(self.batch_results)
      with open(self.output_file, "w") as f:
        json.dump(data, f, indent=2)
        
      self.batch_results.clear()
    except Exception as e:
      self.logger.error(f"Error saving batch to JSON: {e}")

  def analyze_folder(self):
    analyzed_app_count = 0
    for folder_name in os.listdir(self.source_folder):
      folder_path = os.path.join(self.source_folder, folder_name)      
      # if not folder_name.startswith(self.folder_filter):
      #   continue
      
      if not self.folder_filter(folder_name):
        continue
      
      files = os.listdir(folder_path)
      if 'app.json' not in files:
        self.logger.info(f"Skipping folder '{folder_name}' as it does not contain an app.json file.")
        continue
      
      analyzed_app_count += 1
      if analyzed_app_count >= self.max_count:
        self.logger.info(f"Reached the maximum count of {self.max_count} apps to analyze.")
        break
      
      self.logger.info(f"Analyzing MiniApp with ID: {folder_name}.")
      self.recursive_analyze(folder_path, folder_name)

  def recursive_analyze(self, folder_path, appid):
    """Recursively analyzes all JavaScript files in a folder and its subfolders."""
    for root, _, files in os.walk(folder_path):
        for file_name in files:
            if file_name.endswith(".js"):
                file_path = os.path.join(root, file_name)
                self.analyze_file(file_path, appid)
                
if __name__ == "__main__":
  source_folder = "/media/dataj/wechat-devtools-linux/testing/auto-testing/data/newcrawl/pkg_unpack"
  output_folder = "/media/dataj/wechat-devtools-linux/testing/auto-testing/data/scripts/llm_checker/output"
  
  sink_patterns = [
    # ".request(",
    # ".uploadFile(",
    "navigateToMiniProgram"
    # ".openEmbeddedMiniProgram(",
    # ".navigateBackMiniProgram(",
    # ".postMessageToReferrerMiniProgram(",
    # ".sendSocketMessage(",
    # ".createUDPSocket("
  ]
  
  max_count = 3000
  context_chars = 1000
  
  # def folder_filter(folder_name):
  #   return folder_name.startswith("wx")
  
  interested_ids = json.load(open("/media/dataj/wechat-devtools-linux/testing/auto-testing/data/scripts/llm_checker/larger_than_10k_meta_output.json")).keys()
  def folder_filter(folder_name):
    if folder_name in interested_ids:
      return True
    return False
   
  analyzer = MiniAppAnalyzer(source_folder, folder_filter, max_count, sink_patterns, output_folder, context_chars=context_chars, openai_client=OPENAI_CLIENT)
  analyzer.analyze_folder()