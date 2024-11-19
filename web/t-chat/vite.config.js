import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    proxy: {
      "/api": {
        // 匹配的路径
        target: "http://localhost:3200", // 后端服务器地址
        changeOrigin: true, // 是否更改请求源，解决跨域问题
        // rewrite: (path) => path.replace(/^\/api/, ""), // 去掉请求路径中的 '/api'
      },
    },
  },
  resolve: {
    // 配置路径别名
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
