const {
	mock,
	config,
	dev,
	mode,
	port,
} = require('./getUserConfig')(process.argv);

const devServer = require('../../config/webpackConfig/webpack.dev.config');

module.exports = function (args) {
	args = args || [];

	if (dev) {
		devServer({
			userConfig: config,
			mode: mode,
			port: port
		});
	}
};