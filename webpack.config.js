let webpack = require('webpack');
let path = require('path');		//引入node的path库
let HtmlWebpackPlugin = require('html-webpack-plugin');

let env = process.env.WEBPACK_ENV;
let outputFile;
let plugins = [new HtmlWebpackPlugin({
	favicon: path.resolve(__dirname, 'public/favicon.ico'),
	template: path.resolve(__dirname, 'public/index.html'),
})];

if (env === 'build') {
	//压缩代码
	let UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
	plugins.push(new UglifyJsPlugin({minmize: true}));
	outputFile = 'bundle.min.js';
} else {
	outputFile = 'bundle.js';
}

let config = {
	entry: [
		'webpack/hot/dev-server',
		'webpack-dev-server/client?http://0.0.0.0:9000',
		'./app/index.js'
	],	//入口文件
	output: {
		path: path.resolve(__dirname, './dist'),	//编译后的位置
		filename: outputFile,
		chunkFilename: '[name].[chunkhash:5].chunk.js',
		publicPath: '/',
	},
	devServer: {
		historyApiFallback: true,       //浏览器刷新时将路由指向index.html
	},
	module: {
		loaders: [
			//为WebPack指定loaders
			{
				test: /\.(less|css)$/,
				loaders: ['style', 'css', 'less'],	//执行顺序从右到左
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
				test: /.(png|jpg|svg|webp)$/, loader: "url-loader?limit=8192"
			},
		]
	},
	plugins: plugins,
};

module.exports = config;