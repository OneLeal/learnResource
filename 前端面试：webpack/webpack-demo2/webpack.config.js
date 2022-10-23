const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const params = { 
	template: path.join(__dirname, 'src', 'index.html'),
	filename: 'index.html'
 };
 const htmlTemplate = new HtmlWebpackPlugin(params);
module.exports = {
    mode: 'development', // development production
    entry: path.join(__dirname, 'src', 'index.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist'),
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				loader: ['style-loader', 'css-loader'],  //loader 顺序从后往前
			},

			{
				test: /\.js$/,
				loader: ['babel-loader'],
				include: path.join(__dirname, 'src'),
                exclude: /node_modules/
			}
		]
	},
    plugins: [ htmlTemplate ],
    devServer: { 
		port: 3000,  
		contentBase: path.join(__dirname, 'dist'),
	},
};