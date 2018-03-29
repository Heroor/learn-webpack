# course-1

webpack 是一个打包工具，可以将项目所依赖的模块资源打包构建



webpack 4.x 将 webpack 分为 webpack 与 webpack-cli
安装依赖时需将两者都安装上：
`npm i webpack -D`
`npm i webpack-cli -D`

可以在 `package` 中添加打包命令： `"build": "webpack --mode production"`  

或者全局安装webpack后，就可以直接执行打包命令： `webpack --mode production`

## 配置项：
### 入口 entry
入口文件是一个起始的`.js`文件，是webpack构建的入口，通过解析入口文件所有的依赖模块，进行打包。
默认入口为： `./src/index.js`

入口使用 entry 字段进行匹配置，可以有多个入口
```
modult.exports = {
	entry: './src/index.js'
}
```
```
module.exports = {
	entry: {
		main: './src/index.js' // 等同于上例
	}
}
```
```
modult.exports = {
	entry: {
		en1: './src/a.js',
		en2: './src/b.js'  // 入口可以有多个
	}
}
```
```
module.exports = {
	entry: {
		main: [  // 使用数组对多个文件打包，让多文件作为入口
			'./src/a.js',
			'./src/b.js'
		]
	}
}
```


### 加载器 loader

由于项目依赖的文件格式出了js还有其他很多种，webpack加载其他文件时需要使用loader，loader可以将文件转换成webpack可以打包的格式。
当然js文件也可以使用loader，比如babel
```
module.export = {
	entry: '.src/index.js'
	// 使用module.rules配置loader
	module: {
		rules: {
			test: /\.jsx?/, // 匹配文件后缀
      include: [
        path.resolve(__dirname, 'src') // 指定那些路径下的文件需要loader处理
      ],
      use： 'babel-loader' // 指定loader
		}
	}
}
```

### 插件 plugin

plugin是webpack的插件系统，实现一些其他功能
比如：代码压缩，构建开发服务
```
const UglifyPlugin = require('unlifyjs-webpack-plugin')
module.exports = {
  entry: './src',
  plugin: [
    new UglifyPlugin() // 直接添加插件即可
  ]
}
```

### 输出 output
有入口就有输出，webpack将所有模块构建打包后作为输出
```
module.exports = {
  entry: './src',
  output: {
    path: path.resolve(__dirname, 'dist'), // 输出路径
    filename: 'bundle.js' // 输出文件的名字
  }
}
```
```
module.exports = {
  entry: './src/a.js',
  output: {
    filename: '[hash].js',  // 创建带hash的文件名
    path: __dirname + 'dist/[hash]' // 带hash的路径
  }
}
```