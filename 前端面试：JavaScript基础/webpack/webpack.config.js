const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',  // production
    entry: path.join(__dirname, 'src', 'index.js'),
    /* 多入口配置：
        entry: {
            index: path.join(__dirname, 'src', 'index.js'),
            others: path.join(__dirname, 'src', 'others.js'),
        }
     *  多入口配置：
     *  output: {
     *      filename: '[name].[contentHash].js',
     *      path: path.join(__dirname, 'dist')
     *  }
     *  */
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist'),
    },
    /* */
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html'),
            filename: 'index.html',
        })
    /* 多入口配置:
    *  new HtmlWebpackPlugin({
    *       template: path.join(__dirname, 'src', 'others.html'),
    *       filename: 'others.html',
    *       chunks: ['others']
    * */
    ],
    devServer: {
        port: 3000,
        contentBase: path.join(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.js/,
                loader: ['babel-loader'],
                include: path.join(__dirname, 'src'),
                exclude: /node_modules/
            }]
    },
};