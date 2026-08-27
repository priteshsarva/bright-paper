import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Gallery from './pages/Gallery';
import Services from './pages/Services';
import Contact from './pages/Contact';
import CTASection from './components/home/CTASection';
import ScrollToTop from './components/ScrollToTop';
import Loader from './components/Loader';
import DigitalVisitingCard from './pages/DigitalVisitingCard';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import Qqr from './pages/Qqr';
import Asqr from './pages/Asqr';
import AsDigitalVisitingCard from './pages/AsDigitalVisitingCard';

function AppContent() {
  const location = useLocation();
  // Standalone pages rendered without header / CTA / footer
  const bareLayoutPaths = ['/card', '/qr', '/card/arun-asawa', '/qr-as'];
  const isBarePage = bareLayoutPaths.includes(location.pathname);


  return (
    <div className="min-h-screen flex flex-col bg-white">
      {!isBarePage && <Header />}
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<ProductDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/card" element={<DigitalVisitingCard />} />
          <Route path="/qr" element={<Qqr />} />
          <Route path="/card/arun-asawa" element={<AsDigitalVisitingCard />} />
          <Route path="/qr-as" element={<Asqr/>} />
        </Routes>
      </main>
      {!isBarePage && <CTASection />}
      {!isBarePage && <Footer />}
    </div>
  );
}

function App() {
  // Initialize smooth scrolling
  useSmoothScroll();

  return (
    <Router>
      <Loader />
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;
