import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false
  },
  server: {
    allowedHosts: ['.ngrok-free.app', '.ngrok.io', '.ngrok.app'],
    proxy: {
      '/api': 'http://localhost:3001'
    }
  }
});
