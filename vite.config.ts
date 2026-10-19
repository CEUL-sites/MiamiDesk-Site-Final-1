import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

// Route assets are generated from src/main.tsx and the journal index in prebuild.

export default defineConfig(({ mode }) => {
  loadEnv(mode, '.', '');
  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    define: {},
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      target: 'es2019',
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom', 'react-router-dom'],
            'vendor-motion': ['motion'],
            'vendor-ui': ['react-helmet-async', 'lucide-react'],
          },
        },
      },
    },
    server: {
      allowedHosts: ["terminal.local"],
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
