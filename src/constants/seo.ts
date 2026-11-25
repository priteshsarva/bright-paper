// Search-engine titles and descriptions for every page. Edit wording here only.
// Titles: keep under ~60 characters. Descriptions: ~140-160 characters.

export const SITE_URL = 'https://brightpaper.co.in';
export const SITE_NAME = 'Bright Paper';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export const PAGE_SEO = {
  home: {
    title: 'Bright Paper | Paper & Board Supplier in Surat',
    description:
      'Bright Paper, Surat: super stockist of FBB, SBS, duplex board, kraft paper, art paper and kappa board. Custom sheet and reel sizes, delivered across India.',
  },
  about: {
    title: 'About Bright Paper | Paper Supplier in Surat Since 2007',
    description:
      'Since 2007 Bright Paper has supplied premium paper and board from Surat to 500+ customers in 28 cities, with a dedicated cutting centre for custom sheet and reel sizes.',
  },
  products: {
    title: 'Paper & Board Products: FBB, SBS, Duplex, Kraft | Bright Paper',
    description:
      'Browse FBB, SBS, duplex board, virgin and recycled kraft paper, art paper and kappa board from Bright Paper, Surat. Custom sizes and bulk supply across India.',
  },
  gallery: {
    title: 'Gallery | Bright Paper, Surat',
    description:
      'Photos of Bright Paper products, packaging applications and our team in Surat, Gujarat.',
  },
  services: {
    title: 'Paper Cutting, Supply & Distribution Services | Bright Paper',
    description:
      'Custom sheet and reel cutting, just-in-time delivery and super stockist supply of paper and board from Surat to businesses across India.',
  },
  contact: {
    title: 'Contact Bright Paper | Paper Supplier in Udhna, Surat',
    description:
      'Call +91 63579 12345 or email info@brightpaper.co.in for bulk orders and quotes. Visit us at Laxminarayan Industrial Estate, Udhna-Pandesara, Surat, Gujarat.',
  },
} as const;

/** Title and description for a product detail page. */
export function productSeo(name: string, description: string) {
  return {
    title: `${name} Supplier in Surat | Bright Paper`,
    description: `${description.replace(/\.$/, '')}. Buy ${name} from Bright Paper, Surat, in custom sheet and reel sizes with bulk supply across India.`,
  };
}
