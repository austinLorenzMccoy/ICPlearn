"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useAnimation, useInView, Variants } from "framer-motion";
import {
    BookOpen,
    Users,
    ExternalLink,
    ArrowRight,
    Sparkles,
    Rocket,
    GraduationCap,
    BarChart,
    Zap,
    Star,
    Award,
    BadgeCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Refined Dark CTA Section
const CTASection = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
    const controls = useAnimation();

    // Mouse tracking for interactive elements
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const element = sectionRef.current as HTMLElement | null;

            if (element) {
                const rect = element.getBoundingClientRect();
                const x = clientX - rect.left;
                const y = clientY - rect.top;
                setMousePosition({ x, y });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Trigger animations when section is in view
    useEffect(() => {
        if (isInView) {
            controls.start('visible');
        }
    }, [isInView, controls]);

    // Animation variants
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.15
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

    const buttonVariants: Variants = {
        hover: {
            scale: 1.02,
            transition: { duration: 0.2, ease: "easeOut" }
        },
        tap: {
            scale: 0.98,
            transition: { duration: 0.1 }
        }
    };

    // Floating objects for visual interest
    const floatingObjects = [
        { icon: <GraduationCap className="h-5 w-5 text-[#FFD700]/60" />, x: "18%", y: "25%", delay: 0 },
        { icon: <BarChart className="h-4 w-4 text-[#50C878]/60" />, x: "82%", y: "20%", delay: 0.3 },
        { icon: <Award className="h-6 w-6 text-[#6A3DE8]/60" />, x: "15%", y: "75%", delay: 0.1 },
        { icon: <Zap className="h-4 w-4 text-[#00E5BF]/60" />, x: "85%", y: "70%", delay: 0.4 },
        { icon: <Star className="h-3 w-3 text-[#FFD700]/60" />, x: "70%", y: "85%", delay: 0.2 },
        { icon: <BadgeCheck className="h-4 w-4 text-[#50C878]/60" />, x: "30%", y: "85%", delay: 0.5 },
    ];

    return (
        <motion.div
            ref={sectionRef}
            className="relative py-20 overflow-hidden  bg-gradient-to-b from-[#050A21] to-[#0C1022] text-white"
            initial="hidden"
            animate={controls}
            variants={containerVariants}
        >
            {/* Mouse-following gradient overlay */}
            <motion.div
                className="absolute inset-0 -z-10 pointer-events-none"
                style={{
                    background: `radial-gradient(circle 350px at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 0, 185, 0.12), rgba(41, 171, 226, 0.08), rgba(237, 30, 121, 0.06), transparent)`,
                }}
            />

            {/* Subtle grid pattern */}
            <div className="absolute inset-0 opacity-[0.02] -z-10">
                <div 
                    className="w-full h-full"
                    style={{
                        backgroundImage: `linear-gradient(rgba(59, 0, 185, 0.2) 1px, transparent 1px),
                                         linear-gradient(90deg, rgba(59, 0, 185, 0.2) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px'
                    }}
                />
            </div>

            {/* Floating animated objects */}
            {floatingObjects.map((obj, index) => (
                <motion.div
                    key={index}
                    className="absolute opacity-0 pointer-events-none"
                    style={{
                        left: obj.x,
                        top: obj.y,
                        zIndex: -5
                    }}
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: [0, 0.8, 0],
                        y: [0, -30, -60],
                        rotate: [0, Math.random() * 60 - 30]
                    }}
                    transition={{
                        duration: 8 + Math.random() * 4,
                        delay: obj.delay,
                        repeat: Infinity,
                        repeatType: "loop"
                    }}
                >
                    {obj.icon}
                </motion.div>
            ))}

            {/* Ambient glow effects */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-60 h-60 rounded-full bg-[#3B00B9]/6 blur-3xl -z-10"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
            />
            <motion.div
                className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#29ABE2]/4 blur-3xl -z-10"
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", delay: 4 }}
            />
            <motion.div
                className="absolute top-1/2 right-1/3 w-40 h-40 rounded-full bg-[#ED1E79]/3 blur-2xl -z-10"
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.15, 0.3, 0.15],
                }}
                transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", delay: 2 }}
            />

            {/* Content container */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                {/* Header badge */}
                <motion.div
                    variants={itemVariants}
                    className="inline-block mb-6"
                >
                    <div className="inline-flex items-center px-5 py-2 bg-zinc-800/60 backdrop-blur-sm rounded-full border border-zinc-700/50">
                        <Rocket className="h-4 w-4 text-[#29ABE2] mr-2" />
                        <span className="text-zinc-200 text-sm font-medium">Start Your Journey</span>
                        <motion.div
                            className="ml-2 h-1.5 w-1.5 rounded-full bg-[#ED1E79]"
                            animate={{
                                scale: [1, 1.4, 1],
                                opacity: [0.7, 1, 0.7]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity
                            }}
                        />
                    </div>
                </motion.div>

                {/* Main heading */}
                <motion.h2
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-zinc-50 leading-tight"
                    variants={itemVariants}
                >
                    Ready to{" "}
                    <span className="relative">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B00B9] to-[#29ABE2]">
                            Start Earning
                        </span>
                        <motion.span
                            className="absolute -inset-1 rounded-lg bg-gradient-to-r from-[#3B00B9]/20 to-[#29ABE2]/20 blur-sm -z-10"
                            animate={{
                                opacity: [0.3, 0.6, 0.3],
                                scale: [1, 1.05, 1]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                repeatType: "mirror"
                            }}
                        />
                    </span>{" "}
                    While{" "}
                    <span className="relative">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ED1E79] to-[#F15A24]">
                            Learning
                        </span>
                        <motion.span
                            className="absolute -inset-1 rounded-lg bg-gradient-to-r from-[#ED1E79]/20 to-[#F15A24]/20 blur-sm -z-10"
                            animate={{
                                opacity: [0.3, 0.6, 0.3],
                                scale: [1, 1.05, 1]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                repeatType: "mirror",
                                delay: 1.5
                            }}
                        />
                    </span>
                    ?
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                    className="text-lg sm:text-xl text-zinc-300 mb-8 max-w-2xl mx-auto leading-relaxed"
                    variants={itemVariants}
                >
                    Join EduStake today and transform your educational journey into valuable rewards
                    while mastering blockchain and Web3 technologies.
                </motion.p>

                {/* Action buttons */}
                <motion.div
                    className="flex flex-col sm:flex-row justify-center gap-4 mb-10"
                    variants={containerVariants}
                >
                    <motion.div
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        <Button
                            size="lg"
                            className="relative bg-gradient-to-r from-[#3B00B9] to-[#29ABE2] hover:opacity-90 text-white font-semibold px-8 py-4 overflow-hidden group shadow-xl shadow-[#3B00B9]/20"
                        >
                            <motion.span
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -z-10"
                                initial={{ x: "-100%" }}
                                animate={{ x: ["100%", "-100%"] }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    repeatDelay: 4
                                }}
                            />
                            <span className="mr-2">Get Started Now</span>
                            <motion.span
                                animate={{
                                    x: [0, 4, 0]
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    repeatDelay: 2
                                }}
                            >
                                <ArrowRight className="h-5 w-5 inline" />
                            </motion.span>
                            <motion.div
                                className="absolute -top-1 -right-1 h-5 w-5"
                                animate={{
                                    rotate: 360
                                }}
                                transition={{
                                    duration: 12,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                            >
                                <Sparkles className="h-3 w-3 text-white/50" />
                            </motion.div>
                        </Button>
                    </motion.div>

                    <motion.div
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        <Button
                            variant="outline"
                            size="lg"
                            className="backdrop-blur-sm text-slate-900 border-zinc-600 hover:bg-zinc-800/50 hover:border-zinc-500 px-8 py-4 group"
                        >
                            <span>Learn More</span>
                            <motion.span
                                className="opacity-0 scale-0 -ml-2 duration-300 transition-all group-hover:opacity-100 group-hover:scale-100 group-hover:ml-2"
                            >
                                <ArrowRight className="h-5 w-5 inline" />
                            </motion.span>
                        </Button>
                    </motion.div>
                </motion.div>

                {/* Animated separator */}
                <motion.div
                    className="w-full max-w-md mx-auto h-[1px] my-8 relative overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                >
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-500/30 to-transparent"
                        animate={{
                            backgroundPosition: ["200% center", "-200% center"],
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />
                </motion.div>

                {/* Bottom links */}
                <motion.div
                    className="flex flex-wrap justify-center gap-6 sm:gap-8 items-center"
                    variants={containerVariants}
                >
                    <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Link href="#" className="text-zinc-400 hover:text-[#29ABE2] flex items-center transition-colors group">
                            <div className="relative">
                                <BookOpen className="h-5 w-5 mr-2" />
                                <motion.div
                                    className="absolute -inset-1 rounded-full bg-[#29ABE2]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    animate={{
                                        scale: [1, 1.4, 1],
                                        opacity: [0, 0.2, 0]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity
                                    }}
                                />
                            </div>
                            <span className="text-sm sm:text-base">Documentation</span>
                        </Link>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Link href="#" className="text-zinc-400 hover:text-[#ED1E79] flex items-center transition-colors group">
                            <div className="relative">
                                <Users className="h-5 w-5 mr-2" />
                                <motion.div
                                    className="absolute -inset-1 rounded-full bg-[#ED1E79]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    animate={{
                                        scale: [1, 1.4, 1],
                                        opacity: [0, 0.2, 0]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: 0.3
                                    }}
                                />
                            </div>
                            <span className="text-sm sm:text-base">Community</span>
                        </Link>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Link href="#" className="text-zinc-400 hover:text-[#3B00B9] flex items-center transition-colors group">
                            <div className="relative">
                                <ExternalLink className="h-5 w-5 mr-2" />
                                <motion.div
                                    className="absolute -inset-1 rounded-full bg-[#3B00B9]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    animate={{
                                        scale: [1, 1.4, 1],
                                        opacity: [0, 0.2, 0]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: 0.6
                                    }}
                                />
                            </div>
                            <span className="text-sm sm:text-base">EDU Chain</span>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default CTASection;