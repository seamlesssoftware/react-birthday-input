import { defineConfig } from 'vite'
import path from 'node:path';
import react from '@vitejs/plugin-react-swc'
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),         
    dts({
      rollupTypes: true,
      insertTypesEntry: true,
      include: "./src/lib/"
    }),
  ],
  build: {
    lib: {
        entry: path.resolve(__dirname, 'src/lib/index.ts'),
        name: 'react-birthday-input',
        formats: ['es', 'umd'],
        fileName: (format) => `react-birthday-input.${format}.js`,
    },
    rollupOptions: {
        external: ['react', 'react-dom', 'classnames'],
        output: {
            globals: {
                react: 'React',
                'react-dom': 'ReactDOM',
                'classnames': 'classnames',
            },
        },
    },
},
})
