/**
 * 开发环境配置文件
 */
let webpack = require('webpack');
let path = require('path');		//引入node的path库
let HtmlWebpackPlugin = require('html-webpack-plugin');
let autoprefixer = require('autoprefixer')
let precss = require('precss');

let config = {
	entry: [
		'whatwg-fetch',
		'webpack/hot/dev-server',
		'webpack-dev-server/client?http://0.0.0.0:9000',
		'./app/index.js'
	],	//入口文件
	output: {
		path: path.resolve(__dirname, 'dist'),	//编译后的位置
		filename: 'static/js/bundle.js',
		chunkFilename: 'static/js/[name].[chunkhash:5].chunk.js',
		publicPath: '/',
	},
	devServer: {
		historyApiFallback: true,       //浏览器刷新时将路由指向index.html
		hot: true,
		inline: true,
		progress: true,
		color: true,
		host: '0.0.0.0',
		port: 9000,
		contentBase: './dist',
		devtool: 'eval-source-map',
	},
	module: {
		loaders: [
			//为WebPack指定loaders
			{
				test: /\.(less|css)$/,
				loaders: ['style', 'css', 'less','postcss'],	//执行顺序从右到左
				// loader: ExtractTextPlugin.extract('style-loader', ['css-loader', 'postcss-loader', 'less-loader']),
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
				test: /.(png|jpg|svg|gif|webp)$/, loader: "url-loader?limit=8192"
			},
		]
	},
	postcss: function(){
		return [autoprefixer({ browsers: ['last 2 versions'] }),precss()]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			favicon: path.resolve(__dirname, 'public/favicon.ico'),
			template: path.resolve(__dirname, 'public/index.html'),
		}),
	],
};

module.exports = config;