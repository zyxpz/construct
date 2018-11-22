const webpack = require('webpack');

const path = require('path');

const webpackMerge = require('webpack-merge');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const milieu = process.env.NODE_ENV || 'development';

const myIp = require('my-ip')();

const APP_PATH = process.cwd();

const {
	entry
} = require('./package.json');

const postcssLoader = {
	loader: 'postcss-loader',
	options: {
		config: {
			path: path.resolve(APP_PATH, 'postcss.config.js')
		}
	}
};

const config = {
	mode: milieu,
	entry,
	output: {
		path: `${APP_PATH}/dist`,
		filename: '[name].js'
	},
	module: {
		rules: [{
			test: /\.js?$/,
			loader: 'babel-loader',
		},
		{
			test: /\.(css|scss)$/,
			use: [
				MiniCssExtractPlugin.loader,
				'css-loader',
				'sass-loader',
				postcssLoader,
			]
		},
		{
			test: /\.less$/,
			use: [
				MiniCssExtractPlugin.loader,
				'css-loader',
				'less-loader',
				postcssLoader,
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
			use: 'html-loader'
		}
		]
	},
	devServer: {
		host: milieu === 'development' ? 'localhost' : myIp,
		port: '8989',
		stats: 'errors-only',
	},
	optimization: {
		minimize: milieu === 'production' ? true : false,
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
				commons: {
					name: 'common.js',
					chunks: "all"
				}
			}
		}
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/test-index.html',
			inject: false,
			minify: {
				removeAttributeQuotes: milieu === 'production' ? true : false
			}
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css'
		})
	]
};

if (milieu === 'development') {
	config.devtool = 'cheap-module-eval-source-map';
}

module.exports = config;