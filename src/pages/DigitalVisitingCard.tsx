import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { User, Share2 } from 'lucide-react';
import { COMPANY_INFO } from '../constants';
import logo from '../assets/images/logo.png';
import callImg from '../assets/images/call.png';
import locationImg from '../assets/images/location.png';
import mailImg from '../assets/images/mail.png';
import websiteImg from '../assets/images/website.png';
import whatsappImg from '../assets/images/whatsapp.png';
import instagramImg from '../assets/images/instagram.png';
import facebookImg from '../assets/images/facebook.png';
import linkedinImg from '../assets/images/linkedin.png';
import telegramImg from '../assets/images/telegram.png';



export default function DigitalVisitingCard() {
    const [showQR, setShowQR] = useState(false);
    const mdName = "Arun Asawa";
    const designation = "Managing Director";
    const gstNo = "24AFBPA0125Q1ZV";

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
        setShowQR(true);
    };

    const handleNativeShare = () => {
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

    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(window.location.href)}`;

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full bg-gradient-to-br from-primary/30 via-white via-50% to-secondary/30 rounded-[2rem] shadow-2xl overflow-hidden relative"
            >
                {/* Background Accent */}
                <div className="absolute top-0 left-0 w-full h-32 z-0" />

                <div className="relative z-10 p-8 flex flex-col items-center">
                    {/* Logo Section */}
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="mt-4 h-48 flex items-center justify-center"
                    >
                        <img src={logo} alt={COMPANY_INFO.name} className="max-w-full max-h-full object-contain" />
                    </motion.div>

                    {/* Name & Designation Box */}
                    <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="w-full bg-white border-gray-100 shadow-md rounded-2xl py-6 mb-3 text-center"
                    >
                        <h1 className="text-3xl font-bold text-gray-900 mb-1">{mdName}</h1>
                        <p className="text-gray-500 font-bold text-sm">{designation}</p>
                    </motion.div>

                    {/* Tagline Box */}
                    <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mb-4 w-full"
                    >
                        <div className="border border-red-100 rounded-xl py-2 px-4 text-center">
                            <p className="text-gray-500 font-bold text-[14px]  tracking-tight">
                                {COMPANY_INFO.tagline2}<br />
                                {COMPANY_INFO.tagline3}
                            </p>
                        </div>
                    </motion.div>

                    {/* Quick Action Icons */}
                    <div className="flex justify-between w-full mb-5">
                        {[
                            { icon: callImg, href: `tel:${COMPANY_INFO.phone}` },
                            { icon: locationImg, href: COMPANY_INFO.address.mapLink },
                            { icon: whatsappImg, href: COMPANY_INFO.socialLinks.whatsapp },
                            { icon: mailImg, href: `mailto:${COMPANY_INFO.email}` },
                            { icon: websiteImg, href: '/' },
                        ].map((action, i) => (
                            <motion.a
                                key={i}
                                href={action.href}
                                target={action.icon === websiteImg || action.icon === locationImg ? "_blank" : "_self"}
                                rel="noopener noreferrer"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.4 + i * 0.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-14 h-14 flex items-center justify-center bg-white shadow-soft border border-gray-100 rounded-2xl p-2 overflow-hidden"
                            >
                                <img src={action.icon} alt="icon" className="w-full h-full object-contain" />
                            </motion.a>
                        ))}
                    </div>

                    {/* Primary Action Buttons */}
                    <div className="flex flex-col gap-4 w-full mb-5">
                        <motion.button
                            onClick={handleSaveContact}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.9 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-primary/80 py-4 rounded-2xl flex items-center justify-center gap-2 text-white font-bold shadow-lg shadow-red-100"
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
                    <div className="flex justify-center gap-4 mb-3">
                        {[
                            { icon: instagramImg, href: COMPANY_INFO.socialLinks.instagram },
                            { icon: facebookImg, href: COMPANY_INFO.socialLinks.facebook },
                            { icon: linkedinImg, href: COMPANY_INFO.socialLinks.linkedin || '#' },
                            { icon: telegramImg, href: COMPANY_INFO.socialLinks.telegram },
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
                                className="w-14 h-14 flex items-center justify-center bg-white shadow-soft rounded-2xl border border-gray-100 p-2 overflow-hidden"
                            >
                                <img src={social.icon} alt="social" className="w-full h-full object-contain" />
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
                        <p className="text-[12px] text-gray-500 font-bold tracking-widest uppercase">
                            GST No. {gstNo}
                        </p>
                    </motion.div>
                </div>
            </motion.div>

            {/* QR Code Modal Using Framer Motion */}
            <AnimatePresence>
                {showQR && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[100] p-4"
                        onClick={() => setShowQR(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-[2rem] p-8 w-full max-w-sm shadow-2xl relative overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Decorative Background for Modal */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />

                            {/* Logo in Modal */}
                            <div className="flex justify-center mb-4">
                                <img src={logo} alt={COMPANY_INFO.name} className="h-24 w-auto object-contain" />
                            </div>

                            {/* <h3 className="text-xl font-black mb-6 text-gray-900 border-b border-gray-100 pb-4 text-center">
                                Scan or Share URL
                            </h3> */}

                            <div className="bg-gray-50 rounded-3xl p-6 mb-8 border border-gray-100 shadow-inner flex items-center justify-center aspect-square overflow-hidden">
                                <img
                                    src={qrUrl}
                                    alt="QR code"
                                    className="w-full h-full object-contain rounded-xl hover:scale-105 transition-transform duration-500 py-3"
                                />
                            </div>

                            <div className="flex gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleNativeShare}
                                    className="flex-1 bg-red-600 text-white font-bold py-4 px-4 rounded-2xl shadow-lg shadow-red-100 flex items-center justify-center gap-2"
                                >
                                    <Share2 size={20} />
                                    Share
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setShowQR(false)}
                                    className="flex-1 bg-gray-100 text-gray-800 font-bold py-4 px-4 rounded-2xl hover:bg-gray-200 transition-colors"
                                >
                                    Close
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
