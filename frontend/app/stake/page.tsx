"use client";

import { useState } from "react";
import {
    BookOpen,
    GraduationCap,
    Users,
    Lock,
    Cpu,
    Code,
    BarChart,
    Zap
} from "lucide-react";
import ICPSidebar from "@/components/Layout/Sidebar";
import { PoolFilterTabs } from "@/components/Staking/PoolFilterTabs";
import { FeaturedPoolBanner } from "@/components/Staking/FeaturedPoolBanner";
import { StakingPoolCard } from "@/components/Staking/StakingPoolCard";


// ICP-themed staking pools data
const stakingPools = [
    {
        id: "learn-earn-basic",
        title: "ICP Beginners Neuron",
        description: "Perfect for beginners learning about the Internet Computer. Start earning while mastering ICP fundamentals and governance.",
        icon: <BookOpen className="h-5 w-5 text-[#3B00B9] dark:text-[#29ABE2]" />,
        apr: "8-10%",
        lockPeriod: "6 months",
        minStake: "1 ICP",
        boostRequirement: "Complete 'ICP Basics' course",
        boostMultiplier: "1.2x",
        totalStaked: "12,550 ICP",
        difficulty: "beginner" as const,
        isPopular: true,
        isVerified: true,
        category: "education"
    },
    {
        id: "canister-developers",
        title: "Canister Developers Pool",
        description: "For developers learning to build canisters on the Internet Computer. Enhanced rewards for technical contributions.",
        icon: <Cpu className="h-5 w-5 text-[#3B00B9] dark:text-[#29ABE2]" />,
        apr: "12-15%",
        lockPeriod: "2 years",
        minStake: "10 ICP",
        boostRequirement: "Deploy 1 canister to mainnet",
        boostMultiplier: "1.5x",
        totalStaked: "8,750 ICP",
        difficulty: "intermediate" as const,
        isVerified: true,
        category: "development"
    },
    {
        id: "governance-masters",
        title: "Network Governance Experts",
        description: "For active NNS participants. Rewards for consistent voting and governance participation on Internet Computer.",
        icon: <BarChart className="h-5 w-5 text-[#3B00B9] dark:text-[#29ABE2]" />,
        apr: "10-13%",
        lockPeriod: "1 year",
        minStake: "5 ICP",
        boostRequirement: "Vote on 50+ NNS proposals",
        boostMultiplier: "1.3x",
        totalStaked: "15,300 ICP",
        difficulty: "intermediate" as const,
        category: "governance"
    },
    {
        id: "chain-fusion-specialists",
        title: "Chain Fusion Specialists",
        description: "Advanced pool for developers working with Bitcoin integration and multi-chain applications on ICP.",
        icon: <Zap className="h-5 w-5 text-[#3B00B9] dark:text-[#29ABE2]" />,
        apr: "15-18%",
        lockPeriod: "4 years",
        minStake: "50 ICP",
        boostRequirement: "Complete Chain Fusion course",
        boostMultiplier: "1.7x",
        totalStaked: "11,280 ICP",
        difficulty: "advanced" as const,
        category: "development"
    },
    {
        id: "community-builders",
        title: "ICP Community Builders",
        description: "Rewards for active community members who help grow the Internet Computer ecosystem through education and outreach.",
        icon: <Users className="h-5 w-5 text-[#3B00B9] dark:text-[#29ABE2]" />,
        apr: "9-12%",
        lockPeriod: "1 year",
        minStake: "2 ICP",
        boostRequirement: "Host 2 ICP community events",
        boostMultiplier: "1.4x",
        totalStaked: "6,450 ICP",
        difficulty: "beginner" as const,
        category: "education"
    },
    {
        id: "motoko-masters",
        title: "Motoko Language Masters",
        description: "For developers mastering Motoko programming language. Build expertise in ICP's native development language.",
        icon: <Code className="h-5 w-5 text-[#3B00B9] dark:text-[#29ABE2]" />,
        apr: "13-16%",
        lockPeriod: "3 years",
        minStake: "25 ICP",
        boostRequirement: "Complete Motoko certification",
        boostMultiplier: "1.6x",
        totalStaked: "9,750 ICP",
        difficulty: "intermediate" as const,
        isPopular: true,
        category: "development"
    },
    {
        id: "long-term-believers",
        title: "Long-term ICP Believers",
        description: "Maximum rewards for long-term commitment to the Internet Computer ecosystem. 8-year dissolve delay for maximum voting rewards.",
        icon: <Lock className="h-5 w-5 text-[#3B00B9] dark:text-[#29ABE2]" />,
        apr: "16-22%",
        lockPeriod: "8 years",
        minStake: "100 ICP",
        boostRequirement: "Complete any 3 advanced ICP courses",
        boostMultiplier: "2.0x",
        totalStaked: "20,375 ICP",
        difficulty: "advanced" as const,
        isVerified: true,
        category: "governance"
    },
    {
        id: "icp-educators",
        title: "ICP Educator's Guild",
        description: "Designed for content creators building educational resources about the Internet Computer Protocol and canister development.",
        icon: <GraduationCap className="h-5 w-5 text-[#3B00B9] dark:text-[#29ABE2]" />,
        apr: "11-14%",
        lockPeriod: "2 years",
        minStake: "15 ICP",
        boostRequirement: "Create 1 ICP educational resource",
        boostMultiplier: "1.5x",
        totalStaked: "7,650 ICP",
        difficulty: "intermediate" as const,
        category: "education"
    }
];

export default function ICPStakingPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("all");

    // Filter pools based on search and category
    const filteredPools = stakingPools.filter(pool => {
        const matchesSearch = pool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             pool.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeTab === "all" || pool.category === activeTab;
        return matchesSearch && matchesCategory;
    });

    const handleJoinFeaturedPool = () => {
        console.log("Joining featured pool");
        // Handle featured pool join logic
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <div className="flex">
                <ICPSidebar />
                <main className="flex-1 pt-20 px-6 max-w-6xl mx-auto pb-12">
                    {/* Page Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">ICP Neuron Pools</h1>
                        <p className="text-gray-600 dark:text-gray-300 mt-1">
                            Stake your ICP tokens in neurons and earn rewards while learning about the Internet Computer
                        </p>
                    </div>

                    {/* Filter and Search */}
                    <PoolFilterTabs
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                    />

                    {/* Featured Pool Banner */}
                    <FeaturedPoolBanner onJoinPool={handleJoinFeaturedPool} />

                    {/* Results Count */}
                    <div className="mb-6">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Showing {filteredPools.length} of {stakingPools.length} neuron pools
                            {searchQuery && ` for "${searchQuery}"`}
                        </p>
                    </div>

                    {/* Staking Pools Grid */}
                    {filteredPools.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredPools.map((pool) => (
                                <StakingPoolCard
                                    key={pool.id}
                                    title={pool.title}
                                    description={pool.description}
                                    icon={pool.icon}
                                    apr={pool.apr}
                                    lockPeriod={pool.lockPeriod}
                                    minStake={pool.minStake}
                                    boostRequirement={pool.boostRequirement}
                                    boostMultiplier={pool.boostMultiplier}
                                    totalStaked={pool.totalStaked}
                                    difficulty={pool.difficulty}
                                    isPopular={pool.isPopular}
                                    isVerified={pool.isVerified}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <Cpu className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No pools found</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Try adjusting your search or filter criteria.
                            </p>
                        </div>
                    )}

                    {/* Info Section */}
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center mb-4">
                                <Zap className="h-5 w-5 text-[#ED1E79] dark:text-[#F15A24] mr-2" />
                                <h3 className="font-semibold text-gray-900 dark:text-white">How Learning Boosts Work</h3>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">
                                Complete educational courses to increase your staking multipliers. Each course completion 
                                unlocks higher rewards and deeper understanding of the Internet Computer ecosystem.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center mb-4">
                                <Lock className="h-5 w-5 text-[#3B00B9] dark:text-[#29ABE2] mr-2" />
                                <h3 className="font-semibold text-gray-900 dark:text-white">Understanding Dissolve Delays</h3>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">
                                Longer dissolve delays provide higher voting power and rewards. Your neurons participate 
                                in network governance, securing the Internet Computer's decentralized future.
                            </p>
                        </div>
                    </div>

                    {/* Network Stats */}
                    <div className="mt-8 bg-gradient-to-r from-[#3B00B9]/5 to-[#29ABE2]/5 dark:from-[#3B00B9]/10 dark:to-[#29ABE2]/10 rounded-lg p-6 border border-[#29ABE2]/10 dark:border-[#29ABE2]/20">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                            <BarChart className="h-5 w-5 mr-2 text-[#29ABE2]" />
                            Internet Computer Network Stats
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-[#3B00B9] dark:text-[#29ABE2]">42</p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">Active Subnets</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-[#3B00B9] dark:text-[#29ABE2]">125k+</p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">Total Canisters</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-[#3B00B9] dark:text-[#29ABE2]">294M+</p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">ICP Staked</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-[#50C878]">99.9%</p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">Network Uptime</p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
