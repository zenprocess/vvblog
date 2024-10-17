import { getCollection } from 'astro:content';

const website = "https://vals-thoughts.pages.dev";

export async function GET({ site }) {
  const blogEntries = await getCollection('blog');
  const pages = await Astro.glob('./*.astro');

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map((page) => {
          const path = page.url || '';
          return `
        <url>
          <loc>${website}${path}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
        </url>`;
        })
        .join('')}
      ${blogEntries
        .map((entry) => {
          return `
        <url>
          <loc>${website}/blog/${entry.slug}</loc>
          <lastmod>${new Date(entry.data.date).toISOString()}</lastmod>
        </url>`;
        })
        .join('')}
    </urlset>`.trim();

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
