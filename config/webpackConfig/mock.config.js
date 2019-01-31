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
			proxy = {
				'/api': {
					target: "https://render.alipay.com",
					changeOrigin: true,
					pathRewrite: {
						'^/api': ''
					}
				}
			};
			return proxy; 
		case 'pre':
			proxy = {
				'/api': {
					target: "https://render.alipay.com",
					changeOrigin: true,
					pathRewrite: {
						'^/api': ''
					}
				}
			};
			return proxy; 
		default:
			break;
	}
};