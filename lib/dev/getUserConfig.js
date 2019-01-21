module.exports = function (params) {
	// 环境
	let devIndex = params.indexOf('dev');
	let dev = false;
	let mode = 'production';
	if (devIndex > -1) {
		dev = true;
		mode = 'development';
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
	let portIndex = opts.indexOf('--port');
	let port = '8001';
	if (portIndex > -1) {
		port = opts[portIndex + 1];
	} else {
		portIndex = opts.indexOf('-p');
		if (portIndex > -1) {
			port = opts[portIndex + 1];
		}
	}
	return {
		mock,
		config,
		port
	};
};