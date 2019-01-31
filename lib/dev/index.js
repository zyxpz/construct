const {
	dev,
	mock, // mock
	milieu, // dev
	mode, // webpack 需要
	port, // 端口
} = require('./getUserConfig')(process.argv);

const devServer = require('../../config/webpackConfig/webpack.dev.config');
module.exports = function (args) {
	args = args || [];
	if (dev) {
		devServer({
			mode: mode,
			port: port,
			mock,
			milieu,
		});
	}
};