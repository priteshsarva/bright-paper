import backgroundImage from '../assets/images/bgOfAllheaders.jpeg';
import PageWrapper from '../components/PageWrapper';
import SectionHeader from '../components/SectionHeader';
import Card from '../components/Card';
import { Target, Eye, Heart, Award, Users, Leaf, CheckCircle } from 'lucide-react';
import { COMPANY_INFO } from '../constants';
import foundersImage from '../assets/images/founder.jpg';
import missionBg from '../assets/images/mission-bg.jpg';
import visionBg from '../assets/images/vision-bg.png';
import AnimatedNumber from '../components/AnimatedNumber';

export default function About() {
  const milestones = [
    { year: 2007, title: 'Company Founded', description: 'Established in Surat, Gujarat with a vision to deliver quality paper products' },
    { year: 2010, title: 'Expanded Network', description: 'By adding duplex board and kraft paper to our portfolio, we have strengthened our product offerings and expanded our company' },
    { year: 2015, title: 'Product Diversification', description: 'With a wide range of products and dealerships from 3 duplex board mills and 4 kraft paper mills, we began serving a variety of paper across South Gujarat.' },
    { year: 2020, title: 'Digital Transformation', description: 'Equipped with the latest ERP system, we deliver on-time service consistently. ' },
    { year: 2025, title: 'Industry Leader', description: `Serving across India with an expanded basket of FBB, SBS, cup stock, imported kraft, art paper, kappa board, and recycled duplex & kraft.` }
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
    { icon: Award, value: `${new Date().getFullYear() - COMPANY_INFO.establishedYear}`, label: 'Years of Excellence' },
    { icon: Users, value: '500+', label: 'Customers' },
    { icon: CheckCircle, value: 'Cities', label: 'Across India' },
    { icon: Target, value: '50,000 Tons', label: 'Annual Turnover' }
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
              title="About Bright Paper"
              subtitle="Building trust through quality, innovation, and commitment to excellence since 2007"
            />
          </PageWrapper>
        </div>
      </section>

      <PageWrapper>
        <section className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold  mb-6 text-[#F36B2C]">
                Our Story
              </h2>
              <div className="space-y-4 text-lg text-neutral-700 leading-relaxed">
                <p>
                  Founded in {COMPANY_INFO.establishedYear} in the vibrant city of Surat, Gujarat, Bright Paper began with a simple yet powerful mission: to provide high-quality paper products that meet the evolving needs of packaging.
                </p>
                <p>
                  Over the past {new Date().getFullYear() - COMPANY_INFO.establishedYear} years, we have grown from a local supplier to nationwide customers across India. Our success is built on the foundation of quality, reliability, and an unwavering commitment to customer satisfaction.
                </p>
                <p>
                  Today, with a network of over {COMPANY_INFO.dealerCount} customers and an impressive annual turnover of {COMPANY_INFO.turnover}, we continue to set industry standards while staying true to our core values of excellence and sustainability.
                </p>
                <div className="mt-8 pt-6 border-t border-neutral-200">
                  <div className="font-bold text-xl  text-[#5a8f2e]">Founder</div>
                  <div className="font-bold   text-[#5a8f2e]">ShreeArun ShriGopal Asawa</div>
                </div>
              </div>
            </div>
            <div className="aspect-[3.2/4] bg-gradient-to-br from-neutral-200 to-neutral-300 rounded-2xl overflow-hidden">
              <img
                src={foundersImage}
                alt="Founder"
                className="w-full object-cover object-top" style={{ marginTop: '-30px' }}
              />
            </div>
          </div>


          <div className="mb-20 ">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center ">
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} hover className=" bg-gradient-to-br from-[#F4FAF1] to-white text-center">
                  <value.icon className="text-primary mx-auto mb-4" size={48} />
                  <h3 className="text-xl font-bold text-[#5A8F2E] mb-3">{value.title}</h3>
                  <p className="text-neutral-600">{value.description}</p>
                </Card>
              ))}
            </div>
          </div>



          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center">
              Our Journey
            </h2>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1  bg-[#F3A683] "></div>
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-8 mb-20 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                      }`}
                  >
                    {/* Card */}
                    <div className={`flex-1 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                      <Card className="bg-white border-2 border-[#5A8F2E] rounded-2xl p-6 shadow-[0_0_0_2px_rgba(90,143,46,0.15)] bg-[#F6FBF3]">
                        {/* Year (Orange stays) */}
                        <div className="text-lg font-bold text-[#F36B2C] mb-1">
                          {milestone.year}
                        </div>

                        {/* Title (Green) */}
                        <h3 className="text-xl font-bold text-[#5A8F2E] mb-2">
                          {milestone.title}
                        </h3>

                        {/* Description (Green, lighter) */}
                        <p className="text-sm text-[#6FAF4E] leading-relaxed">
                          {milestone.description}
                        </p>
                      </Card>
                    </div>

                    {/* Center Dot */}
                    <div className="relative z-10">
                      <div className="w-3 h-3 bg-[#F36B2C] rounded-full"></div>
                    </div>

                    {/* Empty space for alignment */}
                    <div className="flex-1"></div>
                  </div>
                ))}

              </div>
            </div>
          </div>



          <div className="mb-20">
            {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
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
            </div> */}


            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Mission */}
              <Card
                padding="lg"
                className="relative overflow-hidden bg-gradient-to-br from-primary-50 to-white rounded-2xl shadow-md"
              >
                {/* Background image */}
                <img
                  src={missionBg}
                  alt=""
                  className="absolute right-4 top-4 w-40 opacity-40 pointer-events-none"
                />

                {/* Content */}
                <Target className="text-[#F36B2C] mb-4" size={44} />
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                  Our Mission
                </h2>
                <p className="text-lg text-neutral-700 leading-relaxed">
                  To be the most trusted and reliable supplier of premium paper
                  products in India, delivering exceptional value through quality,
                  innovation, and sustainable practices while fostering long-term
                  partnerships with our customers.
                </p>
              </Card>

              {/* Vision */}
              <Card
                padding="lg"
                className="relative overflow-hidden bg-gradient-to-br from-secondary-50 to-white rounded-2xl shadow-md"
              >
                {/* Background image */}
                <img
                  src={visionBg}
                  alt=""
                  className="absolute right-4 top-4 w-[7rem] opacity-40 pointer-events-none"
                />

                {/* Content */}
                <Eye className="text-[#5A8F2E] mb-4" size={44} />
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                  Our Vision
                </h2>
                <p className="text-lg text-neutral-700 leading-relaxed">
                  To revolutionize the paper industry by setting new benchmarks in
                  quality and sustainability, expanding our reach across India, and
                  becoming the preferred choice for businesses seeking reliable and
                  eco-friendly paper solutions.
                </p>
              </Card>
            </div>



          </div>




          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center " >
              Our Achievements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <Card key={index} className=" bg-gradient-to-br from-[#F4FAF1] to-white text-center ">
                  <achievement.icon className="text-primary mx-auto mb-4" size={48} />
                  <div className="text-4xl font-bold text-[#5A8F2E] mb-2">
                    {index === 0 ? (
                      // Animated years
                      <AnimatedNumber
                        end={new Date().getFullYear() - COMPANY_INFO.establishedYear}
                        duration={2500}
                      />
                    ) : index === 1 ? (
                      // Animated customers
                      <>
                        <AnimatedNumber
                          end={500}
                          duration={2500}
                        />
                        <span>+</span>
                      </>
                    ) : (
                      achievement.value
                    )}
                  </div>
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
