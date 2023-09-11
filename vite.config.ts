import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': '/src/views/components',
      '@pages': '/src/views/pages',
      '@layouts': '/src/views/layouts',
      '@assets': '/src/assets',
      '@config': '/src/app/config',
      '@constants': '/src/app/constants',
      '@contexts': '/src/app/contexts',
      '@hooks': '/src/app/hooks',
      '@interfaces': '/src/app/interfaces',
      '@services': '/src/app/services',
      '@utils': '/src/app/utils',
    },
  },
});
