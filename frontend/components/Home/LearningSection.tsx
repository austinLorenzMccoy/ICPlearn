"use client";

import { motion, Variants } from "framer-motion";
import {
    BookOpen,
    CheckCircle2,
    ArrowRight,
    Award,
    TrendingUp,
    Cpu,
    Code,
    Brain,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Simple ICP Learning Section
const ICPLearningSection = () => {
    // Simple animation variants
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const fadeUpVariants: Variants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const moduleVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.5, ease: "easeOut" }
        },
        hover: {
            x: 4,
            transition: { duration: 0.2 }
        }
    };

    return (
        <div className="relative py-24 bg-slate-950">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="flex flex-col lg:flex-row items-center gap-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                >
                    {/* Course Preview Panel */}
                    <motion.div
                        className="lg:w-1/2 lg:order-2"
                        variants={fadeUpVariants}
                    >
                        <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-slate-800">
                            {/* Course header */}
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#3B00B9] to-[#29ABE2] flex items-center justify-center shadow-lg">
                                    <Cpu className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">Canister Development</h3>
                                    <p className="text-sm text-slate-400">Intermediate Course • 4 hours</p>
                                </div>
                            </div>

                            {/* Course modules */}
                            <div className="space-y-4 mb-8">
                                <motion.div
                                    className="p-4 rounded-xl border border-slate-700 flex items-center gap-4 cursor-pointer bg-slate-800/50"
                                    variants={moduleVariants}
                                    whileHover="hover"
                                >
                                    <div className="h-8 w-8 rounded-full bg-[#29ABE2]/20 text-[#29ABE2] flex items-center justify-center text-sm font-bold border border-[#29ABE2]/30">
                                        1
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-white">Introduction to Canisters</p>
                                        <p className="text-sm text-slate-400">25 min • Completed</p>
                                    </div>
                                    <CheckCircle2 className="h-5 w-5 text-[#29ABE2]" />
                                </motion.div>

                                <motion.div
                                    className="p-4 rounded-xl border border-[#3B00B9]/30 flex items-center gap-4 cursor-pointer bg-[#3B00B9]/10"
                                    variants={moduleVariants}
                                    whileHover="hover"
                                >
                                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#3B00B9] to-[#ED1E79] text-white flex items-center justify-center text-sm font-bold">
                                        2
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-white">Motoko Programming</p>
                                        <p className="text-sm text-slate-300">45 min • In Progress</p>
                                    </div>
                                    <span className="px-3 py-1 rounded-full bg-[#3B00B9]/20 text-[#29ABE2] text-xs font-medium border border-[#3B00B9]/30">
                                        Current
                                    </span>
                                </motion.div>

                                <motion.div
                                    className="p-4 rounded-xl border border-slate-700 flex items-center gap-4 cursor-pointer"
                                    variants={moduleVariants}
                                    whileHover="hover"
                                >
                                    <div className="h-8 w-8 rounded-full bg-slate-700 text-slate-400 flex items-center justify-center text-sm font-bold">
                                        3
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-slate-300">Deploying to Mainnet</p>
                                        <p className="text-sm text-slate-500">30 min • Not Started</p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="p-4 rounded-xl border border-slate-700 flex items-center gap-4 cursor-pointer"
                                    variants={moduleVariants}
                                    whileHover="hover"
                                >
                                    <div className="h-8 w-8 rounded-full bg-slate-700 text-slate-400 flex items-center justify-center text-sm font-bold">
                                        4
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-slate-300">Chain Fusion Basics</p>
                                        <p className="text-sm text-slate-500">40 min • Not Started</p>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Course progress */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-semibold text-slate-300">Course Progress</span>
                                    <span className="text-sm font-bold text-white">65%</span>
                                </div>
                                <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                                    <motion.div
                                        className="bg-gradient-to-r from-[#3B00B9] to-[#29ABE2] h-2 rounded-full"
                                        initial={{ width: 0 }}
                                        whileInView={{ width: "65%" }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.5, duration: 0.8 }}
                                    />
                                </div>
                                <div className="flex justify-between items-center pt-2">
                                    <div className="text-sm text-slate-400">
                                        <span>Reward: </span>
                                        <span className="font-semibold text-[#29ABE2]">250 Points</span>
                                        <span> + </span>
                                        <span className="font-semibold text-[#ED1E79]">1.8x Boost</span>
                                    </div>
                                    <Button
                                        size="sm"
                                        className="bg-gradient-to-r from-[#3B00B9] to-[#29ABE2] hover:opacity-90 text-white px-6 font-medium"
                                    >
                                        Continue Learning
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Content Text Section */}
                    <motion.div
                        className="lg:w-1/2 lg:order-1"
                        variants={fadeUpVariants}
                    >
                        <div className="inline-block px-4 py-2 bg-[#3B00B9]/10 rounded-full text-[#29ABE2] text-sm font-medium mb-6 border border-[#3B00B9]/20">
                            <Brain className="h-4 w-4 inline-block mr-2" />
                            Internet Computer Education
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
                            Master{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#29ABE2] to-[#3B00B9]">
                                ICP
                            </span>
                            ,<br />
                            Multiply Your{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ED1E79] to-[#F15A24]">
                                Rewards
                            </span>
                        </h2>

                        <p className="text-xl text-slate-400 mb-10 leading-relaxed">
                            Our comprehensive learning platform teaches you everything about the Internet Computer Protocol, from canister development to Chain Fusion technology.
                        </p>

                        <ul className="space-y-6 mb-10">
                            <motion.li
                                className="flex items-start group"
                                variants={fadeUpVariants}
                                whileHover={{ x: 4 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="h-8 w-8 rounded-xl bg-[#29ABE2]/20 flex items-center justify-center mt-1 mr-4 border border-[#29ABE2]/30">
                                    <Clock className="h-4 w-4 text-[#29ABE2]" />
                                </div>
                                <div>
                                    <p className="font-semibold text-white text-lg mb-1">Learn at your own pace</p>
                                    <p className="text-slate-400">Modular courses designed to fit your schedule and learning style</p>
                                </div>
                            </motion.li>

                            <motion.li
                                className="flex items-start group"
                                variants={fadeUpVariants}
                                whileHover={{ x: 4 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="h-8 w-8 rounded-xl bg-[#ED1E79]/20 flex items-center justify-center mt-1 mr-4 border border-[#ED1E79]/30">
                                    <Award className="h-4 w-4 text-[#ED1E79]" />
                                </div>
                                <div>
                                    <p className="font-semibold text-white text-lg mb-1">Earn ICP certifications</p>
                                    <p className="text-slate-400">Build your developer profile with recognized Internet Computer credentials</p>
                                </div>
                            </motion.li>

                            <motion.li
                                className="flex items-start group"
                                variants={fadeUpVariants}
                                whileHover={{ x: 4 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="h-8 w-8 rounded-xl bg-[#3B00B9]/20 flex items-center justify-center mt-1 mr-4 border border-[#3B00B9]/30">
                                    <TrendingUp className="h-4 w-4 text-[#3B00B9]" />
                                </div>
                                <div>
                                    <p className="font-semibold text-white text-lg mb-1">Boost neuron rewards</p>
                                    <p className="text-slate-400">Each completed course unlocks powerful multipliers for your ICP neurons</p>
                                </div>
                            </motion.li>

                            <motion.li
                                className="flex items-start group"
                                variants={fadeUpVariants}
                                whileHover={{ x: 4 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="h-8 w-8 rounded-xl bg-[#F15A24]/20 flex items-center justify-center mt-1 mr-4 border border-[#F15A24]/30">
                                    <Code className="h-4 w-4 text-[#F15A24]" />
                                </div>
                                <div>
                                    <p className="font-semibold text-white text-lg mb-1">Build real dApps</p>
                                    <p className="text-slate-400">Hands-on projects using Motoko, Rust, and the latest ICP technologies</p>
                                </div>
                            </motion.li>
                        </ul>

                        <Button
                            className="bg-gradient-to-r from-[#3B00B9] to-[#29ABE2] hover:opacity-90 text-white font-semibold shadow-lg group px-8 py-4 text-lg"
                            size="lg"
                        >
                            <span>Start Learning ICP</span>
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

// Clock icon component
const Clock = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
);

export default ICPLearningSection;