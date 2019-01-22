module.exports = function (params) {
	// 环境
	let devIndex = params.indexOf('dev');
	let dev = false;
	let mode = '';
	if (devIndex > -1) {
		dev = true;
		mode = 'development';
	}

	// build
	let buildIndex = params.indexOf('build');
	let build = false;
	if (buildIndex > -1) {
		build = true;
		mode = 'production';
	}

	// mock 数据
	let mockIndex = params.indexOf('mock');
	let mock = false;
	if (mockIndex > -1) {
		mock = true;
	}

	// 配置数据
	let configIndex = params.indexOf('--config');
	let config = `${process.cwd()}/webpack.config.js`;
	if (configIndex > -1) {
		config = params[configIndex + 1];
	} else {
		configIndex = params.indexOf('-c');
		if (configIndex > -1) {
			config = params[configIndex + 1];
		}
	}

	// 端口
	let portIndex = params.indexOf('--port');
	let port = '8001';
	if (portIndex > -1) {
		params = opts[portIndex + 1];
	} else {
		portIndex = params.indexOf('-p');
		if (portIndex > -1) {
			port = params[portIndex + 1];
		}
	}
	return {
		mock,
		config,
		port,
		dev,
		build,
		mode
	};
};