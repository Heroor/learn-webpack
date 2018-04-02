const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    bundle: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  },
  module: {
    rules: [{
      test: /\.js$/,
      include: [
        path.resolve(__dirname, 'src')
      ],
      use: 'babel-loader'
    }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'assets/index.html'
    }),
    new webpack.DefinePlugin({
      TRUE1: true, // true
      TRUE2: 'true', // true
      TRUE3: JSON.stringify(true), // true
      TRUE4: JSON.stringify('true'), // 字符串会被执行 最终得到'true'
      two: '1+1', // 会执行 得到2
      'process.env.NODE_ENV': JSON.stringify('DEV'),
      o: {
        k: JSON.stringify('value')
      }
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/module1/*.scss', to: 'style/scss', flatten: true  // 将文件从 from 复制到 to (默认编译目录下)
      }, {
        from: 'src/assets/*.jpg', flatten: true // flatten 是否拷贝文件夹
      }
    ]),
    new webpack.ProvidePlugin({
      React: ['react'],
      RComponent: ['react', 'Component'],
      Module1: [path.resolve(__dirname, 'src/module1')],
    })
  ]
}