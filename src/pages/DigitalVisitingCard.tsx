import { motion } from 'framer-motion';
import { Phone, MapPin, Mail, Globe, User, Share2, Instagram, Facebook, Linkedin } from 'lucide-react';
import { COMPANY_INFO } from '../constants';
import logo from '../assets/images/logo.png';

// Custom Icons to match lucide-react style
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

export default function DigitalVisitingCard() {
    const mdName = "ShreeArun ShriGopal Asawa";
    const designation = "Managing Director";
    const gstNo = "24ADKPN2120R1ZC"; // Using the one from the provided image

    const handleSaveContact = () => {
        const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${mdName}
ORG:Bright Paper
TITLE:${designation}
TEL;TYPE=CELL:${COMPANY_INFO.phone}
EMAIL:${COMPANY_INFO.email}
ADR;TYPE=WORK:;;${COMPANY_INFO.address.street};${COMPANY_INFO.address.city};${COMPANY_INFO.address.state};${COMPANY_INFO.address.pincode};${COMPANY_INFO.address.country}
URL:${window.location.origin}
END:VCARD`;

        const blob = new Blob([vcard], { type: 'text/vcard' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${mdName.replace(/\s+/g, '_')}.vcf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: `${mdName} - ${COMPANY_INFO.name}`,
                text: `Digital Visiting Card of ${mdName}, ${designation} at ${COMPANY_INFO.name}`,
                url: window.location.href,
            }).catch(console.error);
        } else {
            alert("Sharing is not supported on this browser. You can copy the URL.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full bg-white rounded-[2rem] shadow-2xl overflow-hidden relative"
            >
                {/* Background Accent */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-primary/10 to-transparent z-0" />

                <div className="relative z-10 p-8 flex flex-col items-center">
                    {/* Logo Section */}
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="mb-8 w-48 h-24 flex items-center justify-center"
                    >
                        <img src={logo} alt={COMPANY_INFO.name} className="max-w-full max-h-full object-contain" />
                    </motion.div>

                    {/* Name & Designation Box */}
                    <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="w-full bg-white border border-gray-100 shadow-md rounded-2xl py-6 mb-6 text-center"
                    >
                        <h1 className="text-2xl font-black text-gray-900 mb-1">{mdName}</h1>
                        <p className="text-gray-500 font-bold text-sm">{designation}</p>
                    </motion.div>

                    {/* Tagline Box */}
                    <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mb-8 w-full"
                    >
                        <div className="border border-red-100 rounded-xl py-2 px-4 text-center">
                            <p className="text-gray-700 font-bold text-sm">
                                Bright Paper &mdash; Quality Products
                            </p>
                        </div>
                    </motion.div>

                    {/* Quick Action Icons */}
                    <div className="flex justify-between w-full mb-10">
                        {[
                            { icon: Phone, href: `tel:${COMPANY_INFO.phone}`, color: 'text-green-500' },
                            { icon: MapPin, href: COMPANY_INFO.address.mapLink, color: 'text-orange-500' },
                            { icon: WhatsApp, href: COMPANY_INFO.socialLinks.whatsapp, color: 'text-green-600' },
                            { icon: Mail, href: `mailto:${COMPANY_INFO.email}`, color: 'text-red-500' },
                            { icon: Globe, href: '/', color: 'text-blue-500' },
                        ].map((action, i) => (
                            <motion.a
                                key={i}
                                href={action.href}
                                target={action.icon === Globe || action.icon === MapPin ? "_blank" : "_self"}
                                rel="noopener noreferrer"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.4 + i * 0.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-14 h-14 flex items-center justify-center bg-white shadow-soft border border-gray-100 rounded-2xl"
                            >
                                <action.icon className={action.color} size={28} />
                            </motion.a>
                        ))}
                    </div>

                    {/* Primary Action Buttons */}
                    <div className="flex flex-col gap-4 w-full mb-10">
                        <motion.button
                            onClick={handleSaveContact}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.9 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-red-600 py-4 rounded-2xl flex items-center justify-center gap-2 text-white font-bold shadow-lg shadow-red-100"
                        >
                            <div className="bg-white/20 p-1 rounded-full">
                                <User size={18} />
                            </div>
                            Save Contact
                        </motion.button>

                        <motion.button
                            onClick={handleShare}
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 1.0 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-white border border-gray-200 py-4 rounded-2xl flex items-center justify-center gap-2 text-gray-900 font-bold shadow-md"
                        >
                            <Share2 size={18} className="text-gray-400" />
                            Show QR / Share
                        </motion.button>
                    </div>

                    {/* Social Media Icons */}
                    <div className="flex justify-center gap-4 mb-6">
                        {[
                            { icon: Instagram, href: COMPANY_INFO.socialLinks.instagram, color: 'text-pink-600' },
                            { icon: Facebook, href: COMPANY_INFO.socialLinks.facebook, color: 'text-blue-600' },
                            { icon: Linkedin, href: (COMPANY_INFO.socialLinks as any).linkedin || '#', color: 'text-blue-700' },
                            { icon: Telegram, href: COMPANY_INFO.socialLinks.telegram, color: 'text-sky-500' },
                        ].map((social, i) => (
                            <motion.a
                                key={i}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 1.1 + i * 0.1 }}
                                whileHover={{ y: -3 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-14 h-14 flex items-center justify-center bg-white shadow-soft rounded-2xl border border-gray-100"
                            >
                                <social.icon className={social.color} size={28} />
                            </motion.a>
                        ))}
                    </div>

                    {/* GST info */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                        className="text-center"
                    >
                        <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">
                            GST No. {gstNo}
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
