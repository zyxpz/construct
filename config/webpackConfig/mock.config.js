const path = require('path');

const fs = require('fs-extra');

const APP_PATH = process.cwd();

const configPath = path.resolve(APP_PATH, 'config/config.js');

let mockProxy = {};

if (configPath) {
	mockProxy = require(configPath).proxy || {};
}

const directory = path.join(APP_PATH, 'mock');

fs.readdirSync(directory, {
	encoding: 'utf-8'
}).forEach(file => {
	// 文件路径
	const filePath = path.join(directory, file);

	// 文件状态
	const fileStat = fs.statSync(filePath);

	if (fileStat.isFile()) {
		// 文件后缀
		const fileExtName = path.extname(filePath);
		if (fileExtName === '.js') {
			const fileBasename = path.basename(filePath);
			if (fileBasename.indexOf('.mock.js') > -1) {
				console.log(filePath);
			}
		}
	}
});

module.exports = function (arges = {}) {
	const {
		milieu = 'dev'
	} = arges;
	let proxy = {};

	switch (milieu) {
		case 'dev':
      
			break;
		case 'test':
			for (const key in mockProxy[milieu]) {
				const setKey = `^${key}`;
				if (Object.hasOwnProperty.call(mockProxy[milieu], key)) {
					proxy[key] = {
						...mockProxy[milieu][key],
						changeOrigin: true,
						pathRewrite: {
							[setKey]: ''
						}
					};
				}
			}
			return proxy;
		case 'pre':
			for (const key in mockProxy[milieu]) {
				const setKey = `^${key}`;
				if (Object.hasOwnProperty.call(mockProxy[milieu], key)) {
					proxy[key] = {
						...mockProxy[milieu][key],
						changeOrigin: true,
						pathRewrite: {
							[setKey]: ''
						}
					};
				}
			}
			return proxy; 
		default:
			break;
	}
};