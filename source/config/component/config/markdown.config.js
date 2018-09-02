process.env.NODE_ENV = 'development';

const glob = require('glob');

const path = require('path');

const upath = require('upath');

const fs = require('fs');

const webpack = require('webpack');

const webpackDevServer = require('webpack-dev-server');

// const webpackDevMiddleware = require('webpack-dev-middleware');

// const express = require('express');

// const app = express();

const HtmlWebpackPlugin = require('html-webpack-plugin');

const atoolDocUtil = require('atool-doc-util');

const chalk = require('chalk'); // console

const chokidar = require('chokidar'); // 监控

const {
	commonConfig
} = require('./webpack.config.common');

const {
	homePage,
	name,
	version
} = require('../package.json');

const APP_CWD = process.cwd();

const markdownPath = 'examples';

const entry = getEntry(APP_CWD, markdownPath);

commonConfig.mode = 'development';

commonConfig.entry = entry;

let link = {};

Object.keys(entry).forEach((k) => {
	link[path.relative(APP_CWD, k)] = k;
});

commonConfig.plugins.push(
	new HtmlWebpackPlugin({
		filename: 'index.html',
		template: `${APP_CWD}/templates/index.ejs`,
		inject: 'false',
		chunks: [],
		title: `${name}@${version}`,
		link,
		homePage,
		readme: atoolDocUtil.marked(fs.readFileSync(`${APP_CWD}/README.md`, 'utf-8'))
	}),
);

const compiler = webpack(commonConfig);

// const DIST_DIR = `${APP_CWD}/dist`;

// app.use(webpackDevMiddleware(compiler, {
//   /**
//    * publicPath属性是必需的，而所有其他选项是可选的
//    */
//   publicPath: '/',
//   /**
//    * default: info
//    * type: string
//    * 定义模块将记录的消息级别。 有效的级别包括
//    * trace
//    * debug
//    * info
//    * warn
//    * error
//    * silent
//    */
//   // logLevel: 'silent',
//   /**
//    * default: undefined
//    * type: string
//    * 此属性允许用户在每个请求上传递自定义HTTP标头。 例如。 { "X-Custom-Header": "yes" }
//    */
//   headers: {
//     "X-Custom-Header": "yes"
//   },
//   /**
//    * Web服务器的索引路径，默认为“index.html”。
//    */
//   index: 'index.html',
//   /**
//    * Type: Boolean
//    * Default: undefined
//    * 模块以“懒惰”模式运行，这意味着它在文件更改时不会重新编译，而是在每个请求上重新编译。
//    */
//   lazy: true
// }))

// app.use(express.static(DIST_DIR));

// const router = express.Router();

// router.get('/', (req, res, next) => {
//   res.render('index', { message: 'Hey there!'});
// })

// app.listen(8080, () => {
//   console.log(chalk.cyan('Starting the development server...\n'));
// })

const server = new webpackDevServer(compiler, {
	historyApiFallback: true,
	hot: true,
	inline: true,
	stats: 'errors-only',
	// quiet: true
}).listen('<%=port%>', 'localhost', () => {
	console.log(chalk.cyan('Starting the development server...\n'));
});

function geDomFiles(dir, name) {
	return glob.sync(path.join(`${dir}/${name}`, `**/*.{js,jsx,html,md}`));
}

function getEntry(APP_CWD, markdownPath) {
	const files = geDomFiles(APP_CWD, markdownPath);
	let entry = {};
	files.forEach(file => {
		file = upath.normalize(file);
		const ext = path.extname(file);
		const name = `examples/${path.basename(file, ext)}`;

		if (ext === '.md' || (ext === '.js' || ext === '.jsx') && files.indexOf(pathWithoutExt + '.html') !== -1) {
			entry[name] = file;
		}
	});

	return entry;
}