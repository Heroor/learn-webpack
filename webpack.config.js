const path = require('path')
module.exports = {
  entry: {
    index: './src',
    index2: './src',
  },
  output: {
    path: path.resolve(__dirname, 'dist/[hash]'),
    filename: '[name]-[hash].js'
  }
}