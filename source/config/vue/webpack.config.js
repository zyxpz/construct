const webpack = require('webpack');

const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const milieu = process.env.NODE_ENV || 'development';

const myIp = require('my-ip')();

const {
	VueLoaderPlugin,
} = require('vue-loader');

const APP_PATH = process.cwd();

const {
	entry,
} = require('./package.json');

const postcssLoader = {
	loader: 'postcss-loader',
	options: {
		config: {
			path: path.resolve(APP_PATH, 'postcss.config.js'),
		},
	},
};

const config = {
	mode: milieu,
	entry,
	output: {
		path: `${APP_PATH}/dist`,
		filename: '[name].js',
	},
	resolve: {
		extensions: [
			'.js',
			'.vue',
			'.jsx',
			'.less',
		],
		alias: {
			vue$: 'vue/dist/vue.esm.js',
			node_modules: path.resolve(APP_PATH, 'node_modules'),
		},
	},
	module: {
		rules: [{
			test: /\.(js|jsx)?$/,
			use: [{
				loader: 'babel-loader',
				options: {
					cacheDirectory: true, // 启用编译缓存
				},
			}],
		},
		{
			test: /\.vue?$/,
			use: [
				'vue-loader',
			],
			exclude: /node_modules/,
		},
			// {
			// 	enforce: 'pre',
			// 	test: /\.(js|vue)$/,
			// 	loader: 'eslint-loader',
			// 	exclude: /node_modules/,
			// },
		{
			test: /\.(css|scss)$/,
			use: [
				'vue-style-loader',
				MiniCssExtractPlugin.loader,
				'css-loader',
				postcssLoader,
				'sass-loader',
			],
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
				limit: 10000,
			},
		},
		{
			test: /\.html$/i,
			use: 'html-loader',
		},
		],
	},
	devServer: {
		host: milieu === 'development' ? 'localhost' : myIp,
		port: '9001',
		stats: 'normal',
	},
	optimization: {
		minimize: milieu === 'production',
		// 原：NamedModulesPlugin()
		namedModules: true,
		// 原：NoEmitOnErrorsPlugin() - 异常继续执行
		noEmitOnErrors: true,
		// 原：ModuleConcatenationPlugin() - 模块串联 - dev模式下回影响antd（比如：Pagination, 和语言有关）
		concatenateModules: milieu !== 'development',
		/**
		 * CommonsChunkPlugin
		 */
		splitChunks: {
			cacheGroups: {
				vendor: { // node_modules内的依赖库
					chunks: "all",
					test: /[\\/]node_modules[\\/]/,
					name: "vendor",
					minChunks: 1, // 被不同entry引用次数(import),1次的话没必要提取
					maxInitialRequests: 5,
					minSize: 0,
					priority: 100,
					// enforce: true?
				},
				common: { // ‘src/js’ 下的js文件
					chunks: "all",
					test: /[\\/]src[\\/]js[\\/]/, // 也可以值文件/[\\/]src[\\/]js[\\/].*\.js/,
					name: "common", // 生成文件名，依据output规则
					minChunks: 2,
					maxInitialRequests: 5,
					minSize: 0,
					priority: 1
				}
			}
		}
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			inject: 'body',
			minify: {
				removeAttributeQuotes: milieu === 'production',
			},
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css'
		}),
		new VueLoaderPlugin(),
	],
};

if (milieu === 'development') {
	config.devtool = 'cheap-module-eval-source-map';
} else {
	config.externals = {
		vue: 'Vue',
	};
}

module.exports = config;
