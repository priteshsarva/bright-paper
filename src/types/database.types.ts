export interface InquirySubmission {
  id?: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  inquiry_type: 'Bulk Order' | 'Dealer Partnership';
  product_interest?: string;
  quantity?: string;
  timestamp?: string;
  status?: string;
}

export interface GalleryMetadata {
  id?: string;
  image_path: string;
  category: string;
  subcategory?: string;
  title: string;
  description?: string;
  alt_text: string;
}

export interface Product {
  id?: string;
  name: string;
  description: string;
  gsm_options: string[];
  size_options: string[];
  features_json: string[];
  applications_json: string[];
  image_path?: string;
  category?: string;
}
