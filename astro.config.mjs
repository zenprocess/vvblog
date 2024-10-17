import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

export default defineConfig({
  site: 'https://vals-thoughts.pages.dev',
  integrations: [react({
    experimentalReactChildren: true,
  })],
  output: 'static'
});
