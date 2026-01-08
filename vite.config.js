import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Configure path aliases for cleaner imports (e.g., import Component from '@/components/Component')
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  // Development server configuration
  server: {
    port: 3000,
    open: true, // Automatically open the browser
    host: '0.0.0.0', // Allows access from network devices (useful for mobile testing)
  },

  // Build configuration for production optimization
  build: {
    // Target modern browsers supporting ES2020 features
    target: 'es2020',
    outDir: 'dist',
    sourcemap: false, // Disable sourcemaps for faster builds (can be enabled for debugging)
    
    // Manual chunking strategy for better vendor separation and caching
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Group large dependencies like React and ReactDOM into a separate vendor chunk
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor_react';
            }
            // Group all other node modules into a general vendor chunk
            return 'vendor';
          }
        },
      },
    },
  },
});