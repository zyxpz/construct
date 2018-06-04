const path = require('path');

const types = {
	'offline': '离线包',
	'online': '在线包'
};

/**
 * 便利包
 */
function getTypes() {
	return Object.keys(types).map(key => {
		return {
			name: types[key],
			value: key
		};
	});
}


/**
 * 
 */
function getQuestions() {
	return [
		{
			type: 'list',
			name: 'type',
			message: '类型',
			choices: getTypes(),
			default() {
				return 'online';
			}
		}
	];
}

module.exports = {
	commands: [
		{
			name: 'init',
			description: '初始化',
			options: [
				{
					name: '-t, --text <s>',
					description: '测试文案'
				}
			]
		}
	],
	getQuestions
};