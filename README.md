# lesson-3

模块解析
设置模块加载的路径规则
```
{
  resolve: {
    // 设置路径别名
    alisa: {
      components: path.resolve(__dirname, 'src/component'), // 会匹配带有'components'的路径引用，替换成'src/component'。例如'components/aaa' ===> 'src/component/aaa'

      common$: pathresolve(__dirname, 'src/common') // 只精确匹配到'common'路径：import 'common'
    },

    // 设置加载模块时自动添加的文件后缀 从前到后优先选择
    extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx'],
    // extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx', '.css'],

    //设置以模块名引用时的规则
    modules: [
      'node_modules', // 会在node_modules中查找模块
      path.resolve(__dirname, 'src') // 这样设置可以在src目录下查找模块
    ],

    // 设置按照哪个package.json中的字段设置的入口文件来加载
    mainFields: ['browser', 'module', 'main'], // target 为 web 或 webworker 时默认是这样
    // mainFields: ['module', 'main'] // target 为其他值时默认时这样

    // 设置当package中没有指定main文件时匹配的文件
    mainFiles: ['index'],

    // 设置loader的resolve设置 可配置项与resolve大致相同
    resolveLoader: {
      mainFields: ['loader', 'main']
    }
  }
}
```
