import os
import time
import subprocess
import shutil

def main():
    time.sleep(1)
    command = "\"./node_modules/.bin/webpack.cmd\""
    print(command)
    # os.system(command)
    ps = subprocess.Popen(command)
    ps.communicate();
    
    # command = "browserify dst/a.js -o dst/zpert.asm.js"
    # print(command)
    # os.system(command)
    print('\\n');
    shutil.copyfile('./webpackdst/render.js', './src/js/wrender.js')
    # shutil.copyfile('./webpackdst/render.js', './src/js/renderp.js')
    print('end')

if __name__ == '__main__':
    main()