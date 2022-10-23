# webpack 知识点

- 核心概念:

  1. mode: development | production 设置打包模式
  2. entry: Object | String 指定一个入口起点作为构建其内部依赖的开始
  3. output: Object | { filename, path } 打包输出的位置
  4. loader: 将非 JavaScript 文件翻译为 webpack 可识别的文件使其能够正常进行打包处理
  5. plugins: loader 只能翻译文件，插件能执行范围更广的任务(代码压缩、多进程打包等优化)

- webpack 的构建流程:

  1. 初始化参数: webpack.config.js + shell 命令 => 最终参数;
  2. 准备编译: 创建 compiler 对象，注册 plugin，找到入口文件，调用 compiler.run() 编译;
  3. 模块编译阶段:
     3.1 从入口模块进行分析，调用匹配文件的 loader 对文件进行处理;
     3.2 分析模块依赖的模块，递归进行模块编译工作;
  4. 完成 & 输出:
     4.1 根据模块之间的依赖关系，组装成一个个包含多模块的 chunk;
     4.2 将各 chunk 转为文件加入到输出列表;
     4.2 根据 ouput 的配置确定输出位置及文件名，把文件写入系统;
  5. plugins 的执行时机:
     5.1 在以上过程中，webpack 会在特定的时候广播事件;
     5.2 插件在监听到感兴趣的事件后会执行其逻辑;
     5.3 插件能够调用 webpack API 改变其运行结果;

- Tree-Shaking

  1. 剔除死代码，不进行打包;
  2. 代码必须采用 ES6 模块化语句;
  3. 为防止 babel-loader 的影响需要配置

- Scope Hoisting:

  1. 现有两个需打包的 JS 文件，若不使用 Scope Hoisting，则打包输出的文件中的数组内有两个函数;
  2. Scope Hoisting 开启时，则合并为一个函数;
  3. 旨在减少函数作用域，减少内存开销，以及减小包体积;
  4. 生产环境下自动开启 Scope Hoisting;
  5. 只有那些被引用了一次的模块才能被合并;
  6. Scope Hoisting 需要分析出模块之间的依赖关系，必须采用 ES6 模块化语句;

- 常见的 loader 及其配置

  ```js
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },

      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            optins: { presets: ["@babel/preset-env"] },
          },
        ],
        include: path.join(__dirname, "src"),
        exclude: /node_modules/,
      },

      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: ["file-loader"],
      },

      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            esModule: false,
            outputPath: "images",
            name: "images/[name].[ext]",
            limit: 20 * 1024,
          },
        },
      },

      {
        test: /\.js$/,
        exclude: /(node_modules|dist)/,
        use: [
          {
            loader: "thread-loader",
            options: { workers: 3 },
          },

          {
            loader: "babel-loader",
            options: { cacheDirectory: true },
          },
        ],
      },
    ];
  }
  ```

- 常见的 plugin 及配置

  ```js
  const path = require("path");
  const MiniCssExtractPlugin = require("mini-css-extract-plugin");
  const HtmlWebpackPlugin = require("html-webpack-plugin");
  const CleanWebpackPlugin = require("clean-webpack-plugin");
  const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

  const params = {
    template: path.join(__dirname, "src", "index.html"),
    filename: "index.html",
  };

  const htmlTemplate = new HtmlWebpackPlugin(params);
  const cssFile = new MiniCssExtractPlugin();
  const cleanPlugin = new CleanWebpackPlugin();
  const cssOptz = new OptimizeCssAssetsPlugin();

  module.exports = {
    plugins: [htmlTemplate, cleanPlugin, cssFile, cssOptz],
  };
  ```

- 其他配置:

  ```js
  const CompressionPlugin = require("compression-webpack-plugin");
  const DEV = process.env.NODE_ENV !== "production";
  module.exports = {
    chainWebpack: (config) => {
      if (!DEV) {
        config.plugin("compressionPlugin").use(
          new CompressionPlugin({
            filename: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i,
            threshold: 512, // 只处理大于此大小的资产，以字节为单位
            minRatio: 0.8, // 只有压缩好这个比率的资产才能被处理
            deleteOriginalAssets: false, // 是否删除原资源
          })
        );
      }

      // 配置别名
      config.resolve.alias
        .set("@", resolve("src"))
        .set("@common", resolve("src/common"));
    },

    optimization: {
      splitChuncks: {
        chuncks: "all", // 异步和同步块也能共享
        cacheGroups: {
          // 第三方模块
          vendor: {
            name: "vendor", // chunck名称
            priority: 1, // 优先级
            test: /node_modules/,
            minSize: 0, // 大小限制
            minChuncks: 1, // 最少复用次数
          },

          // 公共模块
          common: {
            name: "common", // chunck名称
            priority: 0, // 优先级
            minSize: 5 * 1024, // 大小限制
            minChuncks: 3, // 最少复用次数
          },
        },
      },
    },

    devServer: {
      open: false, // 自动启动浏览器
      host: "127.0.0.1",
      port: 3000, // 端口号
      https: false,
      hotOnly: true, // 热更新
      proxy: {
        "/api": {
          target: "http://127.0.0.1:3000", // 重写路径
          ws: true, //开启 WebSocket
          secure: false, // 如果是 https 接口，需要配置这个参数
          changeOrigin: true,
          pathRewrite: { "^/api": "" },
        },
      },
    },
  };
  ```
