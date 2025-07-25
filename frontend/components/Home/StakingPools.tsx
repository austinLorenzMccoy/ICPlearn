
"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
    Sparkles,
    ChevronRight,
    ArrowRight,
    Clock,
    BadgeDollarSign,
    Lock,
    BarChart,
    Zap,
    Cpu,
    Brain
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// ICP Neuron Staking Pools Section
const ICPStakingPools = () => {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState("all");

    // Animation variants
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
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

    const cardContainerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const cardVariants: Variants = {
        hidden: (custom: number) => ({
            y: 50,
            opacity: 0,
            rotateY: custom % 2 === 0 ? -5 : 5,
            rotateX: 5
        }),
        visible: (custom: number) => ({
            y: 0,
            opacity: 1,
            rotateY: 0,
            rotateX: 0,
            transition: {
                type: "spring",
                damping: 20,
                stiffness: 150,
                delay: 0.1 * custom,
                duration: 0.6
            }
        }),
        hover: {
            y: -10,
            scale: 1.02,
            transition: {
                type: "spring",
                damping: 10,
                stiffness: 200
            }
        }
    };

    const statsVariants: Variants = {
        hidden: { y: 15, opacity: 0 },
        visible: (custom: number) => ({
            y: 0,
            opacity: 1,
            transition: {
                delay: 0.2 + (custom * 0.1),
                duration: 0.4,
                ease: "easeOut"
            }
        })
    };

    const pulseAnimation: Variants = {
        initial: { opacity: 0.7, scale: 1 },
        animate: {
            opacity: [0.7, 1, 0.7],
            scale: [1, 1.05, 1],
            transition: {
                duration: 3,
                repeat: Infinity,
                repeatType: "mirror"
            }
        }
    };

    const glowVariants: Variants = {
        initial: { opacity: 0, scale: 0.5 },
        animate: (custom: number) => ({
            opacity: [0, 0.7, 0],
            scale: [0.5, 1.2, 0.5],
            transition: {
                duration: 3,
                delay: custom * 0.3,
                repeat: Infinity,
                repeatType: "reverse"
            }
        })
    };

    const tabTransition: Variants = {
        initial: { opacity: 0, y: 20 },
        animate: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        },
        exit: {
            opacity: 0,
            y: -20,
            transition: { duration: 0.3 }
        }
    };

    // ICP-specific colors for each level
    const levelColors = {
        "Beginner": {
            bg: "bg-[#29ABE2]/10",
            text: "text-[#29ABE2]",
            glow: "from-[#29ABE2]/20 to-[#F15A24]/10"
        },
        "Intermediate": {
            bg: "bg-[#ED1E79]/10",
            text: "text-[#ED1E79]",
            glow: "from-[#ED1E79]/20 to-[#29ABE2]/10"
        },
        "Advanced": {
            bg: "bg-[#3B00B9]/10",
            text: "text-[#3B00B9]",
            glow: "from-[#3B00B9]/20 to-[#ED1E79]/10"
        },
        "Specialized": {
            bg: "bg-[#F15A24]/10",
            text: "text-[#F15A24]",
            glow: "from-[#F15A24]/20 to-[#3B00B9]/10"
        }
    };

    // ICP Neuron Pool data
    const poolsData = [
        {
            title: "ICP Neuron Starter",
            description: "Perfect for beginners entering the IC ecosystem",
            level: "Beginner",
            apy: "8-12%",
            dissolveDelay: "6 months",
            minStake: "1 ICP",
            maxBoost: "1.3x",
            course: "Internet Computer Basics",
            boostEffect: "1.3x learning multiplier"
        },
        {
            title: "Canister Developer",
            description: "For developers building on the Internet Computer",
            level: "Intermediate",
            apy: "10-15%",
            dissolveDelay: "2 years",
            minStake: "10 ICP",
            maxBoost: "1.8x",
            course: "Motoko & Rust Development",
            boostEffect: "1.8x learning multiplier"
        },
        {
            title: "Chain Fusion Master",
            description: "Advanced neuron for cross-chain experts",
            level: "Advanced",
            apy: "12-18%",
            dissolveDelay: "8 years",
            minStake: "50 ICP",
            maxBoost: "2.5x",
            course: "Chain Fusion Technology",
            boostEffect: "2.5x learning multiplier"
        }
    ];

    // Additional tab-specific pool data
    const beginnerPools = [
        {
            title: "ICP Neuron Starter",
            description: "Perfect for beginners entering the IC ecosystem",
            level: "Beginner",
            apy: "8-12%",
            dissolveDelay: "6 months",
            minStake: "1 ICP",
            maxBoost: "1.3x",
            course: "Internet Computer Basics",
            boostEffect: "1.3x learning multiplier"
        },
        {
            title: "Quick Learner Pool",
            description: "Short-term neurons with educational focus",
            level: "Beginner",
            apy: "6-10%",
            dissolveDelay: "3 months",
            minStake: "0.5 ICP",
            maxBoost: "1.2x",
            course: "Blockchain Fundamentals",
            boostEffect: "1.2x learning multiplier"
        }
    ];

    const advancedPools = [
        {
            title: "Chain Fusion Master",
            description: "Advanced neuron for cross-chain experts",
            level: "Advanced",
            apy: "12-18%",
            dissolveDelay: "8 years",
            minStake: "50 ICP",
            maxBoost: "2.5x",
            course: "Chain Fusion Technology",
            boostEffect: "2.5x learning multiplier"
        },
        {
            title: "Network Nervous System Elite",
            description: "Maximum rewards for governance participation",
            level: "Advanced",
            apy: "15-22%",
            dissolveDelay: "8 years",
            minStake: "100 ICP",
            maxBoost: "3x",
            course: "Advanced ICP Governance",
            boostEffect: "3x learning multiplier"
        }
    ];

    const specializedPools = [
        {
            title: "DeFi on ICP Pool",
            description: "For DeFi developers on Internet Computer",
            level: "Specialized",
            apy: "11-16%",
            dissolveDelay: "4 years",
            minStake: "25 ICP",
            maxBoost: "2x",
            course: "ICP DeFi Architecture",
            boostEffect: "2x learning multiplier"
        },
        {
            title: "AI Canister Specialist",
            description: "For AI model deployment on ICP",
            level: "Specialized",
            apy: "13-19%",
            dissolveDelay: "5 years",
            minStake: "30 ICP",
            maxBoost: "2.2x",
            course: "On-Chain AI Development",
            boostEffect: "2.2x learning multiplier"
        }
    ];

    const handleTabChange = (value: string) => {
        setActiveTab(value);
    };

    // Function to render pool cards based on the pool data
    const renderPoolCards = (pools: typeof poolsData) => (
        <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
            variants={cardContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
        >
            {pools.map((pool, index) => (
                <motion.div
                    key={index}
                    custom={index}
                    variants={cardVariants}
                    whileHover="hover"
                    onHoverStart={() => setHoveredCard(index)}
                    onHoverEnd={() => setHoveredCard(null)}
                    className="perspective-1000"
                >
                    <Card className="border-0 shadow-2xl bg-gradient-to-br from-[#1E293B]/95 to-[#0F172A]/95 backdrop-blur-xl text-white relative overflow-hidden h-full transform-gpu transition-all duration-200 rounded-2xl">
                        {/* Background gradient effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#1E293B]/98 to-[#0C1424]/98 -z-10" />
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#3B00B9]/15 to-transparent rounded-bl-full opacity-70" />

                        {/* Animated glow effect on hover */}
                        {hoveredCard === index && (
                            <>
                                <motion.div
                                    className={`absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br ${levelColors[pool.level as keyof typeof levelColors].glow} blur-3xl -z-5 opacity-0`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.3 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                />
                                <motion.div
                                    className={`absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-gradient-to-br ${levelColors[pool.level as keyof typeof levelColors].glow} blur-3xl -z-5 opacity-0`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.3 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                />
                            </>
                        )}

                        <CardHeader className="pb-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-white group-hover:text-[#29ABE2] transition-colors text-xl">
                                        {pool.title}
                                    </CardTitle>
                                    <CardDescription className="mt-2 text-white/70 leading-relaxed">
                                        {pool.description}
                                    </CardDescription>
                                </div>
                                <div className={`px-3 py-1.5 ${levelColors[pool.level as keyof typeof levelColors].bg} ${levelColors[pool.level as keyof typeof levelColors].text} rounded-full text-xs font-medium border border-white/10`}>
                                    {pool.level}
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            <motion.div
                                className="grid grid-cols-2 gap-4"
                                variants={containerVariants}
                            >
                                <motion.div variants={statsVariants} custom={0} className="space-y-1">
                                    <p className="text-sm text-white/60">Base APY</p>
                                    <div className="flex items-center">
                                        <p className="text-xl font-bold text-white">{pool.apy}</p>
                                        <BarChart className="h-4 w-4 ml-2 text-[#29ABE2]" />
                                    </div>
                                </motion.div>

                                <motion.div variants={statsVariants} custom={1} className="space-y-1">
                                    <p className="text-sm text-white/60">Dissolve Delay</p>
                                    <div className="flex items-center">
                                        <p className="text-xl font-bold text-white">{pool.dissolveDelay}</p>
                                        <Clock className="h-4 w-4 ml-2 text-[#ED1E79]" />
                                    </div>
                                </motion.div>

                                <motion.div variants={statsVariants} custom={2} className="space-y-1">
                                    <p className="text-sm text-white/60">Min Stake</p>
                                    <p className="text-xl font-bold text-white">{pool.minStake}</p>
                                </motion.div>

                                <motion.div variants={statsVariants} custom={3} className="space-y-1">
                                    <p className="text-sm text-white/60">Max Boost</p>
                                    <p className="text-xl font-bold text-[#F15A24]">{pool.maxBoost}</p>
                                </motion.div>
                            </motion.div>

                            <motion.div
                                className="p-4 rounded-xl backdrop-blur-md relative overflow-hidden border border-white/10"
                                style={{
                                    background: `linear-gradient(135deg, rgba(59,0,185,0.08), rgba(237,30,121,0.08))`
                                }}
                                variants={pulseAnimation}
                                initial="initial"
                                animate="animate"
                            >
                                <div className="flex items-center mb-2">
                                    <Brain className={`h-5 w-5 ${levelColors[pool.level as keyof typeof levelColors].text} mr-2`} />
                                    <p className="text-sm font-semibold text-white/95">Learning Multiplier</p>
                                </div>
                                <p className="text-xs text-white/70 leading-relaxed">
                                    Complete "<span className="text-[#29ABE2] font-medium">{pool.course}</span>" to earn {pool.maxBoost} multiplier on your neuron rewards
                                </p>

                                {/* Animated glows */}
                                <motion.div
                                    className="absolute top-1/2 left-1/4 w-4 h-4 rounded-full bg-[#29ABE2]/30 blur-md"
                                    variants={glowVariants}
                                    custom={0}
                                    initial="initial"
                                    animate="animate"
                                />
                                <motion.div
                                    className="absolute top-1/3 right-1/4 w-3 h-3 rounded-full bg-[#ED1E79]/30 blur-md"
                                    variants={glowVariants}
                                    custom={1}
                                    initial="initial"
                                    animate="animate"
                                />
                            </motion.div>
                        </CardContent>

                        <CardFooter className="pt-6">
                            <motion.div
                                className="w-full"
                                whileHover={{ scale: 1.03 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <Button
                                    className="w-full bg-gradient-to-r from-[#3B00B9] via-[#ED1E79] to-[#29ABE2] hover:opacity-90 text-white font-semibold group shadow-xl py-3 rounded-xl"
                                >
                                    <Cpu className="h-4 w-4 mr-2" />
                                    <span className="mr-1">Create Neuron</span>
                                    <motion.span
                                        initial={{ x: 0 }}
                                        animate={hoveredCard === index ? { x: 4 } : { x: 0 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <ArrowRight className="h-4 w-4 inline ml-1" />
                                    </motion.span>
                                </Button>
                            </motion.div>
                        </CardFooter>

                        {/* Edge highlights */}
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#3B00B9]/40 to-transparent" />
                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#ED1E79]/30 to-transparent" />
                    </Card>
                </motion.div>
            ))}
        </motion.div>
    );

    return (
        <div className="relative py-24 overflow-hidden">
            {/* Dark ICP-themed background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0B1A] to-[#1A1B2E] -z-10" />

            {/* Subtle network pattern overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIwLj15Ij48cGF0aCBkPSJNMzYgMThoMTh2MThIMzZ6TTE4IDM2aDE4djE4aC0xOHpNMzYgMGg2djZoLTZ6TTE0IDQwaDZ2NkgxNHpNMCAxNmg2djZIMHpNNDIgMGg2djZoLTZ6TTI0IDBoNnY2aC02ek02IDBoNnY2SDZ6TTYgMThoNnY2SDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-[0.02] -z-10" />

            {/* Animated ICP-themed background elements */}
            <div className="absolute inset-0 -z-5">
                <div className="absolute top-0 left-0 w-full h-full">
                    <motion.div
                        className="absolute top-20 left-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-[#3B00B9]/8 to-transparent blur-3xl"
                        animate={{
                            y: [0, 40, 0],
                            opacity: [0.3, 0.5, 0.3],
                            scale: [1, 1.15, 1]
                        }}
                        transition={{ duration: 16, repeat: Infinity, repeatType: "reverse" }}
                    />
                    <motion.div
                        className="absolute bottom-20 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-[#ED1E79]/8 to-transparent blur-3xl"
                        animate={{
                            y: [0, -35, 0],
                            opacity: [0.3, 0.5, 0.3],
                            scale: [1, 1.12, 1]
                        }}
                        transition={{ duration: 18, repeat: Infinity, repeatType: "reverse" }}
                    />
                    <motion.div
                        className="absolute top-1/3 right-1/5 w-72 h-72 rounded-full bg-gradient-to-r from-[#29ABE2]/8 to-transparent blur-3xl"
                        animate={{
                            x: [0, -25, 0],
                            opacity: [0.3, 0.5, 0.3],
                            scale: [1, 1.08, 1]
                        }}
                        transition={{ duration: 14, repeat: Infinity, repeatType: "reverse" }}
                    />
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                >
                    <motion.div variants={itemVariants}>
                        <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#3B00B9]/10 to-[#29ABE2]/10 rounded-full text-[#29ABE2] text-sm font-medium mb-4 shadow-lg border border-[#29ABE2]/20">
                            <Cpu className="h-4 w-4 inline-block mr-2" />
                            Network Nervous System
                        </span>
                    </motion.div>
                    <motion.h2
                        className="text-4xl md:text-5xl font-bold mb-6 text-white"
                        variants={itemVariants}
                    >
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B00B9] to-[#29ABE2]">ICP Neuron</span> Pools
                    </motion.h2>
                    <motion.p
                        className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed"
                        variants={itemVariants}
                    >
                        Stake ICP tokens in neurons with customizable dissolve delays. Learn about Internet Computer technology to unlock educational multipliers on your rewards.
                    </motion.p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                >
                    <Tabs
                        defaultValue="all"
                        className="w-full"
                        onValueChange={handleTabChange}
                    >
                        <motion.div
                            className="flex justify-center mb-12"
                            variants={itemVariants}
                        >
                            <TabsList className="bg-[#1E293B]/50 backdrop-blur-xl border border-white/10 shadow-2xl p-1.5 rounded-2xl">
                                <TabsTrigger
                                    value="all"
                                    className={`${activeTab === "all" ? "text-white bg-gradient-to-r from-[#3B00B9]/30 to-[#29ABE2]/30 backdrop-blur-sm font-medium shadow-lg" : "text-white/60"} px-6 py-2 rounded-xl transition-all duration-200`}
                                >
                                    All Neurons
                                </TabsTrigger>
                                <TabsTrigger
                                    value="beginner"
                                    className={`${activeTab === "beginner" ? "text-white bg-gradient-to-r from-[#29ABE2]/30 to-[#F15A24]/30 backdrop-blur-sm font-medium shadow-lg" : "text-white/60"} px-6 py-2 rounded-xl transition-all duration-200`}
                                >
                                    Beginner
                                </TabsTrigger>
                                <TabsTrigger
                                    value="advanced"
                                    className={`${activeTab === "advanced" ? "text-white bg-gradient-to-r from-[#ED1E79]/30 to-[#3B00B9]/30 backdrop-blur-sm font-medium shadow-lg" : "text-white/60"} px-6 py-2 rounded-xl transition-all duration-200`}
                                >
                                    Advanced
                                </TabsTrigger>
                                <TabsTrigger
                                    value="specialized"
                                    className={`${activeTab === "specialized" ? "text-white bg-gradient-to-r from-[#F15A24]/30 to-[#ED1E79]/30 backdrop-blur-sm font-medium shadow-lg" : "text-white/60"} px-6 py-2 rounded-xl transition-all duration-200`}
                                >
                                    Specialized
                                </TabsTrigger>
                            </TabsList>
                        </motion.div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                variants={tabTransition}
                            >
                                <TabsContent value="all" className="space-y-12 mt-0">
                                    {renderPoolCards(poolsData)}

                                    <motion.div
                                        className="text-center"
                                        variants={itemVariants}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        <Button
                                            variant="outline"
                                            className="border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 hover:text-[#29ABE2] hover:border-[#29ABE2]/50 group px-8 py-3 rounded-xl"
                                        >
                                            <span>Explore All Neurons</span>
                                            <motion.span
                                                initial={{ x: 0 }}
                                                whileHover={{ x: 4 }}
                                                transition={{ type: "spring", stiffness: 200 }}
                                            >
                                                <ChevronRight className="ml-2 h-4 w-4 group-hover:text-[#3B00B9]" />
                                            </motion.span>
                                        </Button>
                                    </motion.div>
                                </TabsContent>

                                <TabsContent value="specialized" className="space-y-12 mt-0">
                                    {renderPoolCards(specializedPools)}

                                    <motion.div
                                        className="text-center"
                                        variants={itemVariants}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        <Button
                                            variant="outline"
                                            className="border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 hover:text-[#F15A24] hover:border-[#F15A24]/50 group px-8 py-3 rounded-xl"
                                        >
                                            <span>View All Specialized Neurons</span>
                                            <motion.span
                                                initial={{ x: 0 }}
                                                whileHover={{ x: 4 }}
                                                transition={{ type: "spring", stiffness: 200 }}
                                            >
                                                <ChevronRight className="ml-2 h-4 w-4 group-hover:text-[#F15A24]" />
                                            </motion.span>
                                        </Button>
                                    </motion.div>
                                </TabsContent>
                            </motion.div>
                        </AnimatePresence>
                    </Tabs>
                </motion.div>

                {/* Additional Info Section */}
                <motion.div
                    className="mt-20 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="max-w-4xl mx-auto">
                        <h3 className="text-2xl font-bold text-white mb-4">
                            Why Choose ICP Learning Neurons?
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                                <Cpu className="h-8 w-8 text-[#29ABE2] mx-auto mb-3" />
                                <h4 className="text-white font-semibold mb-2">Native Governance</h4>
                                <p className="text-white/70 text-sm">
                                    Participate in Network Nervous System voting while earning rewards
                                </p>
                            </div>
                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                                <Brain className="h-8 w-8 text-[#ED1E79] mx-auto mb-3" />
                                <h4 className="text-white font-semibold mb-2">Learn & Earn</h4>
                                <p className="text-white/70 text-sm">
                                    Educational achievements unlock powerful staking multipliers
                                </p>
                            </div>
                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                                <Zap className="h-8 w-8 text-[#F15A24] mx-auto mb-3" />
                                <h4 className="text-white font-semibold mb-2">No Lock-ups</h4>
                                <p className="text-white/70 text-sm">
                                    Dissolve delays can be modified anytime, giving you full control
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ICPStakingPools