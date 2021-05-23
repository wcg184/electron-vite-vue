require('dotenv').config({ path: join(__dirname, '.env') })

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { join } from 'path'
import { builtins } from './script/utils'
import electron from 'vitejs-plugin-electron'

const root = join(__dirname, 'src/render')

export default defineConfig(env => {
  const isserve = env.command === 'serve'

  return {
    plugins: [
      vue(),
      isserve && electron({}),
    ].filter(Boolean),
    root,
    base: './', // index.html 中静态资源加载位置
    server: {
      port: +process.env.PORT,
    },
    resolve: {
      alias: {
        '@render': join(__dirname, 'src/render'),
        '@main': join(__dirname, 'src/main'),
        '@src': join(__dirname, 'src'),
        '@root': __dirname,
      },
    },
    optimizeDeps: {
      exclude: [
        'electron',
      ],
    },
    build: {
      outDir: join(__dirname, 'dist/render'),
      emptyOutDir: true,
      minify: false,
      commonjsOptions: {},
      assetsDir: '', // 相对路径 加载问题
      sourcemap: true,
      rollupOptions: {
        external: [
          ...builtins(),
          'electron',
        ],
        output: {
          format: 'cjs',
        },
      },
    },
  }
})
