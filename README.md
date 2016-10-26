# demo-by-react
one photo gallery project based on react

1、
$ cnpm install


项目完成后提交到github ，并将dist推送到gh-pages分支是的可以使用github查看项目

$ git subtree push --prefix=dist origin gh-pages

页面访问地址：
https://tenghuiliu.github.io/demo-by-react/



项目搭建

尤其是刚开始项目搭建的时候就会遇到很多问题，比如：

yo react-webapack projectName之后不会出现很教程里面类似的目录，这时候，不要方，试想一下，版本的迭代更新之后，肯定是向着越来越简单的方向走的，比如没有Gruntfile.js，没有关系，很多都已经迁移到webpack.config.js和cfg/defaults.js下了

还有一点是刚开始的时候把post-css选为yes,因为后面用到的autoprefixer-loader is deprecated，具体可看

https://github.com/passy/autoprefixer-loader

命令

启动命令改了：npm start

build命令也改了：npm run dist

可参考官网

https://github.com/react-webpack-generators/generator-react-webpack

npm ls -g --depth=1 2>/dev/null | grep generator-

这个命令运行之后 可查看generator的各个版本

.eslintrc文件

.eslintrc文件里面可以加一些代码检查：

比如我加了强制分号结尾

"semi": [2, "always"],//语句强制分号结尾
具体可查看eslint，我发现了一篇文章也不错01-Eslint静态代码检查

css get到的

scrollWidth：对象的实际内容的宽度，不包边线宽度，会随对象中内容超过可视区后而变大。 

clientWidth：对象内容的可视区的宽度，不包滚动条等边线，会随对象显示大小的变化而改变。 

offsetWidth：对象整体的实际宽度，包滚动条等边线，会随对象显示大小的变化而改变。

其他要注意的地方

对前端调试不太熟练，一些简单的错误都会找上半天

//少了个斜杠
singeImageData.imageUrl = require('../images/'+singeImageData.fileName);
//因为' is-inverse'没加空格
imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';
切不可大意，不过遇到问题，慢慢解决就好，代码不会犯错，只有人会犯错

