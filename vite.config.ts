import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  define: { global: 'globalThis' },
  server: {
    host: true,
    port: 3001,
    open: 'http://localhost:3001'
  },
  plugins: [react(), svgr({
    include: '**/*.svg'
  })],
  base: '/mindbox-test/',
  resolve: {
    alias: {
      '@shared': resolve(__dirname, 'src/shared')
    }
  }
})
