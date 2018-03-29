const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    bundle: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  },
  devtool: '#source-map',
  module: {
    rules: [{
      test: /\.jsx?/,
      include: [
        path.resolve(__dirname, 'src')
      ],
      use: 'babel-loader'
    }, {
      test: /\.css?/,
      include: [
        path.resolve(__dirname, 'src')
      ],
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          'sass-loader'
        ]
      })
    }, {
      test: /\.(png|jpg|gif)$/,
      use: {
        loader: 'file-loader',
        options: {

        }
      }
    }]
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src')
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'assets/index.html'
    }),
    new ExtractTextPlugin('index.css')
  ]
}