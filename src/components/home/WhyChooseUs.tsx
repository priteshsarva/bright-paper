import { CheckCircle, Leaf, Shield, Truck, Award, Users } from 'lucide-react';
import Card from '../Card';
import SectionHeader from '../SectionHeader';

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
      description: '4,000+ satisfied dealers and partners across India trust our products',
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
      description: '18+ years of expertise in paper products and packaging solutions',
      color: 'text-primary'
    },
    {
      icon: Users,
      title: 'Customer Support',
      description: 'Dedicated team providing personalized support and consultation',
      color: 'text-secondary'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-secondary-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Why Choose Bright Paper?"
          subtitle="Experience the difference of working with India's trusted paper product supplier"
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
