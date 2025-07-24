#!/usr/bin/env python3
"""
Script to patch Kybra's modulegraph dependency to work with Python 3.12
by replacing deprecated 'imp' module with 'importlib'.
"""

import os
import re
import sys

def patch_file(file_path):
    """Replace imp imports with importlib in the given file."""
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Replace 'import imp' with importlib equivalents
    content = content.replace('import imp', 'import importlib.util, importlib.machinery')
    
    # Replace imp.find_module and imp.load_module with importlib equivalents
    content = re.sub(r'imp\.find_module\(([^,]+),\s*([^)]+)\)', 
                    r'(importlib.util.find_spec(\1, \2), None)', content)
    content = re.sub(r'imp\.load_module\(([^,]+),\s*([^,]+),\s*([^,]+),\s*([^)]+)\)', 
                    r'importlib.util.module_from_spec(importlib.util.find_spec(\1))', content)
    
    # Replace imp.get_suffixes with importlib equivalent
    content = content.replace('imp.get_suffixes()', 
                           '[("." + s, "rb", importlib.machinery.EXTENSION_SUFFIXES) for s in importlib.machinery.EXTENSION_SUFFIXES]')
    
    # Replace imp.PY_SOURCE, imp.PY_COMPILED, imp.C_EXTENSION with importlib equivalents
    content = content.replace('imp.PY_SOURCE', 'importlib.machinery.SOURCE_SUFFIXES[0]')
    content = content.replace('imp.PY_COMPILED', 'importlib.machinery.BYTECODE_SUFFIXES[0]')
    content = content.replace('imp.C_EXTENSION', 'importlib.machinery.EXTENSION_SUFFIXES[0]')
    
    with open(file_path, 'w') as f:
        f.write(content)
    
    print(f"Patched {file_path}")

def main():
    """Find and patch all modulegraph files that use the imp module."""
    venv_path = os.path.dirname(os.path.dirname(os.path.dirname(sys.executable)))
    modulegraph_path = os.path.join(venv_path, 'lib', 'python3.12', 'site-packages', 'modulegraph')
    
    files_to_patch = [
        os.path.join(modulegraph_path, 'util.py'),
        os.path.join(modulegraph_path, 'modulegraph.py'),
        os.path.join(modulegraph_path, 'find_modules.py')
    ]
    
    for file_path in files_to_patch:
        if os.path.exists(file_path):
            patch_file(file_path)

if __name__ == "__main__":
    main()
