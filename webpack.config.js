const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

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
      test: /\.jsx?/,
      include: [
        path.resolve(__dirname, 'src')
      ],
      use: 'babel-loader'
    }, {
      test: /\.jpg$/,
      use: 'file-loader'
    }, {
      exclude: [/\.(js|jpg|html)$/], // 排除符合这些规则的模块
      use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"] // loader有加载顺序
    }],
    noParse: /\.scss/
  },
  resolve: {
    alias: { // 设置路径别名
      m1: path.resolve(__dirname, 'src/module1'), // 可以用import m1 from 'm1' 引用，或者带有'm1'的路径都会被替换掉：'m1/a.js' ===> 'src/moule1/a.js',
      m2$: path.resolve(__dirname, 'src/module1'), // 只有import m1 from 'm1' 才能匹配到
    },
    extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx', '.css', '.scss', '.sass'], // 加载文件时 自动添加后缀
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src') // 引用模块名时，也会在这个目录下找
    ],
    mainFiles: ['index'],// 默认加载路径下index文件
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'assets/index.html'
    }),
  ]
}