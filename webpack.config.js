const path = require('path');
module.exports = {
  mode: 'development',
  entry: {
    'render': './src/js/render.js',
    // 'render': './src/js/render.js'
  },
  target: 'electron-renderer',
  output: {
    path: path.resolve(__dirname, 'webpackdst'),
    filename: '[name].js'
  },
  node: {
    fs: 'empty',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      // {
      //   test: /\.jsx$/,
      //   exclude: /node_modules/,
      //   loaders: ['babel-loader?presets[]=@babel/react,presets[]=@babel/env'],
      // },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react'],
          plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties']
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: 'url-loader'
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [path.resolve(__dirname, './src/resource/svg')],
        options: {
          symbolId: 'icon-[name]',
        }
      }
      // {
      //   resource:'F:/zplan/zplan/babeltest/src/js/zTreeStyle.css',
      //   issuer:'F:/zplan/zplan/babeltest/src/js/jquery.ztree.core.js',
      // }
    ]
  },
  externals: {
    "jquery": "jQuery"
  }
  // devtool: "inline-source-map",
};