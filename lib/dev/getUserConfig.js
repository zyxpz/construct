module.exports = function (params) {
	let mockIndex = params.indexOf('mock');
	let mock = false;
	if (mockIndex > -1) {
		mock = true;
	}
	console.log(params);
	return {
		mock
	};
};