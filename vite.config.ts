import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react']
  },
  build: {
    target: 'es2015',
    minify: 'esbuild', // Faster than terser
    sourcemap: false,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ui-icons': ['lucide-react'],
          'data-utils': ['xlsx', 'papaparse']
        }
      }
    }
  },
  server: {
    port: 3000,
    hmr: {
      overlay: false
    }
  },
  esbuild: {
    drop: ['console', 'debugger']
  }
});
