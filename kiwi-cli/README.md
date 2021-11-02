# 🐤 kiwi cli

Kiwi 的 CLI 工具

## 如何使用

> yarn global add wy-kiwi-clis

> 推荐与[🐤 Kiwi-国际化全流程解决方案](https://github.com/alibaba/kiwi)结合使用


强行修改了整体内容，使其支持jsx，但是需要把jsx 重命名为ts , 然后每次执行 命令前，需要将kiwi目录下的文件tsc 一波 
```
tsc .kiwi/*/*.ts
```
修改了 extract 相关内容，去掉翻译相关的内容，直接使用uuid当做key
修改了 translate 相关内容 出现报错时 允许继续下去
## CLI 参数

### kiwi `--init`

初始化项目，生成 kiwi 的配置文件 `kiwi-config.json`

```js
{
  // kiwi文件根目录，用于放置提取的langs文件
  "kiwiDir": "./.kiwi",

  // 配置文件目录，若调整配置文件，此处可手动修改
  "configFile": "./.kiwi/kiwi-config.json",

  // 语言目录名，注意连线和下划线
  "srcLang": "zh-CN",
  "distLangs": ["en-US", "zh-TW"],

  // googleApiKey
  "googleApiKey": "",

  // baiduApiKey
  "baiduApiKey":
    "appId": '',
    "appKey": ''
  },

  // 百度翻译的语种代码映射 详情见官方文档 https://fanyi-api.baidu.com/doc/21
  "baiduLangMap": {
    "en-US": 'en',
    "zh-TW": 'cht'
  },

  // import 语句，不同项目请自己配置
  "importI18N": "",

  // 可跳过的文件夹名或者文加名，比如docs、mock等
  "ignoreDir": "",
  "ignoreFile": ""
}
```

### kiwi `--extract`

一键批量替换指定文件夹下的所有文案

```shell script
kiwi --extract [dirPath]
```

![批量替换](https://raw.githubusercontent.com/alibaba/kiwi/master/kiwi-cli/public/extract.gif)

### kiwi `--import`

导入翻译文案，将翻译人员翻译的文案，导入到项目中

```shell script
# 导入送翻后的文案
kiwi --import [filePath] en-US
```

### kiwi `--export`

导出未翻译的文案

```shell script
# 导出指定语言的文案，lang取值为配置中distLangs值，如en-US导出还未翻译成英文的中文文案
kiwi --export [filePath] en-US
```

### kiwi `--sync`

同步各种语言的文案，同步未翻译文件

### kiwi `--mock`

使用 Google 翻译，翻译未翻译的文案
如果同时配置baiduApiKey与baiduApiKey 则命令行可手动选择翻译源

### kiwi `--translate`

全量翻译未翻译的中文文案，翻译结果自动导入 en-US zh-TW等目录

```shell script
kiwi --translate
```

