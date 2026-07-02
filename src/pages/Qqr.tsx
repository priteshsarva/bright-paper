import React from 'react'
import { motion } from 'motion/react';
import {
    Globe,
    CreditCard,
    Download,
    Instagram,
    Facebook,
    Linkedin,
    Send,
    ChevronRight,
    FileImage,
    ExternalLink
} from 'lucide-react';

import logo from '../assets/images/logo.png';

const Qqr = () => {

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 16 },
        show: {
            opacity: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 100, damping: 15 }
        }
    };

    const links = [
        {
            title: 'Visit Our Website',
            description: 'Explore our global catalog and services',
            url: 'https://brightpaper.co.in/',
            icon: Globe,
            color: 'orange' // Orange primary focus
        },
        {
            title: 'E-Visiting Card',
            description: 'Save our contact details instantly',
            url: 'https://brightpaper.co.in/card',
            icon: CreditCard,
            color: 'green' // Green secondary focus
        },
        {
            title: 'Download Brochure',
            description: 'Get our latest paper export offerings',
            url: 'https://drive.google.com/drive/folders/1ExTisNvbj-5rWZ-OLqjinZm0MhNfDPbH',
            icon: Download,
            color: 'orange'
        }
    ];

    const socials = [
        { name: 'Instagram', url: 'https://www.instagram.com/brightpaper_company/?hl=en', icon: Instagram },
        { name: 'Facebook', url: 'https://www.facebook.com/people/Arun-Asawa/61586704033137/', icon: Facebook },
        { name: 'LinkedIn', url: 'https://www.linkedin.com/in/arun-asawa-881b17409/', icon: Linkedin },
        { name: 'Telegram', url: 'https://t.me/+916357912345', icon: Send }
    ];
    return (
        <div id="app-container" className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-between py-10 px-4 sm:px-6 relative overflow-hidden font-sans">
            {/* Immersive Background Elements */}
            <div className="absolute top-[-100px] right-[-100px] w-96 h-96 bg-[#F97316] opacity-[0.08] blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-100px] left-[-100px] w-96 h-96 bg-[#22C55E] opacity-[0.08] blur-[100px] rounded-full pointer-events-none" />

            {/* Main Content Container */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="w-full max-w-[480px] flex flex-col items-center gap-10 z-10 my-auto"
            >
                {/* Header Section */}
                <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
                    {/* Real Company Logo */}
                    <div
                        id="logo-container"
                        className="w-75 h-32 rounded-3xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-3 border border-slate-100 flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] mb-2"
                    >
                        <img
                            src={logo}
                            alt="Bright Paper Logo"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-contain rounded-2xl"
                            onError={(e) => {
                                // Safe visual fallback in case the local assets folder is loaded later
                                e.currentTarget.style.display = 'none';
                                const fallback = document.getElementById('logo-fallback');
                                if (fallback) fallback.classList.remove('hidden');
                            }}
                        />
                        <div id="logo-fallback" className="hidden flex flex-col items-center justify-center text-center p-2">
                            <span className="font-black text-2xl text-transparent bg-clip-text bg-gradient-to-tr from-orange-500 to-green-600 tracking-tight leading-none">BP</span>
                            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">Bright Paper</span>
                        </div>
                    </div>
                </motion.div>

                {/* Links Section */}
                <motion.div variants={itemVariants} className="w-full flex flex-col gap-4 px-1">
                    {links.map((link, index) => {
                        const IconComponent = link.icon;
                        const isOrange = link.color === 'orange';

                        return (
                            <motion.a
                                key={index}
                                id={`link-button-${index}`}
                                href={link.url}
                                target="_blank"
                                rel="noreferrer"
                                whileHover={{ y: -2, scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                className="group w-full bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex items-center justify-between transition-all duration-300 hover:border-slate-300 hover:shadow-md"
                            >
                                <div className="flex items-center gap-4">
                                    {/* Icon Frame */}
                                    <div
                                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${isOrange
                                                ? 'bg-orange-50 text-[#F97316] group-hover:bg-orange-100'
                                                : 'bg-green-50 text-[#22C55E] group-hover:bg-green-100'
                                            }`}
                                    >
                                        <IconComponent className="w-6 h-6" />
                                    </div>

                                    {/* Text labels */}
                                    <div className="text-left">
                                        <span className="font-bold text-slate-800 text-lg block leading-snug group-hover:text-slate-900 transition-colors">
                                            {link.title}
                                        </span>
                                        <span className="text-xs text-slate-400 font-normal mt-0.5 block leading-normal">
                                            {link.description}
                                        </span>
                                    </div>
                                </div>

                                {/* Arrow indicator */}
                                <div className="text-slate-300 group-hover:text-slate-400 transition-colors duration-300 pr-1">
                                    <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                                </div>
                            </motion.a>
                        );
                    })}
                </motion.div>

                {/* Social Icons Section */}
                <motion.div variants={itemVariants} className="w-full flex flex-col items-center gap-6">
                    <div className="flex items-center gap-8">
                        {socials.map((social, idx) => {
                            const SocialIcon = social.icon;
                            return (
                                <motion.a
                                    key={idx}
                                    id={`social-link-${social.name.toLowerCase()}`}
                                    href={social.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    whileHover={{ y: -3, scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="text-slate-400 hover:text-[#F97316] transition-colors duration-200"
                                    aria-label={social.name}
                                >
                                    <SocialIcon className="w-6 h-6" />
                                </motion.a>
                            );
                        })}
                    </div>
                </motion.div>
            </motion.div>

            {/* Footer Section */}
            <footer id="footer-section" className="w-full text-center mt-12 z-10">
                <p className="text-slate-400 text-[11px] font-medium tracking-wide uppercase">
                    &copy; 2026 BRIGHT PAPER. ALL RIGHTS RESERVED.
                </p>
            </footer>
        </div>
    )
}

export default Qqr