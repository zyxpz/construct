const path = require('path');

const webpack = require('../../lib/webpack/webpack');

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
		new webpack.ProgressPlugin(handler)
	);

	const compiler = webpack(config);

	let serverOption = {
		// contentBase: path.join(__dirname, 'dist'),
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
		// before: (app) => {
		// 	mockJs(app);
		// }
		// before: function(app, server) {
		// 	app.get('/some/get.json', function(req, res) {
		// 		setTimeout(() => {
		// 			res.json({ custom: 'response', stat: 'ok' });
		// 		}, 1000);

		// 	});
		// 	app.post('/some/post.json', function(req, res) {
		// 		res.json({
		// 			msg: 'post',
		// 			stat: 'ok'
		// 		});
		// 	});
		// 	app.delete('/some/delete.json', function(req, res) {
		// 		res.json({
		// 			msg: 'delete',
		// 			stat: 'ok'
		// 		});
		// 	});
		// 	app.put('/some/put.json', function(req, res) {
		// 		res.json({
		// 			msg: 'put',
		// 			stat: 'ok'
		// 		});
		// 	});
		// }
	};

	if (mock) {
		if (milieu === 'test' || milieu === 'pre') {
			serverOption.proxy = mockData({
				milieu
			});
		} else if (milieu === 'dev') {
			serverOption.before = () => {
				mockData({
					milieu
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