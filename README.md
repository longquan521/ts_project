# ts_project 文件修改为单例模式，修改了 md 文件，新增了包

## 跟着视频做的 ts 项目，全栈

[附 MD 语法基础](https://www.jianshu.com/p/399e5a3c7cc5 'MD基础语法')

```
 cnpm i superagent --save//爬虫依赖工具
 cnpm i cheerio --save//用来获取页面上的各个部分的内容
 cnpm i @types/cheerio -D //文件变成ts的
 ts直接引用js会报错，ts->.d.ts 翻译文件->js
```

#### `dellAnalyzer.ts`是爬取策略分析器文件，具体分析网页爬取哪一部分

#### `crowller.ts`

---

> 修改 tsconfig.json 的`"outDir": "./build"`,可以让解析 ts=>js 的位置变化

```
"scripts": {
    "dev:build": "tsc -w",//编译ts文件，-w实时监听文件变化
    "dev:start": "nodemon node ./build/crowller.js",//监听js变化,变化后就执行一次
    "dev": "concurrently npm:dev:*"//并发执行所有包含dev的命令
  },
```
