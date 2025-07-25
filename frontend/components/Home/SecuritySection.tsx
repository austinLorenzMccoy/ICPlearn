"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, useAnimation, Variants } from "framer-motion";
import {
    Shield,
    Eye,
    Fingerprint,
    Key,
    Check,
    ShieldCheck,
    Cpu,
    Network,
    Brain,
    Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Simple and refined ICP Security Section
const ICPSecuritySection = () => {
    const [activeCard, setActiveCard] = useState<number | null>(null);
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: false, amount: 0.2 });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [isInView, controls]);

    // Simple animation variants
    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const fadeUpVariants: Variants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const cardVariants: Variants = {
        hidden: { y: 40, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        },
        hover: {
            y: -8,
            transition: {
                duration: 0.2,
                ease: "easeOut"
            }
        }
    };

    const securityItems = [
        {
            title: "Chain-Key Cryptography",
            description: "Revolutionary cryptographic protocol enabling secure, trustless interactions across multiple blockchains without bridges.",
            icon: <Key className="h-6 w-6" />,
            color: "from-[#3B00B9] to-[#29ABE2]",
            stats: ["Zero Bridges", "Threshold Signatures", "Cross-Chain Native"]
        },
        {
            title: "Tamper-Proof Neurons",
            description: "Your ICP neurons are secured by the Network Nervous System with cryptographic proof of stake and governance.",
            icon: <Brain className="h-6 w-6" />,
            color: "from-[#ED1E79] to-[#F15A24]",
            stats: ["NNS Governance", "Cryptographic Proof", "Immutable Records"]
        },
        {
            title: "Internet Identity",
            description: "Passwordless authentication using WebAuthn. Your identity is controlled by you, not by centralized providers.",
            icon: <Fingerprint className="h-6 w-6" />,
            color: "from-[#29ABE2] to-[#3B00B9]",
            stats: ["Self-Sovereign", "WebAuthn", "No Passwords"]
        },
        {
            title: "Canister Security",
            description: "Smart contracts run in secure, isolated environments with orthogonal persistence and automatic scaling.",
            icon: <Cpu className="h-6 w-6" />,
            color: "from-[#F15A24] to-[#ED1E79]",
            stats: ["Isolated Execution", "Persistent Memory", "Auto-scaling"]
        }
    ];

    return (
        <motion.div
            className="relative py-24 bg-slate-950"
            ref={containerRef}
            initial="hidden"
            animate={controls}
            variants={containerVariants}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <motion.div
                    className="text-center mb-16"
                    variants={fadeUpVariants}
                >
                    <div className="mb-4 inline-block">
                        <div className="inline-flex items-center px-4 py-2 bg-[#3B00B9]/10 rounded-full border border-[#3B00B9]/20">
                            <ShieldCheck className="h-4 w-4 text-[#29ABE2] mr-2" />
                            <span className="text-[#29ABE2] text-sm font-medium">World Computer Security</span>
                        </div>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
                        Built for{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#29ABE2] to-[#3B00B9]">
                            Sovereignty
                        </span>{" "}
                        and{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ED1E79] to-[#F15A24]">
                            Decentralization
                        </span>
                    </h2>

                    <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                        ICP Learn leverages the Internet Computer's revolutionary security architecture,
                        ensuring your neurons and educational achievements remain sovereign and tamper-proof.
                    </p>
                </motion.div>

                {/* Security Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    {securityItems.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            whileHover="hover"
                            onHoverStart={() => setActiveCard(index)}
                            onHoverEnd={() => setActiveCard(null)}
                        >
                            <Card className="border border-slate-800 bg-slate-900/50 backdrop-blur-sm h-full hover:border-slate-700 transition-colors duration-300">
                                <CardHeader className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}>
                                            <div className="text-white">
                                                {item.icon}
                                            </div>
                                        </div>
                                    </div>
                                    <CardTitle className="text-lg text-white mb-3">
                                        {item.title}
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="p-6 pt-0">
                                    <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                                        {item.description}
                                    </p>

                                    {/* Stats - show on hover */}
                                    <motion.div
                                        className="space-y-2"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={activeCard === index ? {
                                            opacity: 1,
                                            height: 'auto',
                                            transition: { duration: 0.3 }
                                        } : {
                                            opacity: 0,
                                            height: 0,
                                            transition: { duration: 0.2 }
                                        }}
                                    >
                                        {item.stats.map((stat, i) => (
                                            <div key={i} className="flex items-center">
                                                <Check className="h-4 w-4 text-[#29ABE2] mr-2 flex-shrink-0" />
                                                <span className="text-sm text-slate-300">{stat}</span>
                                            </div>
                                        ))}
                                    </motion.div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Security Highlights */}
                <motion.div
                    className="text-center mb-16"
                    variants={fadeUpVariants}
                >
                    <div className="inline-block bg-slate-900/50 p-8 rounded-2xl border border-slate-800">
                        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-xl bg-[#3B00B9]/20 flex items-center justify-center border border-[#3B00B9]/30">
                                    <Zap className="h-6 w-6 text-[#29ABE2]" />
                                </div>
                                <div className="text-left">
                                    <p className="font-semibold text-white text-lg">Threshold Cryptography</p>
                                    <p className="text-slate-400">Distributed secret sharing across subnet nodes</p>
                                </div>
                            </div>

                            <div className="hidden md:block w-[1px] h-12 bg-slate-700" />

                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-xl bg-[#ED1E79]/20 flex items-center justify-center border border-[#ED1E79]/30">
                                    <Network className="h-6 w-6 text-[#ED1E79]" />
                                </div>
                                <div className="text-left">
                                    <p className="font-semibold text-white text-lg">Subnet Consensus</p>
                                    <p className="text-slate-400">Byzantine fault tolerant consensus protocol</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Security Metrics */}
                <motion.div
                    className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-center mb-16"
                    variants={containerVariants}
                >
                    <motion.div variants={fadeUpVariants} className="px-6">
                        <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#29ABE2] to-[#3B00B9]">
                            100%
                        </div>
                        <p className="text-slate-500 text-sm">Decentralized</p>
                    </motion.div>

                    <motion.div variants={fadeUpVariants} className="px-6">
                        <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#3B00B9] to-[#ED1E79]">
                            1s
                        </div>
                        <p className="text-slate-500 text-sm">Finality Time</p>
                    </motion.div>

                    <motion.div variants={fadeUpVariants} className="px-6">
                        <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ED1E79] to-[#F15A24]">
                            ∞
                        </div>
                        <p className="text-slate-500 text-sm">Scalability</p>
                    </motion.div>

                    <motion.div variants={fadeUpVariants} className="px-6">
                        <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F15A24] to-[#29ABE2]">
                            Zero
                        </div>
                        <p className="text-slate-500 text-sm">Gas Fees</p>
                    </motion.div>
                </motion.div>

                {/* Call to Action */}
                <motion.div
                    className="text-center"
                    variants={fadeUpVariants}
                >
                    <Button className="bg-gradient-to-r from-[#3B00B9] to-[#29ABE2] hover:opacity-90 text-white font-medium shadow-lg py-6 px-8">
                        Explore ICP Architecture
                    </Button>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default ICPSecuritySection;