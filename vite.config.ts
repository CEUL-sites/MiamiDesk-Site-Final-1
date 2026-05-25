import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import sitemap from 'vite-plugin-sitemap';

const MARKET_CITIES = [
  'weston', 'pembroke-pines', 'plantation', 'miramar', 'miami',
  'coral-gables', 'doral', 'kendall', 'fort-lauderdale', 'hollywood',
  'aventura', 'miami-beach', 'homestead', 'boca-raton', 'coral-springs',
  'parkland', 'miami-lakes', 'hallandale', 'pompano-beach', 'sunrise',
  'brickell',
];

const MARKET_ROUTES = MARKET_CITIES.map((city) => `/market/${city}`);

const STATIC_ROUTES = [
  '/',
  '/sell',
  '/buy',
  '/agents',
  '/spain-desk',
  '/contact',
  '/listings',
  '/about',
  '/privacy',
  '/terms',
  '/es',
  '/es/vender',
  '/es/comprar',
];

// Journal routes — add each new post slug here as posts are published
const JOURNAL_ROUTES = [
  '/journal',
  '/journal/miami-luxury-market-q3-2026',
  '/journal/selling-coral-gables-2026',
];

const DYNAMIC_ROUTES = [...STATIC_ROUTES, ...MARKET_ROUTES, ...JOURNAL_ROUTES];

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
