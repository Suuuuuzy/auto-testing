import os
def inject_code():
    
for i in os.listdir('dataset'):
    print(i)
    files = os.listdir(os.path.join('dataset', i))
    if "app.js" not in files:
        print(f"{i} does not have app.js")
        continue
    with open(os.path.join('dataset', i, 'app.js')) as f:
        app_js = f.read()
    if "onLaunch" not in app_js:
        
    break

# Compare this snippet from tasks/performance_eval/eval.py: