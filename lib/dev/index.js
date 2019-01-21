const {
	mock,
	config,
	dev,
	mode,
	port
} = require('./getUserConfig')(process.argv);

const dev = require('./config/webpack.dev.config');

module.exports = function (args) {
	args = args || [];

	if (dev) {
		dev({
			userConfig: config,
			mode,
			port
		});
	}

	console.log(mock, config);
};