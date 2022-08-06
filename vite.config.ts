import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite' // 自动引入ui组件插件
import Components from 'unplugin-vue-components/vite' // 自动引入ui组件插件
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers' // 自动引入ui组件插件
import * as path from 'path' // 解决path引入问题二
// import path from 'path' // 解决path引入问题一,依然报错

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        {
          'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
        },
      ],
    }),
    Components({
      resolvers: [NaiveUiResolver()]
    })
  ],
  resolve: {
    alias: {
    '@': path.resolve(__dirname, 'src')
    }
  }
})
