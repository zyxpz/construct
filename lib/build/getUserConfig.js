module.exports = function (params) {
	// 环境
	// build
	let buildIndex = params.indexOf('build');
	let build = false;
	let mode = '';
	if (buildIndex > -1) {
		build = true;
		mode = 'production';
	}
	return {
		build,
		mode
	};
};