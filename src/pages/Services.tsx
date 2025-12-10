import { useNavigate } from 'react-router-dom';
import { Truck, Users, Award, Clock, ShieldCheck, Headphones } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import SectionHeader from '../components/SectionHeader';
import Card from '../components/Card';
import Button from '../components/Button';
import { COMPANY_INFO } from '../constants';

export default function Services() {
  const navigate = useNavigate();

  const services = [
    {
      icon: Truck,
      title: 'Consistent Supply',
      description: 'Reliable and timely delivery of quality paper products across India with our extensive distribution network covering 28+ cities.',
      features: [
        'On-time delivery guarantee',
        'Bulk order handling',
        'Flexible delivery schedules',
        'Real-time order tracking'
      ]
    },
    {
      icon: Users,
      title: 'Dealer Partnership Program',
      description: 'Join our network of 4,000+ trusted dealers and grow your business with comprehensive support and competitive benefits.',
      features: [
        'Competitive pricing',
        'Marketing support',
        'Training programs',
        'Dedicated account manager'
      ]
    },
    {
      icon: Award,
      title: 'Quality Assurance',
      description: 'Every product undergoes rigorous quality checks to ensure it meets international standards and exceeds customer expectations.',
      features: [
        'ISO certified processes',
        'Regular quality audits',
        'Product testing',
        'Quality certifications'
      ]
    },
    {
      icon: Headphones,
      title: 'Customer Support',
      description: 'Dedicated customer service team available to assist with inquiries, orders, and technical support throughout your journey.',
      features: [
        '24/7 email support',
        'Technical consultation',
        'Order assistance',
        'After-sales support'
      ]
    },
    {
      icon: Clock,
      title: 'Custom Solutions',
      description: 'Tailored paper products and specifications to meet your unique business requirements and industry standards.',
      features: [
        'Custom GSM options',
        'Specialized sizes',
        'Bulk customization',
        'Industry-specific solutions'
      ]
    },
    {
      icon: ShieldCheck,
      title: 'Sustainable Practices',
      description: 'Committed to environmental responsibility through eco-friendly manufacturing and sustainable sourcing practices.',
      features: [
        'Recyclable materials',
        'Eco-friendly production',
        'Waste reduction',
        'Green certifications'
      ]
    }
  ];

  const industries = [
    'Packaging Industry',
    'Printing & Publishing',
    'Retail & E-commerce',
    'Food & Beverage',
    'Pharmaceutical',
    'Consumer Goods',
    'Manufacturing',
    'Textile Industry'
  ];

  return (
    <div>
      <section className="bg-gradient-to-br from-primary-50 to-white py-16">
        <PageWrapper>
          <SectionHeader
            title="Our Services"
            subtitle="Comprehensive solutions and support for all your paper product needs"
          />
        </PageWrapper>
      </section>

      <PageWrapper>
        <section className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {services.map((service, index) => (
              <Card key={index} hover>
                <service.icon className="text-primary mb-4" size={48} />
                <h3 className="text-2xl font-bold text-neutral-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-neutral-600 mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-neutral-700 flex items-center">
                      <div className="w-1.5 h-1.5 bg-secondary rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-12 text-center">
              Nationwide Distribution Network
            </h2>
            <Card className="bg-gradient-to-br from-secondary-50 to-white" padding="lg">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-6">
                    Serving {COMPANY_INFO.citiesServed}+ Cities Across India
                  </h3>
                  <p className="text-lg text-neutral-700 mb-6 leading-relaxed">
                    Our extensive distribution network ensures that quality paper products reach you wherever you are in India. With strategic partnerships and efficient logistics, we guarantee timely delivery and consistent supply.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Truck className="text-primary mr-3" size={24} />
                      <div>
                        <div className="font-semibold text-neutral-900">Fast Delivery</div>
                        <div className="text-sm text-neutral-600">Quick turnaround times</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Users className="text-primary mr-3" size={24} />
                      <div>
                        <div className="font-semibold text-neutral-900">{COMPANY_INFO.dealerCount} Dealers</div>
                        <div className="text-sm text-neutral-600">Trusted nationwide network</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="aspect-square bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-2xl flex items-center justify-center">
                  <Truck className="text-neutral-400" size={120} />
                </div>
              </div>
            </Card>
          </div>

          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-12 text-center">
              Industries We Serve
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {industries.map((industry, index) => (
                <Card key={index} className="text-center">
                  <p className="font-semibold text-neutral-800">{industry}</p>
                </Card>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary to-primary-600 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Become a Partner
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join our growing network of dealers and benefit from competitive pricing, comprehensive support, and a trusted brand
            </p>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate('/contact')}
              className="bg-white text-primary hover:bg-neutral-100"
            >
              Apply for Partnership
            </Button>
          </div>
        </section>
      </PageWrapper>
    </div>
  );
}
