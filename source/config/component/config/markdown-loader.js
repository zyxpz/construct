const fs = require('fs');

const path = require('path');

const loaderUtils = require('loader-utils');

const MT = require('mark-twain');

const R = require('ramda');

const ejs = require('ejs');

const isCode = R.compose(R.contains(R.__, ['js', 'jsx', 'javascript']), R.path(['props', 'lang']));
const isStyle = R.whereEq({ type: 'code', props: { lang: 'css' } });
const isHtml = R.whereEq({ type: 'code', props: { lang: 'html' } });
const getChildren = R.compose(R.prop('children'), R.defaultTo({}));

const util = require('atool-doc-util');

module.exports = function (content) {

	this.cacheable && this.cacheable(); // 开启缓存

	const options = this._compiler.options; // 获取webpack配置信息

	// const webpackOptions = loaderUtils.getOptions(this); // 获取webpack设置options

	/**
   * 如果这个 loader 配置了 options 对象的话，this.query 就指向这个 option 对象。
   * 如果 loader 中没有 options，而是以 query 字符串作为参数调用时，this.query 就是一个以 ? 开头的字符串
   */

	// const query = this.query; // 获取webpack设置options

	const query = loaderUtils.parseQuery(this.query); // 拼接参数

	const resourcePath = this.resourcePath; // md路径

	const resource = new util.Resource(resourcePath, query.domSource, resourcePath);

	const tpl = query.template; // 模板

	const fileContentTree = MT(content).content;

	const meta = MT(content).meta;

	const code = getChildren(fileContentTree.find(isCode));

	const style = getChildren(fileContentTree.find(isStyle));

	const html = getChildren(fileContentTree.find(isHtml));

	const link = {};

	link['Index'] = path.relative('../', path.relative(resource.path, './index'));

	Object.keys(options.entry).forEach(k => {
		link[path.relative(query.domSource, k)] = path.relative('../', path.relative(resource.path, k));
	});

	const script = `${resource.name}.js`;

	const result = ejs.render(fs.readFileSync(tpl, 'utf-8'), {
		file: {
			meta,
			link,
			title: query.domSource + '/' + resource.name + resource.ext,
			resource,
			script,
			html,
			style,
			desc: util.marked(fileContentTree),
		}
	});

	this.emitFile(calculateHtmlPath(process.cwd(), resourcePath), result);

	return code;
};

function calculateHtmlPath(cwd, source) {
	const selfPath = path.relative(cwd, source);
	return path.join(path.dirname(selfPath), `${path.basename(selfPath, path.extname(selfPath))}.html`);
}