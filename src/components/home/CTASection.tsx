import { useNavigate } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';
import Button from '../Button';

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gradient-to-br from-primary to-primary-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <Mail className="text-white mx-auto mb-6" size={64} />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-10 leading-relaxed">
            Contact us today for bulk orders, dealer partnerships, or to learn more about our premium paper products
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate('/contact')}
              className="bg-white text-primary hover:bg-neutral-100 shadow-lg"
            >
              Submit Inquiry
              <ArrowRight className="inline ml-2" size={20} />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/products')}
              className="border-white text-white hover:bg-white hover:text-primary"
            >
              Browse Products
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
