"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView, Variants } from "framer-motion";
import {
    Globe,
    MessageSquare,
    FileText,
    HelpCircle,
    ChevronRight,
    Shield,
    Book,
    Lock,
    Command,
    ArrowUpRight,
    Code,
    Cpu,
    BarChart,
    Users,
    Layers,
    Sparkles,
    BookOpen,
    Trophy
} from "lucide-react";

import { FaTwitter, FaTelegram, FaGithub, FaDiscord } from "react-icons/fa6"
import { Button } from "@/components/ui/button";
import Logo from "../Navbar/Logo";

// ICP Footer Component
const ICPFooter = () => {
    const footerRef = useRef(null);
    const isInView = useInView(footerRef, { once: true, amount: 0.1 });
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // Animation variants
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const linkVariants: Variants = {
        hidden: { x: -10, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.4, ease: "easeOut" }
        },
        hover: {
            x: 3,
            color: "#ffffff",
            transition: { duration: 0.2 }
        }
    };

    const footerLinks = [
        {
            title: "Platform",
            links: [
                { name: "Dashboard", href: "/dashboard", icon: <BarChart className="h-3.5 w-3.5" /> },
                { name: "Stake ICP", href: "/stake", icon: <Lock className="h-3.5 w-3.5" /> },
                { name: "Canisters", href: "/canisters", icon: <Cpu className="h-3.5 w-3.5" /> },
                { name: "Leaderboard", href: "/leaderboard", icon: <Trophy className="h-3.5 w-3.5" /> }
            ]
        },
        {
            title: "Learn ICP",
            links: [
                { name: "Learning Center", href: "/learn", icon: <BookOpen className="h-3.5 w-3.5" /> },
                { name: "ICP Documentation", href: "https://internetcomputer.org/docs", icon: <FileText className="h-3.5 w-3.5" /> },
                { name: "SDK & Tools", href: "/sdk", icon: <Code className="h-3.5 w-3.5" /> },
                { name: "Network Analytics", href: "/analytics", icon: <BarChart className="h-3.5 w-3.5" /> }
            ]
        },
        {
            title: "Community",
            links: [
                { name: "Developer Community", href: "/community", icon: <Users className="h-3.5 w-3.5" /> },
                { name: "Discord", href: "#", icon: <FaDiscord className="h-3.5 w-3.5" /> },
                { name: "Twitter", href: "#", icon: <FaTwitter className="h-3.5 w-3.5" /> },
                { name: "GitHub", href: "https://github.com/dfinity", icon: <FaGithub className="h-3.5 w-3.5" /> }
            ]
        }
    ];

    const legalLinks = [
        { name: "Terms", href: "/terms" },
        { name: "Privacy", href: "/privacy" },
    ];

    const socialIcons = [
        { Icon: FaTwitter, href: "https://twitter.com/dfinity", color: "#29ABE2" },
        { Icon: FaTelegram, href: "https://t.me/dfinity", color: "#29ABE2" },
        { Icon: FaGithub, href: "https://github.com/dfinity", color: "#3B00B9" },
        { Icon: FaDiscord, href: "#", color: "#ED1E79" }
    ];

    return (
        <footer
            ref={footerRef}
            className="relative bg-gradient-to-b from-[#0A0B1A] via-[#1A1B2E] to-[#2D1B69] text-white overflow-hidden"
        >
            {/* Background pattern - ICP themed */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Hexagon grid pattern representing ICP network nodes */}
                <div className="absolute inset-0 opacity-5">
                    <svg width="100%" height="100%">
                        <pattern id="icpHexPattern" width="60" height="52" patternUnits="userSpaceOnUse">
                            <path d="M30,0 L60,17.3 L60,34.6 L30,52 L0,34.6 L0,17.3 Z" fill="none" stroke="white" strokeWidth="0.5" />
                            <circle cx="30" cy="26" r="2" fill="white" opacity="0.3" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#icpHexPattern)" />
                    </svg>
                </div>

                {/* ICP gradient overlaps */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0A0B1A] to-transparent opacity-90" />
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#2D1B69] to-transparent opacity-90" />
                
                {/* Floating orbs with ICP colors */}
                <div className="absolute top-20 right-20 w-40 h-40 rounded-full bg-gradient-to-br from-[#3B00B9]/10 to-[#29ABE2]/10 blur-3xl" />
                <div className="absolute bottom-32 left-20 w-32 h-32 rounded-full bg-gradient-to-br from-[#ED1E79]/10 to-[#F15A24]/10 blur-2xl" />
            </div>

            {/* Content container */}
            <div className="container mx-auto px-6 py-16 relative z-10">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {/* Brand section */}
                    <motion.div variants={itemVariants}>
                        <div className="flex items-end">
                            <Logo size="small" />
                        </div>
                        <p className="text-white/60 text-sm mt-4 max-w-xs">
                            Learn, stake, and build on the Internet Computer Protocol. 
                            The world's first blockchain that runs at web speed with unbounded capacity.
                        </p>

                        <div className="mt-6 flex items-center">
                            <Link
                                href="https://internetcomputer.org"
                                className="inline-flex items-center text-sm text-[#29ABE2]/80 hover:text-[#29ABE2] transition-colors group"
                            >
                                <span>Explore Internet Computer</span>
                                <motion.span
                                    initial={{ x: 0 }}
                                    animate={{ x: [0, 3, 0] }}
                                    transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 3 }}
                                >
                                    <ArrowUpRight className="ml-2 h-4 w-4" />
                                </motion.span>
                            </Link>
                        </div>

                        <div className="mt-6 flex space-x-4">
                            {socialIcons.map(({ Icon, href, color }, i) => (
                                <motion.a
                                    key={i}
                                    href={href}
                                    className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors relative group"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onMouseEnter={() => setHoveredIndex(i)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    <Icon className="h-4 w-4 text-white/70 group-hover:text-white transition-colors" />
                                    {hoveredIndex === i && (
                                        <motion.div
                                            className="absolute -inset-0.5 rounded-full"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            style={{
                                                background: `linear-gradient(45deg, ${color}20, #3B00B920, #ED1E7920, #29ABE220)`,
                                                backgroundSize: '300% 300%',
                                                animation: 'gradientAnimation 3s ease infinite',
                                                zIndex: -1
                                            }}
                                        />
                                    )}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Link sections */}
                    {footerLinks.map((section, sectionIndex) => (
                        <motion.div key={section.title} variants={itemVariants}>
                            <h4 className="font-medium mb-4 text-white/90 relative inline-block">
                                {section.title}
                                <motion.span
                                    className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-[#3B00B9] via-[#ED1E79] to-[#29ABE2] rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 0.8, delay: 0.3 + (sectionIndex * 0.15) }}
                                />
                            </h4>
                            <ul className="space-y-2.5">
                                {section.links.map((link, linkIndex) => (
                                    <motion.li key={link.name} variants={itemVariants}>
                                        <Link
                                            href={link.href}
                                            className="group flex items-center"
                                        >
                                            <motion.div
                                                className="text-white/60 transition-colors flex items-center"
                                                variants={linkVariants}
                                                whileHover="hover"
                                                initial="hidden"
                                                animate={isInView ? "visible" : "hidden"}
                                                custom={linkIndex * 0.1}
                                            >
                                                <span className="flex items-center text-[#29ABE2]/70 group-hover:text-[#29ABE2] mr-1.5 transition-colors">
                                                    {link.icon}
                                                </span>
                                                <span className="text-sm group-hover:text-white/90">{link.name}</span>
                                                <motion.span
                                                    className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    animate={{
                                                        x: [0, 2, 0],
                                                        opacity: [0, 1, 0]
                                                    }}
                                                    transition={{
                                                        duration: 1.5,
                                                        repeat: Infinity,
                                                        repeatDelay: 2
                                                    }}
                                                >
                                                    <ChevronRight className="h-3 w-3" />
                                                </motion.span>
                                            </motion.div>
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </motion.div>

                {/* ICP Newsletter subscription */}
                <motion.div
                    className="mt-12 p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 relative overflow-hidden"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#3B00B9]/5 via-[#ED1E79]/5 to-[#29ABE2]/5" />
                    
                    <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10" variants={itemVariants}>
                        <div className="md:col-span-2">
                            <div className="flex items-center mb-2">
                                <Sparkles className="h-5 w-5 text-[#ED1E79] mr-2" />
                                <h4 className="text-white font-semibold">Stay Connected to the Internet Computer</h4>
                            </div>
                            <p className="text-white/60 text-sm">
                                Get updates on new canister deployments, network upgrades, developer tools, and ICP ecosystem news.
                            </p>
                        </div>
                        <div className="flex space-x-2 items-center">
                            <div className="relative flex-1">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#29ABE2]/30 focus:border-[#29ABE2]/50"
                                />
                                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#3B00B9]/20 via-[#ED1E79]/20 to-[#29ABE2]/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            </div>
                            <Button className="bg-gradient-to-r from-[#3B00B9] to-[#29ABE2] hover:from-[#2E0092] hover:to-[#1E8FBF] text-white font-medium">
                                Subscribe
                            </Button>
                        </div>
                    </motion.div>
                </motion.div>

                {/* ICP Network Status Card */}
                <motion.div
                    className="mt-8 p-4 rounded-lg bg-gradient-to-r from-[#3B00B9]/10 to-[#29ABE2]/10 border border-[#3B00B9]/20"
                    variants={itemVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-[#50C878] mr-3 animate-pulse" />
                            <span className="text-sm font-medium">ICP Network Status: Operational</span>
                        </div>
                        <Link 
                            href="https://dashboard.internetcomputer.org"
                            className="text-[#29ABE2] hover:text-white text-sm transition-colors flex items-center"
                        >
                            View Dashboard
                            <ArrowUpRight className="ml-1 h-3 w-3" />
                        </Link>
                    </div>
                </motion.div>

                {/* Bottom section with copyright */}
                <motion.div
                    className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <motion.p className="text-white/60 text-sm" variants={itemVariants}>
                        &copy; {new Date().getFullYear()} ICP Learn. Built on the Internet Computer Protocol. All rights reserved.
                    </motion.p>
                    <motion.div className="flex space-x-6 mt-4 md:mt-0" variants={itemVariants}>
                        {legalLinks.map((link, i) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-white/60 hover:text-white text-sm transition-colors relative group"
                            >
                                <span>{link.name}</span>
                                <motion.span
                                    className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-[#3B00B9] to-[#29ABE2] group-hover:w-full transition-all duration-300"
                                    initial={{ width: 0 }}
                                    whileHover={{ width: "100%" }}
                                />
                            </Link>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Animated ICP gradient line */}
                <motion.div
                    className="absolute bottom-0 left-0 w-full h-[2px] overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                >
                    <motion.div
                        className="h-full bg-gradient-to-r from-[#3B00B9] via-[#ED1E79] to-[#29ABE2]"
                        animate={{
                            backgroundPosition: ["200% 0%", "-200% 0%"],
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        style={{ backgroundSize: '300% 100%' }}
                    />
                </motion.div>
            </div>
        </footer>
    );
};

export default ICPFooter;