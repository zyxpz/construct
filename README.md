# webpack4 前端框架脚手架

## api
### version < 1.1.2-beta
### construct init 初始化命令
#### Options:

* -s, 创建目录地址 
* -p, --port 端口
* mido-construct init -p 8989 -s 目录

___

### version > 1.1.2-beta
### mido init 初始化命令
#### Options:

* -s, 创建目录地址 
* -p, --port 端口
* mido-construct init -p 8989 -s 目录

### mido dev 开发模式
```vim
scripts: {
  "dev": "mido dev mock(暂不支持) --port 9001"
}
```

### mido build 打包
```vim
scripts: {
  "build": "mido build"
}
```
***
# 自定义配置项

## 目录根路径 config/config.js

## .babelrc
```vim
exports.babel = {
  presets: [],
  plugins: []
}
```
- babel使用8以上版本
- 框架内集成：
  + presets
      - @babel/preset-env
      - @babel/preset-react
  + plugins
      - @babel/plugin-transform-runtime
      - babel-plugin-syntax-jsx
      - babel-plugin-transform-vue-jsx

## webpack
```vim
exports.webpack = {
  optimization: {
    splitChunks: {
				cacheGroups: {
					vendor: { // node_modules内的依赖库
						chunks: "all",
						test: /[\\/]node_modules[\\/]/,
						name: "vendor",
						minChunks: 1, // 被不同entry引用次数(import),1次的话没必要提取
						maxInitialRequests: 5,
						minSize: 0,
						priority: 100,
						// enforce: true?
					},
					common: { // ‘src/js’ 下的js文件
						chunks: "all",
						test: /[\\/]src[\\/]js[\\/]/, // 也可以值文件/[\\/]src[\\/]js[\\/].*\.js/,  
						name: "common", // 生成文件名，依据output规则
						minChunks: 2,
						maxInitialRequests: 5,
						minSize: 0,
						priority: 1
					}
				}
			}
  }
}
```
- webpack 配置项类似于webpack.config.js

## config
```vim
exports.config = {

}
```
- 暂时没有api