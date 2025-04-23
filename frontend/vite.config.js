import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    cors: true,
    mimeTypes: {
      'application/font-woff2': ['woff2'],
      'application/font-woff': ['woff'],
      'application/font-ttf': ['ttf'],
    },
  },
  assetsInclude: ['**/*.ttf', '**/*.woff', '**/*.woff2'],
});