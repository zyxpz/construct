module.exports = function babel() {
	return {
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
			require.resolve('babel-plugin-syntax-jsx'),
			require.resolve('babel-plugin-transform-vue-jsx')
		]
	};
};