import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import jumpCode from 'vite-plugin-jump-code'
import postCssPxToRem from 'postcss-pxtorem'

const host = {
  test: 'http://test.amau.cn',
  prod: 'http://dln.zhihechat.com',
}

export default defineConfig(({ command, mode, ssrBuild }) => {
  console.log('defineConfig:', mode, command, ssrBuild)
  return {
    base: '/chatfire',
    plugins: [jumpCode(), vue()],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      }
    },

    css: {
      // css预处理器
      preprocessorOptions: {
        scss: {
          additionalData: '@import "./src/styles/var.scss";'
        }
      },
      // postcss: {
      //   plugins: [
      //     postCssPxToRem({
      //       rootValue: 16,
      //       unitPrecision: 3, //允许REM单位增长到的十进制数字,小数点后保留的位数。
      //       propList: ['*'],
      //       // selectorBlackList: ['el']
      //     })
      //   ]
      // }
    },
    server: {
      proxy: {
        '/saas': {
          target: `${host[mode]}/zhihe-saas`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/saas/, ''),
        },
        '/fileapi': {
          target: 'http://jupyter.skyman.cloud:37777',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/fileapi/, ''),
        },
        '/chatapi': {
          target: 'https://api.chatllm.vip',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/chatapi/, ''),
        }
      }
    }
  }
})
