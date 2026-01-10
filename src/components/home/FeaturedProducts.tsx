import { useNavigate } from 'react-router-dom';
import { ArrowRight, Package } from 'lucide-react';
import Card from '../Card';
import Button from '../Button';
import SectionHeader from '../SectionHeader';
import { PRODUCT_CATEGORIES } from '../../constants';

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
          {featuredProducts.map((product) => (
            <Card key={product.id} hover className="group cursor-pointer" onClick={() => navigate(`/products/${product.slug}`)}>
              <div className="aspect-video  rounded-lg mb-6 flex items-center justify-center">
                {/* <Package className="text-neutral-400 group-hover:text-primary transition-colors" size={64} /> */}
                <img src={product.img} alt="" style={{width:"100%"}}/>
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
