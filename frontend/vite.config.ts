import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    https: {
      key: fs.readFileSync('./server.key'),
      cert: fs.readFileSync('./server.crt'),
    },
  },
  preview: {
    proxy: {
      '/v1': {
        target: 'https://localhost:7592',
        changeOrigin: true,
        secure: false,
      },
    },
    https: false,
    port: 7593,
  },
});
