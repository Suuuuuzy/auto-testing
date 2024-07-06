import json
import os

object_path = os.path.join(os.path.abspath(os.path.dirname(os.path.dirname(__file__))))
file = os.path.joi(object_path, "script/script.json").replace("\\","/")

def get_path(file):
    def find_project_root():
        current_dir = os.getcwd()
        while not os.path.exists(os.path.join(current_dir, 'README.md')):
            if current_dir == os.path.dirname(current_dir):
                return None
            current_dir = os.path.dirname(current_dir)
        return current_dir.replace('\\', '/')

    root = find_project_root()

    with open(file, encoding="UTF-8") as f:
        data = json.load(f)

    for path in data['commands']:
        if 'path' in path:
            path_parts = path['path'].split('/')
            current_path = os.path.join(root, 'pages')
            existing_directories = set()

            for part in path_parts:
                if part not in ['pro', 'page', 'homepage']:
                    part = str(part).replace('-', '_')
                    current_path = os.path.join(current_path, part)

                    if part not in existing_directories:
                        os.makedirs(current_path, exist_ok=True)
                        py_file = os.path.join(current_path, f'{part}.py')

                        if os.path.exists(py_file):
                            pass
                        else:
                            open(py_file, 'w').close()
                    existing_directories.add(part)

def get(file):
    with open(file, encoding="UTF-8") as f:
        data = json.load(f)
    
    for command in data['commands']:
        if 'target' in command and command['command'] == 'tap':
            target = command['target']
            text = command['text']
            path = command['path']
            print('button name: ' + text, '\n')
            print('belongs to path ' + path, '\n')
            print('xpath expression: ' + target, '\n')
        elif 'target' in command and command['command'] == 'input':
            input = command['target']
            print('input block ' + input, '\n')

get(file)
get_path(file)