const path = require('path');

const webpack = require('webpack');

const WebpackDevServer = require('webpack-dev-server');

const webpackMerge = require('webpack-merge');

const chalk = require('chalk');

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const webpackCommon = require('./webpack.common.config');

const mockData = require('./mock.config');

module.exports = function (args) {
	const {
		mode,
		port,
		mock,
		milieu,
	} = args;

	const stream = process.stderr;

	const devConfig = {
		devtool: 'cheap-module-eval-source-map',
		mode,
		plugins: []
	};

	const {
		commonConfig
	} = webpackCommon({
		mode
	});

	const config = webpackMerge(commonConfig, devConfig);


	// entry
	Object.getOwnPropertyNames((config.entry || {})).map(name => {
		config.entry[name] = []
		// 添加HMR文件
			.concat("webpack/hot/dev-server")
			.concat(`webpack-dev-server/client?http://localhost:${port}`)
			.concat(config.entry[name]);
	});

	const handler = (percentage, message, ...args) => {
		// e.g. Output each progress message directly to the console:
		// console.info(percentage, message, ...args);
		if (percentage < 0.1) {
			stream.write(chalk.cyan('Starting the development server...\n'));
		} else if (percentage < 0.7) {
			stream.cursorTo(0);
			stream.write(`📦  ${chalk.magenta(message)} ${chalk.magenta(args[0])}`);
			stream.clearLine(1);
		}
	};

	config.plugins.push(
		new FriendlyErrorsWebpackPlugin({
			compilationSuccessInfo: {
				messages: [`Dev Server: http://localhost:${port}`],
				notes: [`Success!`]
			},
			onErrors: (error) => {
				console.log(error);
			},
			clearConsole: true,
			additionalFormatters: [],
			additionalTransformers: []
		}),
		new webpack.ProgressPlugin(handler),
		// 添加HMR插件
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin()
	);

	const compiler = webpack(config);

	let serverOption = {
		// contentBase: path.join(__dirname, 'dist'),
		publicPath: config.output.publicPath,
		historyApiFallback: false,
		hot: true,
		inline: true,
		stats: 'none',
		quiet: true,
		overlay: true,
		inline: true,
		compress: true,
		watchOptions: {
			aggregateTimeout: 300,
			poll: 1000,
			ignored: /node_modules/,
		},
	};

	if (mock) {
		if (milieu === 'test' || milieu === 'pre') {
			serverOption.proxy = mockData({
				milieu
			});
		} else if (milieu === 'dev') {
			serverOption.before = (app) => {
				mockData({
					milieu,
					app
				});
			};
		}
	}
	// console.log(serverOption, 'serverOption');
	const server = new WebpackDevServer(compiler, serverOption);

	server.listen(port, 'localhost', err => {
		if (err) {
			console.error(err);
			return;
		}
	});
};