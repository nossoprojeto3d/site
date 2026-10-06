// @ts-check
import { defineConfig } from 'astro/config';

// Publicado no GitHub Pages em https://nossoprojeto3d.github.io/site/
export default defineConfig({
  site: 'https://nossoprojeto3d.github.io',
  base: '/site',
  devToolbar: { enabled: false },
  // CSS embutido no HTML: o site é pequeno e assim a primeira pintura não espera outro arquivo
  build: { inlineStylesheets: 'always' }
});
