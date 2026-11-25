import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import SectionHeader from '../components/SectionHeader';
import Card from '../components/Card';
import Button from '../components/Button';
import { PRODUCT_CATEGORIES } from '../constants';
import backgroundImage from '../assets/images/bgOfAllheaders.jpeg';
import Reveal from '../components/Reveal';
import Seo from '../components/Seo';
import { PAGE_SEO } from '../constants/seo';


export default function Products() {
  const navigate = useNavigate();

  return (
    <div>
      <Seo {...PAGE_SEO.products} />
      <section className="relative bg-gradient-to-br from-primary-50 to-white py-16 overflow-hidden">
        <img
          src={backgroundImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-100 blur-[0px] z-0"
        />
        <div className="relative z-10">
          <PageWrapper>
            <SectionHeader
              as="h1"
              title="Our Products"
              subtitle="Comprehensive range of premium paper products for diverse industrial applications"
            />
          </PageWrapper>
        </div>
      </section>

      <PageWrapper>
        <section className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCT_CATEGORIES.map((product, index) => (
              <Reveal
                key={product.id}
                index={index}
                className="group h-full cursor-pointer"
                onClick={() => navigate(`/products/${product.slug}`)}
              >
              <Card hover className="relative h-full overflow-hidden bg-white">
                <div className="aspect-square rounded-lg mb-6 flex items-center justify-center overflow-hidden">
                  <img
                    src={product.img}
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-3 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-neutral-600 mb-6">
                  {product.description}
                </p>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => navigate(`/products/${product.slug}`)}
                  className="group-hover:bg-primary group-hover:text-white group-hover:border-primary"
                >
                  View Details
                  <ArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </Button>
                <span className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-primary-600 transition-all duration-500 ease-out group-hover:w-full" />
              </Card>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 bg-gradient-to-br from-secondary-50 to-white rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Need a Custom Solution?
            </h2>
            <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
              Our team can help you find the perfect paper product for your specific requirements. Contact us for personalized recommendations and bulk pricing.
            </p>
            <Button size="lg" onClick={() => navigate('/contact')}>
              Get in Touch
            </Button>
          </div>
        </section>
      </PageWrapper>
    </div>
  );
}
