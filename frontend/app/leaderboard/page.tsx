"use client";

import { useState } from "react";
import {
    Search,
    GraduationCap,
    Coins,
    Users,
    BookOpen,
    Cpu,
    Vote,
    Code,
    Brain,
    Zap
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ICPSidebar from "@/components/Layout/Sidebar";
import { ICPYourRankCard } from "@/components/LeadersBoard/ICPYourRankCard";
import { ICPAchievementCard } from "@/components/LeadersBoard/ICPAchievementCard";
import { ICPTopLeaders } from "@/components/LeadersBoard/ICPTopLeaders";
import { ICPLeaderboardTable } from "@/components/LeadersBoard/ICPLeaderboardTable";



// ICP-themed leaderboard data
const icpLeaderboardData = [
    {
        id: 1,
        name: "Dominic W.",
        level: "ICP Master",
        points: 12750,
        stakingAmount: 25000,
        neuronBoost: 2.5,
        joinDate: "Jan 2024",
        avatar: "",
        achievements: ["Canister Expert", "NNS Governor", "Chain Fusion Pioneer"]
    },
    {
        id: 2,
        name: "Motoko M.",
        level: "Canister Expert",
        points: 9800,
        stakingAmount: 18500,
        neuronBoost: 2.2,
        joinDate: "Feb 2024",
        avatar: "",
        achievements: ["Motoko Master", "DeFi Builder", "Top Voter"]
    },
    {
        id: 3,
        name: "Chain F.",
        level: "Network Expert",
        points: 8900,
        stakingAmount: 15000,
        neuronBoost: 2.0,
        joinDate: "Jan 2024",
        avatar: "",
        achievements: ["Bitcoin Integration", "Community Leader", "Course Creator"]
    },
    {
        id: 4,
        name: "Neuron N.",
        level: "Advanced Learner",
        points: 7300,
        stakingAmount: 12800,
        neuronBoost: 1.8,
        joinDate: "Mar 2024",
        avatar: "",
        achievements: ["Governance Expert", "Top Learner"]
    },
    {
        id: 5,
        name: "Canister C.",
        level: "Developer",
        points: 6200,
        stakingAmount: 9500,
        neuronBoost: 1.6,
        joinDate: "Feb 2024",
        avatar: "",
        achievements: ["Rust Developer", "Motoko Specialist"]
    },
    {
        id: 6,
        name: "Alex I.",
        level: "Intermediate",
        points: 4800,
        stakingAmount: 6200,
        neuronBoost: 1.4,
        joinDate: "Apr 2024",
        avatar: "",
        achievements: ["Fast Learner", "Community Helper"]
    },
    {
        id: 7,
        name: "Subnet S.",
        level: "Advanced Learner",
        points: 5500,
        stakingAmount: 8100,
        neuronBoost: 1.7,
        joinDate: "Mar 2024",
        avatar: "",
        achievements: ["Network Expert", "Governance Participant"]
    },
    {
        id: 8,
        name: "DFinity D.",
        level: "Beginner",
        points: 3200,
        stakingAmount: 4500,
        neuronBoost: 1.2,
        joinDate: "May 2024",
        avatar: "",
        achievements: ["Rising Star", "First Canister"]
    }
];

export default function ICPLeaderboardPage() {
    const [sortField, setSortField] = useState("points");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
    const [searchQuery, setSearchQuery] = useState("");
    const [timeFrame, setTimeFrame] = useState("all-time");

    // Sort and filter data
    const handleSort = (field: string) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("desc");
        }
    };

    const sortedData = [...icpLeaderboardData].sort((a, b) => {
        const aValue = a[sortField as keyof typeof a];
        const bValue = b[sortField as keyof typeof b];

        if (typeof aValue === "number" && typeof bValue === "number") {
            return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
        }

        if (typeof aValue === "string" && typeof bValue === "string") {
            return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }

        return 0;
    });

    // Filter data based on search query
    const filteredData = sortedData.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.level.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <div className="flex">
                <ICPSidebar />
                <main className="flex-1 pt-20 px-6 max-w-6xl mx-auto pb-12">
                    {/* Page Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">ICP Leaderboard</h1>
                        <p className="text-gray-600 dark:text-gray-300 mt-1">
                            Compete with other Internet Computer learners and earn neuron boost rewards based on your rank
                        </p>
                    </div>

                    {/* Your Rank */}
                    <ICPYourRankCard 
                        rank={6} 
                        points={4800} 
                        level="Intermediate" 
                        stakingAmount={6200} 
                        neuronBoost={1.4} 
                    />

                    {/* Leaderboard Content */}
                    <div className="mt-8">
                        <Tabs defaultValue="global" className="w-full">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                                <TabsList className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                    <TabsTrigger 
                                        value="global" 
                                        className="data-[state=active]:bg-[#3B00B9] data-[state=active]:text-white dark:data-[state=active]:bg-[#29ABE2]"
                                    >
                                        Global
                                    </TabsTrigger>
                                    <TabsTrigger 
                                        value="neurons" 
                                        className="data-[state=active]:bg-[#3B00B9] data-[state=active]:text-white dark:data-[state=active]:bg-[#29ABE2]"
                                    >
                                        Neurons
                                    </TabsTrigger>
                                    <TabsTrigger 
                                        value="learning" 
                                        className="data-[state=active]:bg-[#3B00B9] data-[state=active]:text-white dark:data-[state=active]:bg-[#29ABE2]"
                                    >
                                        Learning
                                    </TabsTrigger>
                                    <TabsTrigger 
                                        value="developers" 
                                        className="data-[state=active]:bg-[#3B00B9] data-[state=active]:text-white dark:data-[state=active]:bg-[#29ABE2]"
                                    >
                                        Developers
                                    </TabsTrigger>
                                </TabsList>

                                <div className="flex items-center space-x-3">
                                    <Select defaultValue={timeFrame} onValueChange={setTimeFrame}>
                                        <SelectTrigger className="w-40 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                                            <SelectValue placeholder="Time Period" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all-time">All Time</SelectItem>
                                            <SelectItem value="this-month">This Month</SelectItem>
                                            <SelectItem value="this-week">This Week</SelectItem>
                                            <SelectItem value="today">Today</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                                        <Input
                                            placeholder="Search ICP users..."
                                            className="pl-10 w-full sm:w-48 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <TabsContent value="global" className="mt-0">
                                <Card className="border-gray-200 dark:border-gray-700 shadow-md bg-white dark:bg-gray-800">
                                    <CardContent className="p-0">
                                        <div className="p-6 pt-4 pb-0">
                                            <ICPTopLeaders data={icpLeaderboardData.slice(0, 3)} />
                                        </div>

                                        <ICPLeaderboardTable
                                            data={filteredData}
                                            sortField={sortField}
                                            sortDirection={sortDirection}
                                            onSort={handleSort}
                                            currentUser="Alex I."
                                        />
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="neurons" className="mt-0">
                                <Card className="border-gray-200 dark:border-gray-700 shadow-md bg-white dark:bg-gray-800">
                                    <CardContent className="p-6">
                                        <div className="text-center py-8">
                                            <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-[#3B00B9]/10 to-[#29ABE2]/10 dark:from-[#3B00B9]/20 dark:to-[#29ABE2]/20 flex items-center justify-center mb-4">
                                                <Coins className="h-8 w-8 text-[#3B00B9] dark:text-[#29ABE2]" />
                                            </div>
                                            <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Neuron Leaderboard</h3>
                                            <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
                                                Track top ICP stakers and their neuron rewards. Create more neurons and participate in governance to climb this leaderboard.
                                            </p>

                                            <Button
                                                className="mt-4 bg-gradient-to-r from-[#3B00B9] to-[#29ABE2] hover:from-[#2E0092] hover:to-[#1E8FBF] text-white"
                                            >
                                                <Coins className="h-4 w-4 mr-2" />
                                                Create Neuron
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="learning" className="mt-0">
                                <Card className="border-gray-200 dark:border-gray-700 shadow-md bg-white dark:bg-gray-800">
                                    <CardContent className="p-6">
                                        <div className="text-center py-8">
                                            <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-[#3B00B9]/10 to-[#29ABE2]/10 dark:from-[#3B00B9]/20 dark:to-[#29ABE2]/20 flex items-center justify-center mb-4">
                                                <GraduationCap className="h-8 w-8 text-[#3B00B9] dark:text-[#29ABE2]" />
                                            </div>
                                            <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">ICP Learning Leaderboard</h3>
                                            <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
                                                See who's mastering the Internet Computer Protocol. Complete courses about canisters, governance, and development to climb this leaderboard.
                                            </p>

                                            <Button
                                                className="mt-4 bg-gradient-to-r from-[#3B00B9] to-[#29ABE2] hover:from-[#2E0092] hover:to-[#1E8FBF] text-white"
                                            >
                                                <Brain className="h-4 w-4 mr-2" />
                                                Explore ICP Courses
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="developers" className="mt-0">
                                <Card className="border-gray-200 dark:border-gray-700 shadow-md bg-white dark:bg-gray-800">
                                    <CardContent className="p-6">
                                        <div className="text-center py-8">
                                            <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-[#3B00B9]/10 to-[#29ABE2]/10 dark:from-[#3B00B9]/20 dark:to-[#29ABE2]/20 flex items-center justify-center mb-4">
                                                <Code className="h-8 w-8 text-[#3B00B9] dark:text-[#29ABE2]" />
                                            </div>
                                            <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">ICP Developer Leaderboard</h3>
                                            <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
                                                Top canister developers building on the Internet Computer. Deploy canisters, contribute to the ecosystem, and help grow the network.
                                            </p>

                                            <Button
                                                className="mt-4 bg-gradient-to-r from-[#3B00B9] to-[#29ABE2] hover:from-[#2E0092] hover:to-[#1E8FBF] text-white"
                                            >
                                                <Cpu className="h-4 w-4 mr-2" />
                                                Start Building
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* ICP Achievements */}
                    <div className="mt-8">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your ICP Achievements</h2>
                            <Button variant="ghost" className="text-[#3B00B9] dark:text-[#29ABE2]">
                                View All
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <ICPAchievementCard
                                title="Canister Master"
                                description="Deploy 5 canisters to the Internet Computer mainnet"
                                icon={<Cpu className="h-5 w-5 text-[#3B00B9] dark:text-[#29ABE2]" />}
                                progress={40}
                                category="canister"
                            />

                            <ICPAchievementCard
                                title="Neuron Governor"
                                description="Participate in 100 Network Nervous System votes"
                                icon={<Vote className="h-5 w-5 text-[#ED1E79] dark:text-[#F15A24]" />}
                                progress={65}
                                category="governance"
                            />

                            <ICPAchievementCard
                                title="ICP Educator"
                                description="Complete all Internet Computer learning paths"
                                icon={<BookOpen className="h-5 w-5 text-[#50C878]" />}
                                progress={75}
                                category="learning"
                            />

                            <ICPAchievementCard
                                title="Community Builder"
                                description="Help onboard 25 new users to the Internet Computer"
                                icon={<Users className="h-5 w-5 text-[#F15A24]" />}
                                progress={32}
                                category="community"
                            />

                            <ICPAchievementCard
                                title="Chain Fusion Pioneer"
                                description="Build applications using Bitcoin integration on ICP"
                                icon={<Zap className="h-5 w-5 text-[#ED1E79] dark:text-[#F15A24]" />}
                                progress={15}
                                category="canister"
                            />

                            <ICPAchievementCard
                                title="Motoko Specialist"
                                description="Master the Motoko programming language for ICP"
                                icon={<Code className="h-5 w-5 text-[#3B00B9] dark:text-[#29ABE2]" />}
                                progress={80}
                                category="canister"
                            />
                        </div>
                    </div>

                    {/* ICP Network Stats */}
                    <div className="mt-8 bg-gradient-to-r from-[#3B00B9]/5 to-[#29ABE2]/5 dark:from-[#3B00B9]/10 dark:to-[#29ABE2]/10 rounded-lg p-6 border border-[#29ABE2]/10 dark:border-[#29ABE2]/20">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                            <Cpu className="h-5 w-5 mr-2 text-[#29ABE2]" />
                            Internet Computer Network Stats
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-[#3B00B9] dark:text-[#29ABE2]">2,850</p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">Active Learners</p>
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
                                <p className="text-2xl font-bold text-[#50C878]">42</p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">Active Subnets</p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}