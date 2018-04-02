# lesson-6

webpack-dev-server 构建了一个本地服务，提供了一个开发运行环境

webpack-dev-server也要指定mode
- development (默认值)
- production

```
// paceage.json
"start": "webpack-dev-server --mode development"
```

```
// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  //...
  plugins: [
    new WebpackDevServer({
      filename: 'index.html',
      template: 'assets/index.html'
    })
  ]
}
```
默认在http://localhost:8080可以访问构建的页面，如果没有指定模板文件，8080端口会打开一个静态资源列表



