/**
 * 生产环境配置文件
 */
let webpack = require('webpack');
let path = require('path');		//引入node的path库
let HtmlWebpackPlugin = require('html-webpack-plugin');
//压缩代码
let UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
let LoaderOptionsPlugin = webpack.LoaderOptionsPlugin;
let autoprefixer = require('autoprefixer')

// 获取所有的.css文件，合并它们的内容然后提取css内容到一个独立的”styles.css“里
let ExtractTextPlugin = require("extract-text-webpack-plugin");

let config = {
	entry: [
		'whatwg-fetch',
		'./app/index.js'
	],	//入口文件
	output: {
		path: path.resolve(__dirname, 'dist'),	//编译后的位置
		filename: 'mstatic/js/bundle.min.js',
		chunkFilename: 'mstatic/js/[name].[chunkhash:5].chunk.js',
		publicPath: '/',
	},
	module: {
		loaders: [
			//为WebPack指定loaders
			{
				test: /\.less$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader?-autoprefixer!postcss-loader'),
				include: path.resolve(__dirname, 'app')
			},
			{
				test: /\.jsx?$/,
				loader: 'babel',
				exclude: '/node_modules/',
				query: {
					presets: ['react', 'es2015']
				}
			},
			{
				test: /.(png|jpg|jpeg|gif|svg|webp)$/, 
				loader: "url-loader?limit=30720"
			},
		]
	},
	postcss: ()=>{
		return [autoprefixer({ browsers: ['last 2 versions'] })]
	},
	plugins: [
		new HtmlWebpackPlugin({
			favicon: path.resolve(__dirname, 'public/favicon.ico'),
			template: path.resolve(__dirname, 'public/index.html'),
		}),
		new ExtractTextPlugin("mstatic/css/styles.css"),
		new UglifyJsPlugin({minmize: true}),
	],
};

module.exports = config;