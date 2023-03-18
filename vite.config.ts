import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import fs from 'fs';
import glsl from 'vite-plugin-glsl';
// import inspect from 'vite-plugin-inspect';
// https://vitejs.dev/config/

const nodeType = process.env.NODE_TYPE;
export default defineConfig({
  plugins: [
    vue(),
    glsl(),
    {
      name: 'html-transform',
      // 为什么不使用transformIndexHtml钩子，是因为这个钩子执行时拿到的html结构已经是transform之后的产物了
      buildStart() {
        const rawHtml = fs.readFileSync('./index.html', 'utf-8');
        let reuslt = rawHtml.replace(
          /<script type="module" id="transformTag"(.*?)<\/script>/,
          `<script type="module" id="transformTag" src="${
            nodeType === 'single' ? '/src/scripts/buildEntry.ts' : '/src/main.ts'
          }"></script>`,
        );
        fs.writeFileSync('./index.html', reuslt);
      },
    },
  ],

  resolve: {
    // 别名配置
    alias: {
      '@': path.join(__dirname, 'src'),
    },
  },
});
