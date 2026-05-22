import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import sitemap from 'vite-plugin-sitemap';

const MARKET_CITIES = [
  'miami', 'brickell', 'coral-gables', 'miami-beach', 'aventura',
  'weston', 'doral', 'fort-lauderdale', 'boca-raton', 'west-palm-beach',
  'downtown-miami', 'edgewater', 'wynwood', 'coconut-grove', 'key-biscayne',
  'pinecrest', 'kendall', 'homestead', 'north-miami', 'hallandale',
  'pembroke-pines',
];

const DYNAMIC_ROUTES = MARKET_CITIES.map((city) => `/market/${city}`);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [
      react(),
      tailwindcss(),
      sitemap({
        hostname: 'https://homesprofessional.com',
        dynamicRoutes: DYNAMIC_ROUTES,
        exclude: [],
        generateRobotsTxt: false,
        outDir: 'dist',
        readable: true,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date(),
      }),
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
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
