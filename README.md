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
  "dev": "mido dev mock=dev --port 9001", // 开发环境本地mock数据
	"test": "mido dev mock=test --port 9001", // 测试环境，测试服务器数据
	"pre": "mido dev mock=pre --port 9001", // 线上环境，线上服务器
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

## proxy
```vim
exports.proxy = {
	dev: {
		'/api': {
			target: 'http://localhost' // target为空默认为localhost
		},
		'/some': {
			target: 'http://localhost'
		}
	},
	test: {
		'/api': {
			target: 'http://xxx.xxx.com'
		},
		'/some': {
			target: 'http://xxx.xxx:9002'
		}
	},
	pre: {
		'/api': {
			target: 'https://www.alipay.com'
		}
	}
}
```
- 服务器地址配置：
  - dev 为本地mock数据，数据取自mock文件下的**.mock.js
  - test 为开发环境服务器数据，由框架代理。
  - pre 为线上环境服务器数据，由框架代理。
- Dev下mock数据配置：
  - 根目录下创建mock文件夹
	- mock文件必须为*.mock.js文件

- 可以是数据返回
```vim
const some = {
  stat: 'fail'
}

module.exports = {
  'GET /some.json': some, 
}
```
- 也可以是函数
```vim
const init = {
  stat: 'ok'
}

module.exports = {
  'GET /init.json': function(req, res) {
    res.json({
      stat: 'ok'
    })
  }
}
```

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
