# lesson-4

## 配置loader
```
{
  module: {
    rules: [
      { // 一条规则
        test: /\.jsx?/, // 规则的条件
        include: [
          path.resolve(__dirname, 'src') // 规则的条件
        ],
        use: 'babel-loader' // 规则的应用 应用某loader
      }
    ]
  }
}
```

loader匹配的路径分为两种：
```
rules: [
  {
    // 第一种 属于默认的规则
    // 直接写test 相当于resource.test
    // 直接写include 相当于resource.include
    resource: { // 匹配的路径是被请求的资源的绝对路径
      test: /\.js$/,
      include: [
        path.resolve(__dirname, 'src')
      ]
    },
    use: 'babel-loader'
  }
]
```

```
rules: [
  {
    // 第二种
    issuer: { // 匹配的路径是发出请求的资源的绝对路径  可以用来做限制
      test: /\.js$/,
      include: [
        path.resolve(__dirname, 'src')
      ]
    },
    use: 'babel-loader'
  }
]
```


### 匹配条件

```
rules: [
  test: /\.js/, // 匹配特定条件
  include: ..., // 匹配特定路径
  exclude: ..., // 排除特定路径
  and: [...], // 必须匹配数组中所有条件
  or: [...], // 匹配数组中任意一个条件
  not: [...] // 排除数组中所有条件
]
```

条件可以为
- 字符串 路径
- 正则
- 函数 (path) => boolean返回true表示匹配成功
- 对象 匹配所有属性值的条件

```
rules: [
  {
    test: /\.js$/, // 使用了正则
    include: [
      path.resolve(__dirname, 'src') // 使用了绝对路径 属于字符串
    ]
  }, {
    test: {
      js: /\.js/,
      jsx: /\.jsx/
    }, // 不建议使用对象形式
    not: [
      (path) => !(/\.jsx?/.test(path))
    ]
  }
]
```


### 模块加载类型
使用type字段来设置模块加载的类型

- `javascript/auto`：即 webpack 3 默认的类型，支持现有的各种 JS 代码模块类型 —— CommonJS、AMD、ESM
- `javascript/esm`：ECMAScript modules，其他模块系统，例如 CommonJS 或者 AMD 等不支持，是 .mjs 文件的默认类型
- `javascript/dynamic`：CommonJS 和 AMD，排除 ESM
- `javascript/json`：JSON 格式数据，require 或者 import 都可以引入，是 .json 文件的默认类型
- `webassembly/experimental`：WebAssembly modules，当前还处于试验阶段，是 .wasm 文件的默认类型...

```
rules: [
  test: /\.js/,
  type: 'javascript/esm' // 会指定所有js文件以ems模块加载
]
```



### use 应用结果
use用来应用匹配规则对应的处理loader
```
{
  rules: [
    use: 'babel-loader', // 可以是字符串

    use: ['style-loader', 'css-loader'], // 可以是数组

    use: [ // 可以是loader配置对象数组
      {loader: 'style-loader'},
      {loader: 'css-loader'}
    ],

    use: { // 或者直接是一个loader配置对象
      loader: 'babel-loader',
      options: {}
    }
  ]
}
```


## loader应用顺序
一个规则内可以应用多个loader，但loader是有处理顺序的
例如处理less：less-loader ==> css-loader ==> style-loader
```
{
  rules: [
    {
      test: /\.less/,
      use: ['style-loader', 'css-loader', 'less-loader']
    }
  ]
}
```

当多个rule匹配到同一模块时，为了保证正确的loader处理顺序，可以添加enforce字段来定义loader的顺序：
```
{
  rules: [
    {
      test: /\.js/,
      use: 'eslint-loader',
      enforce: 'pre' // 保证此loader先处理
    },
    {
      test: /\.js/,
      use: 'babel-loader',
      enforce: 'post' // 保证此loader后处理
    }
  ]
}
```
loader按照以下顺序执行
1. 前置 ('pre')
2. 行内 (引用模块时使用: require('json-loader!./data.json') 的形式)
3. 普通 (默认)
4. 后置 ('post')





## 配置noParse

使用noParse来指定不需要解析依赖的模块，用于优化构建
> 使用 noParse 进行忽略的模块文件中不能使用 import、require、define 等导入机制。

```
{
  // ...
  module: {
    rules: [...],
    noParse: /jquery|lodash/, // 可以使用正则

    noParse(content) { // 使用function
      return /jquery|lodash/.test(content)
    }
  }
}
```