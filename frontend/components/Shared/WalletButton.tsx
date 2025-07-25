"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Wallet, ChevronDown, Copy, ExternalLink, LogOut, Check, ArrowRight, ShieldCheck } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface WalletButtonProps {
    className?: string;
    mobile?: boolean;
}

export default function WalletButton({ className, mobile = false }: WalletButtonProps) {
    const [walletConnected, setWalletConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState("0x7a...5e3b");
    const [walletBalance, setWalletBalance] = useState("1,250 EDU");
    const [copying, setCopying] = useState(false);

    const handleConnectWallet = () => {
        // This would be your wallet connection logic
        setWalletConnected(true);
    };

    const handleDisconnect = () => {
        setWalletConnected(false);
    };

    const handleCopyAddress = () => {
        // This would be your clipboard logic
        navigator.clipboard.writeText("0x7a3d5e9b4c2d1f8a7b6e3d2c1f8a7b6e3d2c1f8a");
        setCopying(true);
        setTimeout(() => setCopying(false), 2000);
    };

    // Animation variants
    const buttonVariants: Variants = {
        initial: {
            scale: 0.95,
            opacity: 0
        },
        animate: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        },
        hover: {
            scale: 1.03,
            boxShadow: "0 0 15px rgba(255,215,0,0.3)",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10
            }
        },
        tap: {
            scale: 0.97,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10
            }
        }
    };

    const indicatorVariants: Variants = {
        initial: { scale: 0 },
        animate: {
            scale: [1, 1.2, 1],
            transition: {
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse"
            }
        }
    };

    const dropdownContentVariants: Variants = {
        hidden: {
            opacity: 0,
            y: -10,
            scale: 0.95
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.2,
                ease: "easeOut"
            }
        },
        exit: {
            opacity: 0,
            y: -10,
            scale: 0.95,
            transition: {
                duration: 0.2,
                ease: "easeIn"
            }
        }
    };

    const dropdownItemVariants: Variants = {
        hidden: { x: -10, opacity: 0 },
        visible: (custom: number) => ({
            x: 0,
            opacity: 1,
            transition: {
                delay: 0.05 * custom,
                duration: 0.2
            }
        }),
        hover: {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            transition: { duration: 0.1 }
        }
    };

    if (walletConnected) {
        return mobile ? (
            <motion.div
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
                variants={buttonVariants}
            >
                <Button
                    variant="outline"
                    className={`wallet-button w-full bg-white/10 text-white border-white/20 backdrop-blur-md hover:bg-white/20 hover:border-white/30 font-medium ${className}`}
                >
                    <div className="flex items-center">
                        <motion.div
                            className="h-4 w-4 rounded-full bg-gradient-to-r from-[#FFD700] to-[#50C878] mr-2"
                            variants={indicatorVariants}
                        />
                        <span>{walletAddress}</span>
                    </div>
                </Button>
            </motion.div>
        ) : (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <motion.div
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                        whileTap="tap"
                        variants={buttonVariants}
                    >
                        <Button
                            variant="outline"
                            className={`wallet-button bg-white/10 text-white border-white/20 backdrop-blur-md hover:bg-white/20 hover:border-white/30 font-medium ${className}`}
                        >
                            <div className="flex items-center">
                                <motion.div
                                    className="h-3 w-3 rounded-full bg-gradient-to-r from-[#FFD700] to-[#50C878] mr-2"
                                    variants={indicatorVariants}
                                />
                                <span>{walletAddress}</span>
                                <ChevronDown className="ml-2 h-4 w-4" />
                            </div>
                        </Button>
                    </motion.div>
                </DropdownMenuTrigger>

                <AnimatePresence>
                    <DropdownMenuContent
                        align="end"
                        className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white border-slate-700 backdrop-blur-lg p-2 w-64"
                        asChild
                        forceMount
                    >
                        <motion.div
                            variants={dropdownContentVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <div className="px-2 py-2 space-y-1">
                                <p className="text-xs text-slate-400">Connected Wallet</p>
                                <p className="font-medium text-sm">{walletAddress}</p>
                            </div>

                            <motion.div
                                className="px-2 py-2 space-y-1 mb-2"
                                variants={dropdownItemVariants}
                                custom={1}
                            >
                                <p className="text-xs text-slate-400">Balance</p>
                                <div className="flex items-center">
                                    <p className="font-medium">{walletBalance}</p>
                                    <div className="ml-2 px-1.5 py-0.5 bg-gradient-to-r from-[#FFD700]/20 to-[#50C878]/20 rounded-sm text-xs text-[#FFD700]">
                                        +2.5%
                                    </div>
                                </div>
                            </motion.div>

                            <DropdownMenuSeparator className="bg-slate-700" />

                            <motion.div variants={dropdownItemVariants} custom={2}>
                                <DropdownMenuItem
                                    className="flex cursor-pointer items-center text-sm py-2 px-2 mx-1 rounded hover:bg-slate-700"
                                    asChild
                                >
                                    <motion.div
                                        whileHover={{ x: 2 }}
                                        onClick={handleCopyAddress}
                                    >
                                        {copying ? (
                                            <Check className="mr-2 h-4 w-4 text-green-400" />
                                        ) : (
                                            <Copy className="mr-2 h-4 w-4" />
                                        )}
                                        <span>{copying ? "Copied!" : "Copy Address"}</span>
                                    </motion.div>
                                </DropdownMenuItem>
                            </motion.div>

                            <motion.div variants={dropdownItemVariants} custom={3}>
                                <DropdownMenuItem
                                    className="flex cursor-pointer items-center text-sm py-2 px-2 mx-1 rounded hover:bg-slate-700"
                                    asChild
                                >
                                    <motion.div whileHover={{ x: 2 }}>
                                        <ExternalLink className="mr-2 h-4 w-4" />
                                        <span>View on Explorer</span>
                                        <ArrowRight className="ml-auto h-3 w-3 text-slate-400" />
                                    </motion.div>
                                </DropdownMenuItem>
                            </motion.div>

                            <motion.div
                                className="mt-2 mx-2 p-2 rounded-md bg-slate-800/50 border border-slate-700/50"
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.3 }}
                            >
                                <div className="flex items-center text-xs text-slate-300">
                                    <ShieldCheck className="h-3 w-3 mr-1 text-green-400" />
                                    <span>Connected securely via MetaMask</span>
                                </div>
                            </motion.div>

                            <DropdownMenuSeparator className="bg-slate-700 my-2" />

                            <motion.div variants={dropdownItemVariants} custom={4}>
                                <DropdownMenuItem
                                    className="flex cursor-pointer items-center text-sm py-2 px-2 mx-1 rounded hover:bg-slate-700 text-red-400"
                                    onClick={handleDisconnect}
                                    asChild
                                >
                                    <motion.div
                                        whileHover={{ x: 2 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Disconnect</span>
                                    </motion.div>
                                </DropdownMenuItem>
                            </motion.div>
                        </motion.div>
                    </DropdownMenuContent>
                </AnimatePresence>
            </DropdownMenu>
        );
    }

    return (
        <motion.div
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
        >
            <Button
                onClick={handleConnectWallet}
                className={`wallet-button bg-white/10 backdrop-blur-md border-[1px] border-white/20 text-white hover:bg-white/20 hover:border-white/30 font-medium ${mobile ? "w-full" : ""
                    } ${className}`}
            >
                <Wallet className="mr-2 h-4 w-4" />
                <span>Connect Wallet</span>
            </Button>
        </motion.div>
    );
}