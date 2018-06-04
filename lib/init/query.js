/**
 * inquirer: 一组通用的交互式命令行用户界面。
 */
const inquirer = require('inquirer');
const { getQuestions } = require('../../config/config');

module.exports = async function () {
	const ret = await inquirer.prompt(getQuestions());
	return ret;
};
