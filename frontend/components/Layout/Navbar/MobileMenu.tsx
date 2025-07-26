"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, ChevronRight, BookOpen, User, GraduationCap, Trophy, Users, Zap, Sparkles, Cpu, Code, BarChart, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    isAuthenticated?: boolean;
    principal?: string | null;
    onLogin?: () => void;
    onLogout?: () => void;
}

export default function ICPMobileMenu({ 
    isOpen, 
    onClose, 
    isAuthenticated = false, 
    principal = null, 
    onLogin, 
    onLogout 
}: MobileMenuProps) {
    const menuItems = [
        { name: "Dashboard", href: "/dashboard", icon: <BarChart className="h-5 w-5" />, color: "from-[#3B00B9]/20 to-[#29ABE2]/20" },
        { name: "Stake ICP", href: "/stake", icon: <Zap className="h-5 w-5" />, color: "from-[#ED1E79]/20 to-[#F15A24]/20" },
        { name: "Learn", href: "/learn", icon: <GraduationCap className="h-5 w-5" />, color: "from-[#29ABE2]/20 to-[#3B00B9]/20" },
        { name: "Canisters", href: "/canisters", icon: <Cpu className="h-5 w-5" />, color: "from-[#F15A24]/20 to-[#ED1E79]/20" },
        { name: "Leaderboard", href: "/leaderboard", icon: <Trophy className="h-5 w-5" />, color: "from-[#29ABE2]/20 to-[#ED1E79]/20" },
    ];

    const resourceItems = [
        { name: "ICP Documentation", href: "https://internetcomputer.org/docs", icon: <BookOpen className="h-5 w-5" />, color: "from-[#29ABE2]/20 to-[#3B00B9]/20" },
        { name: "Developer Community", href: "/community", icon: <Users className="h-5 w-5" />, color: "from-[#ED1E79]/20 to-[#F15A24]/20" },
        { name: "SDK & Tools", href: "/sdk", icon: <Code className="h-5 w-5" />, color: "from-[#F15A24]/20 to-[#29ABE2]/20" },
    ];

    // Animation variants
    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.2 }
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.2, delay: 0.1 }
        }
    };

    const menuVariants = {
        hidden: { x: "100%" },
        visible: {
            x: 0,
            transition: {
                type: "spring",
                damping: 30,
                stiffness: 300,
                duration: 0.4
            }
        },
        exit: {
            x: "100%",
            transition: {
                type: "spring",
                damping: 35,
                stiffness: 400,
                duration: 0.3
            }
        }
    };

    const menuItemVariants = {
        hidden: {
            x: 30,
            opacity: 0
        },
        visible: (custom: number) => ({
            x: 0,
            opacity: 1,
            transition: {
                delay: 0.1 + custom * 0.04,
                duration: 0.3,
                ease: "easeOut"
            }
        }),
        exit: (custom: number) => ({
            x: 30,
            opacity: 0,
            transition: {
                delay: custom * 0.01,
                duration: 0.15,
                ease: "easeIn"
            }
        })
    };

    const handleLinkClick = () => {
        onClose();
    };

    const formatPrincipal = (principal: string) => {
        if (!principal) return "";
        return `${principal.slice(0, 8)}...${principal.slice(-8)}`;
    };

    const handleLogin = () => {
        onLogin?.();
        onClose();
    };

    const handleLogout = () => {
        onLogout?.();
        onClose();
    };

    return (
        <AnimatePresence mode="wait">
            {isOpen && (
                <div className="fixed inset-0 z-[200] lg:hidden">
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                        variants={backdropVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    />

                    {/* Mobile menu panel */}
                    <motion.div
                        className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-gradient-to-br from-[#0A0B1A] via-[#1A1B2E] to-[#2D1B69] text-white shadow-2xl border-l border-white/10 overflow-hidden"
                        variants={menuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <div className="relative h-full flex flex-col">
                            {/* Menu header with close button */}
                            <motion.div
                                className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/20"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15, duration: 0.3 }}
                            >
                                <div>
                                    <h2 className="text-xl font-bold bg-gradient-to-r from-[#ED1E79] to-[#29ABE2] bg-clip-text text-transparent">
                                        ICP Learn
                                    </h2>
                                    <p className="text-xs text-white/60 mt-1">Internet Computer Protocol</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="p-2 rounded-full hover:bg-white/10 text-white transition-colors duration-200 active:scale-95"
                                    aria-label="Close menu"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </motion.div>

                            {/* Background graphic elements */}
                            <div className="absolute top-20 right-0 -mr-16 h-32 w-32 rounded-full bg-gradient-to-br from-[#3B00B9]/10 to-[#29ABE2]/10 blur-2xl" />
                            <div className="absolute bottom-40 left-0 -ml-16 h-40 w-40 rounded-full bg-gradient-to-br from-[#ED1E79]/10 to-[#F15A24]/10 blur-2xl" />

                            {/* User Identity Section */}
                            {isAuthenticated && principal && (
                                <motion.div
                                    className="px-4 py-4 border-b border-white/10 bg-black/10"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 0.3 }}
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-gradient-to-br from-[#3B00B9]/20 to-[#29ABE2]/20 p-2.5 rounded-lg border border-white/10">
                                            <User className="h-5 w-5 text-[#29ABE2]" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-white">Internet Identity</p>
                                            <p className="text-xs text-white/60 font-mono truncate">
                                                {formatPrincipal(principal)}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Navigation section */}
                            <div className="flex-1 overflow-y-auto py-6 px-4 space-y-6">
                                {/* Main Navigation */}
                                <nav className="space-y-1">
                                    <motion.h3 
                                        className="text-xs font-semibold text-white/50 px-3 mb-3 uppercase tracking-wider"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2, duration: 0.3 }}
                                    >
                                        Navigation
                                    </motion.h3>
                                    {menuItems.map((item, index) => (
                                        <motion.div
                                            key={item.name}
                                            custom={index}
                                            variants={menuItemVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                        >
                                            <Link
                                                href={item.href}
                                                className="flex items-center py-3 px-3 rounded-xl text-white hover:bg-white/10 transition-all duration-200 group active:scale-95"
                                                onClick={handleLinkClick}
                                            >
                                                <span className={`bg-gradient-to-br ${item.color} p-2.5 rounded-lg mr-3 group-hover:scale-105 transition-transform duration-200 border border-white/10`}>
                                                    {item.icon}
                                                </span>
                                                <span className="font-medium flex-1">{item.name}</span>
                                                <ChevronRight className="h-4 w-4 text-white/40 group-hover:text-white/70 group-hover:translate-x-0.5 transition-all duration-200" />
                                            </Link>
                                        </motion.div>
                                    ))}
                                </nav>

                                {/* Resources Section */}
                                <motion.div
                                    className="border-t border-white/10 pt-4"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4, duration: 0.4 }}
                                >
                                    <h3 className="text-xs font-semibold text-white/50 px-3 mb-3 uppercase tracking-wider">Resources</h3>
                                    <div className="space-y-1">
                                        {resourceItems.map((item, index) => (
                                            <motion.div
                                                key={item.name}
                                                custom={index + menuItems.length}
                                                variants={menuItemVariants}
                                                initial="hidden"
                                                animate="visible"
                                                exit="exit"
                                            >
                                                <Link
                                                    href={item.href}
                                                    className="flex items-center py-3 px-3 rounded-xl text-white hover:bg-white/10 transition-all duration-200 group active:scale-95"
                                                    onClick={handleLinkClick}
                                                >
                                                    <span className={`bg-gradient-to-br ${item.color} p-2.5 rounded-lg mr-3 group-hover:scale-105 transition-transform duration-200 border border-white/10`}>
                                                        {item.icon}
                                                    </span>
                                                    <span className="font-medium flex-1">{item.name}</span>
                                                    <ChevronRight className="h-4 w-4 text-white/40 group-hover:text-white/70 group-hover:translate-x-0.5 transition-all duration-200" />
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Learning Boost Card */}
                                <motion.div
                                    className="mt-6 p-4 rounded-xl bg-gradient-to-br from-[#3B00B9]/10 to-[#29ABE2]/10 border border-white/10 backdrop-blur-sm"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.6, duration: 0.4 }}
                                >
                                    <div className="flex items-center mb-3">
                                        <Sparkles className="h-5 w-5 text-[#ED1E79] mr-2" />
                                        <h3 className="font-semibold text-white">Boost Your Rewards</h3>
                                    </div>
                                    <p className="text-sm text-white/70 mb-4 leading-relaxed">
                                        Learn about canisters, neurons, and ICP development to increase your staking multipliers.
                                    </p>
                                    <Button
                                        className="w-full bg-gradient-to-r from-[#3B00B9] to-[#ED1E79] hover:from-[#2E0092] to-[#D11A6B] text-white font-medium shadow-lg active:scale-95 transition-transform duration-200"
                                        size="sm"
                                        onClick={handleLinkClick}
                                    >
                                        Start Learning ICP
                                    </Button>
                                </motion.div>
                            </div>

                            {/* Internet Identity section */}
                            <motion.div
                                className="px-4 py-4 mt-auto border-t border-white/10 bg-black/20"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.4 }}
                            >
                                {isAuthenticated ? (
                                    <div className="space-y-3">
                                        <Link href="/profile" onClick={handleLinkClick}>
                                            <Button 
                                                variant="outline" 
                                                className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30"
                                            >
                                                <User className="h-4 w-4 mr-2" />
                                                View Profile
                                            </Button>
                                        </Link>
                                        <Button 
                                            onClick={handleLogout}
                                            variant="outline"
                                            className="w-full bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-500/50"
                                        >
                                            <LogOut className="h-4 w-4 mr-2" />
                                            Logout
                                        </Button>
                                    </div>
                                ) : (
                                    <Button 
                                        onClick={handleLogin}
                                        className="w-full bg-gradient-to-r from-[#3B00B9] to-[#29ABE2] hover:from-[#2D0088] hover:to-[#1E8BB8] text-white font-medium shadow-lg"
                                    >
                                        <User className="h-4 w-4 mr-2" />
                                        Internet Identity
                                    </Button>
                                )}
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}