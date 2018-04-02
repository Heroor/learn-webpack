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

## 配置项
```
{
  plugins: [
    new WebpackDevServer({
      // 指定静态服务的域名。默认为http://localhost:8080/
      public: 'http://localhost:8080/',
      port: '8080', // 端口
      publicPath: '/', // 构建之后的访问路径 如果你使用了 HMR，那么要设置 publicPath 就必须使用完整的 URL。
      // 设置代理
      proxy: {
        '/api': {
          target: "http:/localhost:9090", // 将url中带有'/api'的请求代理到此链接
          pathRewrite: {
            '^/api': '' // 重写url 把url中path的'api'去掉
          }
        }
        contentBase: path.join(__dirname, 'public'), // 定义不需要构建的静态资源的访问路径
        // contentBase: ['...', '...'],

        // 设置额外的中间件
        before(app) {
          app.post('/list', function (req, res) {
            res.send('hahaha')  
          })
        },
        after(app) {
          app.use(function(req, res, next) {
            console.log('looooooooog')
            next()
          })
        },
        // ...
        // ...
        // ...
      }
      
    })
  ]
}
```
