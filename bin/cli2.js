#!/usr/bin/env node

'use strict';
const program = require('commander');
const npmUpdate = require('npm-updater');
const chalk = require('chalk');
const pkg = require('../package.json');
const config = require('../config/config');
const {
	join
} = require('path');

const start = () => {
	program
		.version(pkg.version) // 版本号
		.usage('construct [command]');

	// 获得位置信息，可以知道是哪个版本，文件安装路径
	program.on('--help', function () {
		console.log('  %s@%s %s', pkg.name, pkg.version, __filename);
		console.log('');
	});
	config.commands.forEach(opt => {
		let aCmd = program
			.command(opt.name, '', {
				noHelp: opt.noHelp
			})
			.description(opt.description);
		(opt.options || []).forEach(o => {
			aCmd.option(o.name, o.description);
		});
		aCmd.action(() => {
			require(`../lib/${Array.prototype.slice.call(process.argv, 2)[0]}`)(Array.prototype.slice.call(process.argv, 2).slice(1));
		});
		aCmd.on('--help', function () {
			console.log('  Examples:');
			console.log('');
			console.log(`    construct ${opt.name}    ${opt.description}`);
			console.log(`${ opt.example || '' }`);
			console.log('');
		});
	});

	/**
	 * 错误命令时，弹出帮助提示
	 */
	if (!process.argv.slice(2).length) {
		program.help();
	}


	program.parse(process.argv); // 开始解析用户输入的命令
}

let appPackage = {};
try {
	appPackage = require(join(process.cwd(), 'package.json'));
} catch (e) {
	console.log(
		chalk.yellow(
			`[mido] read ${join(process.cwd(), 'package.json')} failed.`,
		),
	);
}

let lockedMido = false;
let midoVersionInApp;

if (appPackage.dependencies && appPackage.dependencies['mido-construct']) {
	midoVersionInApp = appPackage.dependencies['mido-construct'];
} else if (
	appPackage.devDependencies &&
	appPackage.devDependencies['mido-construct']
) {
	midoVersionInApp = appPackage.devDependencies['mido-construct'];
}
if (midoVersionInApp && midoVersionInApp.indexOf('^') === -1) {
	lockedMido = true;
}
const str = chalk.red(
	`${
    lockedMido ? 'npm install mido-construct@latest --save && ' : ''
  }npm update`,
);

const formatter = (reset) => {
	return chalk.yellow(
		`检测到新版本: ${chalk.magenta(reset.current)}(本地版本) → ${chalk.magenta(
      reset.version,
    )}(最新版本)\n   你可以执行 ${str} 来更新版本。`,
	);
}

npmUpdate({
		package: pkg,
		abort: false, // 当 repository 里面的版本和本地版本不一样时，不会终止
		interval: '1m', // 提示的间隔
		tag: 'latest', // 和 repository 的哪个 tag 版本做比较
		formatter, // 提示信息
	})
	.then(() => {
		start()
	})
	.catch(() => {
		start()
	})