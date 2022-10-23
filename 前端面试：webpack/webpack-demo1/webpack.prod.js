const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production', // development production
    entry: path.join(__dirname, 'src', 'index.js'),
    output: {
        filename: 'bundle.[contenthash].js',
        path: path.join(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.js/,
                loader: ['babel-loader'],
                include: path.join(__dirname, 'src'),
                exclude: /node_modules/
            },

            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader'], // 执行顺序是从后往前
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html'),
            filename: 'index.html'
        }),
    ],
    optimization: {
        // 代码块抽离
        splitChuncks: {
            chuncks: 'all',
            cacheGroups: {
                // 第三方模块
                vendor: {
                    name: 'vendor', // chunck名称
                    priority: 1, // 优先级
                    test: /node_modules/,
                    minSize: 0, // 大小限制
                    minChuncks: 1 // 最少复用次数
                },

                // 公共模块
                common: {
                    name: 'common', // chunck名称
                    priority: 0, // 优先级
                    minSize: 5 * 1024, // 大小限制
                    minChuncks: 3 // 最少复用次数
                }
            }
        }
    }
};