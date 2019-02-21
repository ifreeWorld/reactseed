# 简介
reactseed是一个基于react16、redux、react-route、webpack4、eslint、css-module、postcss、autoprefixer的脚手架工程

# CSS Modules 使用技巧
CSS Modules 是对现有的 CSS 做减法。为了追求简单可控，作者建议遵循如下原则：
* 不使用选择器，只使用 class 名来定义样式
* 不层叠多个 class，只使用一个 class 把所有样式定义好
* 所有样式通过 composes 组合来实现复用
* 不嵌套

上面两条原则相当于削弱了样式中最灵活的部分，初使用者很难接受。第一条实践起来难度不大，但第二条如果模块状态过多时，class 数量将成倍上升。

上面之所以称为建议，是因为 CSS Modules 并不强制你一定要这么做。听起来有些矛盾，由于多数 CSS 项目存在深厚的历史遗留问题，过多的限制就意味着增加迁移成本和与外部合作的成本。初期使用中肯定需要一些折衷。幸运的是，CSS Modules 这点做的很好：

* 可以但不建议对一个元素使用多个 class
* 可以在 CSS 文件中使用伪类，标签选择器，所有这些选择器将不被转换，原封不动的出现在编译后的 CSS 中。也就是说 CSS Modules 只会转换 class 名和 id 选择器名相关的样式

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

部署时参考https://www.jianshu.com/p/09d6440e625f