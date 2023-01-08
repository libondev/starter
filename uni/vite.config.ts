import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import presetUno from '@unocss/preset-mini'
import unocss from '@unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    AutoImport({
      dts: true,
      imports: ['vue']
    }),
    Components({
      dts: true
    }),
    unocss({
      presets: [
        presetUno()
      ]
    }),
  ],
});
