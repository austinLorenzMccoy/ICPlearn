"use client";

import { motion } from "framer-motion";
import {
    Wallet,
    GraduationCap,
    CheckCircle2,
    ArrowRight,
    ChevronRight,
    Sparkles,
    Zap,
    Cpu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// How It Works Section for ICP
const ICPHowItWorks = () => {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const cardVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: (custom: number) => ({
            y: 0,
            opacity: 1,
            transition: {
                delay: 0.2 * custom,
                duration: 0.6,
                ease: [0.175, 0.885, 0.32, 1.275]
            }
        }),
        hover: {
            y: -8,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 15
            }
        }
    };

    const checkVariants = {
        hidden: { scale: 0, opacity: 0 },
        visible: (custom: number) => ({
            scale: 1,
            opacity: 1,
            transition: {
                delay: 0.1 * custom,
                duration: 0.4,
                ease: "easeOut"
            }
        })
    };

    return (
        <div className="relative py-20 overflow-hidden">
            {/* Dark ICP-themed background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0B1A] to-[#1A1B2E] -z-10" />

            {/* Subtle background pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIwLjIiPjxwYXRoIGQ9Ik0zNiAxOGgxOHYxOEgzNnpNMTggMzZoMTh2MThoLTE4ek0zNiAwaDZ2NmgtNnpNMCA0MGg2djZIMHpNMCAxNmg2djZIMHpNNDIgMGg2djZoLTZ6TTI0IDBoNnY2aC02ek02IDBoNnY2SDZ6TTYgMThoNnY2SDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-[0.02] -z-10" />

            {/* ICP brand color accents */}
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#3B00B9]/8 rounded-full blur-[150px] opacity-30 -z-5" />
            <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-[#29ABE2]/8 rounded-full blur-[150px] opacity-30 -z-5" />
            <div className="absolute top-40 right-1/3 w-60 h-60 bg-[#ED1E79]/8 rounded-full blur-[120px] opacity-25 -z-5" />
            <div className="absolute bottom-40 left-1/3 w-40 h-40 bg-[#F15A24]/8 rounded-full blur-[100px] opacity-25 -z-5" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                >
                    <motion.div variants={itemVariants}>
                        <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#ED1E79]/10 to-[#29ABE2]/10 rounded-full text-[#ED1E79] text-sm font-medium mb-4 shadow-lg border border-[#ED1E79]/20">
                            <Sparkles className="h-4 w-4 inline-block mr-2" />
                            Three Simple Steps
                        </span>
                    </motion.div>
                    <motion.h2
                        className="text-4xl md:text-5xl font-bold mb-6 text-white"
                        variants={itemVariants}
                    >
                        How <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ED1E79] to-[#29ABE2]">ICP Learn</span> Works
                    </motion.h2>
                    <motion.p
                        className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed"
                        variants={itemVariants}
                    >
                        Master the Internet Computer Protocol while earning enhanced staking rewards through our innovative education platform.
                    </motion.p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                >
                    {/* Step 1: Stake ICP Neurons */}
                    <motion.div
                        variants={cardVariants}
                        custom={0}
                        whileHover="hover"
                    >
                        <Card className="border-0 shadow-2xl bg-gradient-to-br from-[#1E293B]/95 to-[#0F172A]/95 backdrop-blur-xl text-white relative overflow-hidden h-full group rounded-2xl">
                            {/* Enhanced gradient on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#3B00B9]/15 via-[#3B00B9]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Enhanced top-right accent */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#3B00B9]/15 to-transparent rounded-bl-full opacity-60" />

                            <CardHeader className="relative pb-4">
                                {/* Enhanced hover glow effect */}
                                <div className="absolute -top-8 -left-8 w-24 h-24 bg-[#3B00B9]/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="flex justify-between items-start mb-6">
                                    <div className="h-18 w-18 rounded-2xl bg-gradient-to-br from-[#3B00B9]/20 to-[#3B00B9]/5 flex items-center justify-center border border-[#3B00B9]/30 shadow-xl group-hover:shadow-[0_0_20px_rgba(59,0,185,0.3)] transition-shadow duration-300">
                                        <Cpu className="h-8 w-8 text-[#3B00B9]" />
                                    </div>
                                    <span className="text-2xl font-bold text-white/20 mr-2">01</span>
                                </div>

                                <CardTitle className="text-2xl text-white group-hover:text-[#3B00B9] transition-colors mb-3">
                                    Stake ICP Neurons
                                </CardTitle>
                                <CardDescription className="text-white/70 group-hover:text-white/90 transition-colors text-base">
                                    Create neurons and stake your ICP tokens in the Network Nervous System with customizable dissolve delays.
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="pt-0">
                                <ul className="space-y-4">
                                    <motion.li
                                        className="flex items-start"
                                        variants={checkVariants}
                                        custom={0}
                                    >
                                        <div className="bg-[#3B00B9]/15 rounded-full p-1.5 mr-3 mt-1 shrink-0 group-hover:bg-[#3B00B9]/25 transition-colors duration-300">
                                            <CheckCircle2 className="h-4 w-4 text-[#3B00B9]" />
                                        </div>
                                        <span className="text-white/80 group-hover:text-white/95 transition-colors">Choose dissolve delays from 6 months to 8 years</span>
                                    </motion.li>
                                    <motion.li
                                        className="flex items-start"
                                        variants={checkVariants}
                                        custom={1}
                                    >
                                        <div className="bg-[#3B00B9]/15 rounded-full p-1.5 mr-3 mt-1 shrink-0 group-hover:bg-[#3B00B9]/25 transition-colors duration-300">
                                            <CheckCircle2 className="h-4 w-4 text-[#3B00B9]" />
                                        </div>
                                        <span className="text-white/80 group-hover:text-white/95 transition-colors">Earn base staking rewards of 8-12% APY</span>
                                    </motion.li>
                                    <motion.li
                                        className="flex items-start"
                                        variants={checkVariants}
                                        custom={2}
                                    >
                                        <div className="bg-[#3B00B9]/15 rounded-full p-1.5 mr-3 mt-1 shrink-0 group-hover:bg-[#3B00B9]/25 transition-colors duration-300">
                                            <CheckCircle2 className="h-4 w-4 text-[#3B00B9]" />
                                        </div>
                                        <span className="text-white/80 group-hover:text-white/95 transition-colors">Participate in network governance voting</span>
                                    </motion.li>
                                </ul>

                                {/* Enhanced button-like hover element */}
                                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#3B00B9]/25 to-[#3B00B9]/15 flex items-center justify-center shadow-lg border border-[#3B00B9]/30">
                                        <ChevronRight className="h-5 w-5 text-[#3B00B9]" />
                                    </div>
                                </div>
                            </CardContent>

                            {/* Edge highlights */}
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#3B00B9]/30 to-transparent" />
                            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#3B00B9]/20 to-transparent" />
                        </Card>
                    </motion.div>

                    {/* Step 2: Learn ICP Concepts */}
                    <motion.div
                        variants={cardVariants}
                        custom={1}
                        whileHover="hover"
                    >
                        <Card className="border-0 shadow-2xl bg-gradient-to-br from-[#1E293B]/95 to-[#0F172A]/95 backdrop-blur-xl text-white relative overflow-hidden h-full group rounded-2xl">
                            {/* Enhanced gradient on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#29ABE2]/15 via-[#29ABE2]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Enhanced top-right accent */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#29ABE2]/15 to-transparent rounded-bl-full opacity-60" />

                            <CardHeader className="relative pb-4">
                                {/* Enhanced hover glow effect */}
                                <div className="absolute -top-8 -left-8 w-24 h-24 bg-[#29ABE2]/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="flex justify-between items-start mb-6">
                                    <div className="h-18 w-18 rounded-2xl bg-gradient-to-br from-[#29ABE2]/20 to-[#29ABE2]/5 flex items-center justify-center border border-[#29ABE2]/30 shadow-xl group-hover:shadow-[0_0_20px_rgba(41,171,226,0.3)] transition-shadow duration-300">
                                        <GraduationCap className="h-8 w-8 text-[#29ABE2]" />
                                    </div>
                                    <span className="text-2xl font-bold text-white/20 mr-2">02</span>
                                </div>

                                <CardTitle className="text-2xl text-white group-hover:text-[#29ABE2] transition-colors mb-3">
                                    Learn ICP Concepts
                                </CardTitle>
                                <CardDescription className="text-white/70 group-hover:text-white/90 transition-colors text-base">
                                    Master canisters, Chain Fusion, and Internet Computer development through interactive courses.
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="pt-0">
                                <ul className="space-y-4">
                                    <motion.li
                                        className="flex items-start"
                                        variants={checkVariants}
                                        custom={3}
                                    >
                                        <div className="bg-[#29ABE2]/15 rounded-full p-1.5 mr-3 mt-1 shrink-0 group-hover:bg-[#29ABE2]/25 transition-colors duration-300">
                                            <CheckCircle2 className="h-4 w-4 text-[#29ABE2]" />
                                        </div>
                                        <span className="text-white/80 group-hover:text-white/95 transition-colors">Build canister smart contracts with Motoko & Rust</span>
                                    </motion.li>
                                    <motion.li
                                        className="flex items-start"
                                        variants={checkVariants}
                                        custom={4}
                                    >
                                        <div className="bg-[#29ABE2]/15 rounded-full p-1.5 mr-3 mt-1 shrink-0 group-hover:bg-[#29ABE2]/25 transition-colors duration-300">
                                            <CheckCircle2 className="h-4 w-4 text-[#29ABE2]" />
                                        </div>
                                        <span className="text-white/80 group-hover:text-white/95 transition-colors">Understand Chain Fusion & cross-chain integration</span>
                                    </motion.li>
                                    <motion.li
                                        className="flex items-start"
                                        variants={checkVariants}
                                        custom={5}
                                    >
                                        <div className="bg-[#29ABE2]/15 rounded-full p-1.5 mr-3 mt-1 shrink-0 group-hover:bg-[#29ABE2]/25 transition-colors duration-300">
                                            <CheckCircle2 className="h-4 w-4 text-[#29ABE2]" />
                                        </div>
                                        <span className="text-white/80 group-hover:text-white/95 transition-colors">Earn certification badges and skill points</span>
                                    </motion.li>
                                </ul>

                                {/* Enhanced button-like hover element */}
                                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#29ABE2]/25 to-[#29ABE2]/15 flex items-center justify-center shadow-lg border border-[#29ABE2]/30">
                                        <ChevronRight className="h-5 w-5 text-[#29ABE2]" />
                                    </div>
                                </div>
                            </CardContent>

                            {/* Edge highlights */}
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#29ABE2]/30 to-transparent" />
                            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#29ABE2]/20 to-transparent" />
                        </Card>
                    </motion.div>

                    {/* Step 3: Multiply Rewards */}
                    <motion.div
                        variants={cardVariants}
                        custom={2}
                        whileHover="hover"
                    >
                        <Card className="border-0 shadow-2xl bg-gradient-to-br from-[#1E293B]/95 to-[#0F172A]/95 backdrop-blur-xl text-white relative overflow-hidden h-full group rounded-2xl">
                            {/* Enhanced gradient on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#ED1E79]/15 via-[#ED1E79]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Enhanced top-right accent */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#ED1E79]/15 to-transparent rounded-bl-full opacity-60" />

                            <CardHeader className="relative pb-4">
                                {/* Enhanced hover glow effect */}
                                <div className="absolute -top-8 -left-8 w-24 h-24 bg-[#ED1E79]/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="flex justify-between items-start mb-6">
                                    <div className="h-18 w-18 rounded-2xl bg-gradient-to-br from-[#ED1E79]/20 to-[#ED1E79]/5 flex items-center justify-center border border-[#ED1E79]/30 shadow-xl group-hover:shadow-[0_0_20px_rgba(237,30,121,0.3)] transition-shadow duration-300">
                                        <Zap className="h-8 w-8 text-[#ED1E79]" />
                                    </div>
                                    <span className="text-2xl font-bold text-white/20 mr-2">03</span>
                                </div>

                                <CardTitle className="text-2xl text-white group-hover:text-[#ED1E79] transition-colors mb-3">
                                    Multiply Rewards
                                </CardTitle>
                                <CardDescription className="text-white/70 group-hover:text-white/90 transition-colors text-base">
                                    Your ICP knowledge achievements unlock powerful multipliers for enhanced neuron staking rewards.
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="pt-0">
                                <ul className="space-y-4">
                                    <motion.li
                                        className="flex items-start"
                                        variants={checkVariants}
                                        custom={6}
                                    >
                                        <div className="bg-[#ED1E79]/15 rounded-full p-1.5 mr-3 mt-1 shrink-0 group-hover:bg-[#ED1E79]/25 transition-colors duration-300">
                                            <CheckCircle2 className="h-4 w-4 text-[#ED1E79]" />
                                        </div>
                                        <span className="text-white/80 group-hover:text-white/95 transition-colors">Learning multipliers from 1.2x to 2.5x</span>
                                    </motion.li>
                                    <motion.li
                                        className="flex items-start"
                                        variants={checkVariants}
                                        custom={7}
                                    >
                                        <div className="bg-[#ED1E79]/15 rounded-full p-1.5 mr-3 mt-1 shrink-0 group-hover:bg-[#ED1E79]/25 transition-colors duration-300">
                                            <CheckCircle2 className="h-4 w-4 text-[#ED1E79]" />
                                        </div>
                                        <span className="text-white/80 group-hover:text-white/95 transition-colors">Automatic boost calculation for neurons</span>
                                    </motion.li>
                                    <motion.li
                                        className="flex items-start"
                                        variants={checkVariants}
                                        custom={8}
                                    >
                                        <div className="bg-[#ED1E79]/15 rounded-full p-1.5 mr-3 mt-1 shrink-0 group-hover:bg-[#ED1E79]/25 transition-colors duration-300">
                                            <CheckCircle2 className="h-4 w-4 text-[#ED1E79]" />
                                        </div>
                                        <span className="text-white/80 group-hover:text-white/95 transition-colors">Compete on developer leaderboards</span>
                                    </motion.li>
                                </ul>

                                {/* Enhanced button-like hover element */}
                                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#ED1E79]/25 to-[#ED1E79]/15 flex items-center justify-center shadow-lg border border-[#ED1E79]/30">
                                        <ChevronRight className="h-5 w-5 text-[#ED1E79]" />
                                    </div>
                                </div>
                            </CardContent>

                            {/* Edge highlights */}
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#ED1E79]/30 to-transparent" />
                            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#ED1E79]/20 to-transparent" />
                        </Card>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="mt-16 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <Button
                        className="bg-gradient-to-r from-[#3B00B9] via-[#ED1E79] to-[#29ABE2] hover:opacity-90 text-white font-semibold shadow-2xl shadow-[#ED1E79]/20 group rounded-2xl px-8 py-4 text-lg border border-white/10"
                        size="lg"
                    >
                        <span className="group-hover:mr-2 transition-all duration-300">Start Your ICP Learning Journey</span>
                        <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className="opacity-0 group-hover:opacity-100 transition-all duration-300"
                        >
                            <ArrowRight className="h-5 w-5 inline ml-1" />
                        </motion.span>
                    </Button>
                    
                    <motion.p 
                        className="text-white/60 text-sm mt-4 max-w-md mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.4 }}
                    >
                        Join 15,000+ developers already earning enhanced rewards through ICP education
                    </motion.p>
                </motion.div>
            </div>
        </div>
    );
};

export default ICPHowItWorks;