import { useNavigate } from 'react-router-dom';
import { Package, ArrowRight } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import SectionHeader from '../components/SectionHeader';
import Card from '../components/Card';
import Button from '../components/Button';
import { PRODUCT_CATEGORIES } from '../constants';

export default function Products() {
  const navigate = useNavigate();

  return (
    <div>
      <section className="bg-gradient-to-br from-primary-50 to-white py-16">
        <PageWrapper>
          <SectionHeader
            title="Our Products"
            subtitle="Comprehensive range of premium paper products for diverse industrial applications"
          />
        </PageWrapper>
      </section>

      <PageWrapper>
        <section className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCT_CATEGORIES.map((product) => (
              <Card key={product.id} hover className="group cursor-pointer">
                <div className="aspect-video  rounded-lg mb-6 flex items-center justify-center">
                  {/* <Package className="text-neutral-400 group-hover:text-primary transition-colors" size={64} /> */}
                  <img src={product.img} alt="" style={{width:"100%"}}/>
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
              </Card>
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
