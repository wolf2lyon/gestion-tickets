import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base:"https://wolf2lyon.github.io/gestion-tickets/",
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
