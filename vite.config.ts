import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Trang chạy tại https://<tài-khoản>.github.io/hanchan/ nên mọi đường dẫn file
  // phải bắt đầu bằng /hanchan/. Nếu sau này đổi sang tên miền riêng, đặt lại thành '/'.
  base: '/hanchan/',
  server: {
    port: 1607,
  },
  preview: {
    port: 1607,
  },
})
