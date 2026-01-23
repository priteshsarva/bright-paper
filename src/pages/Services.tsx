import { useNavigate } from 'react-router-dom';
import { Truck, Handshake, Users, Award, Clock, ShieldCheck, Headphones } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import SectionHeader from '../components/SectionHeader';
import Card from '../components/Card';
import Button from '../components/Button';
import { COMPANY_INFO } from '../constants';
import distribution from '../assets/images/distribution.jpg'
import backgroundImage from '../assets/images/bgOfAllheaders.jpeg';
import serviceBg from '../assets/images/pattern.jpg';
import AnimatedNumber from '../components/AnimatedNumber';
import AnimatedImage from '../components/AnimatedImage';

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
      icon: Handshake,
      title: 'Budget-friendly & Value - Packed',
      description: 'Unbeatable prices on top-quality products buy smart and save money every day',
      features: [
        'Competitive Price',
        'Bulk Quantity Discount',
        'Value For Money',
        'Customer Budget Friendly'
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
    'Food & Beverage',
    'E-commerce ', ' Retail',
    'Healthcare ', ' Pharma',
    'Cosmetics ', ' Luxury Goods',
    'Industrial ', ' Construction products',
    'Electronics',
    'FMCG ',
    'Agriculture',
  ];

  return (
    <div>
      <section className="relative bg-gradient-to-br from-primary-50 to-white py-16 overflow-hidden">
        <img
          src={backgroundImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-100 blur-[0px] z-0"
        />
        <div className="relative z-10">
          <PageWrapper>
            <SectionHeader
              title="Our Services"
              subtitle="Comprehensive solutions and support for all your paper product needs"
            />
          </PageWrapper>
        </div>
      </section>

      <PageWrapper>
        <section className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {services.map((service, index) => (
              <Card
                key={index}
                hover
                className="bg-[#F4FAF1] border-2 border-[#5A8F2E] rounded-2xl p-8 shadow-sm hover:shadow-md transition"
              >
                {/* Icon */}
                <service.icon
                  className="text-[#F36B2C] mb-5"
                  size={48}
                />

                {/* Title */}
                <h3 className="text-2xl font-bold text-[#5A8F2E] mb-3">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-[#6B7280] mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-[#374151] flex items-center"
                    >
                      <span className="w-2 h-2 bg-[#5A8F2E] rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>

            ))}
          </div>

          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center">
              Nationwide Distribution Network
            </h2>
            <Card className="bg-gradient-to-br from-secondary-50 to-white" padding="lg">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-6">
                    Serving Across India
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
                        <div className="font-semibold text-neutral-900">
                          <AnimatedNumber end={500} duration={2500} />+ Customers
                        </div>
                        <div className="text-sm text-neutral-600">Trusted nationwide network</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="aspect-square bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-2xl flex items-center justify-center">
                  {/* <Truck className="text-neutral-400" size={120} /> */}
                  <AnimatedImage
                    src={distribution}
                    alt="distribution"
                    className="w-full h-full object-cover"
                    shine
                    // direction="scale"
                    delay={0.1}
                  />
                  {/* <img src={distribution} alt="distribution" /> */}
                </div>
              </div>
            </Card>
          </div>

          <div className="mb-20" style={{
            // backgroundImage: `url(${serviceBg})`,
            // backgroundColor: "#F4FAF1",
            backgroundRepeat: "repeat",
            // backgroundSize: "auto",
            backgroundSize: "750px 750px",
          }}>
            <h2 className="text-3xl md:text-4xl font-bold  mb-12 text-center text-primary">
              Industries & Applications
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {industries.map((industry, index) => (
                <Card key={index} className="text-center bg-[#F4FAF1]">
                  <p className="font-semibold   text-[#5A8F2E]">{industry}</p>
                </Card>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#f4f6f1] to-[#ffffff] rounded-2xl p-8 md:p-12 text-center text-black">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Become a Partner
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join our growing network of dealers and benefit from competitive pricing, comprehensive support, and a trusted brand
            </p>
            <Button
              size="lg"
              variant="primary"
              onClick={() => navigate('/contact')}
              className=" text-black hover:bg-neutral-100 hover:text-white shadow-lg"
            >
              Apply for Partnership
            </Button>
          </div>
        </section>
      </PageWrapper>
    </div>
  );
}
