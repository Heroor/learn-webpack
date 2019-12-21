const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (a, b) => {
return {
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
  devServer: {
    port: 8090, // 修改端口号，
    proxy: {
      'http://localhost:8092/app1': {
        target: "http://www.baidu.com", // 将 URL 中带有 /api 的请求代理到本地的 3000 端口的服务上
        pathRewrite: { '^/app': '/ppa' }, // 把 URL 中 path 部分的 `api` 移除掉
      },
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'assets/index.html'
    })
  ]
}
}
