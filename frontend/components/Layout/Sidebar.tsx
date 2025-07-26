"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Wallet,
    GraduationCap,
    Trophy,
    Users,
    Settings,
    HelpCircle,
    ChevronRight,
    CreditCard,
    History,
    Cpu,
    Code,
    BarChart,
    BookOpen,
    Zap,
    Globe
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

type NavItemProps = {
    icon: React.ReactNode;
    label: string;
    href: string;
    isActive?: boolean;
    isPro?: boolean;
    isCollapsed?: boolean;
    onClick?: () => void;
};

const NavItem = ({
    icon,
    label,
    href,
    isActive,
    isPro,
    isCollapsed,
    onClick
}: NavItemProps) => {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all",
                isActive
                    ? "bg-gradient-to-r from-[#3B00B9]/10 to-[#29ABE2]/10 text-[#3B00B9] dark:from-[#3B00B9]/20 dark:to-[#29ABE2]/20 dark:text-[#29ABE2] font-medium border border-[#3B00B9]/20 dark:border-[#29ABE2]/30"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
                isCollapsed && "justify-center px-2"
            )}
        >
            {icon}
            {!isCollapsed && <span>{label}</span>}
            {!isCollapsed && isPro && (
                <span className="ml-auto text-xs font-medium bg-gradient-to-r from-[#3B00B9] to-[#29ABE2] text-white px-1.5 py-0.5 rounded">
                    PRO
                </span>
            )}
        </Link>
    );
};

export default function ICPSidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const pathname = usePathname();

    // ICP Internet Identity connection info
    const [isWalletConnected, setIsWalletConnected] = useState(true);
    const principalId = "rdmx6-jaaaa-aaaah-qcaaw...";

    return (
        <div
            className={cn(
                "flex flex-col border-r bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 h-screen sticky top-0 pt-16 transition-all duration-300",
                isCollapsed ? "w-16" : "w-64"
            )}
        >
            <div className="flex items-center justify-between p-3 pt-2">
                <div className="flex-1" />
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                >
                    <ChevronRight className={cn(
                        "h-4 w-4 transition-all",
                        isCollapsed && "rotate-180"
                    )} />
                </Button>
            </div>

            {/* Internet Identity Connection Indicator */}
            <div className={cn(
                "mx-3 mb-4 p-2 rounded-lg flex items-center border",
                isWalletConnected
                    ? "bg-gradient-to-r from-[#3B00B9]/10 to-[#29ABE2]/10 dark:from-[#3B00B9]/20 dark:to-[#29ABE2]/20 border-[#29ABE2]/20 dark:border-[#29ABE2]/30"
                    : "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            )}>
                <div className={cn(
                    "h-2 w-2 rounded-full mr-2",
                    isWalletConnected ? "bg-[#50C878]" : "bg-gray-400 dark:bg-gray-500"
                )}></div>
                {!isCollapsed && (
                    <div className="flex-1 truncate">
                        {isWalletConnected ? (
                            <div className="flex flex-col">
                                <span className="text-xs font-medium text-[#3B00B9] dark:text-[#29ABE2]">Internet Identity</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400 truncate">{principalId}</span>
                            </div>
                        ) : (
                            <Button
                                size="sm"
                                className="text-xs h-6 bg-gradient-to-r from-[#3B00B9] to-[#29ABE2] hover:from-[#2E0092] hover:to-[#1E8FBF] text-white"
                            >
                                Connect II
                            </Button>
                        )}
                    </div>
                )}
                {isCollapsed && !isWalletConnected && (
                    <Globe className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                )}
            </div>

            <ScrollArea className="flex-1 px-3">
                <div className="space-y-1 py-2">
                    <NavItem
                        icon={<LayoutDashboard className="h-5 w-5 text-[#3B00B9] dark:text-[#29ABE2]" />}
                        label="Dashboard"
                        href="/dashboard"
                        isActive={pathname === "/dashboard"}
                        isCollapsed={isCollapsed}
                    />
                    <NavItem
                        icon={<Wallet className="h-5 w-5 text-[#3B00B9] dark:text-[#29ABE2]" />}
                        label="Stake ICP"
                        href="/stake"
                        isActive={pathname === "/stake"}
                        isCollapsed={isCollapsed}
                    />
                    <NavItem
                        icon={<CreditCard className="h-5 w-5 text-[#3B00B9] dark:text-[#29ABE2]" />}
                        label="My Neurons"
                        href="/neurons"
                        isActive={pathname === "/neurons"}
                        isCollapsed={isCollapsed}
                    />
                    <NavItem
                        icon={<Cpu className="h-5 w-5 text-[#3B00B9] dark:text-[#29ABE2]" />}
                        label="Canisters"
                        href="/canisters"
                        isActive={pathname === "/canisters"}
                        isCollapsed={isCollapsed}
                    />
                    <NavItem
                        icon={<GraduationCap className="h-5 w-5 text-[#3B00B9] dark:text-[#29ABE2]" />}
                        label="Learn ICP"
                        href="/learn"
                        isActive={pathname === "/learn"}
                        isCollapsed={isCollapsed}
                    />
                    <NavItem
                        icon={<Trophy className="h-5 w-5 text-[#3B00B9] dark:text-[#29ABE2]" />}
                        label="Leaderboard"
                        href="/leaderboard"
                        isActive={pathname === "/leaderboard"}
                        isCollapsed={isCollapsed}
                    />
                    <NavItem
                        icon={<History className="h-5 w-5 text-[#3B00B9] dark:text-[#29ABE2]" />}
                        label="Transaction History"
                        href="/history"
                        isActive={pathname === "/history"}
                        isCollapsed={isCollapsed}
                    />
                </div>

                {!isCollapsed && (
                    <div className="mt-6">
                        <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 px-3 py-2">
                            DEVELOPER TOOLS
                        </div>
                    </div>
                )}

                <div className="space-y-1 py-2">
                    <NavItem
                        icon={<Code className="h-5 w-5 text-[#ED1E79] dark:text-[#F15A24]" />}
                        label="SDK & Tools"
                        href="/sdk"
                        isActive={pathname === "/sdk"}
                        isCollapsed={isCollapsed}
                    />
                    <NavItem
                        icon={<BarChart className="h-5 w-5 text-[#ED1E79] dark:text-[#F15A24]" />}
                        label="Network Analytics"
                        href="/analytics"
                        isActive={pathname === "/analytics"}
                        isCollapsed={isCollapsed}
                    />
                    <NavItem
                        icon={<BookOpen className="h-5 w-5 text-[#ED1E79] dark:text-[#F15A24]" />}
                        label="Documentation"
                        href="https://internetcomputer.org/docs"
                        isActive={pathname === "/docs"}
                        isCollapsed={isCollapsed}
                    />
                </div>

                {!isCollapsed && (
                    <div className="mt-6">
                        <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 px-3 py-2">
                            COMMUNITY
                        </div>
                    </div>
                )}

                <div className="space-y-1 py-2">
                    <NavItem
                        icon={<Users className="h-5 w-5 text-gray-500 dark:text-gray-400" />}
                        label="Developer Community"
                        href="/community"
                        isActive={pathname === "/community"}
                        isPro={true}
                        isCollapsed={isCollapsed}
                    />
                </div>

                <div className="space-y-1 py-2 mt-6">
                    <NavItem
                        icon={<Settings className="h-5 w-5 text-gray-500 dark:text-gray-400" />}
                        label="Settings"
                        href="/settings"
                        isActive={pathname === "/settings"}
                        isCollapsed={isCollapsed}
                    />
                    <NavItem
                        icon={<HelpCircle className="h-5 w-5 text-gray-500 dark:text-gray-400" />}
                        label="Help"
                        href="/help"
                        isActive={pathname === "/help"}
                        isCollapsed={isCollapsed}
                    />
                </div>
            </ScrollArea>

            {!isCollapsed && (
                <div className="p-4 mt-auto border-t border-gray-200 dark:border-gray-800">
                    <div className="bg-gradient-to-r from-[#3B00B9]/5 to-[#29ABE2]/5 dark:from-[#3B00B9]/10 dark:to-[#29ABE2]/10 rounded-lg p-4 border border-[#29ABE2]/10 dark:border-[#29ABE2]/20">
                        <div className="flex items-center mb-2">
                            <Zap className="h-4 w-4 text-[#ED1E79] dark:text-[#F15A24] mr-2" />
                            <h4 className="font-medium text-[#3B00B9] dark:text-[#29ABE2] text-sm">Boost Your Rewards</h4>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                            Learn about canisters, neurons, and ICP development to increase your staking multipliers.
                        </p>
                        <Button
                            className="w-full mt-3 bg-gradient-to-r from-[#3B00B9] to-[#29ABE2] hover:from-[#2E0092] hover:to-[#1E8FBF] text-white"
                            size="sm"
                        >
                            Start Learning ICP
                        </Button>
                    </div>
                </div>
            )}

            {/* ICP Network Status Indicator */}
            {!isCollapsed && (
                <div className="px-4 pb-4">
                    <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-[#50C878] mr-2 animate-pulse" />
                            <span className="text-gray-500 dark:text-gray-400">ICP Network</span>
                        </div>
                        <span className="text-[#50C878] font-medium">Operational</span>
                    </div>
                </div>
            )}
        </div>
    );
}


