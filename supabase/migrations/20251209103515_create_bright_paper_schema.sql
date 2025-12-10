/*
  # Create Bright Paper B2B Website Schema

  ## Overview
  Creates three main tables for the Bright Paper B2B website:
  - inquiry_submissions: Store customer inquiries and order requests
  - gallery_metadata: Store image information for gallery display
  - products: Store product catalog information

  ## 1. New Tables

  ### `inquiry_submissions`
  Stores customer inquiries, bulk order requests, and dealer partnership applications
  - `id` (uuid, primary key): Unique identifier
  - `name` (text): Customer's full name
  - `company` (text): Company name
  - `email` (text): Contact email address
  - `phone` (text): Contact phone number
  - `message` (text): Inquiry message details
  - `inquiry_type` (text): Type of inquiry - "Bulk Order" or "Dealer Partnership"
  - `product_interest` (text, optional): Product(s) customer is interested in
  - `quantity` (text, optional): Estimated quantity needed
  - `status` (text): Status of inquiry - defaults to "new"
  - `created_at` (timestamptz): Timestamp of submission

  ### `gallery_metadata`
  Stores metadata for gallery images including categorization and descriptions
  - `id` (uuid, primary key): Unique identifier
  - `image_path` (text): Path to image file in public/images/gallery
  - `category` (text): Main category (e.g., applications, textures, manufacturing, finished-products)
  - `subcategory` (text, optional): Sub-category for filtering
  - `title` (text): Display title for the image
  - `description` (text, optional): Detailed description
  - `alt_text` (text): Accessibility alt text
  - `created_at` (timestamptz): Timestamp of creation

  ### `products`
  Stores product catalog information with specifications and features
  - `id` (uuid, primary key): Unique identifier
  - `name` (text): Product name
  - `description` (text): Product description
  - `category` (text): Product category (e.g., duplex-board, kraft-paper, virgin-paper, fbb, sbs)
  - `gsm_options` (jsonb): Available GSM options as array
  - `size_options` (jsonb): Available size options as array
  - `features_json` (jsonb): Product features as array
  - `applications_json` (jsonb): Product applications as array
  - `image_path` (text, optional): Path to product image
  - `created_at` (timestamptz): Timestamp of creation

  ## 2. Security
  - Enable RLS on all tables
  - Public read access for products and gallery_metadata
  - Public insert access for inquiry_submissions (for form submissions)
  - Authenticated-only access for updates and deletes
*/

-- Create inquiry_submissions table
CREATE TABLE IF NOT EXISTS inquiry_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  company text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  message text NOT NULL,
  inquiry_type text NOT NULL CHECK (inquiry_type IN ('Bulk Order', 'Dealer Partnership')),
  product_interest text,
  quantity text,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

-- Create gallery_metadata table
CREATE TABLE IF NOT EXISTS gallery_metadata (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_path text NOT NULL,
  category text NOT NULL,
  subcategory text,
  title text NOT NULL,
  description text,
  alt_text text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  gsm_options jsonb DEFAULT '[]'::jsonb,
  size_options jsonb DEFAULT '[]'::jsonb,
  features_json jsonb DEFAULT '[]'::jsonb,
  applications_json jsonb DEFAULT '[]'::jsonb,
  image_path text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE inquiry_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- RLS Policies for inquiry_submissions
CREATE POLICY "Anyone can insert inquiries"
  ON inquiry_submissions FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view inquiries"
  ON inquiry_submissions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update inquiries"
  ON inquiry_submissions FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for gallery_metadata
CREATE POLICY "Anyone can view gallery metadata"
  ON gallery_metadata FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Authenticated users can insert gallery metadata"
  ON gallery_metadata FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update gallery metadata"
  ON gallery_metadata FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete gallery metadata"
  ON gallery_metadata FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for products
CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Authenticated users can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update products"
  ON products FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete products"
  ON products FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_inquiry_submissions_created_at ON inquiry_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiry_submissions_status ON inquiry_submissions(status);
CREATE INDEX IF NOT EXISTS idx_gallery_metadata_category ON gallery_metadata(category);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
