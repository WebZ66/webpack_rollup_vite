---
highlight: a11y-dark
---
# webpack学习
> 日常开发都是基于脚手架开发，如vue-cli、creat-react-app都是基于webpack支持模块化开发。

**webpack：基于模块化的静态打包工具。它把项目中的所有文件划分成模块，然后根据模块之间的依赖关系最后打包生成静态文件(js、css等等)。**

js的打包：将es6转换成es5的语法，即babel-loader。将TS转换成js

css的打包：将less文件转换成css、然后进行打包。
style-loader：通过js创建出一个style标签，从而将样式注入到head标签中




# webpack安装
`npm install webpack webpack-cli -D`

开发时依赖，生成环境自然不需要webpack，只需要webpack打包后的静态文件即可。




# webpack打包基础

## npx是什么
npm与npx是完全不同的

`npm:` 侧重于**安装**，如npm install element-ui 安装某些包

`npx:` 侧重于**执行**，**执行某个模块**。在**当前文件夹下的`node_modules`下寻找到目标文件并执行**，虽然它也会自动安装对应模块。
**npx 模块 --no-install** 如果没有该模块就不安装执行

> npx运行逻辑：先检查`node_module`s下是否有该模块，有就执行。不存在就去安装再执行,执行完毕后删除对应模块。


## npx webpack 
> 最基础的打包命令，进入到`需要打包的项目下`，直接npx webpack。(**默认是在node_modules下寻找对应文件执行**),会打包生成一个dist文件夹，同时打包成静态文件。 

**如果直接webpack执行，那么默认是全局环境下寻找webpack执行**

弊端：src文件夹下，必须是index.js。因为没有配置入口呀,`默认入口就是src下的index.js`文件

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/610342845df64662b905f9728f1976e9~tplv-k3u1fbpfcp-watermark.image?)


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7d15dbd10b4547948d19cd9fd14d51da~tplv-k3u1fbpfcp-watermark.image?) 

**当然，也可以不配置webpack.config.js，自己像傻子一样手动输入**


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a5f560c4b6f24a898ce33c2e636ad565~tplv-k3u1fbpfcp-watermark.image?)


## webpack.config.js

### 配置webpack智能提示

```
const { Configuration } = require('webpack')

/**
 * @type {Configuration} //配置智能提示
 */
```

### path相关
`创建webpack.config.js。它的配置也是固定语法commonjs，(基于node运行)，必须module.exports={}`

```js
const path = require('path')
module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './build')
  }
}

```

> 注意，webpack中的路径，必须是`绝对路径`。所以需要用path模块。通过path.resolve(__dirname,"./build")  //__dirname获取当前文件即webpack.config.js所在路径,然后和相对路径"./build"进行拼接，获取要生成的build文件夹的相对路径，再通过path.resolve()转换成绝对路径


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0fabd3c664fb41c3844ba573c74043d2~tplv-k3u1fbpfcp-watermark.image?)

### 修改webpack.config.js命名。  --config
`npx webpack --config xx.config.js`

注意：可以在package.json中配置命令，配置命令的时候需要省略npx。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eef8873c54b744048561ec9eb122f03c~tplv-k3u1fbpfcp-watermark.image?)


```
如果改名成立zds.config.js
"build":"webpack --config  zds.config.js"
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/94b50ff07e0c4681a37526d1d5b4aaf1~tplv-k3u1fbpfcp-watermark.image?)

***

### mode配置

**作用:设置环境** :fire:

默认值是`production`(什么都没设置)

可选值有`none|development|production`

| 选项        | 描述                                                         |
| ----------- | ------------------------------------------------------------ |
| development | 会将DefinePlugin中`process.env.NODE_ENV`的值设置为development |
| production  | 会将DefinePlugin中`process.env.NODE_ENV`设置为production     |

***

### source-map

> 运行在浏览器上的代码，通常是经过打包压缩的(即丑化后的代码)。webpack最后会打包生成一个优化后的静态文件。

- **source-map**是从 `已转换的代码`，映射到 `原始的源文件`。
- 使浏览器可以 `重构原始源`并在调试器中 `显示重建的原始源`。

**使用**：(两个步骤)

- 根据源文件，生成source-map文件

  ```js
  //webpack.config.js 中开启devtool
  module.exports = {
      mode: 'development',
      entry: './src/main.js',
      devtool: 'source-map',
      output: {
          path: path.resolve(__dirname, './build'),
          filename: 'bundle.js',
      },
  }
  ```

  ![image-20231009151534295](https://gitee.com/zhengdashun/pic_bed/raw/master/img/image-20231009151534295.png) 打包后，就会生成对应的**source-map**文件

- 转换后的代码，会在最后添加一个`注释`，指向要使用的source-map文件。

  ```
  //# sourceMappingURL=bundle.js.map
  ```

  ![image-20231009151911310](https://gitee.com/zhengdashun/pic_bed/raw/master/img/image-20231009151911310.png)

  浏览器会解析这个注释，找到对应的source-map文件，**还原其原始代码**。



**devtool:  `none`(production) ||  `eval` (development，比较简略，但是也能还原部分代码，且编译速度快)  ||`source-map`  (生成完整的source-map，会影响性能，一般也是在production环境) **



***

# webpack的依赖关系

webpack默认只能对js文件进行打包，如果想要打包其他文件css、图片需要不同的loader进行loader处理。

webpack打包流程：**从入口开始，递归解析所有的模块，并通过之前配置好的loader加载器对对应的模块进行加载，如果当前模块依赖于其他模块，那么被依赖的模块也会被加载。当所有模块处理结束后，就会得到加载后的内容和依赖关系图。然后webpack便会根据依赖关系，将其组装成一个个含有多个代码块的chunk。之后，webpack再把所有的chunk转化为文件添加到输出列表里，最后根据配置后的出口路径和文件名，输出静态文件**

***



# loader

**什么是loader:**

***

loader可以将模块的**源代码进行转换**，css文件其实也是一个模块，我们通过import来引用该模块，但是**webpack无法识别css代码**，也就无法打包，必须配置对于的loader对其进行加载处理，转换成webpack可以识别的js代码。

##   css处理

**css-loader + style-loader**

> 首先，css文件必须被引用，可以在入口文件里直接import './xx/x.css'导入即可。但是webpack只能打包js文件，对于其他类型的文件必须配置loader加载器。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b4ee8c010c274d6aa4b7b4b557b8b424~tplv-k3u1fbpfcp-watermark.image?)


```js
const path = require('path')
module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './build')
  },
  module: {
    rules: [
      {
        //通过test属性，告诉webpack，匹配什么文件
        test: /\.css$/, //需要正则表达式
        //通过use属性，告诉对应文件，用什么loader处理。use是数组，因为可以用多个loader处理
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
      },
      { test: /\.less$/,
      use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'less-loader' }] }
    ]
  }
}


```

**注意:css-loader只是负责解析项目中的所有的css文件，最后组合成一个css文件，但是它不会将样式插入到页面中**

**如果希望在页面插入css，需要style-loader：通过js创建出一个style标签，然后将样式注入到head标签中**

> loader的使用流程是从右向左的，从下向上的，所以右边必须是css-loader

```
 use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
```


## webpack处理图片

> 在webpack5之前，加载图片资源我们可以使用url-loader、file-loader

> webpack5以后，我们可以直接使用`资源模块类型(asset module type)来替代loader`

### **资源模块类型**  type:

`asset/resource:` 把文件输出到对应的文件夹中，之后通过相对路径进行引用。 类似于`file-loader`。

`缺点：每有一张图片，就需要进行一次网络请求`


`asset/inline:` 将图片转换成base64字符串直接打包到bundle.js中使用。类似于`url-loader小于limit`

`缺点：会导致js文件非常大，加载解析js文件的时候耗时较长。`

`asset：`在将图片转换成base64和将图片放到文件夹中通过路径引用，之间自动选择

之前通过url-loader，并且通过限制资源体积来实现，如果小于limit，就转换成base64如果大于，就将图片输出到对应的文件夹中，通过相对路径来引用图片

```
   {
        test: /\.(png|jpg)$/,
        type: 'asset',
        parser: {
        //当图片小于100*1024的时候转换成base64，不然将其输出到文件夹中
          dataUrlCondition: {
            maxSize: 100 * 1024
          }
        }
      }
```
无需安装loader了，直接使用type:'asset'




### 图片重命名


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2c467dfdc7ec4341b5179d29af296821~tplv-k3u1fbpfcp-watermark.image?)



## vue-loader

> 安装: npm install vue  vue-loader

配置：

```js
---webpack.config.js---
/* 这个插件是vue必须的，为了解析.vue文件的css */
const { VueLoaderPlugin } = require('vue-loader/dist/index')
module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './build')
  },
  module: {
    rules: [
    //配置vue-loader
      { test: /\.vue$/, use: ['vue-loader'] }
    ]
  },
  plugins: [new VueLoaderPlugin()]
}
```


```
------main.js 中挂载app根节点---------
import { createApp } from 'vue'
import Hello from './vue_demo/Hello.vue'
createApp(Hello).mount('#app')
```



***

# babel原理

`为什么需要babel`：因为开发中想要使用es6以上的语法，或者是TS，就需要用babel将其转换为es5的js。

## babel的底层原理

babel：本质上是一个`转译器`，**作用**是**将es6的语法或者是TS语法向es5进行转换**(`向下兼容`)。大概分为三个阶段：

①`parse`：解析阶段，将**代码解析成抽象语法树AST**，即进行**词法分析**和**语法分析**。

②`transform`：转换阶段，遍历ast，调用babel的各种plugin对抽象语法树节点进行操作`，最后**生成一棵新的抽象语法树**。

③`generator`：生成阶段，将变换后的AST重新生成为js代码



## babel命令行执行

**babel本身就是一个独立的工具，不和webpack等构建工具配合使用，进行单独使用**

```js
pnpm add @babel/core @babel/cli @babel/plugin-transform  等等插件  -D
```

直接通过 `npx babel`并不能直接将其转化为es5的js，还需要安装所需要的babel插件。

但是babel插件太多了，一个个设置是很麻烦的，所以可以使用`预设`，`@babel/preset-env`

```js
pnpm add @babel/preset-env -D
```

```js
npx babel ./src --out-dir ./build --presets=@babel/preset-env
```

![image-20231010105728927](https://gitee.com/zhengdashun/pic_bed/raw/master/img/image-20231010105728927.png) 就成功将代码向下兼容。

***




















# webpack resolve模块解析

> 在开发中，我们会import各种各样的模块文件，resolve可以帮助webpack从每个require、import语句中，找到需要引入的合适的模块代码

webpack使用enhanced-resolve来解析文件路径

①`绝对路径`：直接使用，不需要解析

②`相对路径`：对于import、require中给定的相对路径，会拼接上下文路径，来生成绝对路径

③`模块路径`，会默认在node_modules中查找文件。


## 如果直接导入的文件 
```
---webpack.config.js---
module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './build')
  },
  resolve: {
    //模块默认的扩展名，能够让用户导入模块不带后缀
    extensions: ['.js', '.json', '.vue', '.jsx', '.ts', '.tsx']
  },
```
配置以后 导入.vue文件,就不需要后缀了
`import xx from './components/xx'`


## 如果导入的是文件夹  (即默认导入的是index文件)
这个不需要自己配置，了解即可

例如 import utils from './utils' 
`会根据resolve.mainFiles配置选项中的指定的文件顺序查找。`

默认`resolve.mainFiles的默认值是['index']，所以就会直接找index文件`



## alias 配置路径别名 (!important)
> 通过resolve:{alias:{}}进行配置，之后就可以直接使用路径别名了

```
module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './build')
  },
  resolve: {
    //模块默认的扩展名，能够让用户导入模块不带后缀
    extensions: ['.js', '.json', '.vue', '.jsx', '.ts', '.tsx'],
    //配置路径别名
    //找到当前webpack.config.js的路径，同时拼接./src/utils，找到utils文件夹的绝对路径
    //所以utils就是对应的utils的路径
    alias: {
      utils: path.resolve(__dirname, './src/utils')
    }
  },
```


# webpack常见的插件
> loader:是对对应的模块进行加载处理，将其转换成webpack可识别的js代码

> Plugin:可以用于执行更广泛的任务，进行打包优化，环境变量注入等。

## clean插件
**每次修改配置，都需要重新打包，而且需要手动删除之前的dist文件，而clean插件就可以帮助我们自动删除dist文件**

安装：` npm install clean-webpack-plugin -D`

```
const { CleanWebpackPlugin } = require('clean-webpack-plugin')，

module.exports={
    ...
     plugins: [new VueLoaderPlugin(), new CleanWebpackPlugin()]
}
```

## HtmlWebpackPlugin
**缘由：打包只生成了一个bundle.js文件，这部署到静态服务器也没法展示呀。当然，可以手动写一个html，通过script导入，然后将build文件部署，也可以用HtmlWebpackPlugin**

> 作用：打包后，自动生成一个html文档，同时通过script标签导入了打包后的js文件


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d3f3f55e6a774988a34c2f4050f6094e~tplv-k3u1fbpfcp-watermark.image?)

安装：`npm install html-webpack-plugin -D`

```
const HtmlWebpackPlugin = require('html-webpack-plugin')
plugins: [new CleanWebpackPlugin(), new HtmlWebpackPlugin({title:'电商项目',template:'./index.html'})]
```

## DefinePlugin
**在vue的index.html模板中，常常遇到<%=BASE_URL%>，这个就是使用DefinePlugin插件定义的变量**

`安装：无需安装，直接从webpack导入即可`

`const { DefinePlugin } = require('webpack')`


```
 plugins: [
    new HtmlWebpackPlugin({ title: '电商项目' }),
    new DefinePlugin({
      //右边看上去是字符串，但它会被当做js代码执行
      BASE_URL: "'./'"
    })
  ]
  

```

 可以在任何地方使用：
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7a68f49cabb44ca48f5e45bb97d6ee53~tplv-k3u1fbpfcp-watermark.image?)


# Webpack配置本地服务器 (!important)

作用：实现自动编译，热更新。

webpack-dev-server会直接将模块进行打包，并且把东西放到`内存`里，(所以`build文件夹下是没东西的`，放到磁盘效率低下),然后搭建一个本地服务器，直接读取对应打包后的内容，浏览器再向本地服务器发起请求。

## 安装配置

`npm install webpack-dev-server -D`
```
在package.json中 直接配置serve命令， webpack serve。
配置serve命令
"scripts": {
    "build": "webpack",
    "serve": "webpack serve",
    "test": "echo \"Error: no test specified\" && exit 1"
  },

```

## 认识模块热更新  HMR
**如果只是一个模块发生了改变，正常情况下所有的模块都需要重新编译打包渲染。**

`HMR：`模块内部发生改变后，无需重新编译所有模块，只需要重新编译打包当前模块和当前模块所依赖的模块。

**开启HMR**
devServer:{hot:true}

```
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  resolve: {
    extensions: ['.js', '.json', '.vue', '.jsx', '.tsx', '.ts'],
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  devServer: {
    hot: true,
    port: 9999,
    open:true,//自动打开浏览器
    compress:true,//自动把打包的文件进行gzip的压缩，浏览器请求到的是个压缩文件，然后浏览器自动解压，一般不需要开启
  },
  module: {
    rules: []
  },
  plugins: [new HtmlWebpackPlugin({ title: 'devServer' })]
}

```

# 环境区分
>创建config文件夹，同时配置不同的webpack.config.js

![image.png](https://gitee.com/zhengdashun/pic_bed/raw/master/img/788aa1b8d3504cddb44b3d14ec4df58e~tplv-k3u1fbpfcp-watermark.image)

> 根据不同的环境 配置不同命令


![image.png](https://gitee.com/zhengdashun/pic_bed/raw/master/img/61e942e1587e45399053a4659523a168~tplv-k3u1fbpfcp-watermark.image)

# webpack配置ts环境
```
npm install typescript -g   //tsc --version查看版本 
npm install ts-node -g  
```

tsc将ts文件编译成js。ts-node编译后直接执行该js文件。

方法二：通过webpack配置对应的loader

```
npm init -y  //生成package.json
tsc --init   //生成tsconfig.json
```

```
安装：
npm install typescript ts-loader webpack webpack-cli webpack-dev-server html-webpack-plugin
```

**webpack.config.js配置**

```js
//配置webpack智能提示
const { Configuration } = require('webpack')
/**
 * @type {Configuration} //配置智能提示
 */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'development',
  entry: './src/main.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.json', '.vue', '.jsx', '.tsx', '.ts'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  module: {
    rules: [{ test: /\.ts/, use: ['ts-loader'] }],
  },
  plugins: [new HtmlWebpackPlugin({ template: './dist/index.html' })],
  devServer: {
    hot: true,
    port: 9000,
    open: true,
    compress: true,
  },
}

```

![image.png](https://gitee.com/zhengdashun/pic_bed/raw/master/img/a3ecf27bff86458bb15dd1bc919b55c8~tplv-k3u1fbpfcp-watermark.image)

# webpack chunk的理解
[chunk的理解](https://juejin.cn/post/6844903889393680392)

# 自实现一个vue-cli

`要让vue支持ts的话需要创建声明文件 xx-vue.d.ts ，`

```
declare module "*.vue" {
  import { DefineComponent } from "vue"
  const component: DefineComponent<{}, {}, any>
  export default component
}
```

**package.json**

```js
{
  "name": "webpack_demo",
  "version": "1.0.0",
  "description": "yarn add webpack \r  yarn add webpack-cli      \r  yarn add webpack-dev-server \r  yarn add html-webpack-plugin",
  "main": "index.js",
  "scripts": {
    "build": "webpack --config webpack.config.js",
    "serve": "webpack serve",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^5.76.2",
    "webpack-cli": "^5.0.1",
    "webpack-dev-server": "^4.13.1"
  },
  "dependencies": {
    "css-loader": "^6.7.3",
    "html-webpack-plugin": "^5.5.0",
    "style-loader": "^3.3.2",
    "ts-loader": "^9.4.2",
    "vue": "^3.2.47",
    "vue-loader": "^17.0.1"
  }
}

```

**webpack.config.json**
```js
const { Configuration } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader/dist/index')
const path = require('path')
/**
 * @type {Configuration} //配置智能提示
 */
module.exports = {
  mode: 'development',
  entry: './src/main.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './build'),
    clean: true
  },
  resolve: {
    extensions: ['.js', '.ts', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.ts$/, //解析ts
        loader: 'ts-loader',
        options: {
          configFile: path.resolve(process.cwd(), 'tsconfig.json'),
          appendTsSuffixTo: [/\.vue$/]
        }
      }
    ]
  },
  devServer: {
    hot: true,
    port: 8000,
    open: true
  },
  plugins: [new HtmlWebpackPlugin({ title: 'webpack', template: './public/index.html' }), new VueLoaderPlugin()]
}


```

## Vue-cli开启source-map
vue.config.js
```js
 server: {
    port: 8080,
  },
 configureWebpack: (config) => {
    //调试JS
    config.devtool = "source-map";
  },
  css: {
    //查看CSS属于哪个css文件
    sourceMap: true,
  },
 
```













分为以下几种情况：

| 监听目标                          | immediate:false                                              | immediate:true                                               |
| --------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 监听data中数据                    | 第一次`data中初始化值`的时候不会调用，之后每修改一次调用一次。 | 第一次data中`初始化值的时候立刻调用一次`。由undefined==>初始值 |
| 直接监听**props**中数据           | 不会触发回调                                                 | 会触发一次回调，效果类似于`监听data中设置immediate:false`，即newValue：传递的值，oldValue：自定义默认值 |
| 将props的值保存在data中，监听data | 第一次`data中初始化值`的时候不会调用，之后每修改一次调用一次 | 第一次data中`初始化值的时候立刻调用一次`。由undefined==>初始值 |
| 监听vuex中数据                    | 不会直接触发回调，除非修改了vuex中对应数据                   | 会触发一次回调，newValue即为vuex中存储数据。在mounted前调用  |

**特殊情况①：**祖先组件传递值给父组件，父组件再添加一些数据传递给儿子组件。

- `immediate:false`, **不会触发儿子组件的监听器回调**
- `immediate:true`, **会触发一次监听器回调，类似于直接监听props中数据**

**特殊情况②：** 父组件传递给子组件一个option，同时父组件发送请求，修改options中的值

- `immediate:false`。只会触发一次回调，newValue：父组件发送请求后修改的值，oldValue：父组件传递给子组件的值
- `immediate:true`。触发两次回调
  - 第一次回调:  newValue:父组件传递给子组件的值，oldValue：默认值(null)
  - 第二次回调：newValue：父组件发送请求后修改的值，oldValue：父组件传递给子组件的值。

**echrats监听传递options，init初始化，就需要以此判断，比如特殊情况①，必须要immediate：true后，直接进行init。**

**特殊情况②：可以设置immedaite：false了，因为`只需要父组件发送请求后修改的值`**。当然 `this.$nextTick()是必须的`