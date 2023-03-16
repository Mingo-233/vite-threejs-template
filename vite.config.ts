import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import glsl from "vite-plugin-glsl";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), glsl()],
  resolve: {
    // 别名配置
    alias: {
      "@": path.join(__dirname, "src"),
    },
  },
});
