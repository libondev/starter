<!-- <p align="center">
  <a href="https://codercup.github.io/unibest/" target="_blank">📱 DEMO 地址</a>
  <span style="margin:0 10px;">|</span>
  <a href="https://codercup.github.io/unibest-docs/" target="_blank">📖 文档地址</a>
</p> -->

## ⚙️ 环境

- node>=18
- pnpm>=7.30

## 📦 运行（支持热更新）

- web平台： `pnpm dev:h5`, 然后打开 [http://localhost:9000/](http://localhost:9000/)。
- weixin平台：`pnpm dev:mp-weixin` 然后打开微信开发者工具，导入本地文件夹，选择本项目的`dist/dev/mp-weixin` 文件。
- APP平台：`pnpm dev:app`, 然后打开 `HBuilderX`，导入刚刚生成的`dist/dev/app` 文件夹，选择运行到模拟器(开发时优先使用)，或者运行的安卓/ios基座。

## 🔗 发布

- web平台： `pnpm build:h5`，打包后的文件在 `dist/build/h5`，可以放到web服务器，如nginx运行。如果最终不是放在根目录，可以在 `manifest.config.ts` 文件的 `h5.router.base` 属性进行修改。
- weixin平台：`pnpm build:mp-weixin`, 打包后的文件在 `dist/build/mp-weixin`，然后通过微信开发者工具导入，并点击右上角的“上传”按钮进行上传。
- APP平台：`pnpm build:app`, 然后打开 `HBuilderX`，导入刚刚生成的`dist/build/app` 文件夹，选择发行 - APP云打包。

## 修改 tabbar
在 `pages.config.js` 中修改 `tabBar.list` 属性即可
增删改底部 tabBar 菜单

## 将其他页面设置为首页
在想要修改的页面中增加一个 `type="home"` 属性即可(记得去掉之前的页面的 `type="home"` 属性)

## 不想要页面中自带的顶部导航栏?
在 `route.style` 下面增加 `navigationStyle: custom` 即可

## 组件库文档
[wot design uni](https://wot-design-uni.pages.dev/component/button.html)
