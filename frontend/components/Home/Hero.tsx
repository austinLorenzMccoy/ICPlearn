"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import {
    Wallet,
    GraduationCap,
    ArrowRight,
    Shield,
    ChevronRight,
    Sparkles,
    Cpu,
    Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Hero Section for ICP Education + Staking Platform
const ICPEducationHero = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    // Animation variants
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: [0.165, 0.84, 0.44, 1] }
        }
    };

    const statsVariants: Variants = {
        hidden: { y: 15, opacity: 0 },
        visible: (custom: number) => ({
            y: 0,
            opacity: 1,
            transition: {
                delay: 0.5 + (custom * 0.1),
                duration: 0.5,
                ease: "easeOut"
            }
        })
    };

    const dashboardVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                delay: 0.4,
                ease: "easeOut"
            }
        }
    };

    const progressVariants: Variants = {
        hidden: { width: 0 },
        visible: {
            width: "80%",
            transition: { delay: 0.6, duration: 0.8, ease: "easeOut" }
        }
    };

    // Floating animation for accent elements
    const floatVariants: Variants = {
        hidden: { y: 0, opacity: 0 },
        visible: {
            y: [0, -10, 0],
            opacity: 1,
            transition: {
                y: {
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut"
                },
                opacity: { duration: 0.5 }
            }
        }
    };

    return (
        <div className="relative overflow-hidden bg-gradient-to-b from-[#0A0B1A] to-[#1A1B2E]">
            {/* Enhanced background elements with ICP colors */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIwLjMiPjxwYXRoIGQ9Ik0zNiAxOGgxOHYxOEgzNnpNMTggMzZoMTh2MThoLTE4ek0zNiAwaDZ2NmgtNnpNMCA0MGg2djZIMHpNMCAxNmg2djZIMHpNNDIgMGg2djZoLTZ6TTI0IDBoNnY2aC02ek02IDBoNnY2SDZ6TTYgMThoNnY2SDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-[0.05]" />

                {/* ICP-themed gradient orbs */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#3B00B9]/8 rounded-full blur-[120px] opacity-30" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#F15A24]/8 rounded-full blur-[150px] opacity-30" />
                <div className="absolute top-40 right-1/3 w-60 h-60 bg-[#ED1E79]/5 rounded-full blur-[100px] opacity-40" />
                <div className="absolute bottom-40 left-1/3 w-40 h-40 bg-[#29ABE2]/5 rounded-full blur-[80px] opacity-30" />
            </div>

            <div className="container relative z-10 mx-auto px-6 py-24 md:py-28 lg:py-32">
                {/* Floating accent ornaments */}
                <motion.div
                    className="absolute -top-16 right-1/4 text-[#ED1E79] opacity-30"
                    variants={floatVariants}
                    initial="hidden"
                    animate={isLoaded ? "visible" : "hidden"}
                >
                    <Sparkles className="w-20 h-20" />
                </motion.div>
                <motion.div
                    className="absolute bottom-20 left-1/4 text-[#29ABE2] opacity-20"
                    variants={floatVariants}
                    initial="hidden"
                    animate={isLoaded ? "visible" : "hidden"}
                    style={{ animationDelay: "1s" }}
                >
                    <Cpu className="w-16 h-16" />
                </motion.div>

                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Left Content */}
                    <motion.div
                        className="lg:w-1/2 lg:pr-8"
                        variants={containerVariants}
                        initial="hidden"
                        animate={isLoaded ? "visible" : "hidden"}
                    >
                        {/* Main Heading with ICP education focus */}
                        <motion.div variants={itemVariants}>
                            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">
                                <span className="block mb-2 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">Learn.</span>
                                <span className="block mb-2 bg-gradient-to-r from-[#ED1E79] to-[#F15A24] bg-clip-text text-transparent">Stake.</span>
                                <span className="relative inline-block">
                                    <span className="bg-gradient-to-r from-[#E2E8F0] via-white to-[#29ABE2]/80 bg-clip-text text-transparent">Earn More.</span>
                                    <motion.div
                                        className="absolute -bottom-1.5 left-0 h-[3px] bg-gradient-to-r from-[#3B00B9] via-[#ED1E79] to-[#29ABE2] rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 0.8, delay: 0.8 }}
                                    />
                                </span>
                            </h1>
                        </motion.div>

                        {/* Description tailored for ICP education */}
                        <motion.p
                            className="text-lg text-white/80 mb-8 max-w-xl leading-relaxed"
                            variants={itemVariants}
                        >
                            Boost your ICP staking rewards by completing educational courses about the Internet Computer. Master canisters, neurons, and Web3 development while earning more.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            className="flex flex-wrap gap-4 mb-12"
                            variants={itemVariants}
                        >
                            <motion.div
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <Button
                                    size="lg"
                                    className="bg-gradient-to-r from-[#3B00B9] to-[#ED1E79] hover:from-[#2E0092] hover:to-[#D11A6B] text-white font-medium shadow-lg shadow-[#3B00B9]/20 px-6 border border-[#3B00B9]/30"
                                >
                                    <span>Start Learning</span>
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="backdrop-blur-sm text-slate-900 border-white/20 hover:text-white hover:bg-white/5 hover:border-white/30 px-6"
                                >
                                    Learn More
                                </Button>
                            </motion.div>
                        </motion.div>

                        {/* ICP-specific Stats Section */}
                        <div className="grid grid-cols-3 gap-2 lg:gap-6">
                            <motion.div
                                className="bg-white/5 rounded-lg p-4 backdrop-blur-sm border border-white/10 hover:border-[#29ABE2]/30 transition-colors duration-300"
                                variants={statsVariants}
                                custom={0}
                            >
                                <p className="text-white/60 text-xs mb-2">Total Staked</p>
                                <div className="flex items-center">
                                    <p className="text-xl font-bold text-white">8.5M</p>
                                    <span className="ml-1 text-[#29ABE2] text-sm">ICP</span>
                                </div>
                            </motion.div>

                            <motion.div
                                className="bg-white/5 rounded-lg p-4 backdrop-blur-sm border border-white/10 hover:border-[#ED1E79]/30 transition-colors duration-300"
                                variants={statsVariants}
                                custom={1}
                            >
                                <p className="text-white/60 text-xs mb-2">Learners</p>
                                <p className="text-xl font-bold text-white">15,200<span className="text-[#ED1E79] text-sm">+</span></p>
                            </motion.div>

                            <motion.div
                                className="bg-white/5 rounded-lg p-4 backdrop-blur-sm border border-white/10 hover:border-[#F15A24]/30 transition-colors duration-300"
                                variants={statsVariants}
                                custom={2}
                            >
                                <p className="text-white/60 text-xs mb-2">Avg. APY</p>
                                <div className="flex items-center">
                                    <p className="text-xl font-bold text-white">12-28%</p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right Content - ICP Education Dashboard Preview */}
                    <motion.div
                        className="lg:w-1/2"
                        variants={dashboardVariants}
                        initial="hidden"
                        animate={isLoaded ? "visible" : "hidden"}
                    >
                        <div className="relative">
                            {/* Enhanced glow effect with ICP colors */}
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#3B00B9]/30 via-[#ED1E79]/20 to-[#29ABE2]/30 rounded-xl blur-xl opacity-40" />

                            <div className="relative bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-2xl">
                                {/* Dashboard Header */}
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-medium bg-gradient-to-r from-white to-[#29ABE2]/80 bg-clip-text text-transparent">ICP Learning Dashboard</h3>
                                    <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs text-[#ED1E79]/90 border border-[#ED1E79]/20">
                                        Preview
                                    </div>
                                </div>

                                {/* Dashboard Content with ICP-specific elements */}
                                <div className="space-y-5">
                                    {/* ICP Staking Card */}
                                    <div className="bg-white/5 rounded-lg p-4 backdrop-blur-sm border border-white/10 hover:border-[#3B00B9]/30 transition-all duration-300">
                                        <div className="flex justify-between items-center mb-3">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 rounded-full bg-[#3B00B9]/10 flex items-center justify-center mr-3 border border-[#3B00B9]/20">
                                                    <Wallet className="h-5 w-5 text-[#3B00B9]" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-white">ICP Neurons</p>
                                                    <p className="text-xs text-white/60">8-year dissolve delay</p>
                                                </div>
                                            </div>
                                            <p className="text-xl font-bold text-white">2,450</p>
                                        </div>
                                        <div className="flex justify-between text-xs text-white/70">
                                            <span>Base APY: <span className="text-[#F15A24]">10%</span></span>
                                            <span>Learning Boost: <span className="text-[#29ABE2]">2.0x</span></span>
                                            <span className="font-medium">Effective: <span className="text-[#ED1E79]">20%</span></span>
                                        </div>
                                    </div>

                                    {/* Learning Progress Card */}
                                    <div className="bg-white/5 rounded-lg p-4 backdrop-blur-sm border border-white/10 hover:border-[#29ABE2]/30 transition-all duration-300">
                                        <div className="flex justify-between items-center mb-3">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 rounded-full bg-[#29ABE2]/10 flex items-center justify-center mr-3 border border-[#29ABE2]/20">
                                                    <GraduationCap className="h-5 w-5 text-[#29ABE2]" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-white">Course Progress</p>
                                                    <p className="text-xs text-white/60">Canister Development</p>
                                                </div>
                                            </div>
                                            <p className="text-xl font-bold text-white">80%</p>
                                        </div>
                                        <div className="relative w-full bg-white/10 rounded-full h-2 mb-3 overflow-hidden">
                                            <motion.div
                                                className="h-full rounded-full bg-gradient-to-r from-[#29ABE2] to-[#ED1E79]"
                                                variants={progressVariants}
                                            />
                                        </div>
                                        <div className="flex justify-between text-xs text-white/70">
                                            <span>Complete to earn <span className="text-[#F15A24]">250 points</span></span>
                                            <span className="font-medium">Unlock <span className="text-[#29ABE2]">+0.3x boost</span></span>
                                        </div>
                                    </div>

                                    {/* Next Course Card */}
                                    <div className="bg-white/5 rounded-lg p-4 backdrop-blur-sm border border-white/10 hover:border-[#ED1E79]/30 transition-all duration-300">
                                        <div className="flex justify-between items-center mb-2">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 rounded-full bg-[#ED1E79]/10 flex items-center justify-center mr-3 border border-[#ED1E79]/20">
                                                    <Zap className="h-4 w-4 text-[#ED1E79]" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-white">Up Next</p>
                                                    <p className="text-xs text-white/60">Chain Fusion Technology</p>
                                                </div>
                                            </div>
                                            <span className="text-xs px-2 py-1 rounded-full bg-[#ED1E79]/10 text-[#ED1E79] border border-[#ED1E79]/20">
                                                +0.4x boost
                                            </span>
                                        </div>
                                    </div>

                                    {/* Security Card */}
                                    <div className="bg-white/5 rounded-lg p-3 backdrop-blur-sm border border-white/10 hover:border-[#F15A24]/30 transition-all duration-300">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 rounded-full bg-[#F15A24]/5 flex items-center justify-center mr-2 border border-[#F15A24]/20">
                                                <Shield className="h-4 w-4 text-[#F15A24]" />
                                            </div>
                                            <p className="text-xs">
                                                <span className="text-[#F15A24] font-medium">Secured by Network Nervous System</span>
                                                <span className="text-white/60 ml-2">Decentralized Governance</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Dashboard Footer */}
                                <div className="mt-6">
                                    <Button className="w-full bg-gradient-to-r from-[#3B00B9] to-[#29ABE2] hover:from-[#2E0092] hover:to-[#1E8BB8] text-white font-medium group border border-white/10">
                                        <span>View Dashboard</span>
                                        <ChevronRight className="ml-2 h-4 w-4 opacity-70 group-hover:translate-x-0.5 transition-transform" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ICPEducationHero;