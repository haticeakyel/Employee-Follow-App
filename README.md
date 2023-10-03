# 使用 Vue 模板开发
-----------------------------

更多 Vue 开发技巧和学习指南可参考[AUI 移动组件](https://open-doc.welink.huaweicloud.com/docs/vueui/index.html#/mobile/zh-CN/component/guide)。

使用 WeLink Vue 开发框架可以快速构建和开发 We 码程序，基于 npm + webpack + Vue + hooks + weui 的快速开发本地化的框架。

<li style="list-style-type:disc;">遵循 WeLink 目录规范，构建项目时会生成遵循 WeLink 目录规范的目录。
<li style="list-style-type:disc;">集成了 WeLink JSAPI，构建项目时会自动引入 JSAPI。
<li style="list-style-type:disc;">基于 weui，适配 WeLink 风格。</li>

### 目录结构

- [新建项目](#新建项目)
- [工程目录](#工程目录)
  - [引入图片和文件](#引入图片和文件)
  - [common 文件夹的使用](#common文件夹的使用)
    - [引入公共组件、三方库资源](#引入公共组件、三方库资源)
  - [添加路由](#添加路由)
    - [路由跳转](#路由跳转)
  - [样式引用](#样式引用)
  - [使用标准UI组件](#使用标准ui组件)
  - [国际化](#国际化)
  - [创建新页面](#创建新页面)
  - [真机调试](#真机调试)

### 新建项目

通过 IDE **新建项目**，选择项目类型 “**Vue 模板**”。

### 工程目录

项目文件结构如下：

```text
|—— build
│   ├── common                         // JS API公共文件目录
          ├── /html/                   // html文件
          ├── /js/                     // JS API脚本文件
          ├── /css/                    // 公共组件库样式文件
          ├── /assets/                 // 资源目录
               ├── /images/            // 公共图片资源
               ├── /media/             // 公共媒体资源
│   └── apps                           // 开发的We码应用包文件目录
          ├── /local/                  // 应用名称
               ├── /0/                 // 应用的构建环境。打包时，cli 会打包该文件夹下的文件
                    ├── /html/         // 应用的html文件
                    ├── /js/           // 应用的js文件
                    ├── /css/          // 应用的css样式文件
└───.wecode/                           // eslint代码检查配置
    └───plugin.json                    // We码相关的配置信息
├───public/                            // 静态资源目录，内容会直接拷贝到打包目录中
├───src/                               // 源代码目录
    ├───common                         // 公共资源，包括 css/js  等
        └───css/
    ├───components/                    // 组件
    ├───config/                        // 配置项，包括 api 等
    ├───i18n/                          // 国际化
        ├─── zh_CN                     // 中文国际化
          └─── common.json
        └─── en_US                     // 英文国际化
          └─── common.json
        └─── index.js
    ├───router/                        // 路由
        └─── index.js
    ├───store/                         // store，页面数据按模块存储
        └─── modules/
        ├─── global.js
        └─── index.js
    ├───utils/                         // 提供一些小工具
    ├───views/                         // 页面
    ├───App.vue/                       // 主页
    ├───index.html                     // 主页 html
    └───main.js                        // webpack 打包入口
```

### 引入图片和文件

使用静态模块，比如图片和样式等，通过 Webpack 编译。

可以通过**`import` 引入 JavaScript 模块**，使 Webpack 打包时包含这些文件。
这些文件的路径最终将在 html 自动引用，比如通过图片的 `src` 属性或者通过 `href` 引入样式。

为了减少页面请求，导入的图片小于 1000 bytes 将返回一个data URI替换图片地址。支持格式：bmp, gif, jpg, jpeg, 和 png。

以下有个例子：

```html
<template>
  <div>
    <img :src="backImg"/>
  </div>
</template>

<script>
import backImg from './images/back.png' // Tell Webpack this JS file uses this image

export default {
  data() {
    return {
      backImg
    }
  }
}
</script>
```

当项目构建完，Webpack 会将图片放到 `build` 目录中，以及引用正确的访问地址。

同样适合在 CSS 中：

```css
.Logo {
  background-image: url(./logo.png);
}
```

### common 文件夹的使用

#### 引入公共组件、三方库资源

可以通过 `common` 文件夹引入其他模块代码。

注意，建议使用 JavaScript 文件中的 `import` 引入。
例如，[引入图片和文件](#引入图片和文件)部分。

这种机制提供了许多好处:

- 脚本和样式表被压缩并打包在一起，以避免额外的网络请求。
- 丢失的文件会导致编译错误，而不会造成 404 错误。

### 添加路由

在 `src/router/index.js` 添加配置，如下：

```js
import TemplateIntro from '@/views/vueTemplateIntro'
...

const routes = [
  ...
  {
    path: '/vueTemplateIntro',
    name: 'TemplateIntro',
    component: TemplateIntro
  }
]
```

路由配置完全遵照 Vue 的规范进行配置，先导入组件，然后在 `routes` 数组中添加配置对象即可。

该文件在 `src/main.js` 中已默认引入。当在浏览器中根路径改为 `/vueTemplateIntro` 时，将访问到 `TemplateIntro` 组件。

### 国际化

在 `src/i18n/index.js` 文件中对中文、英文的国际化资源的 JSON 文件进行了合并。然后该文件在 `src/main.js` 中已默认引入。

只需根据需要在 `src/i18n/en_US` 和 `src/i18n/zh_CN` 目录中修改或增加国际化资源即可。

国际化使用时，直接使用 $t('xxx') 对国际化 key 进行转换，如下所示：

```html
<aui-button :text="$t('widget.ok')"></aui-button>
<aui-button>{{ $t('widget.ok') }}</aui-button>
```

### 使用 Vue 组件

在工程的 src/main.js 文件中已全局引用 Vue 组件库 AUI，不需要每个页面都引入组件和局部注册，直接使用即可。如下所示：

```js
import Vue from 'vue';
import App from './App.vue';
import i18n from '@/i18n';
import store from '@/store';
import router from '@/router';
import getLang from './utils/getLang';
import AUI from '@aurora/vue/mobile';

Vue.use(AUI)

function init(i18n) {
  return new Vue({
    el: '#app',
    i18n,
    store,
    router,
    render: h => h(App)
  });
}

// 获取当前app语言参数，并初始化国际化和渲染页面。开发时，mock数据默认返回中文。
getLang()
  .then(language => {
    i18n.locale = language === 'zh' ? 'zh_CN' : 'en_US';
    init(i18n);
  })
  .catch(() => {
    init();
  });
```

``` html
<template>
  <div class="button-wrap">
    <aui-button plain>朴素按钮</aui-button>
    <aui-button type="primary" plain>主要按钮</aui-button>
    <aui-button type="success" plain>成功按钮</aui-button>
    <aui-button type="info" plain>信息按钮</aui-button>
    <aui-button type="warning" plain>警告按钮</aui-button>
    <aui-button type="danger" plain>危险按钮</aui-button>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  }
}
</script>
<style>
.button-wrap {
  padding: 0 10px;
}
.button-wrap .aui-mobile-button:not(:nth-child(3n)) {
  margin-right: 16px;
  margin-bottom: 16px;
}
</style>
```

### 创建新页面

在 `src/views` 中直接新建一个 vue 页面，参照 Vue 语法使用 Vue 组件开发页面即可。

### 真机调试

当新建 `Vue` 项目时，在 `src/index.html` 中默认添加如下代码，是为了方便在真机上打开调试器调试代码，但上传打包项目时不需要删除此代码，因为 `webpack` 打包时会自动过滤此代码。

```html
<body>
   <%= htmlWebpackPlugin.options.vconsole === true ? '<script type="text/javascript" src="../../../../common/js/vconsole.js"></script>' : '' %>
</body>
```
