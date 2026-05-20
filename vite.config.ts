import { defineConfig } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import path from 'path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'development' ? '/' : '/iacm/',
  build: {
    outDir: mode === 'development' ? 'dist' : 'dist/iacm',
    emptyOutDir: true,
  },
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],  server: {
    watch: {
      usePolling: true,
    },
    host: true, // needed for the Docker Container port mapping to work
    strictPort: true,
    port: 3000,
  },
  preview: {
    host: true,
    strictPort: true,
    port: 3000,
  },
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
}));
