import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, FileText, Twitter, Instagram, Linkedin, Github, Facebook } from 'lucide-react';

const Telegram = ({ className, size = 24 }: { className?: string, size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </svg>
);

const WhatsApp = ({ className, size = 24 }: { className?: string, size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

import { COMPANY_INFO, NAVIGATION_MENU } from '../constants';

export default function Footer() {
  return (
    <footer className="text-black" style={{ backgroundColor: '#f6c9a0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <FileText className="text-white" size={24} />
              </div>
              <span className="text-2xl font-bold">{COMPANY_INFO.name}</span>
            </div>
            <p className="text-black mb-4">
              {COMPANY_INFO.tagline}
            </p>
            <p className="text-black text-sm">
              Since {COMPANY_INFO.establishedYear} | Serving across india
            </p>
            <div className="flex space-x-4 mt-4">

              {/* Twitter Icon */}
              {/* {COMPANY_INFO.socialLinks.Twitter && (
                <a
                  href={COMPANY_INFO.socialLinks.Twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-primary transition duration-300"
                  aria-label="Twitter"
                >
                  <Twitter className="w-6 h-6" />
                </a>
              )} */}
              {/* Instagram Icon */}
              {COMPANY_INFO.socialLinks.instagram && (
                <a
                  href={COMPANY_INFO.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-primary transition duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6" />
                </a>
              )}
              {/* LinkedIn Icon */}
              {COMPANY_INFO.socialLinks.linkedin && (
                <a
                  href={COMPANY_INFO.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-primary transition duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              )}
              {/* GitHub Icon */}
              {COMPANY_INFO.socialLinks.github && (
                <a
                  href={COMPANY_INFO.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-primary transition duration-300"
                  aria-label="GitHub"
                >
                  <Github className="w-6 h-6" />
                </a>
              )}
              {/* Telegram Icon */}
              {COMPANY_INFO.socialLinks.telegram && (
                <a
                  href={COMPANY_INFO.socialLinks.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-primary transition duration-300"
                  aria-label="Telegram"
                >
                  <Telegram className="w-6 h-6" />
                </a>
              )}
              {/* WhatsApp Icon */}
              {COMPANY_INFO.socialLinks.whatsapp && (
                <a
                  href={COMPANY_INFO.socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-primary transition duration-300"
                  aria-label="WhatsApp"
                >
                  <WhatsApp className="w-6 h-6" />
                </a>
              )}
              {/* Facebook Icon */}
              {COMPANY_INFO.socialLinks.facebook && (
                <a
                  href={COMPANY_INFO.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-primary transition duration-300"
                  aria-label="Facebook"
                >
                  <Facebook className="w-6 h-6" />
                </a>
              )}

            </div>
          </div>



          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {NAVIGATION_MENU.filter(item => !item.submenu).map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-black hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail className="text-primary mt-1" size={18} />
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="text-black hover:text-primary transition-colors"
                >
                  {COMPANY_INFO.email}
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="text-primary mt-1" size={18} />
                <a href={`tel:${COMPANY_INFO.phone}`} className="text-black hover:text-primary transition-colors">
                  {COMPANY_INFO.phone}
                </a>

              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="text-primary mt-1" size={18} />
                <a href={COMPANY_INFO.address.mapLink} target="_blank" rel="noopener noreferrer" className="text-black hover:text-primary transition-colors">
                  {COMPANY_INFO.address.city}, {COMPANY_INFO.address.state},
                </a>

              </li>
            </ul>
          </div>

          {/* <div>
            <h3 className="text-lg font-semibold mb-4">Business Hours</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Clock className="text-primary mt-1" size={18} />
                <div className="text-black">
                  <p>{COMPANY_INFO.businessHours.weekdays}</p>
                  <p className="mt-1">{COMPANY_INFO.businessHours.sunday}</p>
                </div>
              </li>
            </ul>
          </div> */}
        </div>

        <div className="border-t border-neutral-800 mt-8 pt-8 text-center">
          <p className="text-black text-sm">
            &copy; {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
