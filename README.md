# Bright Paper B2B Website

A modern, professional B2B website for Bright Paper - a leading paper products supplier in India serving 28+ cities since 2007.

## Features

### Core Pages
- **Home**: Hero section, key metrics, featured products, MD's message, and call-to-action
- **About**: Company story, timeline, mission/vision, core values, and achievements
- **Products**: Product catalog with detailed pages for each product category
  - Duplex Board
  - Kraft Paper
  - Virgin Paper
  - FBB (Folding Box Board)
  - SBS (Solid Bleached Sulfate)
- **Gallery**: Image gallery with category filtering and lightbox view
- **Services**: Service offerings, nationwide distribution, and industries served
- **Contact**: Contact information and inquiry form with Supabase integration

### Technical Features
- Responsive design optimized for all devices
- Custom brand colors (Orange/Terracotta primary, Forest Green secondary)
- Modern typography using system fonts
- React Router for seamless navigation
- Supabase database integration
- Email notifications via Edge Functions
- Form validation and error handling
- Animated UI elements and transitions

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom theme
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Database**: Supabase (PostgreSQL)
- **Email**: Supabase Edge Functions with SMTP
- **Build Tool**: Vite

## Project Structure

```
bright-paper-website/
├── public/
│   └── images/
│       ├── hero/              # Hero section backgrounds
│       ├── team/              # Team photos
│       ├── testimonials/      # Testimonial images
│       ├── gallery/           # Gallery images
│       │   ├── applications/
│       │   ├── textures/
│       │   ├── manufacturing/
│       │   └── finished-products/
│       └── products/          # Product images
│           ├── duplex-board/
│           ├── kraft-paper/
│           ├── virgin-paper/
│           ├── fbb/
│           └── sbs/
├── src/
│   ├── components/
│   │   ├── home/             # Homepage components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── FormInput.tsx
│   │   ├── SectionHeader.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── PageWrapper.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Products.tsx
│   │   ├── ProductDetail.tsx
│   │   ├── Gallery.tsx
│   │   ├── Services.tsx
│   │   └── Contact.tsx
│   ├── types/
│   │   └── database.types.ts
│   ├── utils/
│   │   └── supabase.ts
│   ├── constants/
│   │   └── index.ts
│   ├── App.tsx
│   └── main.tsx
├── supabase/
│   └── functions/
│       └── send-inquiry-email/  # Email notification function
├── .env.example
├── SETUP.txt                     # Detailed setup guide
└── README.md
```

## Database Schema

### Tables

**inquiry_submissions**
- Stores customer inquiries and order requests
- Fields: name, company, email, phone, message, inquiry_type, product_interest, quantity, status

**gallery_metadata**
- Stores image metadata for gallery categorization
- Fields: image_path, category, subcategory, title, description, alt_text

**products**
- Stores product catalog information
- Fields: name, description, category, gsm_options, size_options, features_json, applications_json, image_path

All tables have Row Level Security (RLS) enabled with appropriate policies.

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create .env file:
   ```bash
   cp .env.example .env
   ```

4. Update .env with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. Start development server:
   ```bash
   npm run dev
   ```

6. Open http://localhost:5173 in your browser

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

## Configuration

### Company Information
Update company details in `src/constants/index.ts`:
- Company name, tagline, established year
- Contact information (email, phone, WhatsApp)
- Address details
- Business hours
- Key metrics (turnover, dealer count, cities served)

### Product Information
Customize product categories and details in:
- `src/constants/index.ts` - Product categories
- `src/pages/ProductDetail.tsx` - Product specifications and features

### Images
Replace placeholder images with actual product photos:
1. Add images to appropriate subdirectories in `public/images/`
2. Update image references in components if needed
3. Optionally add metadata to `gallery_metadata` table

### Email Notifications
Configure SMTP settings in Supabase Edge Function secrets:
- SMTP_HOST
- SMTP_PORT
- SMTP_USER
- SMTP_PASSWORD
- SMTP_FROM_EMAIL
- SMTP_TO_EMAIL

See `SETUP.txt` for detailed SMTP configuration instructions.

## Color Scheme

- **Primary (Orange/Terracotta)**: #FF6B35 - Used for CTAs, headings, and primary actions
- **Secondary (Forest Green)**: #2D5016 - Used for sustainability messaging and secondary elements
- **Neutral Grays**: Clean backgrounds and text
- **White**: Premium feel and clean layouts

## Key Features

### Homepage
- Compelling hero section with company metrics
- Animated key statistics
- Featured product carousel
- MD's message with leadership photo
- Why Choose Us section highlighting sustainability
- Call-to-action for bulk orders

### Product Pages
- Comprehensive product specifications
- Key features and applications
- Request quote functionality
- Related products navigation

### Contact Form
- Inquiry type selection (Bulk Order / Dealer Partnership)
- Product interest and quantity fields
- Real-time validation
- Supabase integration for data storage
- Email notifications to customer and admin

### Responsive Design
- Mobile-first approach
- Hamburger menu for mobile devices
- Touch-friendly buttons and interactions
- Optimized images for different screen sizes

## Support

For detailed setup instructions, see `SETUP.txt`.

For issues or questions, contact: crm@brightpaper.co.in

## License

Copyright © 2024 Bright Paper. All rights reserved.
