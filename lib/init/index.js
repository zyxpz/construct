const fs = require('fs');

const path = require('path');

const { text, textt } = require('./getConfig')(process.argv);



module.exports = async function () {
	const answers = await require('./query')();

	switch (answers.type) {
		case 'offline':
			console.log('离线包完成', text, textt);
			break;
		case 'online':
			console.log('在线包完成', text, textt);
			break;
		default:
			break;
	}
};