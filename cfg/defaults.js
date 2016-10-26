/**
 * Function that returns default values.
 * Used because Object.assign does a shallow instead of a deep copy.
 * Using [].push will add to the base array, so a require will alter
 * the base array output.
 */
'use strict';

const path = require('path');
const srcPath = path.join(__dirname, '/../src'); // 项目源文件目录地址
const dfltPort = 8000; // 端口

/**
 * Get the default modules object for webpack
 * @return {Object}
 */
function getDefaultModules() {
  return {
    preLoaders: [ // loaders前置执行
      {
        test: /\.(js|jsx)$/, //正则，匹配到的文件后缀名
        include: srcPath, //string|array包含的文件夹
        loader: 'eslint-loader' //string|array处理匹配到的文件  从右往左
      }
    ],
    loaders: [ // 
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!autoprefixer-loader?{browsers:"last 2 version"}'
      },
      /*{
        test: /\.sass/,
        loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded&indentedSyntax'
      },*/
     /* {
        test: /\.scss/,
        loader: 'style-loader!css-loader!autoprefixer-loader?{browsers:"last 2 version"}!sass-loader?outputStyle=expanded'
      },*/
      {
        test: /\.scss/,
        loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
      },
      {
        test: /\.less/,
        loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /\.styl/,
        loader: 'style-loader!css-loader!stylus-loader'
      },
      {
        test: /\.json$/, // 处理json文件
        loader: 'json-loader'
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|ttf|eot|svg)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.(mp4|ogg|svg)$/,
        loader: 'file-loader'
      }
    ]
  };
}

module.exports = {
  srcPath: srcPath,
  publicPath: 'assets/', // 
  port: dfltPort, // 端口
  getDefaultModules: getDefaultModules // modules
};
