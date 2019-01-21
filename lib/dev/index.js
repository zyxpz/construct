const { mock } = require('./getUserConfig')(process.argv);

module.exports = async function(args) {
	args = args || [];
	console.log(mock);
};