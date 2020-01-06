# 1.2.5
- react vue webpack export

# 1.2.4
- webpack extensions ['.ts', '.tsx']

# 1.2.3
- {
    loader: MiniCssExtractPlugin.loader,
    options: {
      hmr: process.env.NODE_ENV === 'development'
    }
  }

# 1.2.2
- config配置webpack 可为函数

# 1.2.1
- lodash upDate

# 1.2.0
- bugfix

# 1.1.9
- 新增midoReact
- 新增midoVue
- 新增midoWebpack

# 1.1.8
- @babel/preset-env 固定该版本为7.3.1 目前高版本对export default 有影响
- 新增@babel/plugin-proposal-decorators 插件

# 1.1.6
- bugfix

# 1.1.5
- 对用户设置config支持es6语法
- npm包版本提醒

# 1.1.4
- 添加@babel/plugin-proposal-class-properties
- 修改图片打包地址


# 1.1.3-beta9
- 添加babel依赖

# 1.1.3-beta8
- react bug修复

# 1.1.3-beta7
- 添加mock数据系统
- 分为dev,test,pre

# 1.1.3-beta6
- html单独文件夹配置时的支持
- 输出react react-dom

# 1.1.3-beta4
- dev 工作台输出

# 1.1.3-beta3
- 新增对ts，tsx的支持

# 1.1.3-beta2
- 对vue的支持

# 1.1.3-beta1
- 修复css,less 引入postcss的bug

# 1.1.2-beta
- add: dev开发模式
- add: build打包模式
- add: babel 用户自定义
- add: webpack 用户自定义

# 1.1.1
- bugfix
- remove 多余插件

# 1.1.0
- add vue

# 1.0.9
- add babel-plugin-transform-runtime

# 1.0.7
- change splitChunks

# 1.0.6
- add postcss

# 1.0.5
- bugfix node依赖要加入pkg

# 1.0.2
- bugfix publish 添加项目依赖

# 1.0.1
- 添加组件包
- 添加react包

# 1.0.0
- init