module.exports = function (params) {
	// 环境
	let devIndex = params.indexOf('dev');
	let dev = false;
	let mode = '';
	let milieu = 'dev';
	if (devIndex > -1) {
		dev = true;
		mode = 'development';
	}

	// mock 数据
	let mockDevIndex = params.indexOf('mock=dev');
	let mockTestIndex = params.indexOf('mock=test');
	let mockPreIndex = params.indexOf('mock=pre');
	let mock = false;
	if (mockDevIndex > -1 || mockTestIndex > -1 || mockPreIndex > -1) {
		mock = true;
		if (params[mockDevIndex]) {
			milieu = 'dev';
		} else if (params[mockTestIndex]) {
			milieu = 'test';
		} else if (params[mockPreIndex]) {
			milieu = 'pre';
		}
	}

	// 端口
	let portIndex = params.indexOf('--port');
	let port = '8001';
	if (portIndex > -1) {
		params = params[portIndex + 1];
	} else {
		portIndex = params.indexOf('-p');
		if (portIndex > -1) {
			port = params[portIndex + 1];
		}
	}
	return {
		mock,
		port,
		dev,
		mode,
		milieu
	};
};