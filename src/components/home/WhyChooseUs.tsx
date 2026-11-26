import { CheckCircle, Leaf, Shield, Truck, Award, Users, Warehouse, TimerReset } from 'lucide-react';
import Card from '../Card';
import SectionHeader from '../SectionHeader';
import Reveal from '../Reveal';
import { COMPANY_INFO } from '../../constants';
import whyChooseUs from '../../assets/images/types of papers.jpeg';

export default function WhyChooseUs() {

  const features = [
    {
      icon: CheckCircle,
      title: 'Premium Quality',
      description: 'Certified products meeting international standards for all industrial applications',
      color: 'text-primary',
      tile: 'bg-primary-50 group-hover:bg-primary'
    },
    {
      icon: Leaf,
      title: 'Sustainable Practices',
      description: 'Committed to eco-friendly manufacturing and sustainable sourcing',
      color: 'text-secondary',
      tile: 'bg-secondary-50 group-hover:bg-secondary'
    },
    {
      icon: Shield,
      title: 'Trusted by Thousands',
      description: '500+ satisfied customers across India trust our products',
      color: 'text-primary',
      tile: 'bg-primary-50 group-hover:bg-primary'
    },
    {
      icon: Truck,
      title: 'Nationwide Distribution',
      description: 'Efficient delivery network across the nation with timely service',
      color: 'text-secondary',
      tile: 'bg-secondary-50 group-hover:bg-secondary'
    },
    {
      icon: Award,
      title: 'Industry Experience',
      description: `${new Date().getFullYear() - COMPANY_INFO.establishedYear}+ years of expertise in paper products and packaging solutions`,
      color: 'text-primary',
      tile: 'bg-primary-50 group-hover:bg-primary'
    },
    {
      icon: Users,
      title: 'Customer Support',
      description: 'Dedicated team providing personalized support and consultation',
      color: 'text-secondary',
      tile: 'bg-secondary-50 group-hover:bg-secondary'
    },
    {
      icon: TimerReset,
      title: 'Just-In-Time Delivery',
      description: 'Reliable and timely deliveries to keep your operations running smoothly',
      color: 'text-primary',
      tile: 'bg-primary-50 group-hover:bg-primary'
    },
    {
      icon: Award,
      title: 'Super Stockist Network',
      description: 'Strong inventory support to ensure consistent availability',
      color: 'text-secondary',
      tile: 'bg-secondary-50 group-hover:bg-secondary'
    },
    {
      icon: Warehouse,
      title: 'Dedicated Processing Centre',
      description: 'We have a dedicated centre that enables us to supply customized sizes in both sheet and reel forms.',
      color: 'text-primary',
      tile: 'bg-primary-50 group-hover:bg-primary'
    }

  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-secondary-50 to-white overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${whyChooseUs})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(2px)',
          opacity: 0.5,
          transform: 'scale(1.05)',
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Why Choose Bright Paper?"
          subtitle="We have a dedicated cutting centre that enables us to supply customized sizes in both sheet and reel form. As a super stockist, we ensure timely and reliable delivery to meet our customers’ requirements."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Reveal key={index} index={index} className="group h-full">
              <Card hover className="relative h-full overflow-hidden bg-white">
                <span
                  className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl transition-colors duration-300 ${feature.tile}`}
                >
                  <feature.icon
                    className={`${feature.color} transition-all duration-500 group-hover:text-white group-hover:scale-110 group-hover:-rotate-6`}
                    size={30}
                  />
                </span>
                <h3 className="text-xl font-bold text-neutral-900 mb-3 transition-colors group-hover:text-primary">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {feature.description}
                </p>
                <span className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-primary-600 transition-all duration-500 ease-out group-hover:w-full" />
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
