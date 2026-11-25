import HeroSection from '../components/home/HeroSection';
import MetricsSection from '../components/home/MetricsSection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import MDMessage from '../components/home/MDMessage';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Seo from '../components/Seo';
import { PAGE_SEO } from '../constants/seo';

export default function Home() {
  return (
    <div>
      <Seo {...PAGE_SEO.home} />
      <HeroSection />
      <MDMessage />
      <MetricsSection />
      <FeaturedProducts />
      <WhyChooseUs />
    </div>
  );
}
