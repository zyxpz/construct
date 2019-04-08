const path = require('path');

const userConfig = require('../util/userSetConfig');

module.exports = function babel() {
	const defaultBabel = {
		cacheDirectory: true,
		presets: [
			require.resolve('@babel/preset-env'),
			require.resolve('@babel/preset-react')
		],
		plugins: [
			[
				require.resolve('@babel/plugin-transform-runtime'),
				{
					"corejs": false,
					"helpers": true,
					"regenerator": true,
					"useESModules": false
				},
			],
			require.resolve('@babel/plugin-transform-react-jsx'),
			require.resolve('babel-plugin-syntax-jsx'),
			require.resolve('babel-plugin-transform-vue-jsx'),
			require.resolve('babel-plugin-dynamic-import-webpack'),
			require.resolve('@babel/plugin-proposal-export-default-from'),
			[
				require.resolve('@babel/plugin-proposal-decorators'),
				{
					'legacy': true
				}
			],
			[
				require.resolve('@babel/plugin-proposal-class-properties'),
				{
					'loose': true
				}
			]
		]
	};

	userConfig();

	const userBabel = require(path.join(__dirname, '../', 'userSetConfig', 'config', 'config.js')).babel;

	for (const key in defaultBabel) {
		if (Object.hasOwnProperty.call(defaultBabel, key)) {
			let defaultValue = defaultBabel[key];
			if (userBabel) {
				for (const uKey in userBabel) {
					if (userBabel.hasOwnProperty.call(userBabel, uKey)) {
						const userValue = userBabel[uKey];
						if (uKey === key && Array.isArray(defaultValue) && Array.isArray(userValue)) {
							defaultValue.push(...userValue);
						} else if (!Array.isArray(defaultValue) && !Array.isArray(userValue)) {
							defaultValue = Object.assign(defaultValue, userValue);
						}
					}
				}
			}
		}
	}
	return Object.assign(userBabel, defaultBabel);
};