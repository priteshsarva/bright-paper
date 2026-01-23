import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from '../Button';
import TextReveal from '../TextReveal';
import { COMPANY_INFO } from '../../constants';
import heroBg from '../../assets/images/heropageimage.jpg';

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative bg-gradient-to-br from-neutral-50 to-neutral-100 py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-50">
        <div className="absolute inset-0" style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(3px)',
          // backgroundImage: 'linear-gradient(30deg, #FF6B35 12%, transparent 12.5%, transparent 87%, #FF6B35 87.5%, #FF6B35), linear-gradient(150deg, #FF6B35 12%, transparent 12.5%, transparent 87%, #FF6B35 87.5%, #FF6B35), linear-gradient(30deg, #FF6B35 12%, transparent 12.5%, transparent 87%, #FF6B35 87.5%, #FF6B35), linear-gradient(150deg, #FF6B35 12%, transparent 12.5%, transparent 87%, #FF6B35 87.5%, #FF6B35)',
          // backgroundSize: '80px 140px',
          // backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-900 mb-6 leading-tight">
            <TextReveal text="Premium Paper Products for" />
            <span className="text-primary block mt-2">
              <TextReveal text="Sustainable Packaging" delay={0.5} />
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-neutral-600 mb-8 leading-relaxed">
            Serving across India since {COMPANY_INFO.establishedYear}
          </p>
          <p className="text-lg text-neutral-500 mb-10 max-w-2xl mx-auto">
            Your trusted partner in quality duplex board, kraft paper, and sustainable packaging solutions
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => navigate('/products')}
              className="group"
            >
              Explore Products
              <ArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/contact')}
            >
              Request Quote
            </Button>
          </div>

          {/* <div className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {COMPANY_INFO.turnover}
              </div>
              <div className="text-sm md:text-base text-neutral-600">Annual Turnover</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {COMPANY_INFO.dealerCount}
              </div>
              <div className="text-sm md:text-base text-neutral-600">Active Dealers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {COMPANY_INFO.citiesServed}+
              </div>
              <div className="text-sm md:text-base text-neutral-600">Cities Served</div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
