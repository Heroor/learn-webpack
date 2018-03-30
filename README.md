# lesson-2
创建一个webpack开发环境：

- 构建html css js文件
- css 预处理 scss less
- 图片等文件资源
- 使用babel-loader来支持es6+语法
- 启动静态资源服务开发调试

## 将html作为项目页面的构建基础
使用`html-webpack-plugin`创建项目依赖的html，也可以自定义html的模板
安装html-webpack-plugin到开发依赖
```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin')
moule.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin() // 会默认将打包文件引入到一个自动生成的html文件中输出
  ]
}
```
或者：
```
plugins: [
  new HtmlWebpackPlugin({ // 修改默认的配置
    filename: 'index.html', // 定义输出文件的名字
    template: 'public/index.html' // 自定义的用来打包的html模板
  }, {
    // 定义更多的html关联
    filename: 'login.html',
    template: 'public/login.html'
  })
]
```

## 处理css文件
webpack默认不能处理css文件，需要定义专门的css loader来处理
安装css-loader 与 style-loader到开发依赖
```
// index.js:
import 'index.css'
...

// webpack.config.js:
module.exports = {
  module: {
    rules: [
      {
        test: /\.css/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        use: [
          'style-loader', // style-loader负责将css-loader解析的结果转变成js动态插入style来加载css   这个loader要写在css-loader前面
          'css-loader' // 将css代码解析 处理@import 与 url() 的文件引用，但是不能处理图片等文件，还需要再使用file-loader
        ]
      }
    ]
  }
}
```

如果要把css从js中分离出来，可以使用 extract-text-webpack-plugin 插件
> 注意插件对webpack4.0的支持程度`npm install extract-text-webpack-plugin@next -D`
```
const ExtracTextPlugin = require('extract-text-webpack-plugin')
module.exports = {
  // ...
  module: {
    rules: [
      test: /\.css$/,
      use: ExtracTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader'
      })
    ]
  },
  plugins: [
    new ExtracTextPlugin('index.css') // 这里是将输出的css文件的名字
  ]
}
```

### css 预处理器
使用 less-loader 或 sass-loader node-sass
```
{
  module: {
    rules: [
      test: /\.css$/,
      include: [
         path.resolve(__dirname, 'src'),
      ],
      user: [
        'style-loader',
        'css-loader',
        'scss-loader'
      ]
    ]
  }
}
```
当使用extract-text-webpack-plugin时:
```
const ExtracTextPlugin = require('extract-text-webpack-plugin')
module.exports = {
  // ...
  module: {
    rules: [
      test: /\.css$/,
      use: ExtracTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'scss-loader']
      })
    ]
  },
  plugins: [
    new ExtracTextPlugin('index.css') // 这里是将输出的css文件的名字
  ]
}
```

## 处理图片时
css-loader并不能处理图片资源，同时，当项目中引入图片文件时，需要使用file-loader
```
{
  // ...
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        include: [
           path.resolve(__dirname, 'src'),
        ],
        use: {
          loader: 'file-loader',
          options: {} // 可以自定义loader选项
        }
      }
    ]
  }
}
```

## babel
使用babel-loader来支持书写es6+语法
```
{
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: [
           path.resolve(__dirname, 'src'),
        ],
        use: 'babel-loader'
      }
    ]
  }
}
```

## 启动静态资源服务
webpack-dev-server可以启动一个本地静态资源服务用来开发调试。
在package.json添加一个scripts命令
`"start": "webpack-dev-server --mode development"`
运行npm start 就可以在`http://localhost:8080`看到构建的页面了
