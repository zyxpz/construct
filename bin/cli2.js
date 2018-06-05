#!/usr/bin/env node
'use strict';
const program = require('commander');

const pkg = require('../package.json');
const config = require('../config/config');

program
	.version(pkg.version) // 版本号
	.usage('pa-construct [command]');

// 获得位置信息，可以知道是哪个版本，文件安装路径
program.on('--help', function() {
	console.log('  %s@%s %s', pkg.name, pkg.version, __filename);
	console.log('');
});

config.commands.forEach(opt => {
	let aCmd = program
		.command(opt.name, '', { noHelp: opt.noHelp })
		.description(opt.description);
	(opt.options || []).forEach(o => {
		aCmd.option(o.name, o.description);
	});
	aCmd.action(() => {
		require(`../lib/${Array.prototype.slice.call(process.argv, 2)[0]}`)(Array.prototype.slice.call(process.argv, 2).slice(1));
	});
	aCmd.on('--help', function() {
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


program.parse(process.argv);  // 开始解析用户输入的命令