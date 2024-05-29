import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  easycom: {
    autoscan: true,
    custom: {
      '^wd-(.*)': 'wot-design-uni/components/wd-$1/wd-$1.vue',
      '^(?!z-paging-refresh|z-paging-load-more)z-paging(.*)': 'z-paging/components/z-paging$1/z-paging$1.vue',
    },
  },

  globalStyle: {
    navigationStyle: 'default',
    navigationBarTitleText: 'uni-app',
    navigationBarBackgroundColor: '#f8f8f8',
    navigationBarTextStyle: 'black',
    backgroundColor: '#FFFFFF',
  },

  tabBar: {
    color: '#999',
    selectedColor: '#5400c8',
    backgroundColor: '#ffffff',
    borderStyle: '#ccc',
    height: '50px',
    spacing: '2px', // 图标和文字的上下间距
    fontSize: '12px',
    iconWidth: '20px',
    list: [
      {
        iconPath: 'static/tabbar/home.png',
        selectedIconPath: 'static/tabbar/homeHL.png',
        pagePath: 'pages/workbench/index',
        text: '工作台',
      },
      {
        iconPath: 'static/tabbar/example.png',
        selectedIconPath: 'static/tabbar/exampleHL.png',
        pagePath: 'pages/work-item/index',
        text: '工作项',
      },
      {
        iconPath: 'static/tabbar/example.png',
        selectedIconPath: 'static/tabbar/exampleHL.png',
        pagePath: 'pages/mime/index',
        text: '我的',
      },
    ],
  },
})
