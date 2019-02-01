const path = require('path');

const fs = require('fs-extra');

const APP_PATH = process.cwd();

const configPath = path.resolve(APP_PATH, 'config/config.js');

let mockProxy = {};

if (configPath) {
	mockProxy = require(configPath).proxy || {};
}

const serverMockBefore = (mockData, app) => {
	let carrentArr = [];
	for (const key in mockData) {
		if (Object.hasOwnProperty.call(mockData, key)) {
			carrentArr.push({
				path: key,
				content: mockData[key]
			});
		}
	}
	
	let getArr = [];
	let postArr = [];
	let deleteArr = [];
	let putArr = [];
	carrentArr.map(item => {
		// get
		if (/get/.test(item.path) || /GET/.test(item.path)) {
			const newKey = item.path.replace(/get /gi, '') || item.path.replace(/GET /gi, '');
			item.path = newKey;
			getArr.push(item);
		}
		// post
		if (/post/.test(item.path) || /POST/.test(item.path)) {
			const newKey = item.path.replace(/POST /gi, '');
			item.path = newKey;
			postArr.push(item);
		}
		// delete
		if (/delete/.test(item.path) || /DELETE/.test(item.path)) {
			const newKey = item.path.replace(/delete /gi, '') || item.path.replace(/DELETE /gi, '');
			item.path = newKey;
			deleteArr.push(item);
		}
		// put
		if (/put/.test(item.path) || /PUT/.test(item.path)) {
			const newKey = item.path.replace(/put /gi, '') || item.path.replace(/PUT /gi, '');
			item.path = newKey;
			putArr.push(item);
		}
	});
  

	getArr.forEach(item => {
		if (typeof item.content !== 'function') {
			app.get(`${item.path}`, (req, res) => { res.json(item.content); });
		} else {
			app.get(`${item.path}`, item.content);
		}
	});

	postArr.forEach(item => {
		if (typeof item.content !== 'function') {
			app.post(`${item.path}`, (req, res) => { res.json(item.content); });
		} else {
			app.post(`${item.path}`, item.content);
		}
	});

	deleteArr.forEach(item => {
		if (typeof item.content !== 'function') {
			app.delete(`${item.path}`, (req, res) => { res.json(item.content); });
		} else {
			app.delete(`${item.path}`, item.content);
		}
	});

	putArr.forEach(item => {
		if (typeof item.content !== 'function') {
			app.put(`${item.path}`, (req, res) => { res.json(item.content); });
		} else {
			app.put(`${item.path}`, item.content);
		}
	});
};


module.exports = function (arges = {}) {
	const {
		milieu = 'dev',
		app
	} = arges;
	let proxy = {};

	switch (milieu) {
		case 'dev':
			const directory = path.join(APP_PATH, 'mock');
      
			if (directory) {
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
								const mockData = require(filePath);
								serverMockBefore(mockData, app);
							} else {
								console.log('请添加*.mock.js文件');
							}
						}
					}
				});
			} else {
				console.log('请在添加根目录添加mock文件夹或不需要mock数据在启动命令是不要带上mock');
			}
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