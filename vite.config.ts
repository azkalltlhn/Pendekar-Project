import path from 'path';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  plugins: [solid(), Icons({ compiler: 'solid' })],
});
