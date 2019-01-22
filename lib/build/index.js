const {
	build,
	mode
} = require('./getUserConfig')(process.argv);

const buildProject = require('../../config/webpackConfig/webpack.pre.config'); 

module.exports = function () {
	if (build) {
		buildProject({
			mode: mode
		});
	}
	
};