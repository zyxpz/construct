const fs = require('fs');

const path = require('path');

module.exports = async function () {
	const answers = await require('./query')();

	switch (answers.type) {
		case 'offline':
			console.log('离线包完成');
			break;
		case 'online':
			console.log('在线包完成');
			break;
		default:
			break;
	}
};