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
        from: 'src/assets/*.jpg', flatten: true // flatten 是否拷贝文件夹
      }
    ])
  ]
}
```


### extract-text-webpack-plugin


### ProvidePlugin 内置插件

### IgnorePlugin 内置插件

### webpack-dev-middleware