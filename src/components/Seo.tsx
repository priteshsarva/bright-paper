import { useEffect } from 'react';
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from '../constants/seo';

interface SeoProps {
  title: string;
  description: string;
  /** Path like "/products/fbb". Defaults to the current path. */
  path?: string;
  /** Keep the page out of search results (visiting cards, QR pages). */
  noindex?: boolean;
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = href;
}

/**
 * Per-page title, description, canonical URL and social-preview tags.
 * The site is a client-rendered SPA, so these are set when the page mounts.
 */
export default function Seo({ title, description, path, noindex = false }: SeoProps) {
  useEffect(() => {
    const url = SITE_URL + (path ?? window.location.pathname);

    document.title = title;
    setMeta('name', 'description', description);
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');
    setCanonical(url);

    setMeta('property', 'og:site_name', SITE_NAME);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', DEFAULT_OG_IMAGE);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', DEFAULT_OG_IMAGE);
  }, [title, description, path, noindex]);

  return null;
}
