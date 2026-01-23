import { useNavigate } from 'react-router-dom';
import { ArrowRight, Package } from 'lucide-react';
import Card from '../Card';
import Button from '../Button';
import SectionHeader from '../SectionHeader';
import { PRODUCT_CATEGORIES } from '../../constants';
import AnimatedImage from '../AnimatedImage';

export default function FeaturedProducts() {
  const navigate = useNavigate();
  const featuredProducts = PRODUCT_CATEGORIES;

  return (
    <section className="pt-20 pb-10 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Our Premium Products"
          subtitle="Discover our comprehensive range of high-quality paper products designed for diverse industrial applications"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-12">
          {featuredProducts.map((product, index) => (
            <Card key={product.id} hover className="group cursor-pointer" onClick={() => navigate(`/products/${product.slug}`)}>
              <div className="aspect-square rounded-lg mb-6 flex items-center justify-center overflow-hidden">
                <AnimatedImage
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  containerClassName="w-full h-full"
                  shine
                  direction="scale"
                  delay={index * 0.1}
                />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-primary transition-colors">
                {product.name}
              </h3>
              <p className="text-neutral-600 mb-4">
                {product.description}
              </p>
              <button
                onClick={() => navigate(`/products/${product.slug}`)}
                className="text-primary font-semibold flex items-center group-hover:gap-2 transition-all"
              >
                Learn More
                <ArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" size={18} />
              </button>
            </Card>
          ))}
        </div>

        {/* <div className="text-center">
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate('/products')}
          >
            View All Products
          </Button>
        </div> */}
      </div>
    </section>
  );
}
