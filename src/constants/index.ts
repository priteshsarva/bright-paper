import duplex from '../assets/images/duplexboard.jpg'
import craftpaper from '../assets/images/craftpaper.jpg'
import virginPaper from '../assets/images/1.jfif'
import SBS from '../assets/images/SBS.jfif'
import FBB from '../assets/images/FBB.jfif'



export const COMPANY_INFO = {
  name: 'Bright Paper',
  tagline: 'Your Trusted Partner in Quality Paper Products',
  establishedYear: 2007,
  citiesServed: 28,
  dealerCount: '4,000+',
  turnover: '7,000 Cr',
  email: 'crm@brightpaper.co.in',
  phone: '+91-XXXXXXXXXX',
  whatsapp: '91XXXXXXXXXX',
  address: {
    street: 'Your Address Line',
    city: 'Surat',
    state: 'Gujarat',
    country: 'India',
    pincode: 'XXXXXX'
  },
  businessHours: {
    weekdays: 'Monday - Saturday: 9:00 AM - 6:00 PM',
    sunday: 'Sunday: Closed'
  }
};

export const PRODUCT_CATEGORIES = [
  {
    id: 'duplex-board',
    name: 'Duplex Board',
    slug: 'duplex-board',
    description: 'Premium quality duplex board for packaging solutions',
    img: duplex
  },
  {
    id: 'kraft-paper',
    name: 'Kraft Paper',
    slug: 'kraft-paper',
    description: 'Durable kraft paper for various industrial applications',
    img: craftpaper
  },
  {
    id: 'virgin-paper',
    name: 'Virgin Paper',
    slug: 'virgin-paper',
    description: 'High-grade virgin paper products',
    img: virginPaper
  },
  {
    id: 'fbb',
    name: 'FBB (Folding Box Board)',
    slug: 'fbb',
    description: 'Premium folding box board for packaging',
    img: FBB
  },
  {
    id: 'sbs',
    name: 'SBS (Solid Bleached Sulfate)',
    slug: 'sbs',
    description: 'High-quality solid bleached sulfate board',
    img: SBS
  }
];

export const GALLERY_CATEGORIES = [
  { id: 'all', name: 'All', slug: 'all' },
  { id: 'applications', name: 'Applications', slug: 'applications' },
  { id: 'textures', name: 'Textures', slug: 'textures' },
  { id: 'manufacturing', name: 'Manufacturing', slug: 'manufacturing' },
  { id: 'finished-products', name: 'Finished Products', slug: 'finished-products' }
];

export const NAVIGATION_MENU = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  {
    name: 'Products',
    path: '/products',
    submenu: [
      { name: 'All Products', path: '/products' },
      { name: 'Duplex Board', path: '/products/duplex-board' },
      { name: 'Kraft Paper', path: '/products/kraft-paper' },
      { name: 'Virgin Paper', path: '/products/virgin-paper' },
      { name: 'FBB', path: '/products/fbb' },
      { name: 'SBS', path: '/products/sbs' }
    ]
  },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Services', path: '/services' },
  { name: 'Contact', path: '/contact' }
];

export const KEY_METRICS = [
  { label: 'Annual Turnover', value: '7,000 Cr', icon: 'TrendingUp' },
  { label: 'Active Dealers', value: '4,000+', icon: 'Users' },
  { label: 'Cities Served', value: '28+', icon: 'MapPin' },
  { label: 'Years of Excellence', value: '18+', icon: 'Award' }
];

export const INQUIRY_TYPES = [
  { value: 'Bulk Order', label: 'Bulk Order Inquiry' },
  { value: 'Dealer Partnership', label: 'Dealer Partnership' }
];
