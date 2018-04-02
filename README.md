# lesson-5

## Plugin

### DefinePlugin 内置插件
DefinePlugin是webpack内置的插件，可以创建在编译时可以配置的全局变量，可以使用webpack.DefinePlugin获取

```
{
  plugins: [
    new webpack.DefinePlugin({
      VALUE: '1+1', // 当值为字符串时，字符串会被当做代码执行 最终为 2
      VERSION: JSON.stringify('123'), // 当值为字符串时，字符串会被当做代码执行，所以需要序列化
      PRODUCTION: JSON.stringify(true), // 最终为true
      TRUE_STR: JSON.stringify('true'), // 最终为'true'
      'process.env.NODE_ENV': JSON.stringify('DEV'),
    })
  ]
}
```


### copy-webpack-plugin
copy-webpack-plugin用来复制文件
```
const CopyWebpackPlugin = require('copy-webpack-plugin')
{
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'src/module1/common.scss', to: 'build/common.scss'  // 将文件从 from 复制到 to(to默认编译目录下)
      }, {
        from: 'src/assets/*.jpg',
        flatten: true // 是否只拷贝文件夹
      }
    ])
  ]
}
```


### extract-text-webpack-plugin
拆分css为文件
```
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'src')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // 需要使用插件的loader
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css') // 最终分离出的css文件名， 可以用[hash]
  ]
}
```

### ProvidePlugin 内置插件
可以将默写模块作为运行时的全局变量，不用每次都引用这些模块
```
{
  plugins: [
    new webpack.ProvidePlugin({
      name: 'react' // name 键就是暴露的全局变量
    }),

    // or
    new ProvidePlugin({
      // React 下的 Component,  类似于: import {Component} from React
      name: ['react', 'Component']
    })
  ]
}
```

### IgnorePlugin 内置插件
用来忽略某些模块，不把这些模块打包
```
{
  plugins: [
    //  参数为：
    // 匹配引入模块路径的正则表达式
    // 所在的目录
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/) // 忽略moment模块的部分代码
  ]
}
```

