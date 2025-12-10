import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, FileText } from 'lucide-react';
import { NAVIGATION_MENU, COMPANY_INFO } from '../constants';
import Button from './Button';
import logo from '../assets/images/logo.png'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const navigate = useNavigate();

  const handleInquiryClick = () => {
    navigate('/contact');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3">
            {/* <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <FileText className="text-white" size={24} />
            </div> */}
              <img src={logo} alt="" className=" h-20"/>

            {/* <span className="text-2xl font-bold text-neutral-900">{COMPANY_INFO.name}</span> */}
          </Link>

          <nav className="hidden lg:flex items-center space-x-8">
            {NAVIGATION_MENU.map((item) => (
              item.submenu ? (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setProductsOpen(true)}
                  onMouseLeave={() => setProductsOpen(false)}
                >
                  <button className="flex items-center space-x-1 text-neutral-700 hover:text-primary transition-colors font-medium">
                    <span>{item.name}</span>
                    <ChevronDown size={16} />
                  </button>
                  {productsOpen && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-strong py-2 animate-fade-in">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.path}
                          className="block px-4 py-2 text-neutral-700 hover:bg-primary-50 hover:text-primary transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-neutral-700 hover:text-primary transition-colors font-medium"
                >
                  {item.name}
                </Link>
              )
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button onClick={handleInquiryClick} size="md">
              Add Inquiry
            </Button>
          </div>

          <button
            className="lg:hidden text-neutral-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-neutral-200 animate-slide-down">
          <div className="px-4 py-4 space-y-3">
            {NAVIGATION_MENU.map((item) => (
              <div key={item.name}>
                {item.submenu ? (
                  <>
                    <button
                      onClick={() => setProductsOpen(!productsOpen)}
                      className="flex items-center justify-between w-full text-neutral-700 font-medium py-2"
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        size={16}
                        className={`transform transition-transform ${productsOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {productsOpen && (
                      <div className="pl-4 space-y-2 mt-2">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.path}
                            className="block text-neutral-600 py-2"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className="block text-neutral-700 font-medium py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <Button onClick={handleInquiryClick} fullWidth>
              Add Inquiry
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
