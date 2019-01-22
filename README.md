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