"use client";

import { useState, useEffect } from "react";
import { Menu, BookOpen, Users, BarChart, Layers, Sparkles, Code, User, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NavLink from "./NavLink";
import MobileMenu from "./MobileMenu";
import ICPLogo from "./Logo";

export default function ICPNavbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [principal, setPrincipal] = useState<string | null>(null);

    // Handle scroll effects for navbar
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Determine if scrolled past threshold
            if (currentScrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setMobileMenuOpen(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [mobileMenuOpen]);

    // Internet Identity Login
    const handleLogin = async () => {
        try {
            // Here you would integrate with Internet Identity
            // For now, we'll simulate login
            setIsAuthenticated(true);
            setPrincipal("rdmx6-jaaaa-aaaah-qcaaw-cai"); // Mock principal
            console.log("Login with Internet Identity");
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    // Internet Identity Logout
    const handleLogout = async () => {
        try {
            setIsAuthenticated(false);
            setPrincipal(null);
            console.log("Logout from Internet Identity");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    // Format principal for display
    const formatPrincipal = (principal: string) => {
        if (!principal) return "";
        return `${principal.slice(0, 5)}...${principal.slice(-5)}`;
    };

    return (
        <>
            <motion.nav
                className={`fixed w-full top-0 z-50 transition-all duration-300 ${
                    scrolled
                        ? "bg-[#0A0B1A]/90 backdrop-blur-xl shadow-xl border-b border-white/10"
                        : "bg-gradient-to-r from-[#0A0B1A] via-[#1A1B2E] to-[#2D1B69]/20"
                }`}
                initial={{ y: 0 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-18">
                        {/* Logo and Brand */}
                        <motion.div
                            className="flex items-center flex-shrink-0"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <ICPLogo />
                        </motion.div>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
                            <motion.div
                                className="flex items-center space-x-1 xl:space-x-2"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    staggerChildren: 0.1,
                                    delayChildren: 0.2
                                }}
                            >
                                <NavLink href="/dashboard" delay={0}>Dashboard</NavLink>
                                <NavLink href="/learn" delay={1}>Learn</NavLink>
                                <NavLink href="/profile" delay={2}>Profile</NavLink>
                                <NavLink href="/stake" delay={3}>Stake</NavLink>
                                <NavLink href="/leaderboard" delay={4}>Leaderboard</NavLink>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button 
                                            variant="ghost" 
                                            className="nav-link text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 px-3 py-2 rounded-lg"
                                        >
                                            Resources
                                            <Layers className="ml-1 h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        align="end"
                                        className="bg-[#0A0B1A]/95 backdrop-blur-xl text-white border-[#3B00B9]/30 shadow-2xl p-2 w-64 rounded-xl animate-in fade-in-50 data-[side=bottom]:slide-in-from-top-5"
                                    >
                                        <DropdownMenuItem className="focus:bg-white/10 rounded-lg transition-colors duration-200 cursor-pointer">
                                            <a href="https://internetcomputer.org/docs" className="flex w-full items-center py-2">
                                                <BookOpen className="mr-3 h-4 w-4 text-[#29ABE2]" />
                                                <span>ICP Documentation</span>
                                            </a>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="focus:bg-white/10 rounded-lg transition-colors duration-200 cursor-pointer">
                                            <a href="/community" className="flex w-full items-center py-2">
                                                <Users className="mr-3 h-4 w-4 text-[#ED1E79]" />
                                                <span>Developer Community</span>
                                            </a>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator className="bg-white/10 my-2" />
                                        <DropdownMenuItem className="focus:bg-white/10 rounded-lg transition-colors duration-200 cursor-pointer">
                                            <a href="/analytics" className="flex w-full items-center py-2">
                                                <BarChart className="mr-3 h-4 w-4 text-[#3B00B9]" />
                                                <span>Network Analytics</span>
                                            </a>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="focus:bg-white/10 rounded-lg transition-colors duration-200 cursor-pointer">
                                            <a href="/sdk" className="flex w-full items-center py-2">
                                                <Code className="mr-3 h-4 w-4 text-[#F15A24]" />
                                                <span>SDK & Tools</span>
                                            </a>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator className="bg-white/10 my-2" />
                                        <div className="px-2 py-2 mt-1">
                                            <div className="flex items-center justify-between bg-gradient-to-r from-[#3B00B9]/20 to-[#29ABE2]/20 p-3 rounded-lg border border-[#3B00B9]/20">
                                                <div className="flex items-center">
                                                    <Sparkles className="h-4 w-4 text-[#ED1E79] mr-2" />
                                                    <span className="text-sm font-medium">Canister Explorer</span>
                                                </div>
                                                <span className="px-2 py-1 bg-[#ED1E79]/20 text-[#ED1E79] text-xs rounded-full font-medium">Beta</span>
                                            </div>
                                        </div>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </motion.div>
                        </div>

                        {/* Right Side - Internet Identity + Mobile Menu */}
                        <div className="flex items-center space-x-3">
                            {/* Internet Identity - Desktop */}
                            <motion.div
                                className="hidden lg:block"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                {isAuthenticated ? (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button 
                                                variant="outline" 
                                                className="bg-gradient-to-r from-[#3B00B9] to-[#29ABE2] hover:from-[#2D0088] hover:to-[#1E8BB8] text-white border-none shadow-lg"
                                            >
                                                <User className="h-4 w-4 mr-2" />
                                                {formatPrincipal(principal || "")}
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            align="end"
                                            className="bg-[#0A0B1A]/95 backdrop-blur-xl text-white border-[#3B00B9]/30 shadow-2xl p-2 w-56 rounded-xl"
                                        >
                                            <div className="px-3 py-2 text-sm text-gray-300">
                                                <div className="font-medium">Principal ID</div>
                                                <div className="text-xs font-mono text-gray-400 break-all">
                                                    {principal}
                                                </div>
                                            </div>
                                            <DropdownMenuSeparator className="bg-white/10 my-2" />
                                            <DropdownMenuItem className="focus:bg-white/10 rounded-lg transition-colors duration-200 cursor-pointer">
                                                <a href="/profile" className="flex w-full items-center py-2">
                                                    <User className="mr-3 h-4 w-4 text-[#29ABE2]" />
                                                    <span>Profile</span>
                                                </a>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator className="bg-white/10 my-2" />
                                            <DropdownMenuItem 
                                                className="focus:bg-red-500/20 rounded-lg transition-colors duration-200 cursor-pointer"
                                                onClick={handleLogout}
                                            >
                                                <LogOut className="mr-3 h-4 w-4 text-red-400" />
                                                <span>Logout</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                ) : (
                                    <Button 
                                        onClick={handleLogin}
                                        className="bg-gradient-to-r from-[#3B00B9] to-[#29ABE2] hover:from-[#2D0088] hover:to-[#1E8BB8] text-white shadow-lg shadow-[#3B00B9]/20"
                                    >
                                        <User className="h-4 w-4 mr-2" />
                                        Internet Identity
                                    </Button>
                                )}
                            </motion.div>

                            {/* Mobile Menu Button */}
                            <motion.div
                                className="lg:hidden"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-white hover:bg-white/10 w-10 h-10 rounded-lg transition-all duration-200"
                                    onClick={() => setMobileMenuOpen(true)}
                                    aria-label="Open mobile menu"
                                >
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Animated accent line with ICP gradient */}
                <motion.div
                    className="h-[2px] w-full bg-gradient-to-r from-[#3B00B9] via-[#ED1E79] to-[#29ABE2]"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{
                        scaleX: scrolled ? 1 : 0,
                        opacity: scrolled ? 1 : 0
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    style={{ transformOrigin: "left" }}
                />

                {/* Floating indicators - only visible when not scrolled */}
                <AnimatePresence>
                    {!scrolled && (
                        <>
                            <motion.div
                                className="absolute -bottom-1 left-1/4 w-2 h-2 rounded-full bg-[#ED1E79]"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 0.7 }}
                                exit={{ y: 20, opacity: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            />
                            <motion.div
                                className="absolute -bottom-2 left-1/2 w-3 h-3 rounded-full bg-[#29ABE2]"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 0.5 }}
                                exit={{ y: 20, opacity: 0 }}
                                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                            />
                            <motion.div
                                className="absolute -bottom-1 left-3/4 w-2 h-2 rounded-full bg-[#3B00B9]"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 0.7 }}
                                exit={{ y: 20, opacity: 0 }}
                                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            />
                        </>
                    )}
                </AnimatePresence>
            </motion.nav>

            {/* Mobile Menu with improved functionality */}
            <MobileMenu 
                isOpen={mobileMenuOpen} 
                onClose={() => setMobileMenuOpen(false)}
                isAuthenticated={isAuthenticated}
                principal={principal}
                onLogin={handleLogin}
                onLogout={handleLogout}
            />
        </>
    );
}