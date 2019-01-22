const webpack = require('../webpack');

const webpackMerge = require('webpack-merge');

const CleanWebpackPlugin = require('clean-webpack-plugin');

const notifier = require('node-notifier');

const webpackCommon = require('./webpack.common.config');

module.exports = function (args) {

	const {
		mode
	} = args;
  
	const {
		commonConfig
	} = webpackCommon({
		mode
	});

	const distConfig = {
		mode: mode,
		plugins: [
			new CleanWebpackPlugin(['dist'], {
				root: APP_PATH
			})
		]
	};

	const config = webpackMerge(commonConfig, distConfig);

	const compiler = webpack(config);

	compiler.run((err, stats) => {
		// const jsonPath = path.join(fileOutputPath, filename);
		// writeFileSync(jsonPath, JSON.stringify(stats.toJson()), 'utf-8');
		const buildInfo = stats.toString({
			colors: true,
			children: false,
			chunks: false,
			modules: false,
			chunkModules: false,
			hash: false,
			version: false,
			entrypoints: false,
			progress: true,
		});
		if (err) {
			console.log(buildInfo);
			return;
		}
		console.log(buildInfo);
		notifier.notify({
			title: 'build',
			message: 'done',
			subtitle: 'build successfully',
			sound: 'Glass',
		});
	});

};