import { useState } from 'react';
import { X, Image as ImageIcon } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import SectionHeader from '../components/SectionHeader';
import { GALLERY_CATEGORIES } from '../constants';
import backgroundImage from '../assets/images/bgOfAllheaders.jpeg';
import img1 from '../assets/images/gallery/Scan2026-01-20_181525-compressed.jpg';
import img2 from '../assets/images/gallery/WhatsApp Image 2026-01-21 at 11.52.27 AM.jpeg';
import img3 from '../assets/images/gallery/WhatsApp Image 2026-01-21 at 11.52.34 AM.jpeg';
import img4 from '../assets/images/gallery/award.jpeg';
import img5 from '../assets/images/gallery/WhatsApp Image 2026-01-22 at 12.54.39 PM.jpeg';
import img6 from '../assets/images/gallery/WhatsApp Image 2026-01-22 at 12.54.50 PM.jpeg';
import img7 from '../assets/images/gallery/Gemini_Generated_Image_ft9klsft9klsft9k.png';
// import img8 from '../assets/images/gallery/8.jpeg';
// import img9 from '../assets/images/gallery/9.jpeg'; 
// import img10 from '../assets/images/gallery/10.jpeg';
// import img11 from '../assets/images/gallery/11.jpeg';
// import img12 from '../assets/images/gallery/12.jpeg';
// import img13 from '../assets/images/gallery/13.jpeg';
// import img14 from '../assets/images/gallery/14.jpeg';
// import img15 from '../assets/images/gallery/15.jpeg';
// import img16 from '../assets/images/gallery/16.jpeg';
// import img17 from '../assets/images/gallery/17.jpeg';
// import img18 from '../assets/images/gallery/18.jpeg';
// import img19 from '../assets/images/gallery/19.jpeg';
// import img20 from '../assets/images/gallery/20.jpeg';
// import img21 from '../assets/images/gallery/21.jpeg';
// import img22 from '../assets/images/gallery/22.jpeg';
// import img23 from '../assets/images/gallery/23.jpeg';
// import img24 from '../assets/images/gallery/24.jpeg';
// import img25 from '../assets/images/gallery/25.jpeg';
// import img26 from '../assets/images/gallery/16.jpeg';

import AnimatedImage from '../components/AnimatedImage';

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  // const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<typeof placeholderImages[0] | null>(null);

  const placeholderImages = [
    { id: 1, category: 'applicationsaaa', title: 'Certificate of Dealership', description: '', url: img1 },
    { id: 2, category: 'team', title: 'Our Team', description: '', url: img2 },
    { id: 3, category: 'team', title: 'Our Team', description: '', url: img3 },
    { id: 4, category: 'finished-products', title: 'Achievement', description: '', url: img4 },
    { id: 5, category: 'applications', title: 'OFFSET PRINTING MACHINE', description: '', url: img5 },
    { id: 6, category: 'applications', title: 'RIGID BOX', description: '', url: img6 },
    { id: 7, category: 'applications', title: 'CORROGATION MACHINE', description: '', url: img7 },
    // { id: 8, category: 'finished-products', title: 'Retail Packaging', description: 'Attractive retail packaging', url: img8 },
    // { id: 9, category: 'applications', title: 'Industrial Use', description: 'Durable paper for industrial applications', url: img9 },
    // { id: 10, category: 'textures', title: 'Recycled Paper Texture', description: 'Eco-friendly recycled paper', url: img10 },
    // { id: 11, category: 'manufacturing', title: 'Quality Control', description: 'Rigorous quality control process', url: img11 },
    // { id: 12, category: 'finished-products', title: 'Luxury Paper Products', description: 'Premium luxury paper items', url: img12 },
    // { id: 13, category: 'applications', title: 'Food Packaging', description: 'Safe and reliable food packaging', url: img13 },
    // { id: 14, category: 'textures', title: 'Textured Paper Close-up', description: 'Detailed view of textured paper', url: img14 },
    // { id: 15, category: 'manufacturing', title: 'Eco-friendly Production', description: 'Sustainable manufacturing practices', url: img15 },
    // { id: 16, category: 'finished-products', title: 'Custom Printed Paper', description: 'Vibrant custom printed paper products', url: img16 },
    // { id: 17, category: 'applications', title: 'Medical Packaging', description: 'Sterile medical packaging solutions', url: img17 },
    // { id: 18, category: 'textures', title: 'Rough Paper Surface', description: 'Natural rough paper texture', url: img18 },
    // { id: 19, category: 'manufacturing', title: 'Automated Machinery', description: 'Cutting-edge automated machinery', url: img19 },
    // { id: 20, category: 'finished-products', title: 'Eco-friendly Products', description: 'Sustainable paper products', url: img20 },
    // { id: 21, category: 'applications', title: 'E-commerce Packaging', description: 'Durable e-commerce packaging solutions', url: img21 },
    // { id: 22, category: 'textures', title: 'Fine Paper Texture', description: 'Elegant fine paper close-up', url: img22 },
    // { id: 23, category: 'manufacturing', title: 'Skilled Workforce', description: 'Experienced manufacturing team', url: img23 },
    // { id: 24, category: 'finished-products', title: 'Artistic Paper Products', description: 'Creative artistic paper items', url: img24 },
    // { id: 25, category: 'applications', title: 'Gift Wrapping Paper', description: 'Attractive gift wrapping solutions', url: img25 },
    // { id: 26, category: 'textures', title: 'Coated Paper Surface', description: 'High-gloss coated paper texture', url: img26 },

  ];

  const filteredImages = selectedCategory === 'all'
    ? placeholderImages
    : placeholderImages.filter(img => img.category === selectedCategory);

  return (
    <div>
      <section className="relative bg-gradient-to-br from-primary-50 to-white py-16 overflow-hidden">
        <img
          src={backgroundImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-100 blur-[0px] z-0"
        />
        <div className="relative z-10">
          <PageWrapper>
            <SectionHeader
              title="Gallery"
              subtitle="Explore our range of products, applications, and manufacturing excellence"
            />
          </PageWrapper>
        </div>
      </section>

      <PageWrapper>
        <section className="py-16">
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {GALLERY_CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.slug)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${selectedCategory === category.slug
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-neutral-700 hover:bg-neutral-50 shadow-soft'
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {filteredImages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((image, index) => (
                <div
                  key={image.id}
                  className="group relative aspect-video bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-lg overflow-hidden cursor-pointer shadow-soft hover:shadow-medium transition-all"
                  // 2. Pass the ENTIRE image object, not just image.title
                  onClick={() => setLightboxImage(image)}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <AnimatedImage
                      src={image.url}
                      alt={image.title}
                      className="w-full h-full object-cover"
                      containerClassName="w-full h-full"
                      shine
                      delay={index * 0.05}
                      threshold={0.1}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-bold mb-1">{image.title}</h3>
                      <p className="text-sm text-white/90">{image.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <ImageIcon className="text-neutral-400 mx-auto mb-4" size={64} />
              <p className="text-xl text-neutral-600">No images found in this category</p>
            </div>
          )}

          {/* <div className="mt-16 bg-gradient-to-br from-secondary-50 to-white rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">
              Product Images Coming Soon
            </h3>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              We are currently updating our gallery with high-quality images of our products, manufacturing facilities, and applications. Please check back soon or contact us for specific product images.
            </p>
          </div> */}
        </section>
      </PageWrapper>

      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-primary transition-colors z-50"
            onClick={() => setLightboxImage(null)}
          >
            <X size={32} />
          </button>

          {/* 3. Updated Lightbox Content to show the actual image */}
          <div
            className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking the image itself
          >
            <img
              src={lightboxImage.url}
              alt={lightboxImage.title}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />

            {/* Optional: Show Title/Description below lightbox image */}
            <div className="mt-4 text-center text-white">
              <h3 className="text-2xl font-bold">{lightboxImage.title}</h3>
              {lightboxImage.description && (
                <p className="text-neutral-300 mt-2">{lightboxImage.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
