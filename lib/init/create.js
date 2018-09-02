const path = require('path');

const glob = require('glob');

const fs = require('fs');

const fsExtra = require('fs-extra');

const utils = require('../common/utils');

function create(srcDir, destDir, data) {
	glob.sync('**', {
		cwd: srcDir,
		dot: true,
		ignore: utils.GLOB_IGNORES,
	}).forEach(file => {
		const fromPath = path.join(srcDir, file);
		const destPath = path.join(destDir, file);
		/**
     * isDirectory
     * 表示一个文件系统目录，则返回 true 
     * statSync
     * 异步stats 提供文件信息
     */
		if (fs.statSync(fromPath).isDirectory()) {
			fsExtra.mkdirsSync(destPath);
		} else {
			let content = fs.readFileSync(fromPath).toString();
			for (const key in data) {
				const reg = new RegExp(`<%=\\s*?${key}\\s*?%>`, 'gi');
				if (reg.test(content)) {
					content = content.replace(reg, data[key]);
				}
			}

			// 将可能被忽略的变量替换为空字符串
			// content = content.replace(/<%=\s*?[\w\d\-_]*\s*?%>/gi, '');

			// 写入目录
			fs.writeFileSync(destPath, content);
		}
	});
}

module.exports = function (srcDir, destDir, data) {
	// 指定common下文件
	create(path.join(srcDir, 'common'), destDir, data);

	// template
	create(path.join(srcDir, `template/${data.type}`), destDir, data);

	// webpack
	create(path.join(srcDir, `config/${data.type}`), destDir, data);
};