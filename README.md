# antd-electron
npm install    #安装node.js依赖
python pack.py #打包
npm start

ubuntu报错
configuration.node has an unknown property 'fs'. These properties are valid:
   object { __dirname?, __filename?, global? }
把webpack和webpack-cli的版本更改为   
    "webpack": "^4.44.1",
    "webpack-cli": "^3.3.12"
    修复