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
      transformIndexHtml(html) {
        let reuslt = html.replace(
          /<script type="module" id="transformTag"(.*?)<\/script>/,
          `<script type="module" id="transformTag" src="${
            nodeType === 'single' ? '/src/scripts/buildEntry.ts' : '/src/main.ts'
          }"></script>`,
        );
        return reuslt;
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
