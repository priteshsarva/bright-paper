import { useState } from 'react';
import { X, Image as ImageIcon } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import SectionHeader from '../components/SectionHeader';
import { GALLERY_CATEGORIES } from '../constants';

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const placeholderImages = [
    { id: 1, category: 'applications', title: 'Packaging Applications', description: 'Premium packaging solutions' },
    { id: 2, category: 'textures', title: 'Paper Texture', description: 'High-quality paper finish' },
    { id: 3, category: 'manufacturing', title: 'Manufacturing Process', description: 'State-of-the-art facilities' },
    { id: 4, category: 'finished-products', title: 'Finished Products', description: 'Ready to deliver' },
    { id: 5, category: 'applications', title: 'Industrial Use', description: 'Wide range of applications' },
    { id: 6, category: 'textures', title: 'Kraft Texture', description: 'Natural kraft finish' },
    { id: 7, category: 'manufacturing', title: 'Quality Control', description: 'Rigorous quality checks' },
    { id: 8, category: 'finished-products', title: 'Product Range', description: 'Diverse product offerings' },
    { id: 9, category: 'applications', title: 'Retail Packaging', description: 'Consumer-ready packaging' },
  ];

  const filteredImages = selectedCategory === 'all'
    ? placeholderImages
    : placeholderImages.filter(img => img.category === selectedCategory);

  return (
    <div>
      <section className="bg-gradient-to-br from-primary-50 to-white py-16">
        <PageWrapper>
          <SectionHeader
            title="Gallery"
            subtitle="Explore our range of products, applications, and manufacturing excellence"
          />
        </PageWrapper>
      </section>

      <PageWrapper>
        <section className="py-16">
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {GALLERY_CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.slug)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  selectedCategory === category.slug
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
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className="group relative aspect-video bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-lg overflow-hidden cursor-pointer shadow-soft hover:shadow-medium transition-all"
                  onClick={() => setLightboxImage(image.title)}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ImageIcon className="text-neutral-400 group-hover:text-primary transition-colors" size={64} />
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

          <div className="mt-16 bg-gradient-to-br from-secondary-50 to-white rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">
              Product Images Coming Soon
            </h3>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              We are currently updating our gallery with high-quality images of our products, manufacturing facilities, and applications. Please check back soon or contact us for specific product images.
            </p>
          </div>
        </section>
      </PageWrapper>

      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-primary transition-colors"
            onClick={() => setLightboxImage(null)}
          >
            <X size={32} />
          </button>
          <div className="max-w-5xl w-full aspect-video bg-gradient-to-br from-neutral-200 to-neutral-300 rounded-lg flex items-center justify-center">
            <div className="text-center text-neutral-600">
              <ImageIcon size={80} className="mx-auto mb-4" />
              <p className="text-xl font-semibold">{lightboxImage}</p>
              <p className="text-sm mt-2">Image placeholder</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
