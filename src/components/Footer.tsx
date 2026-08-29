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
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.465 3.488" />
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
