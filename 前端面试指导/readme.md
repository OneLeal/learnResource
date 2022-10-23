# webpack 知识点复习(https://zhuanlan.zhihu.com/p/380117206)
#
# webpack 基本配置：
# 1. merge 与拆分文件（公共文件、生产文件、开发文件）；
# 公共文件：entry plugins module
# 开发文件：mode module plugins devServer
# 生产文件：......
#
# 2. 本地服务:
# devServer: { open, progress, contentBase, proxy }
#
# 3. 处理 es6 (babel-loader)
# 4. 处理样式 (style-loader css-loader less-loader)
# 5. 处理图片 (file-loader url-loader)
#    例：
#    var options = { limit: 5 * 1024, outputPath: '/image/' }
#    module.rules: [{ test: /\.(png|jpg|jpeg|gif)$/, use: { loader: 'url-loader', options } }]
# 6. 模块化
#
# webpack 高级配置:
# 1. 配置多入口文件
#    配置多个入口：
#    entry： {
#      index: path.join(__dirname, 'index.js'),
#      other: path.join(__dirname, 'other.js')
#    }
#    output: {
#       filename: '[name].[contentHash:8].js',
#       path: path.join(__dirname, 'dist'),
#    }
#
# 2. 抽离、压缩 css 文件
#    抽离：
#    plugins: [ new MiniCssExtractPlugin({ filename: 'css/main.[contentHash:8].css' }) ]
#    module: { rules: [{ test: /\.less$/, loader: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'] }] }

#    压缩：
#    optimization: { (配置插件) }
#
# 3. 抽离公共代码: optimization → splitChuncks → cacheGroups → vendor/common
# 4. 懒加载/支持 JSX : 
#    .babelrc: { "presets": ["@babel/preset-env", "@babel/preset-react"] }
#
# 注：babel 的基本配置及使用：
# 安装：@babel/cli @babel/core @babel/preset-env babel-loader;
# 配置：.babelrc: { "presets": ["@babel/preset-env"], 'plugins': [] }
# 关于处理 export 和 import：{ "presets": [["env", { "modules": false }]]}
# babel-polyfill 和 babel-runtime 的作用
#
# 关于 babel 和 webpack 的区别:
# babel 是 JavaScript 新语法编译工具，不关心模块化；
# webpack 是多个 loader 和 plugin 的集合
#
# webpack 概念梳理：module/chunck/bundle
# module: webpack 一切皆模块，其本质指各源码文件；
# chunck: 由多模块组成的代码块/代码集合；
# bundle: 最终输出的文件，chunck 的执行结果；
#
# webpack 性能优化
# 1. 打包的构建速度（提升开发效率）；
# 1.1 babel-loader 优化: 使用缓存/明确范围
#     例:
#     { test: /\.js$/, use: ['babel-loader?cacheDirectory'], exclude: /node_modules/ }
#
# 1.2 IgnorePlugin 插件使用(例：优化 moment，忽略未使用的语言包)
# plugins: [new webpack.IgnorePlugin(/\.\/locale/, /moment/)]
#
# 手动引入语言包并使用:
# import 'moment/locale/zh-cn';
# moment.locale('zh-cn');
#
# 1.3 noParse 避免重复打包
# module: { noParse: [/vueLazyLoader\.min\.js$/] }
#
# 注：IgnorePlugin 是不引入，noParse 是引入了但是不打包
#
# 1.4 多进程打包 happyPack
# module.rules: [{ test: /\.js$/, use: ['happyPack/loader?id=babel'], exclude: /node_modules/ }]
# plugins: [ new happyPack({ id: 'babel', loaders: ['babel-loader?cacheDirectory'] }) ]
#
# 1.5 DllPlugin 动态链接库插件
# 应用场景：体积大、构建慢，稳定性较好，不经常升级的框架(vue、react)，同一个版本只需构建一次;
#
# 注：
# noParse：对配置的文件不进行额外的打包，减少打包体积，最终以引入的方式存在于已打包好的文件中(在 dist 下可见);
# IgnorePlugin：忽略第三方包的部分代码块，减少打包体积;
# DllPlugin：程序运行时动态获取链接库资源，减少打包体积;
#
# 2. 优化产出代码(原则：减小体积、合理分包、执行速度快/减少内存使用s)；
# 2.1 小图片 base64 编码
# 2.2 bundle 加 hash：output: { filename: '[name].[contentHash:8].js', }
# 2.3 资源懒加载
# 2.4 抽离公共代码: optimization → splitChuncks → cacheGroups → vendor/common
#     例：
#     var vendor = { name: 'vendor', priority: 1, minSize: 5* 1024, minChuncks: 1 };
#     var common = { name: 'common', priority: 0, minSize: 0, minChuncks: 3 };
#     optimization.splitChuncks = { chuncks: 'all', cacheGroups: { vendor, common } };
# 2.5 IgnorePlugin 引入代码少，使得打包的代码更少
# 2.6 CDN 加速: output.publicPath = 'http://cdn.xxx.com';
# 2.7 mode: production (自动开启压缩代码，删除 vue、react 框架的调试代码，启动 tree-shaking)
# 2.8 ES6 Module 和 Commonjs 的区别:
#     Module 静态引入，编译时引入 (可以实现 tree-shaking)；
#     Commonjs 动态引入，执行时引入 (不能实现 tree-shaking)；
#     import() 也是执行时引入，因此异步加载得以实现，但不能实现 tree-shaking；
#
# 2.9 Scope Hosting
#     文件打包的最终结果以函数的形式呈现，Scope Hosting 使得多个函数合并为一个，减小代码体积，创建函数作用域更少。
#
# 问：前端为何要进行打包和构建
# 1. 代码体积更小(tree-shaking、压缩、合并)，加载更快;
# 2. 编译高级语言或语法(ES6+、模块化、less);
# 3. 利于错误检查和提升兼容性(eslint、polyfill);
# 4. 利于营造一个统一、高效的开发环境;
# 5. 利于营造一个统一的构建流程及产出标准;
# 6. 集成公司的构建规范;
#
# 问：loader 和 plugin 的区别：
# 前者是模块转换器(less → css)，后者是插件拓展工具;
# 常见的 loader：css-loader less-loader url-loader
# 常见的 plugin：IgnorePlugin HtmlWebpackPlugin MiniCssExtractPlugin HappyPack
#
# webpack 工作流：
# 1. 将 options 和 webpack 内部自定义的 options 进行合并，并创建一个 compiler 对象;
# 2. 遍历 options.plugins，为每一个 plugin 注册执行时机;
# 3. compiler.run() 开始编译;
# 4. 从入口文件出发，调用所有配置的 loader 对模块进行编译，再找出该模块依赖的模块，之后递归此步骤;
# 5. 模块收集，根据配置生成单个或者多个 chunk;
# 6. 再把每个 chunk 生成单个的文件，加入到输出列表，最后输出 dist 文件夹;
#