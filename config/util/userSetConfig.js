const path = require('path');

const fs = require('fs-extra');

const chalk = require('chalk');

const APP_PATH = process.cwd();

const configPath = path.resolve(APP_PATH, 'config/config.js');

module.exports = function () {
	let config = {};
	if (fs.existsSync(configPath)) {
		config = require("@babel/core").transformFileSync(configPath, {
			presets: [
				[require.resolve('@babel/preset-env'), { "modules": "commonjs" }],
			],
			plugins: [
				require.resolve('babel-plugin-add-module-exports')
			]
		}).code || {};
	} else {
		config = require(path.join(__dirname, 'defaultConfig.js'));
		console.log('');
		console.log('');
		console.log(chalk.yellow('⚠️  可以在根目录添加config文件夹，config.js文件，来添加自己想要的babel，webpack，proxy'));
		console.log('');
	}
	fs.outputFileSync(path.join(__dirname, '../', 'userSetConfig', 'config', 'config.js'), config);
};