
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      allow: [
        // Allow serving files from 'node_modules' and the project directory
        './',
        'C:/Users/Amal Antony/OneDrive/Desktop/libtracker/node_modules'
      ]
    }
  }
});
