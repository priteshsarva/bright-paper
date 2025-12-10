import PageWrapper from '../components/PageWrapper';
import SectionHeader from '../components/SectionHeader';
import Card from '../components/Card';
import { Target, Eye, Heart, Award, Users, Leaf, CheckCircle } from 'lucide-react';
import { COMPANY_INFO } from '../constants';

export default function About() {
  const milestones = [
    { year: 2007, title: 'Company Founded', description: 'Established in Surat, Gujarat with a vision to deliver quality paper products' },
    { year: 2010, title: 'Expanded Network', description: 'Reached 10+ cities across India with growing dealer network' },
    { year: 2015, title: 'Product Diversification', description: 'Introduced comprehensive range of duplex board and kraft paper products' },
    { year: 2020, title: 'Digital Transformation', description: 'Modernized operations and enhanced customer service capabilities' },
    { year: 2025, title: 'Industry Leader', description: `Serving ${COMPANY_INFO.citiesServed}+ cities with ${COMPANY_INFO.dealerCount} dealers and ${COMPANY_INFO.turnover} turnover` }
  ];

  const values = [
    {
      icon: CheckCircle,
      title: 'Quality First',
      description: 'Unwavering commitment to delivering products that exceed industry standards'
    },
    {
      icon: Heart,
      title: 'Customer Focus',
      description: 'Building lasting relationships through exceptional service and support'
    },
    {
      icon: Leaf,
      title: 'Sustainability',
      description: 'Dedicated to eco-friendly practices and environmental responsibility'
    },
    {
      icon: Users,
      title: 'Integrity',
      description: 'Conducting business with honesty, transparency, and ethical practices'
    }
  ];

  const achievements = [
    { icon: Award, value: '18+', label: 'Years of Excellence' },
    { icon: Users, value: '4,000+', label: 'Trusted Dealers' },
    { icon: CheckCircle, value: '28+', label: 'Cities Served' },
    { icon: Target, value: '7,000 Cr', label: 'Annual Turnover' }
  ];

  return (
    <div>
      <section className="bg-gradient-to-br from-primary-50 to-white py-16">
        <PageWrapper>
          <SectionHeader
            title="About Bright Paper"
            subtitle="Building trust through quality, innovation, and commitment to excellence since 2007"
          />
        </PageWrapper>
      </section>

      <PageWrapper>
        <section className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-lg text-neutral-700 leading-relaxed">
                <p>
                  Founded in {COMPANY_INFO.establishedYear} in the vibrant city of Surat, Gujarat, Bright Paper began with a simple yet powerful mission: to provide high-quality paper products that meet the evolving needs of modern industry.
                </p>
                <p>
                  Over the past {new Date().getFullYear() - COMPANY_INFO.establishedYear} years, we have grown from a local supplier to a trusted national partner, serving {COMPANY_INFO.citiesServed}+ cities across India. Our success is built on the foundation of quality, reliability, and an unwavering commitment to customer satisfaction.
                </p>
                <p>
                  Today, with a network of over {COMPANY_INFO.dealerCount} dealers and an impressive annual turnover of {COMPANY_INFO.turnover}, we continue to set industry standards while staying true to our core values of excellence and sustainability.
                </p>
              </div>
            </div>
            <div className="aspect-square bg-gradient-to-br from-neutral-200 to-neutral-300 rounded-2xl flex items-center justify-center">
              <div className="text-center p-8">
                <Award className="text-neutral-500 mx-auto mb-4" size={80} />
                <div className="text-2xl font-bold text-neutral-700">Since {COMPANY_INFO.establishedYear}</div>
                <div className="text-neutral-600 mt-2">Building Trust & Quality</div>
              </div>
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-12 text-center">
              Our Journey
            </h2>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary-200"></div>
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={index} className={`flex items-center gap-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                      <Card>
                        <div className="text-2xl font-bold text-primary mb-2">{milestone.year}</div>
                        <h3 className="text-xl font-bold text-neutral-900 mb-2">{milestone.title}</h3>
                        <p className="text-neutral-600">{milestone.description}</p>
                      </Card>
                    </div>
                    <div className="w-4 h-4 bg-primary rounded-full border-4 border-white shadow-md z-10"></div>
                    <div className="flex-1"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Card padding="lg" className="bg-gradient-to-br from-primary-50 to-white">
                <Target className="text-primary mb-4" size={48} />
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">Our Mission</h2>
                <p className="text-lg text-neutral-700 leading-relaxed">
                  To be the most trusted and reliable supplier of premium paper products in India, delivering exceptional value through quality, innovation, and sustainable practices while fostering long-term partnerships with our customers.
                </p>
              </Card>

              <Card padding="lg" className="bg-gradient-to-br from-secondary-50 to-white">
                <Eye className="text-secondary mb-4" size={48} />
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">Our Vision</h2>
                <p className="text-lg text-neutral-700 leading-relaxed">
                  To revolutionize the paper industry by setting new benchmarks in quality and sustainability, expanding our reach across India, and becoming the preferred choice for businesses seeking reliable and eco-friendly paper solutions.
                </p>
              </Card>
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-12 text-center">
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} hover className="text-center">
                  <value.icon className="text-primary mx-auto mb-4" size={48} />
                  <h3 className="text-xl font-bold text-neutral-900 mb-3">{value.title}</h3>
                  <p className="text-neutral-600">{value.description}</p>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-12 text-center">
              Our Achievements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <Card key={index} className="text-center bg-gradient-to-br from-neutral-50 to-white">
                  <achievement.icon className="text-primary mx-auto mb-4" size={48} />
                  <div className="text-4xl font-bold text-neutral-900 mb-2">{achievement.value}</div>
                  <div className="text-neutral-600">{achievement.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </PageWrapper>
    </div>
  );
}
