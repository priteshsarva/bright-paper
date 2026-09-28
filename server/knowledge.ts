/**
 * Grounding facts for the chatbot. Kept free of image imports so this file can
 * run outside the browser bundle. Mirrors PRODUCT_DATA in src/pages/ProductDetail.tsx
 * and COMPANY_INFO in src/constants/index.ts — update both together.
 */

interface ProductFacts {
  name: string;
  slug: string;
  gsm: string;
  sizes: string;
  notes: string[];
  applications: string[];
}

const PRODUCTS: ProductFacts[] = [
  {
    name: 'Duplex Board',
    slug: 'duplex-board',
    gsm: '200-450 GSM',
    sizes: 'Custom sizes available',
    notes: ['Coated & uncoated', 'White or grey back', 'Moisture resistant'],
    applications: ['Packaging boxes', 'Cartons', 'Display materials', 'Book covers'],
  },
  {
    name: 'Recycled Kraft Paper',
    slug: 'recycled-kraft-paper',
    gsm: '60-300 GSM',
    sizes: 'Standard & custom',
    notes: ['Natural, bleached, semi-bleached', 'Brown / white / natural', 'Recyclable and biodegradable'],
    applications: ['Shopping bags', 'Corrugated boxes', 'Cement bags', 'Food packaging'],
  },
  {
    name: 'Art Paper',
    slug: 'art-paper',
    gsm: '90-350 GSM',
    sizes: 'Standard & custom',
    notes: ['Gloss, matte, satin', 'Double sided coating (C2S)', 'Brightness 91%+'],
    applications: ['Brochures and flyers', 'Magazines', 'Calendars', 'Art books'],
  },
  {
    name: 'Kappa Board',
    slug: 'kappa-board',
    gsm: '600-2500 GSM',
    sizes: 'Custom sheets available',
    notes: ['Thickness 1mm - 4mm', 'Grey', 'Extreme rigidity'],
    applications: ['Hardcover book binding', 'Luxury rigid boxes', 'Game boards', 'Album covers'],
  },
  {
    name: 'Virgin Kraft Paper',
    slug: 'virgin-paper',
    gsm: '80-250 GSM',
    sizes: 'A4, A3, custom',
    notes: ['100% virgin pulp', 'Brightness 90-95%', 'Matte or glossy'],
    applications: ['Premium packaging', 'Printing materials', 'Labels', 'Stationery'],
  },
  {
    name: 'FBB (Folding Box Board)',
    slug: 'fbb',
    gsm: '200-400 GSM',
    sizes: 'Custom available',
    notes: ['Single & double coated', 'High gloss or matte', 'Food-grade options'],
    applications: ['Pharmaceutical packaging', 'Cosmetic boxes', 'Food packaging', 'Gift boxes'],
  },
  {
    name: 'SBS (Solid Bleached Sulfate)',
    slug: 'sbs',
    gsm: '200-450 GSM',
    sizes: 'Standard & custom',
    notes: ['Brightness 92-95%', 'C1S / C2S coating', 'Food-safe options'],
    applications: ['Premium packaging', 'Point-of-sale displays', 'Greeting cards', 'High-end labels'],
  },
];

export const PRODUCT_NAMES = PRODUCTS.map((p) => p.name);

const COMPANY = `Bright Paper — premium paper products for sustainable packaging.
Established 2007. Serves 28 cities across India, 500+ dealers, 50,000 tons annual turnover.
Address: Plot no 128/129, 2nd floor, Laxminarayan Industrial Estate, BRC Compound,
opposite Daksheshwar Mahadev Temple, Udhana-Pandesara, Surat, Gujarat 394210, India.
Phone / WhatsApp: +91 63579 12345. Email: info@brightpaper.co.in.
Business hours: Monday to Saturday, 9:00 AM - 6:00 PM. Closed Sunday.`;

export function buildKnowledge(): string {
  const catalogue = PRODUCTS.map(
    (p) =>
      `## ${p.name}\n` +
      `- GSM range: ${p.gsm}\n` +
      `- Sizes: ${p.sizes}\n` +
      `- Details: ${p.notes.join('; ')}\n` +
      `- Typical uses: ${p.applications.join(', ')}\n` +
      `- Page: /products/${p.slug}`,
  ).join('\n\n');

  return `# Company\n${COMPANY}\n\n# Product catalogue\n\n${catalogue}`;
}

/** The catalogue as a numbered list, one product per line. */
export const PRODUCT_LIST = PRODUCTS.map((p, i) => `${i + 1}. ${p.name}`).join('\n');