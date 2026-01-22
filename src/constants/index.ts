import duplex from '../assets/images/duplexboard.jpg'
import craftpaper from '../assets/images/craftpaper.jpg'
import virginPaper from '../assets/images/1.jfif'
import SBS from '../assets/images/SBS.jfif'
import FBB from '../assets/images/FBB.jfif'
import { Twitter } from 'lucide-react'
import artPaper from '../assets/images/artpaper.jpg'
import kappaBoard from '../assets/images/kappaboard-4.jpg'
import VIRGINKRAFT from '../assets/images/VIRGIN KRAFT.jpg'



export const COMPANY_INFO = {
  name: 'Bright Paper',
  tagline: 'Your Trusted Partner in Quality Paper Products',
  establishedYear: 2007,
  citiesServed: 28,
  dealerCount: '500+',
  turnover: '50,000 Tons',
  email: 'mail-info@brightpaper.co.in',
  phone: '+916357012345',
  whatsapp: '916357012345',
  socialLinks: {
    // Twitter: 'https://twitter.com/yourprofile',
    instagram: 'https://www.instagram.com/brightpaper_company',
    // linkedin: 'https://linkedin.com/in/yourprofile',
    github: '',
  },
  address: {
    street: 'Plot no 128/129, 2nd floor, Laxminarayan industrial estate, BRC compound, Opp Daksheshwar mahadev temple, Udhana-pandesara',
    city: 'Surat',
    state: 'Gujarat',
    country: 'India',
    pincode: '394210',
    mapLink: 'https://maps.app.goo.gl/hcsx4hvK3T4ftKdu7'
  },
  businessHours: {
    weekdays: 'Monday - Saturday: 9:00 AM - 6:00 PM',
    sunday: 'Sunday: Closed'
  }
};

export const PRODUCT_CATEGORIES = [
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
  },
  {
    id: 'virgin-paper',
    name: 'Virgin Kraft Paper',
    slug: 'virgin-paper',
    description: 'High-grade virgin paper products',
    img: VIRGINKRAFT
  },
  {
    id: 'duplex-board',
    name: 'Duplex Board',
    slug: 'duplex-board',
    description: 'Premium quality duplex board for packaging solutions',
    img: virginPaper
  },
  {
    id: 'recycled-kraft-paper',
    name: 'Recycled Kraft Paper',
    slug: 'recycled-kraft-paper',
    description: 'Durable kraft paper for various industrial applications',
    img: craftpaper
  },
  {
    id: 'Art-Paper',
    name: 'Art Paper',
    slug: 'art-paper',
    description: 'Ultra-smooth coated paper for high-quality printing',
    img: artPaper
  },
  {
    id: 'Kappa-Board',
    name: 'Kappa Board',
    slug: 'kappa-board',
    description: 'Heavy-duty stiff board for rigid packaging needs',
    img: kappaBoard
  },
];

export const GALLERY_CATEGORIES = [
  { id: 'all', name: 'All', slug: 'all' },
  { id: 'applications', name: 'Applications', slug: 'applications' },
  { id: 'team', name: 'Team', slug: 'team' },
  // { id: 'manufacturing', name: 'Manufacturing', slug: 'manufacturing' },
  // { id: 'finished-products', name: 'Finished Products', slug: 'finished-products' }
];

export const NAVIGATION_MENU = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  {
    name: 'Products',
    path: '/products',
    submenu: [
      { name: 'All Products', path: '/products' },
      { name: 'FBB', path: '/products/fbb' },
      { name: 'SBS', path: '/products/sbs' },
      { name: 'Virgin Kraft Paper', path: '/products/virgin-paper' },
      { name: 'Duplex Board', path: '/products/duplex-board' },
      { name: 'Recycled kraft paper', path: '/products/recycled-kraft-paper' },
      { name: 'Art Paper', path: '/products/art-paper' },
      { name: 'Kappa Board', path: '/products/kappa-board ' },
    ]
  },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Services', path: '/services' },
  { name: 'Contact', path: '/contact' }
];

export const KEY_METRICS = [
  { label: 'Annual Turnover', value: '50,000 Tons', icon: 'TrendingUp' },
  { label: 'Active Clients', value: '500+', icon: 'Users' },
  { label: 'Cities Served', value: 'Cities', icon: 'MapPin' },
  { label: 'Years of Excellence', value: '19+', icon: 'Award' }
];

export const INQUIRY_TYPES = [
  { value: 'Bulk Order', label: 'Bulk Order Inquiry' },
  { value: 'Dealer Partnership', label: 'Dealer Partnership' }
];
