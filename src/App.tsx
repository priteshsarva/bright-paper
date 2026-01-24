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
import CustomCursor from './components/CustomCursor';
import { useSmoothScroll } from './hooks/useSmoothScroll';

function AppContent() {
  const location = useLocation();
  const isCardPage = location.pathname === '/card';

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {!isCardPage && <Header />}
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
        </Routes>
      </main>
      {!isCardPage && <CTASection />}
      {!isCardPage && <Footer />}
    </div>
  );
}

function App() {
  // Initialize smooth scrolling
  useSmoothScroll();

  return (
    <Router>
      <Loader />
      <CustomCursor />
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;
