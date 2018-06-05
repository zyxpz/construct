'use strict';

const chalk = require('chalk');

module.exports = {
	tips(msg, type) {
		switch (type) {
			case 'error':
				console.log(`${chalk.red('[错误]')}${msg}`);
				break;
			case 'success':
				console.log(`${chalk.green('[成功]')}${msg}`);
				break;
			case 'info':
				console.log(`${chalk.cyan('[提示]')}${msg}`);
				break;
			case 'warn':
				console.log(`${chalk.yellow('[警告]')}${msg}`);
				break;
			default:
				console.log(`${chalk.grey(msg)}`);
				break;
		}
	},
	GLOB_IGNORES: [
		'node_modules/**',
		'dist/**',
		'spm_modules/**',
		'.DS_Store',
	]
};