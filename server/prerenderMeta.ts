import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';
import { allRouteSeo, SITE_URL, DEFAULT_OG_IMAGE } from '../src/constants/seo';

const PRERENDER_DIR = 'prerender';

function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function fileName(routePath: string) {
  return routePath.replace(/^\//, '').replace(/\//g, '--') + '.html';
}

/**
 * The site is a client-rendered SPA, so every URL used to receive the same
 * index.html (home-page title and description) until JavaScript ran. This writes
 * one copy of index.html per public route with that route's own title,
 * description, canonical and social tags, and adds Netlify rewrites (status 200,
 * so the URL does not change) from each route to its copy. Files sit in a flat
 * folder because Netlify adds a trailing-slash redirect to folder index.html files.
 */
export function prerenderMeta(): Plugin {
  let outDir = 'dist';
  return {
    name: 'prerender-route-meta',
    apply: 'build',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      const base = fs.readFileSync(path.join(outDir, 'index.html'), 'utf8');
      fs.mkdirSync(path.join(outDir, PRERENDER_DIR), { recursive: true });
      const rules: string[] = [];

      for (const r of allRouteSeo()) {
        const url = SITE_URL + r.path;
        const head = [
          `<link rel="canonical" href="${url}" />`,
          `<meta property="og:url" content="${url}" />`,
          `<meta name="twitter:title" content="${esc(r.title)}" />`,
          `<meta name="twitter:description" content="${esc(r.description)}" />`,
          `<meta name="twitter:image" content="${DEFAULT_OG_IMAGE}" />`,
        ].join('\n    ');

        const html = base
          .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(r.title)}</title>`)
          .replace(/<meta\s+name="description"[\s\S]*?\/>/, `<meta name="description" content="${esc(r.description)}" />`)
          .replace(/<meta\s+property="og:title"[\s\S]*?\/>/, `<meta property="og:title" content="${esc(r.title)}" />`)
          .replace(/<meta\s+property="og:description"[\s\S]*?\/>/, `<meta property="og:description" content="${esc(r.description)}" />`)
          .replace('</head>', `    ${head}\n  </head>`);

        const file = fileName(r.path);
        fs.writeFileSync(path.join(outDir, PRERENDER_DIR, file), html);
        rules.push(`${r.path}    /${PRERENDER_DIR}/${file}    200`);
      }

      // Insert the rewrites just above the SPA catch-all in _redirects.
      const redirectsPath = path.join(outDir, '_redirects');
      const lines = fs.readFileSync(redirectsPath, 'utf8').split(/\r?\n/);
      const catchAll = lines.findIndex((l) => /^\/\*\s/.test(l.trim()));
      const block = ['# Per-page HTML with the right title/description/canonical (generated at build)', ...rules, ''];
      lines.splice(catchAll === -1 ? lines.length : catchAll, 0, ...block);
      fs.writeFileSync(redirectsPath, lines.join('\n'));

      this.info?.(`prerendered meta for ${rules.length} routes`);
    },
  };
}
