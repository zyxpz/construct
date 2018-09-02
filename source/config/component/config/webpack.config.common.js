const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const path = require('path');

const APP_CWD = process.cwd();

const tpl = `${APP_CWD}/templates/element.ejs`;

const {
	entry,
} = require(`${APP_CWD}/package.json`);

const ENV_IS_DEV = process.env.NODE_ENV === 'development';

const config = {
	entry: Object.assign({}, entry),
	output: {
		path: path.resolve(APP_CWD, 'dist'),
		filename: '[name].js',
		chunkFilename: '[name].js',
	},
	resolve: {
		mainFiles: ['index'],
		modules: [path.resolve(APP_CWD, 'src'), 'node_modules'],
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css', '.less'],
		alias: {},
	},
	module: {
		rules: [{
			test: /\.(js|jsx)?$/,
			exclude: [
				/**
				 * 在node_modules的文件不被babel理会
				 */
				path.resolve(APP_CWD, 'node_modules'),
			],
			use: [{
				loader: 'babel-loader',
				options: {
					cacheDirectory: true, // 启用编译缓存
				},
			}],
		},
		{
			test: /\.less$/,
			use: [
				'style-loader',
				'css-loader',
				{
					loader: 'less-loader',
					options: {
						javascriptEnabled: true,
					},
				},
			],

		},
		{
			test: /\.(png|jpg|gif|eot|ttf|woff|woff2|svg)$/,
			loader: 'url-loader',
			options: {
				limit: 10000,
			},
		},
		{
			test: /\.html$/i,
			loader: 'html-loader',
		},
		{
			test: /\.atpl$/,
			loader: 'atpl-loader',
		},
		{
			test: /\.md$/,
			use: [
				'babel-loader',
				{
					loader: `${path.join(__dirname, './markdown-loader')}?template=${tpl}&domSource=examples`
					// options: {
					// 	test: '1',
					// 	template: tpl,
					// 	domSource: 'examples'
					// }
				}
			],
			include: path.join(APP_CWD, 'examples')
		}
		],
	},
	optimization: {
		// 默认关闭压缩
		minimize: ENV_IS_DEV ? false : JSON.parse(process.env.MINI_JS),
		// 原：NamedModulesPlugin()
		namedModules: true,
		// 原：NoEmitOnErrorsPlugin() - 异常继续执行
		noEmitOnErrors: true,
		// 原：ModuleConcatenationPlugin() - 模块串联 - dev模式下回影响antd（比如：Pagination, 和语言有关）
		concatenateModules: !ENV_IS_DEV,
	},
	plugins: [

	],
};

const defaultConfig = {
	/**
	 * cheap-module-eval-source-map 原始源码（仅限行)
	 * none 生产环境 打包后的代码
	 */
	devtool: ENV_IS_DEV ? 'cheap-module-eval-source-map' : 'none',
	resolve: {
		/**
		 * 自动解析确定的扩展。
		 */
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
	},
	/**
	 * node
	 */
	node: {
		global: true,
		crypto: 'empty',
		__dirname: true,
		__filename: true,
		Buffer: true,
		clearImmediate: false,
		setImmediate: false,
		fs: 'empty'
	},
	/**
	 * 启用编译缓存
	 */
	cache: true,
};

module.exports = {
	commonConfig: webpackMerge(
		config,
		defaultConfig,
	),
};