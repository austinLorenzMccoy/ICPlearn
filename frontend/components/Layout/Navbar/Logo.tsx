"use client";

import {  useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ICPLogo({ size = "default" }: { size?: "default" | "small" | "large" }) {
    const logoRef = useRef<HTMLDivElement>(null);

    // Size classes based on prop
    const sizeClasses = {
        small: "h-8 w-8",
        default: "h-10 w-10",
        large: "h-12 w-12"
    };

    const textSizeClasses = {
        small: "text-lg",
        default: "text-xl",
        large: "text-2xl"
    };

    // Animation variants
    const svgVariants = {
        hidden: { rotate: -5, opacity: 0 },
        visible: {
            rotate: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    const pathVariants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                duration: 1.5,
                ease: "easeInOut",
                delay: 0.2
            }
        }
    };

    const textVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                delay: 0.4
            }
        }
    };

    const particleVariants = {
        hidden: { opacity: 0, scale: 0 },
        visible: (custom: number) => ({
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
            y: [-2, -8, -2],
            transition: {
                duration: 3,
                repeat: Infinity,
                delay: custom * 0.3,
                ease: "easeInOut"
            }
        })
    };

    return (
        <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group">
            <motion.div
                ref={logoRef}
                className={`relative ${sizeClasses[size || "default"]}`}
                initial="hidden"
                animate="visible"
                variants={svgVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <svg
                    viewBox="0 0 60 60"
                    className="w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Gradient definitions for ICP */}
                    <defs>
                        <linearGradient id="icpLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#3B00B9" />
                            <stop offset="50%" stopColor="#ED1E79" />
                            <stop offset="100%" stopColor="#29ABE2" />
                        </linearGradient>
                        <linearGradient id="icpTextGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#ED1E79" />
                            <stop offset="100%" stopColor="#F15A24" />
                        </linearGradient>
                        <filter id="icpGlow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="2" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                        <filter id="icpInnerGlow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="1" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            <feFlood floodColor="#ED1E79" floodOpacity="0.3" result="color" />
                            <feComposite in="color" in2="SourceGraphic" operator="in" />
                        </filter>
                    </defs>

                    {/* Hexagon base with ICP gradient */}
                    <motion.path
                        id="hexagon"
                        d="M30 4L53.5 17.5V44.5L30 58L6.5 44.5V17.5L30 4Z"
                        fill="url(#icpLogoGradient)"
                        stroke="white"
                        strokeWidth="1.5"
                        variants={pathVariants}
                        filter="url(#icpGlow)"
                    />

                    {/* ICP Canister representation - central circle */}
                    <motion.circle
                        cx="30"
                        cy="30"
                        r="12"
                        fill="none"
                        stroke="url(#icpTextGradient)"
                        strokeWidth="2"
                        strokeDasharray="4 2"
                        initial={{ pathLength: 0, opacity: 0, rotate: 0 }}
                        animate={{
                            pathLength: 1,
                            opacity: [0, 1, 0.8],
                            rotate: 360,
                            transition: {
                                pathLength: { duration: 2, delay: 1 },
                                opacity: { duration: 1.5, delay: 1 },
                                rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                            }
                        }}
                    />

                    {/* Network nodes */}
                    <motion.circle cx="20" cy="20" r="2" fill="#29ABE2" variants={particleVariants} custom={0} />
                    <motion.circle cx="40" cy="20" r="2" fill="#ED1E79" variants={particleVariants} custom={1} />
                    <motion.circle cx="20" cy="40" r="2" fill="#F15A24" variants={particleVariants} custom={2} />
                    <motion.circle cx="40" cy="40" r="2" fill="#3B00B9" variants={particleVariants} custom={3} />

                    {/* Connection lines between nodes */}
                    <motion.path
                        d="M20 20L30 30M40 20L30 30M20 40L30 30M40 40L30 30"
                        stroke="white"
                        strokeWidth="0.5"
                        strokeOpacity="0.3"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                            pathLength: 1,
                            opacity: [0, 0.5, 0.3],
                            transition: {
                                duration: 2,
                                delay: 1.5,
                                ease: "easeInOut"
                            }
                        }}
                    />

                    {/* ICP letters */}
                    <motion.text
                        id="icp-text"
                        x="30"
                        y="35"
                        fontSize="10"
                        fontWeight="bold"
                        fill="url(#icpTextGradient)"
                        textAnchor="middle"
                        filter="url(#icpInnerGlow)"
                        variants={textVariants}
                    >
                        ICP
                    </motion.text>
                </svg>
            </motion.div>

            <motion.div
                className="flex flex-col"
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <motion.span
                    className={`text-white font-bold ${textSizeClasses[size || "default"]} leading-tight`}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ED1E79] to-[#F15A24]">
                        ICP
                    </span>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#29ABE2] to-[#3B00B9] ml-1">
                        Learn
                    </span>
                </motion.span>
                <motion.span
                    className="text-xs text-white/60 font-medium"
                    initial={{ y: 5, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.7 }}
                >
                    Internet Computer
                </motion.span>
            </motion.div>
        </Link>
    );
}