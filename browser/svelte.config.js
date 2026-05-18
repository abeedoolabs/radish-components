import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: 'index.html'
    }),
    alias: {
      '@abeedoo/radish-components': '../src/lib',
      '@abeedoo/radish-components/*': '../src/lib/*'
    }
  }
};

export default config;
