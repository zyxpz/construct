const fs = require('fs');

const path = require('path');

const utils = require('../common/utils');

const { port, source } = require('./getConfig')(process.argv);

const create = require('./create');



module.exports = async function (args) {
	args = args || [];

	let destDit = source || process.cwd();
	
	// 1、判断目录是否为空
	let files = fs.readdirSync(destDit).filter(dir => {
		return ['.git', '.gitignore', '.npmignore', 'node_modules'].indexOf(dir) === -1;
	});

	if (files.length) {
		utils.tips('请在空目录下创建新项目', 'info');
		return;
	}

	utils.tips('正在准备，请稍后...');

	// 2、data
	const answers = await require('./query')();

	answers.port = port;

	// 3、从template中读取模板
	let srcDir = path.join(__dirname, '..', '..', 'source');
	
	create(srcDir, destDit, answers);
	// 4.
	if (answers) {
		utils.tips('构建成功', 'success');
	}
};