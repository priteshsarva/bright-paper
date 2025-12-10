import HeroSection from '../components/home/HeroSection';
import MetricsSection from '../components/home/MetricsSection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import MDMessage from '../components/home/MDMessage';
import WhyChooseUs from '../components/home/WhyChooseUs';
import CTASection from '../components/home/CTASection';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <MetricsSection />
      <FeaturedProducts />
      <MDMessage />
      <WhyChooseUs />
      <CTASection />
    </div>
  );
}
