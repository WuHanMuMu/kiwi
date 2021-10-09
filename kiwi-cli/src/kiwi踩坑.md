## kiwi踩坑

kiwi 的github地址 https://github.com/alibaba/kiwi

1. kiwi的vscode插件已经凉了，无法使用
2. kiwi的npm 包应该是可以使用
3. 尝试 修改kiwi的cli，一键生成intl的配置


修改思路
kiwi 之前的思路是将文件中的文本全部提取出来，然后获取中文文本，将其逐字翻译，

比如 圆通快递 翻译对应的是 圆 circle 通 through 这样的，然后取前四个字母，生成key

我直接去掉这一步哈，直接用uuid生成key了，然后翻译也有一点小问题

魔改好的版本叫 wy-kiwi-cli
```
npm i -g wy-kiwi-cli
```
部署过程
顺序不能变，变了就会失败。。。因为有很多文件依赖上一步的操作
1. kiwi --init 先生成配置文件，修改.kiwi/kiwi-config.json 吧百度翻译相关的apikey 填一下
2. kiwi --extract ${dir}  针对目录提取中文文件，${dir} 为提取的目录
3. kiwi --sync 同步生成多语言配置文件
4. kiwi --translate 进行翻译

生成的数据如果有模板字符串的话，会有一点小问题，
比如 
```
a = `这是一条模板字符串 ${text}`
```
当被提取时，text变量会被转义成{val}, 需要自行处理，如果使用kiwi 对应的包， 代码如下
```
kiwi.template('字符串对应地址', { text: '这里你要换的变量'})
```

PS. 可以修改config里面的 importI18N 字段，改成绝对目录 比如 @/app/util/i18n 这样就不用修改代码了，怎么修改绝对导入 https://khalilstemmler.com/blogs/typescript/absolute-file-path/ 
