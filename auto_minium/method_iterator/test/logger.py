import logging

def setup_logger(name, file_path, level=logging.INFO):
  logger = logging.getLogger(name)
  logger.setLevel(logging.DEBUG)  # Set the base level for the logger

  file_handler = logging.FileHandler(file_path)
  file_handler.setLevel(logging.DEBUG)
  file_formatter = logging.Formatter(
      '%(asctime)s.%(msecs)03d %(levelname)s %(module)s - %(funcName)s: %(message)s',
      datefmt='%Y-%m-%d %H:%M:%S'
  )
  file_handler.setFormatter(file_formatter)

  # Stream (console) handler
  console_handler = logging.StreamHandler()
  console_handler.setLevel(level)
  console_formatter = logging.Formatter(
      '%(asctime)s.%(msecs)03d %(levelname)s %(module)s - %(funcName)s: %(message)s',
      datefmt='%Y-%m-%d %H:%M:%S'
  )
  console_handler.setFormatter(console_formatter)

  # Add both handlers to the logger
  logger.addHandler(file_handler)
  logger.addHandler(console_handler)
  
  return logger
