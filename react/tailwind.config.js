/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'selector', // 使用选择器模式
  darkModeSelector: '[theme-mode="dark"]', // 指定我们的自定义属性作为暗色模式选择器
  theme: {
    extend: {
      // 这里可以添加自定义主题扩展
    },
  },
  plugins: [],
}
