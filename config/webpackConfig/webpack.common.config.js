const webpack = require('../../lib/webpack/webpack.js');

const APP_PATH = process.cwd();

const path = require('path');

const myip = require('my-ip')();

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const webpackMerge = require('webpack-merge');

const {
	VueLoaderPlugin,
} = require('vue-loader');

const {
	entry
} = require(path.resolve(APP_PATH, 'package.json'));

const configPath = path.resolve(APP_PATH, 'config/config.js');

const babelOptions = require('./babelOptions')();

const postcssLoader = {
	loader: 'postcss-loader',
	options: {
		config: {
			path: path.join(__dirname, 'postcss.config.js')
		}
	}
};

let userWebpack = {}; // 用户定义微博pack
let userSetConfig = {}; // 用户定义配置
if (configPath) {
	userWebpack = require(configPath).webpack;
	userSetConfig = require(configPath).config;
}

module.exports = function (args = {}) {
	const {
		mode,
	} = args;
	const config = {
		resolve: {
			mainFiles: ['index'],
			modules: [path.resolve(APP_PATH, 'src'), 'node_modules'],
			extensions: ['.js', 'jsx', '.vue', 'ts', '.json', '.less', '.css'],
			alias: {
				vue$: 'vue/dist/vue.esm.js',
				node_modules: path.resolve(APP_PATH, 'node_modules'),
			}
		},
		entry,
		output: {
			path: path.resolve(APP_PATH, 'dist'),
			filename: '[name].js', // 每个页面对应的主js的生成配置
			chunkFilename: '[name].js', // chunk生成的配置
			sourceMapFilename: '[name].map',
		},
		module: {
			rules: [{
				test: /\.(js|jsx)?$/,
				exclude: /node_modules/,
				use: [{
					loader: require.resolve('babel-loader'),
					options: babelOptions
				}]
			},
			{
				test: /\.ts?$/,
				exclude: /node_modules/,
				use: [{
					loader: require.resolve('babel-loader'),
					options: babelOptions
				}, {
					loader: 'ts-loader',
				}]
			},
			{
				test: /\.vue?$/,
				use: [
					'vue-loader',
				],
				exclude: /node_modules/,
			},
			{
				test: /\.(css|scss)$/,
				use: [
					'vue-style-loader',
					MiniCssExtractPlugin.loader,
					'css-loader',
					postcssLoader,
					'sass-loader',
				]
			},
			{
				test: /\.less$/,
				use: [
					'vue-style-loader',
					MiniCssExtractPlugin.loader,
					'css-loader',
					postcssLoader,
					'less-loader',
				],
			},
			{
				test: /\.(png|jpg|gif|eot|ttf|woff|woff2|svg)$/,
				loader: 'url-loader',
				options: {
					limit: 10000
				}
			},
			{
				test: /\.html$/i,
				loader: require.resolve('file-loader'),
				options: {
					name: '[name].[ext]'
				}
			},
			{
				test: /\.atpl?$/,
				use: 'atpl-loader'
			}
			]
		},
		optimization: {
			minimize: mode === 'production' ? true : false,
			// 原：NamedModulesPlugin()
			namedModules: true,
			// 原：NoEmitOnErrorsPlugin() - 异常继续执行
			noEmitOnErrors: true,
			// 原：ModuleConcatenationPlugin() - 模块串联 - dev模式下回影响antd（比如：Pagination, 和语言有关）
			concatenateModules: mode !== 'development',
			/**
			 * CommonsChunkPlugin
			 */
			// splitChunks: {
			// 	cacheGroups: {
			// 		vendor: { // node_modules内的依赖库
			// 			chunks: "all",
			// 			test: /[\\/]node_modules[\\/]/,
			// 			name: "vendor",
			// 			minChunks: 1, // 被不同entry引用次数(import),1次的话没必要提取
			// 			maxInitialRequests: 5,
			// 			minSize: 0,
			// 			priority: 100,
			// 			// enforce: true?
			// 		},
			// 		common: { // ‘src/js’ 下的js文件
			// 			chunks: "all",
			// 			test: /[\\/]src[\\/]js[\\/]/, // 也可以值文件/[\\/]src[\\/]js[\\/].*\.js/,  
			// 			name: "common", // 生成文件名，依据output规则
			// 			minChunks: 2,
			// 			maxInitialRequests: 5,
			// 			minSize: 0,
			// 			priority: 1
			// 		}
			// 	}
			// }
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: '[name].css',
				allChunks: true
			}),
			new webpack.ProvidePlugin({
				$: 'anima-yocto'
			}),
			new VueLoaderPlugin()
		]
	};

	const defaultConfig = {
		devtool: mode === 'development' ? 'cheap-module-eval-source-map' : undefined,
		node: {
			global: true,
			crypto: 'empty',
			__dirname: true,
			__filename: true,
			Buffer: true,
			clearImmediate: false,
			setImmediate: false
		},
		// 启用编译缓存
		cache: true,
	};

	let frameWebpack = webpackMerge(config, defaultConfig);

	return {
		APP_PATH,
		myip,
		commonConfig: webpackMerge(frameWebpack, userWebpack)
	};
};