<!-- TOC -->

- [简介](#简介)
- [初始化项目](#初始化项目)
- [webpack](#webpack)
- [Babel](#babel)
    - [添加.babelrc 文件](#添加babelrc-文件)
    - [babel 解析装饰器](#babel-解析装饰器)
    - [babel 解析 class 中静态属性](#babel-解析-class-中静态属性)
- [react](#react)
- [antd](#antd)
    - [ant-design](#ant-design)
    - [ant-design-pro](#ant-design-pro)
- [redux react-redux redux-thunk redux-logger redux 中间件 redux-devtools-extension react-hot-loader](#redux-react-redux-redux-thunk-redux-logger-redux-中间件-redux-devtools-extension-react-hot-loader)
- [react-router 的刷新 404 坑](#react-router-的刷新-404-坑)
- [装饰器实现类似 spring 注入 service](#装饰器实现类似-spring-注入-service)
- [postcss css-module](#postcss-css-module)
- [axios](#axios)
- [eslint stylelint](#eslint-stylelint)
- [webpack4 splitChunk 代码分离](#webpack4-splitchunk-代码分离)
- [webpack4 bundle 太大怎么处理，用 webpack-bundle-analyzer 分析，mockjs 移出生产环境经验](#webpack4-bundle-太大怎么处理用-webpack-bundle-analyzer-分析mockjs-移出生产环境经验)
- [webpack4 提取 css 插件 mini-css-extract-plugin](#webpack4-提取-css-插件-mini-css-extract-plugin)
- [webpack4 css 优化压缩插件 optimize-css-assets-webpack-plugin](#webpack4-css-优化压缩插件-optimize-css-assets-webpack-plugin)
- [webpack4 js 优化压缩插件 uglifyjs-webpack-plugin](#webpack4-js-优化压缩插件-uglifyjs-webpack-plugin)
- [CSS Modules 使用技巧](#css-modules-使用技巧)
- [参考资料](#参考资料)

<!-- /TOC -->

# 简介

reactseed 是一个基于 react16、redux、react-route、webpack4、eslint、css-module、postcss、autoprefixer 的脚手架工程

# 初始化项目

```bash
npm init
```

# webpack

```bash
npm i webpack webpack-cli webpack-merge --save-dev
```

参考[**webpack 文档**](https://webpack.js.org/get-started/)编写基础的配置文件 

# Babel

- [**babel-loader**](https://github.com/babel/babel-loader)
- [**@babel/core**](https://github.com/babel/babel/tree/master/packages/babel-core)
- [**@babel/preset-react**](https://github.com/babel/babel/tree/master/packages/babel-preset-react) 用于解析 JSX
- [**@babel/preset-env**](https://github.com/babel/babel/tree/master/packages/babel-preset-env) 用于解析 ES 新特性（ES6 ES7 ES8 等）
- [**@babel/runtime**](https://babel.docschina.org/docs/en/babel-plugin-transform-runtime) 解析 ES 新特性所需环境
- [**@babel/plugin-transform-runtime**](https://babel.docschina.org/docs/en/babel-plugin-transform-runtime) 解析 ES 新特性所需环境

### 添加.babelrc 文件

```js
{
  "presets": ["@babel/preset-react", "@babel/preset-env"],
  "plugins": [
    // 集成await async等ES6、7、8的新特性
    ["@babel/plugin-transform-runtime"]
  ]
}
```

### babel 解析装饰器

```js
{
  "plugins": [
    // 集成装饰器
    ["@babel/plugin-proposal-decorators", { "legacy": true }]
  ]
}
```

### babel 解析 class 中静态属性

[**class 的静态属性**](https://blog.csdn.net/qq_30100043/article/details/53542966)

```js
{
  "plugins": [
    // 集成class中的属性 ES7 有一个静态属性的提案， 目前 Babel 转码器支持 https://blog.csdn.net/qq_30100043/article/details/53542966
    ["@babel/plugin-proposal-class-properties", { "loose": true }]
  ]
}
```

# react

```bash
npm i react react-dom --save-dev
```

参考[**react 中文文档**](https://react.docschina.org/)编写 react 组件

# antd

### ant-design

```bash
npm i antd --save
```

参考[**antd 按需引入**](https://ant.design/docs/react/introduce-cn#%E6%8C%89%E9%9C%80%E5%8A%A0%E8%BD%BD)，修改 babel 文件

```js
{
  "plugins": [
      // 集成antd按需加载
      [
        "import",
        {
          "libraryName": "antd",
          "libraryDirectory": "es",
          "style": "css" // `style: true` 会加载 less 文件
        },
        "antd"
      ]
  ]
}
```

### ant-design-pro

```bash
npm i ant-design-pro --save
```

参考[**ant-design-pro 按需引入**](https://pro.ant.design/docs/use-components-alone-cn#%E6%8C%89%E9%9C%80%E5%8A%A0%E8%BD%BD)，修改 babel 文件

```js
{
  "plugins": [
      // 集成ant-design-pro按需加载
      [
        "import",
        {
          "libraryName": "ant-design-pro",
          "libraryDirectory": "lib",
          "style": "css",
          "camel2DashComponentName": false
        },
        "ant-design-pro"
      ]
  ]
}
```

# redux react-redux redux-thunk redux-logger redux 中间件 redux-devtools-extension react-hot-loader

# react-router 的刷新 404 坑

# 装饰器实现类似 spring 注入 service

# postcss css-module

# axios

# eslint stylelint

# webpack4 splitChunk 代码分离

# webpack4 bundle 太大怎么处理，用 webpack-bundle-analyzer 分析，mockjs 移出生产环境经验

# webpack4 提取 css 插件 mini-css-extract-plugin

# webpack4 css 优化压缩插件 optimize-css-assets-webpack-plugin

# webpack4 js 优化压缩插件 uglifyjs-webpack-plugin

# CSS Modules 使用技巧

CSS Modules 是对现有的 CSS 做减法。为了追求简单可控，作者建议遵循如下原则：

- 不使用选择器，只使用 class 名来定义样式
- 不层叠多个 class，只使用一个 class 把所有样式定义好
- 所有样式通过 composes 组合来实现复用
- 不嵌套

上面两条原则相当于削弱了样式中最灵活的部分，初使用者很难接受。第一条实践起来难度不大，但第二条如果模块状态过多时，class 数量将成倍上升。

上面之所以称为建议，是因为 CSS Modules 并不强制你一定要这么做。听起来有些矛盾，由于多数 CSS 项目存在深厚的历史遗留问题，过多的限制就意味着增加迁移成本和与外部合作的成本。初期使用中肯定需要一些折衷。幸运的是，CSS Modules 这点做的很好：

- 可以但不建议对一个元素使用多个 class
- 可以在 CSS 文件中使用伪类，标签选择器，所有这些选择器将不被转换，原封不动的出现在编译后的 CSS 中。也就是说 CSS Modules 只会转换 class 名和 id 选择器名相关的样式

例：

    .logo {
      height: 60px;
      line-height: 60px;
      margin-left: 24px;
      overflow: hidden;
    }
    .logoText {
      display: inline-block;
      vertical-align: middle;
      font-size: 20px;
      color: #fff;
      margin-left: 5px;
    }
    /* 属性选择器不被转换，编译成[data-text="manager"]*/
    [data-text="manager"] {
      color: #fff;
    }
    /* 标签选择器不被转换，编译成.index__logo__2Bw2v span*/
    .logo span {
      color: #fff;
    }
    .trigger {
      font-size: 18px;
      line-height: 64px;
      padding: 0 24px;
      cursor: pointer;
      transition: color .3s;
    }
    /* 伪类选择器不被转换，编译成.index__trigger__2Bw2v:hover*/
    .trigger:hover {
      color: #1890ff;
    }

# 参考资料

https://github.com/brickspert/blog/issues/1#intro

部署参考:
https://www.jianshu.com/p/09d6440e625f
pm2:
https://www.cnblogs.com/chyingp/p/pm2-documentation.html
github:
https://www.cnblogs.com/zhuyc110/p/6823023.html
mysql:
https://www.cnblogs.com/silentdoer/articles/7258232.html

部署问题：
服务器上 npm run build 提示内存溢出，可以修改 package.json 中，改为 node --max_old_space_size=512 尝试下在服务器打包，如果还是不行，就只能本地打包部署到服务器上去
