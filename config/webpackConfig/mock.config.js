const path = require('path');

const APP_PATH = process.cwd();

const configPath = path.resolve(APP_PATH, 'config/config.js');

let mockProxy = {};

if (configPath) {
	mockProxy = require(configPath).proxy || {};
}

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