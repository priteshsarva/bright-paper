import { CheckCircle, Leaf, Shield, Truck, Award, Users, Warehouse, TimerReset  } from 'lucide-react';
import Card from '../Card';
import SectionHeader from '../SectionHeader';
import { COMPANY_INFO } from '../../constants'; 

export default function WhyChooseUs() {

  const features = [
    {
      icon: CheckCircle,
      title: 'Premium Quality',
      description: 'Certified products meeting international standards for all industrial applications',
      color: 'text-primary'
    },
    {
      icon: Leaf,
      title: 'Sustainable Practices',
      description: 'Committed to eco-friendly manufacturing and sustainable sourcing',
      color: 'text-secondary'
    },
    {
      icon: Shield,
      title: 'Trusted by Thousands',
      description: '500+ satisfied clients across India trust our products',
      color: 'text-primary'
    },
    {
      icon: Truck, 
      title: 'Nationwide Distribution',
      description: 'Efficient delivery network covering 28+ cities with timely service',
      color: 'text-secondary'
    },
    {
      icon: Award,
      title: 'Industry Experience',
      description: `${new Date().getFullYear() - COMPANY_INFO.establishedYear}+ years of expertise in paper products and packaging solutions`,
      color: 'text-primary'
    },
    {
      icon: Users,
      title: 'Customer Support',
      description: 'Dedicated team providing personalized support and consultation',
      color: 'text-secondary'
    },
    {
      icon: TimerReset,
      title: 'Just-In-Time Delivery',
      description: 'Reliable and timely deliveries to keep your operations running smoothly',
      color: 'text-primary'
    },
    {
      icon: Award,
      title: 'Super Stockist Network',
      description: 'Strong inventory support to ensure consistent availability',
      color: 'text-secondary'
    },
    {
      icon: Warehouse,
      title: 'Dedicated Processing Centre',
      description: 'We have a dedicated centre that enables us to supply customized sizes in both sheet and reel forms.',
      color: 'text-primary'
    }
   
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-secondary-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Why Choose Bright Paper?"
          subtitle="We have a dedicated cutting center that enables us to supply customized sizes in both sheet and reel form. As a super stockist, we ensure timely and reliable delivery to meet our customers’ requirements."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} hover>
              <feature.icon className={`${feature.color} mb-4`} size={40} />
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
