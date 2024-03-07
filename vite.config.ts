import { defineConfig } from 'vite'
import path from 'node:path';
import react from '@vitejs/plugin-react-swc'
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    dts({
      rollupTypes: true,
      insertTypesEntry: true,
      include: "./src/lib/"
    }),
  ],
  build: {
    copyPublicDir: false,
    lib: {
        entry: path.resolve(__dirname, 'src/lib/index.ts'),
        name: 'react-birthday-input',
        formats: ['es'],
        fileName: (format) => `react-birthday-input.${format}.js`,
    },
    rollupOptions: {
        external: ['react', 'react-dom', 'react/jsx-runtime', 'classnames'],
    },
},
})
