import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

// NOTE: The sitemap is maintained by hand at public/sitemap.xml so it can carry
// per-URL priorities and EN/ES hreflang alternates that vite-plugin-sitemap does
// not emit. Vite copies public/ into dist/ on build, so that file ships as-is.
// When adding or removing routes/journal posts, update public/sitemap.xml and the
// react-snap include list in package.json together.

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
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
