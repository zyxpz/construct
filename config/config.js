const path = require('path');

const types = {
	'reactRedux': 'react-redux包',
	'general': '普通包',
	'component': '组件包',
	'vue': 'vue'
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
				return 'general';
			}
		},
		{
			type: 'input',
			name: 'name',
			message: '包名',
			default() {
				return path.basename(process.cwd());
			}
		},
		{
			type: 'input',
			name: 'version',
			message: '版本',
			default() {
				return '1.0.0';
			}
		},
		{
			type: 'input',
			name: 'author',
			message: '开发人员',
			default() {
				return '未命名';
			}
		},
		{
			type: 'input',
			name: 'title',
			message: '标题:',
			default() {
				return '未命名';
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
					name: '-p, --port <d>',
					description: '端口'
				},
				{
					name: '-s <s>',
					description: '创建路径'
				}
			]
		},
		{
			name: 'dev',
			description: '本地服务',
			options: [
				{
					name: '-m, --mock',
					description: '是否开启本地mock'
				},
				{
					name: '-p, --port',
					description: '端口'
				}
			]
		},
		{
			name: 'build',
			description: '打包'
		}
	],
	getQuestions
};