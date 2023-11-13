---
highlight: a11y-dark
---
# webpack
> 日常开发都是基于脚手架开发，如vue-cli、creat-react-app都是基于webpack支持模块化开发。

**webpack：基于模块化的静态打包工具。它把项目中的所有文件划分成模块，然后根据模块之间的依赖关系最后打包生成优化后的静态文件(js、css等等)。**

js的打包：基于babel-loader，将es6转换成es5的语法，将TS转换成js，配置polyfill，为其添加新语法等等

css的打包：将less文件转换成css、然后进行打包。
style-loader：通过js创建出一个style标签，从而将样式注入到head标签中




## 安装
`npm install webpack webpack-cli -D`

开发时依赖，生成环境自然不需要webpack，只需要webpack打包后的静态文件即可。



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



webpack和babel的区别：

- webpack打包后的文件会包含模块化的内容,但并没有转译

  ![](https://gitee.com/zhengdashun/pic_bed/raw/master/img/image-20231018150322645.png) 

- babel只是将`代码转译，es6转化为es5，语法向下兼容`

所以需要将webpack和babel结合在一起



## babel和webpack结合

`凡是webpack和其他工具结合，都是使用loader。比如ts-loader vue-loader等等`

通过**babel-loader**配合**babel插件**或者是预设

```
pnpm add @babel/preset-env -D
pnpm add babel-loader
```

```js
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        // plugins: [], 该loader所需要的插件或预设
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
}

```

![image-20231018151018070](https://gitee.com/zhengdashun/pic_bed/raw/master/img/image-20231018151018070.png) 

***

## **配合webpack使用**

注意：babel还需要配合一系列的插件才能将对应语法进行转化，比如箭头函数转化插件等等，但为了方便起见，它们都放在了 `@babel/preset-env`预设中。

```json
const { Configuration } = require('webpack')
const path = require('path')
/**
 * @type {Configuration} //配置智能提示
 */
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    devtool: false,
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'bundle.js',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader', 
                    options: {
                        // plugins: [], 
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    corejs: 3, //为旧浏览器提供它没有支持的新功能
                                    useBuiltIns: 'usage', //false: 打包后文件不使用polyfill，这时候不需要corejs
                                },
                            ],
                        ],
                    },
                },
            },
        ],
    },
}

```





## webpack结合babel搭建react环境

在react中，class 返回的是render()方法，调用返回jsx，函数组件直接返回jsx。

jsx通过`babel`转化为`React.createElement()`这种`js的函数调用方式`，这样就可以运行在浏览器上。

```js
//安装react react-dom
pnpm add react react-dom
```

```js
//安装preset预设(react),即babel转化jsx语法所需要的插件
pnpm add @babel/preset-react -D
```

```json
//webpack配置  
module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        //两个预设，一个处理普通js，一个处理jsx
                        presets: [['@babel/preset-env',{}], ['@babel/preset-react']],
                    },
                },
            },
        ],
    },
```

在入口文件main.js中创建根节点App

```js
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './react/App.jsx'
const root = ReactDOM.createRoot(document.querySelector('#root'))
root.render(<App />)
```





## webpack结合babel搭建TS环境

webpack打包ts代码可以使用两种方法：

①直接使用`ts-loader`。注意，需要配置tsconfig.json文件，tsc --init

​	缺点：ts-loader只能将ts转化为js，如果想要添加polyfill是无能为力的

②使用`babel-loader`

- 因为ts-loader中没有polyfill，如果ts代码中包含了一些比较新的api(比如str.includes())，那么打包会报错。

  **因此，开发中最好还是使用babel-loader处理ts代码**

  **但是，babel-loader在编译的过程中，`不会对类型错误进行检测`**

安装关于ts的预设

```js
pnpm add @babel/preset-typescript -D
```

![image-20231026144439116](https://gitee.com/zhengdashun/pic_bed/raw/master/img/image-20231026144439116.png) 



# polyfill

可以理解为**垫片、补丁**，将es6代码转化为es5的时候，会帮忙打补丁，`填补一些没有的api。`

![image-20231018170423983](https://gitee.com/zhengdashun/pic_bed/raw/master/img/image-20231018170423983.png) 

可以看到，webpack通过babel转化后的代码，依然含有*`inclueds`*方法，如果浏览器不兼容这个方法，自然就会报错



## polyfill的使用

> babel7.4.0以前可以使用@babel/polyfill，但现在废弃了

**最新使用：**

```js
pnpm add core-js regenerator-runtime
```

useBuiltIns

- false: 打包后文件不使用polyfill，这时候不需要corejs
- usage:babel转换过程中，`会自动引入需要的api`

```js
 module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        // plugins: [],
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    corejs: 3,
                                    useBuiltIns: 'usage', //false: 打包后文件不使用polyfill，这时候不需要corejs
                                },
                            ],
                        ],
                    },
                },
            },
        ],
    },
```










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

`最新版本的webpack-cli只需要在ouput中配置clean:true即可`

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



***




# Webpack配置本地服务器

**作用**：实现自动编译，热更新。

**原理**：webpack-dev-server会直接将`模块进行打包`，并且把东西放到`内存`里，(所以`build文件夹下是没东西的`，放到磁盘效率低下),然后`搭建一个本地服务器`，浏览器`再向本地服务器发起请求`。



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



## 静态资源文件夹

静态资源：内容长时间不发生改变的资源文件。

静态资源文件夹：即存放静态资源的文件夹。

> 当浏览器在地址栏中输入localhost:8080时，它默认请求的是本地服务器的index.html文件，webpack-dev-server(即本地服务器)会默认返回一个index.html文档，同时，在其中通过script标签（路径是绝对路径）导入对应打包好的js文件。

express或koa中，需要安装对应的静态资源插件，然后定义一个静态资源文件夹，定义一个index.html文档在其中，并且导入的css和js文件都需要通过绝对路径来导入。这样，请求时，服务器会自动生成对应的静态资源路由，并返回对应的静态资源。



**webpack中配置静态资源：**

- 如果直接在模板index.html中导入静态资源文件，那么默认是找不到的。**需要配置一个静态资源文件夹(默认已经帮我们配置好了public)**

  ![image-20231111155807710](https://gitee.com/zhengdashun/pic_bed/raw/master/img/image-20231111155807710.png) 

![image-20231111155820033](https://gitee.com/zhengdashun/pic_bed/raw/master/img/image-20231111155820033.png) 

- 配置

  - 在webpack.config.js中添加devServer，同时配置static属性

    ```js
        devServer: {
            static: ['content'], //如果不指明的话，默认public就是静态文件
        },
    ```

  - 在template模板html文档中，注意，需要通过绝对路径导入静态文件夹下的js、css等资源文件。(不能包含静态资源目录的路径)

    ![image-20231111161224578](https://gitee.com/zhengdashun/pic_bed/raw/master/img/image-20231111161224578.png)



在koa和express中，其实也是配置静态资源目录，导入静态资源也是通过`绝对路径`

```js
express.static(__dirname,'public')
```



## 认识模块热更新  HMR

**如果只是一个模块发生了改变，正常情况下所有的模块都需要重新编译打包渲染。**

`HMR：`模块内部发生改变后，无需重新编译所有模块，只需要重新编译打包当前模块和当前模块所依赖的模块。

**开启HMR**
devServer:{hot:true}

```json
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

***



# Webpack性能优化

webpack性能优化较多，可以将其进行分类

- [ ] 优化一：打包后的结果（分包处理、减小包体积、CDN服务器）
- [ ] 优化二：优化打包速度(比如exclude、cache-loader)



如果将所有模块打包成一个bundle.js，那么bundle.js就会非常的大，首屏渲染速度会大大降低。

解决措施：

- 分包处理 (prefetch)
- SSR(加快首屏渲染速度，增加SEO优化)





## 代码分离

主要目的：将`代码分离到不同的bundle中`，之后我们可以 `按需加载`，或者 `并行加载这些文件`

默认情况下，所有打包后的js代码(业务代码，第三方依赖代码，暂时没用的代码)，会在首页全部加载，这就会影响到首页加载速度(即首页白屏)，`代码分离可以分出更小的bundle`，控制`资源加载优先级`，提供`代码的加载性能`。



Webpack常用的代码分离方式

- [ ] `入口起点`：使用entry手动分离代码，配置多入口(比较少用)
- [ ] `防止重复`，使用enrty Dependecies去重和分离代码
- [ ] `动态导入`：通过模块的内联函数调用来分离代码



### 多入口分包(比较少用)

多入口的目的是将每个入口文件和其依赖的内容打包到不同的文件里，并不是放在同一个bundle.js中

**多入口`手动分包`：配置两个入口，出口名动态设置**

![image-20231028144601851](https://gitee.com/zhengdashun/pic_bed/raw/master/img/image-20231028144601851.png)

**缺点：如果两个入口文件里，依赖了同一个库，那么这个库会被打包多次。造成性能浪费**

**解决方式：告诉webpack某些包是这些入口文件里共享的。它会被单独打包到一个bundle.js中**

![image-20231028145446701](https://gitee.com/zhengdashun/pic_bed/raw/master/img/image-20231028145446701.png)



### 动态导入

> 比如有个模块bar.js，我们希望在代码运行中，如某个条件成立时，才加载该模块。因为我们`不确定这个模块中的代码一定会用到`，所以最好`拆分成一个独立的js文件`，这样就可以保证`不被用到时，浏览器不需要加载和处理该文件的js代码`。这时候就可以使用动态导入。

**最常见的场景：路由组件的动态导入，会被拆分成独立的js文件**

webpack提供两种动态导入的方式

- `import()语法`(import函数也是最推荐的方式)  
-  `require.ensure`（不推荐使用）

**一般来说，对于动态导入的文件，我们会将其称为chunk**

![image-20231028150656604](https://gitee.com/zhengdashun/pic_bed/raw/master/img/image-20231028150656604.png)

**它会被拆分成两个独立的js文件，在首屏加载的时候，根本没有加载该两个js文件，只有满足条件(点击btn1或者btn2)才会加载对应的js**

**对每个包单独进行命名**

```js
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: false,
  output: {
    path: path.resolve(__dirname, './build'),
    //placeholder
    filename: '[name]-bundle.js',
    clean: true,
    //单独针对分包的文件（即导入的文件）进行命名
    chunkFilename: '[id]_[name]_chunk.js'
  },
 }
```



### SplitChunks   插件分包

> 对于一些第三方库，如果不做处理，那么默认会被打包到bundle.js文件中，会让bundle.js特别大，影响首屏加载速率。

这是一种`默认安装和集成的插件`，只需要提供SplitChunksPlugin相关的配置信息即可实现一种分包方式，将其单独打包到一个vendor.js中。

| 属性     | 值                                                           | 作用                                                         |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| chunks   | all、`async(默认)`                                           | 默认只对异步import()导入的进行分包，all对于所有的进行分包    |
| chunkIds | natural、`named`(推荐开发环境)、`deterministic`(webpack5中才支持，推荐生产环境) | 按照数字的顺序使用ID、development下的默认值，一个可读的ID、确定性的不同编译中不变的数字 |



**chunks : async （可以对异步导入的包进行拆包）**

```js
//优化配置
  optimization: {
    splitChunks: {
      //默认只对异步import()导入的进行分包
      // chunks:'async'
      chunks: 'all',
      //当一个包大于指定的大小时，继续进行拆包。对包大小的控制(不是很重要)
      maxSize: 20000,
      //将包拆分成不小于多少kb
      minSize: 10000,
      //自己对需要进行拆包的内容进行分组
            cacheGroups: {
                utils: {
                    test: /utils/,
                    filename: 'js/[id]_utils.js',
                },
            },
    }
  }
```

![image-20231028152701433](https://gitee.com/zhengdashun/pic_bed/raw/master/img/image-20231028152701433.png)

**成功实现将react，axios等第三方库分包到vendros.js中**



***



![image-20231110143635001](https://gitee.com/zhengdashun/pic_bed/raw/master/img/image-20231110143635001.png)

**将utils下的文件单独打包到一个vendor.js中，不再直接打包到主包里**



***



### Prefetch和Preload

webpack v4.6.0+ 增加了 `对预获取和预加载的支持`

声明import时，使用:

- `prefetch`（预获取）: 被用于**懒加载策略**。它会在**浏览器空闲**时，即浏览器已经加载主要资源并且有**剩余带宽**时，开始加载。这意味着它不会影响初始页面加载时间，因为它是在**后台加载**的。通常用于加载将来可能需要的资源，例如懒加载的代码块或其他不太紧急的资源。

- `preload`（预加载）: 用于**立即加载重要资源**。它会在当前页面加载时立即开始加载，而不管浏览器的空闲状态如何。因此，`preload`可能会**影响初始页面加载性能**，因为它可以竞争主要资源的带宽。通常用于加载当前页面渲染所必需的**关键资源**，如**字体、样式表或脚本**。



```js
btn1.onclick = () => {
    //使用import函数，动态导入，会被单独打包到一个js文件中
    import(
        /*webpackPrefetch:true*/     //预获取是以一种注释的方式
        './router/about'
    )
}
```

**与prefetch指令相比，preload指令有许多不同：**

- preload chunk会在父chunk加载时，以并行方式开始加载，prefetch chunk会在父chunk 加载结束后开始加载
- preload chunk具有中等优先级，并立即下载。prefetch chunk 在浏览器闲置时下载。
- preload chunk会在父chunk中立即请求，用于当下时刻。prefetch chunk会用于未来的某个时刻



***



## CDN

CDN：内容分发网络，它是指通过相互连接的网络系统，利用最靠近每个用户的服务器，更快更可靠的将文件发送给用户。



开发中使用CDN的两种方式：

​	1、打包所有的静态资源，放到CDN服务器，用户所有资源通过CDN获取

​    2、一些第三方资源放到CDN服务器上









## CSS优化

> webpack默认只能打包处理js文件，对于其他类型的文件需要配置对应的loader。同时，默认情况下，css会被webpack打包到主包里，会导致主包很大

**注意：loader的加载顺序是从下往上，从后往前进行加载的**

![image-20231110141604254](https://gitee.com/zhengdashun/pic_bed/raw/master/img/image-20231110141604254.png) 

```
pnpm add style-loader css-loader -D
```

![image-20231110141937316](C:\Users\01427334\AppData\Roaming\Typora\typora-user-images\image-20231110141937316.png) **必须css-loader在右边**



***

### CSS提取

**安装插件 ** 

```php
pnpm add mini-css-extract-plugin -D  
```

```js
//配置loader
            {
                test: /\.css$/,
                //style-loader的作用：将转化后的css文件通过js创建style标签的方式插入到html文档中  (用于开发环境)
                //MiniCssExtractPlugin.loader：将css文件放到对应文件夹中，并在html中生成link标签导入css样式 (常用于生成环境)
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
                
//配置plugin
        plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name]_css.css',
            //对于动态导入的css文件进行命名，并放到对应文件夹中import('./xx.css')
            chunkFilename: 'css/[name]_chunk.css', 
        }),
    ],
```

![image-20231110143842917](https://gitee.com/zhengdashun/pic_bed/raw/master/img/image-20231110143842917.png) 



### CSS压缩

```
pnpm add css-minimizer-webpack-plugin -D
```

```js
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'js/[name]_[hash]_bundle.js',
        clean: true,
        chunkFilename: '[chunkhash]_chunk.js',
    },
    optimization: {
        minimize: true,
        minimizer: [
            //CSS压缩的插件：CSSMinimizerPlugin
            new CssMinimizerPlugin(),
        ],
    },
}
```



***



## 代码压缩

### Terser

> 作用：Terser可以帮助我们压缩、丑化代码，让我们的bunlde.js更小。

默认情况下，webpack只会从入口文件开始，分析模块之间的依赖关系，进行打包，最后生成一个bundle.js中，`不会对代码进行任何的压缩`

**之所以我们可以看到压缩后的代码，它底层默认使用了`TerserPlugin插件`，对代码进行了压缩和丑化**

(过去我们会使用`uglify-js`来压缩丑化代码，目前已经不再维护了，且不支持es6语法，因此现在用的大部分都是`TerserPlugin`)

**注意：Terser和babel一样，都是独立的工具，我们可以在loader中配置babel-loader，对ts代码或者js代码进行转化。也可以在plugin中配置TerserPlugin，进行代码丑化和压缩**



**安装：**

```
pnpm add terser -D
```

**使用：**

- [x] 我们可以和babel一样，直接在命令行中使用terser

  ```
  terser js/field.js -o foo.
  ```

- [x] Terser在webpack中配置

  > 在webpack中有一个minimizer属性，在`production`模式下，默认就是使用`TerserPlugin`来处理我们的代码，帮助我们进行代码压缩
  
  **安装：**
  
  ```
  pnpm add css-minimizer-webpack-plugin -D
  pnpm add terser-webpack-plugin -D
  ```

```js
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
    mode: 'development',
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'js/[name]_[hash]_bundle.js',
        clean: true,
        chunkFilename: '[chunkhash]_chunk.js',
    },
    optimization: {
        minimize: true,
        minimizer: [
            //JS压缩的插件：TerserPlugin
            new TerserPlugin()
            //CSS压缩的插件：CSSMinimizerPlugin
            new CssMinimizerPlugin(),
        ],
    },
}
```



***



### TreeShaking

`作用：告诉Terser哪些模块中的代码没被用到，可以直接被删除`

- 方案①：**在dev环境下配合Terser开启treeshaking**

  只需要在 **optimization**中配置 **usedExports:true**即可

  ```js
  module.exports = {
      mode: 'development',
      devServer: {
          static: ['content'],
      },
      plugins: [],
      optimization: {
          usedExports: true,
      },
  }
  
  ```

  `注意：prod环境中默认是配置好的，所以无需手动配置`



- 方案②： **sideEffect(副作用)**，不结合Terser使用

  > sideEffect用于告知webpack compiler哪些模块有`副作用`。副作用的意思是☞模块里面的代码有执行一些特殊的任务，`不能仅仅通过export`来判断这段代码是否有意义

  



# Webpack  [hash]

> 在外面给打包文件进行命名的时候，会使用到以下几个placeholder

- [hash] ：hash是通过MD4的散列函数处理，生成一个128位的hash值 (转成了32位的16进制)

- [contenthash]： 根据内容进行打包，如果内容改变(即内容不同)，就会重新发生一个hash值，如果`仅仅main.js`中代码被修改，

  直接导入的`css文件内部未发生改变`，那么`生成的css文件的contenthash值`不会变化。

- [chunkhash]： 它会根据不同的入口进行解析生成hash值。只要任何一个包发生变化，所有的文件chunkhash都会变化

- [name]

- [id]

**结论：尽量使用`contenthash`，减少文件的变化**

> 只有包的名字和整个项目有关系，才用hash，或者和项目里所有依赖有关系，才用chunkhash

```js
module.exports = {
    mode: 'development',
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'js/[name]_[hash]_bundle.js',
        clean: true,
    },
}
```







# Webpack抽取配置文件

## 基础

- 在项目根目录下，创建config文件夹，配置对应的common.config.js

- package.json中，根据不同的命令使用不同的配置文件

  ```
      "scripts": {
          "test": "echo \"Error: no test specified\" && exit 1",
          "build": "webpack --config ./config/common.config.js --env production"
      },
  ```



- **重点：** webpack默认导致的是一个js对象module.exports={} , 但是也可以**导出一个函数**，函数的`返回值必须是配置对象`，同时webpack会往函数的参数列表中`添加一个env的参数`。同时**package.json中要配置对应的env参数**

  ```js
  module.exports = function (env) {
      console.log(env)
      const isProduction = env.production
      if (isProduction) {
          //生产环境
          console.log('生产环境')
      } else {
      }
      return commonConfig
  }
  
  ```

  ![image-20231111153428856](https://gitee.com/zhengdashun/pic_bed/raw/master/img/image-20231111153428856.png) 



## 分离

将公有的拆分到common.config.js中，将devServer配置在dev.config.js中等等。

![image-20231111162227515](https://gitee.com/zhengdashun/pic_bed/raw/master/img/image-20231111162227515.png) ![image-20231111162236268](https://gitee.com/zhengdashun/pic_bed/raw/master/img/image-20231111162236268.png) 

![image-20231111162208426](https://gitee.com/zhengdashun/pic_bed/raw/master/img/image-20231111162208426.png)



## 合并

**安装插件**

```js
pnpm add webpack-merge 
```

```js
在common.config.js中导出的函数里进行合并
module.exports = function (env) {
    console.log(env)
    const isProduction = env.production
    let mergeConfig = isProduction ? prodConfig : devConfig
    return merge(commonConfig, mergeConfig)
}

```



## 优化

比如说dev环境中，我们想用的是style-loader，但是prod环境中，我们需要用MiniCssExtractPlugin.loader，这时候可以把commonConfig配置成一个函数，传入isProduction。以此判断

```js
const getCommonConfig = function (isProduction) {
    return {
        entry: './src/main.js',
        output: {
            path: path.resolve(__dirname, '../build'),
            filename: 'js/[name]_[hash]_bundle.js',
            clean: true,
            chunkFilename: 'js/[chunkhash]_chunk.js',
        },
        resolve: {
            extensions: ['.js'],
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    //重点在这
                    use: [isProduction ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader'],
                },
            ],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'css/[name]_[contenthash].css',
                chunkFilename: 'css/[name]_chunk.css',
            }),
            new HtmlWebpackPlugin({
                template: './index.html',
            }),
        ],
    }
}

module.exports = function (env) {
    console.log(env)
    const isProduction = env.production
    let mergeConfig = isProduction ? prodConfig : devConfig
    return merge(getCommonConfig(isProduction), mergeConfig)
}

```





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