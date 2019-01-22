const {
	mock,
	config,
	dev,
	mode,
	port,
	build,
} = require('./getUserConfig')(process.argv);

const devServer = require('./config/webpack.dev.config');

const buildProject = require('./config/webpack.pre.config'); 

module.exports = function (args) {
	args = args || [];

	if (dev) {
		devServer({
			userConfig: config,
			mode: mode,
			port: port
		});
	}

	if (build) {
		buildProject();
	}
};