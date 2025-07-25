"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavLinkProps {
    href: string;
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    activeClassName?: string;
    exact?: boolean;
    delay?: number;
}

export default function NavLink({
    href,
    children,
    className,
    onClick,
    activeClassName = "active",
    exact = false,
    delay = 0
}: NavLinkProps) {
    const pathname = usePathname();
    const isActive = exact
        ? pathname === href
        : pathname.startsWith(href) && href !== "/";

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.4,
                delay: delay * 0.08 + 0.2,
                ease: "easeOut"
            }}
            className="relative"
        >
            <Link
                href={href}
                onClick={onClick}
                className={cn(
                    "relative font-medium transition-all duration-300 px-3 py-2 rounded-lg group",
                    "hover:bg-white/10 hover:backdrop-blur-sm",
                    isActive
                        ? "text-white bg-white/10 backdrop-blur-sm"
                        : "text-white/80 hover:text-white",
                    className
                )}
            >
                <span className="relative z-10 transition-all duration-300 group-hover:scale-105">
                    {children}
                </span>

                {/* Active indicator with ICP gradient */}
                {isActive && (
                    <motion.div
                        className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#3B00B9]/20 via-[#ED1E79]/20 to-[#29ABE2]/20 border border-white/20"
                        layoutId="navbar-active-bg"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                )}

                {/* Animated underline */}
                {isActive ? (
                    <motion.div
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[2px] bg-gradient-to-r from-[#ED1E79] to-[#29ABE2] rounded-full"
                        layoutId="navbar-underline"
                        initial={{ width: 0 }}
                        animate={{ width: "70%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                ) : (
                    <motion.div
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[2px] bg-gradient-to-r from-[#ED1E79] to-[#29ABE2] rounded-full"
                        initial={{ width: 0 }}
                        whileHover={{ width: "50%" }}
                        transition={{ duration: 0.2 }}
                    />
                )}

                {/* Hover glow effect */}
                <motion.div
                    className="absolute inset-0 rounded-lg opacity-0 bg-gradient-to-r from-[#3B00B9]/10 to-[#29ABE2]/10"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                />

                {/* Ripple effect on click */}
                <motion.div
                    className="absolute inset-0 rounded-lg"
                    whileTap={{
                        scale: 0.95,
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        transition: { duration: 0.1 }
                    }}
                />
            </Link>

            {/* Floating particle effect for active state */}
            {isActive && (
                <motion.div
                    className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#ED1E79]"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            )}
        </motion.div>
    );
}