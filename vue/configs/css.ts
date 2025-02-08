import type { UserConfig } from 'vite'

const arcoDesignVars = {
  // 浅色/白底悬浮
  'primary-1': '#F5E8FF',
  // 文字禁用
  'primary-2': '#D6B2F4',
  // 一般禁用
  'primary-3': '#B67FE9',
  // 特殊场景
  'primary-4': '#9551DE',
  // 悬浮
  'primary-5': '#7426D3',
  // 一般
  'primary-6': '#5400C8',
  // 点击（按下）
  'primary-7': '#4100A9',

  'dark-primary-1': '#16004D',
  'dark-primary-2': '#24036B',
  'dark-primary-3': '#35088A',
  'dark-primary-4': '#4A0FA9',
  'dark-primary-5': '#6218C8',
  'dark-primary-6': '#7120D3',
  'dark-primary-7': '#924BDE',

  'border-radius-small': '5px',
}

export const cssConfig: UserConfig['css'] = {
  devSourcemap: true,
  preprocessorOptions: {
    less: {
      javascriptEnabled: true,
      modifyVars: arcoDesignVars,
    },
  },
}
