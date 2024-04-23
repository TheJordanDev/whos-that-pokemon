import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'data-json': ['src/data/poke/generations.ts','src/data/poke/generation-i.json', 'src/data/poke/generation-ii.json', 'src/data/poke/generation-iii.json', 'src/data/poke/generation-iv.json', 'src/data/poke/generation-v.json', 'src/data/poke/generation-vi.json', 'src/data/poke/generation-vii.json', 'src/data/poke/generation-viii.json', 'src/data/poke/generation-ix.json'],
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
});
