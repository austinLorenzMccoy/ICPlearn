"use client";

import { useState, useEffect } from "react";
import { useICPBackend, useCurrentUser } from "@/hooks/useICPBackend";
import {
    Coins,
    GraduationCap,
    Clock,
    TrendingUp,
    BookOpen,
    Download,
    Search,
    ChevronDown,
    Cpu,
    Zap,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart,
    Legend
} from 'recharts';
import ICPSidebar from "@/components/Layout/Sidebar";
import { WelcomeBanner } from "@/components/Dashboard/WelcomeBanner";
import { StatsCard } from "@/components/Dashboard/StatsCard";
import { CustomTooltip } from "@/components/Dashboard/CustomTooltip";
import { TransactionItem } from "@/components/Dashboard/TransactionItem";
import { ActivityItem } from "@/components/Dashboard/ActivityItem";
import { LearningProgressCard } from "@/components/Dashboard/LearningProgressCard";



// ICP-themed sample chart data
const weeklyData = [
    { name: 'Mon', rewards: 3.2, baseRewards: 2.1, educationalBonus: 1.1 },
    { name: 'Tue', rewards: 2.8, baseRewards: 1.9, educationalBonus: 0.9 },
    { name: 'Wed', rewards: 3.5, baseRewards: 2.2, educationalBonus: 1.3 },
    { name: 'Thu', rewards: 4.2, baseRewards: 2.5, educationalBonus: 1.7 },
    { name: 'Fri', rewards: 3.8, baseRewards: 2.3, educationalBonus: 1.5 },
    { name: 'Sat', rewards: 4.5, baseRewards: 2.6, educationalBonus: 1.9 },
    { name: 'Sun', rewards: 5.1, baseRewards: 2.9, educationalBonus: 2.2 },
];

const monthlyData = [
    { name: 'Week 1', rewards: 22.5, baseRewards: 14.2, educationalBonus: 8.3 },
    { name: 'Week 2', rewards: 25.8, baseRewards: 16.1, educationalBonus: 9.7 },
    { name: 'Week 3', rewards: 28.3, baseRewards: 17.5, educationalBonus: 10.8 },
    { name: 'Week 4', rewards: 30.1, baseRewards: 18.2, educationalBonus: 11.9 },
];

const quarterlyData = [
    { name: 'Jan', rewards: 85.5, baseRewards: 52.4, educationalBonus: 33.1 },
    { name: 'Feb', rewards: 92.3, baseRewards: 56.8, educationalBonus: 35.5 },
    { name: 'Mar', rewards: 105.7, baseRewards: 64.2, educationalBonus: 41.5 },
    { name: 'Apr', rewards: 112.4, baseRewards: 67.5, educationalBonus: 44.9 },
    { name: 'May', rewards: 121.8, baseRewards: 72.9, educationalBonus: 48.9 },
    { name: 'Jun', rewards: 130.2, baseRewards: 77.5, educationalBonus: 52.7 },
];

const transactions = [
    {
        id: "tx-1",
        type: "Stake ICP",
        amount: "500 ICP",
        status: "Completed",
        date: "Mar 28, 2025",
        pool: "Canister Masters",
        isPositive: false,
        transactionType: "stake" as const
    },
    {
        id: "tx-2",
        type: "Neuron Reward",
        amount: "12.5 ICP",
        status: "Received",
        date: "Mar 27, 2025",
        pool: "Canister Masters",
        isPositive: true,
        transactionType: "reward" as const
    },
    {
        id: "tx-3",
        type: "Learning Multiplier",
        amount: "+0.2x",
        status: "Applied",
        date: "Mar 26, 2025",
        pool: "All Neurons",
        isPositive: true,
        transactionType: "multiplier" as const
    },
    {
        id: "tx-4",
        type: "Staking Reward",
        amount: "8.3 ICP",
        status: "Received",
        date: "Mar 20, 2025",
        pool: "ICP Developers",
        isPositive: true,
        transactionType: "reward" as const
    },
    {
        id: "tx-5",
        type: "Unstake ICP",
        amount: "200 ICP",
        status: "Completed",
        date: "Mar 15, 2025",
        pool: "ICP Developers",
        isPositive: false,
        transactionType: "unstake" as const
    },
];

export default function ICPDashboard() {
    const [chartTimeframe, setChartTimeframe] = useState("weekly");
    const { 
        isAuthenticated, 
        login, 
        getUserCount, 
        listCourses, 
        listUsers,
        isLoading,
        error 
    } = useICPBackend();
    const { user: currentUser, loading: userLoading } = useCurrentUser();
    
    const [dashboardData, setDashboardData] = useState({
        totalUsers: 0,
        totalCourses: 0,
        userProgress: [],
        recentActivity: []
    });

    // Load dashboard data
    useEffect(() => {
        const loadDashboardData = async () => {
            if (isAuthenticated) {
                try {
                    const [userCount, coursesResult] = await Promise.all([
                        getUserCount(),
                        listCourses(1, 10)
                    ]);
                    
                    setDashboardData({
                        totalUsers: userCount || 0,
                        totalCourses: coursesResult?.total || 0,
                        userProgress: [], // Will be populated with real course progress
                        recentActivity: [] // Will be populated with real activity
                    });
                } catch (error) {
                    console.error('Failed to load dashboard data:', error);
                }
            }
        };

        loadDashboardData();
    }, [isAuthenticated, getUserCount, listCourses]);

    // Get data based on selected timeframe
    const getChartData = () => {
        switch (chartTimeframe) {
            case "weekly":
                return weeklyData;
            case "monthly":
                return monthlyData;
            case "quarterly":
                return quarterlyData;
            default:
                return weeklyData;
        }
    };

    const handleStakeMore = () => {
        // Navigate to staking page
        console.log("Navigate to staking page");
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <div className="flex">
                <ICPSidebar />
                <main className="flex-1 pt-20 px-6 max-w-6xl mx-auto pb-12">
                    {/* Welcome Banner */}
                    <WelcomeBanner 
                        userName="Alex"
                        currentMultiplier="1.5x"
                        stakedICP="2,500"
                        nextReward="14"
                        onStakeMore={handleStakeMore}
                    />

                    {/* Statistics Grid - Real Backend Data */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <StatsCard
                            title="Total Users"
                            value={dashboardData.totalUsers.toLocaleString()}
                            description="Registered learners"
                            icon={<Coins className="h-4 w-4 text-[#3B00B9] dark:text-[#29ABE2]" />}
                            trend="up"
                            trendValue="+15%"
                        />
                        <StatsCard
                            title="Available Courses"
                            value={dashboardData.totalCourses.toString()}
                            description="Learning opportunities"
                            icon={<TrendingUp className="h-4 w-4 text-[#3B00B9] dark:text-[#29ABE2]" />}
                            trend="up"
                            trendValue="+8.2%"
                        />
                        <StatsCard
                            title="Your Progress"
                            value={currentUser ? `${Number(currentUser.level || 1)}` : "0"}
                            description="Current level"
                            icon={<GraduationCap className="h-4 w-4 text-[#3B00B9] dark:text-[#29ABE2]" />}
                            trend="up"
                            trendValue="+12%"
                        />
                        <StatsCard
                            title="Total Points"
                            value={currentUser ? Number(currentUser.total_points || 0).toLocaleString() : "0"}
                            description="Learning achievements"
                            icon={<Clock className="h-4 w-4 text-[#3B00B9] dark:text-[#29ABE2]" />}
                            trend="up"
                            trendValue="Growing"
                        />
                    </div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column - Earnings Chart and Transaction History */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Earnings Chart */}
                            <Card className="border-none shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                <CardHeader>
                                    <CardTitle className="text-gray-900 dark:text-white">ICP Earnings Overview</CardTitle>
                                    <CardDescription className="text-gray-500 dark:text-gray-400">Your staking rewards over time</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Tabs defaultValue="weekly" onValueChange={setChartTimeframe}>
                                        <div className="flex justify-between items-center">
                                            <TabsList className="mb-4">
                                                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                                                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                                                <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
                                            </TabsList>
                                        </div>

                                        {["weekly", "monthly", "quarterly"].map((timeframe) => (
                                            <TabsContent key={timeframe} value={timeframe} className="h-64 w-full">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <AreaChart data={getChartData()} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                                                        <defs>
                                                            <linearGradient id="baseRewardsGradient" x1="0" y1="0" x2="0" y2="1">
                                                                <stop offset="5%" stopColor="#3B00B9" stopOpacity={0.8} />
                                                                <stop offset="95%" stopColor="#3B00B9" stopOpacity={0.1} />
                                                            </linearGradient>
                                                            <linearGradient id="educationalBonusGradient" x1="0" y1="0" x2="0" y2="1">
                                                                <stop offset="5%" stopColor="#29ABE2" stopOpacity={0.8} />
                                                                <stop offset="95%" stopColor="#29ABE2" stopOpacity={0.1} />
                                                            </linearGradient>
                                                        </defs>
                                                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" className="dark:stroke-gray-600" />
                                                        <XAxis dataKey="name" tick={{ fontSize: 12 }} className="text-gray-600 dark:text-gray-300" />
                                                        <YAxis
                                                            tick={{ fontSize: 12 }}
                                                            tickFormatter={(value) => `${value} ICP`}
                                                            className="text-gray-600 dark:text-gray-300"
                                                        />
                                                        <Tooltip content={<CustomTooltip />} />
                                                        <Legend />
                                                        <Area
                                                            type="monotone"
                                                            dataKey="baseRewards"
                                                            stackId="1"
                                                            stroke="#3B00B9"
                                                            fill="url(#baseRewardsGradient)"
                                                            name="Base Rewards"
                                                        />
                                                        <Area
                                                            type="monotone"
                                                            dataKey="educationalBonus"
                                                            stackId="1"
                                                            stroke="#29ABE2"
                                                            fill="url(#educationalBonusGradient)"
                                                            name="Educational Bonus"
                                                        />
                                                        <Line
                                                            type="monotone"
                                                            dataKey="rewards"
                                                            stroke="#ED1E79"
                                                            strokeWidth={2}
                                                            dot={{ r: 4 }}
                                                            activeDot={{ r: 6 }}
                                                            name="Total Rewards"
                                                        />
                                                    </AreaChart>
                                                </ResponsiveContainer>
                                            </TabsContent>
                                        ))}
                                    </Tabs>
                                </CardContent>
                            </Card>

                            {/* Transaction History */}
                            <Card className="border-none shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                <CardHeader className="pb-2">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                        <div>
                                            <CardTitle className="text-gray-900 dark:text-white">Transaction History</CardTitle>
                                            <CardDescription className="text-gray-500 dark:text-gray-400">Recent staking and reward transactions</CardDescription>
                                        </div>
                                        <div className="mt-2 sm:mt-0">
                                            <Button variant="outline" size="sm" className="text-xs h-8 flex items-center gap-1 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300">
                                                <Download className="h-3 w-3" />
                                                Export
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                                        <div className="relative w-full sm:w-64 mb-2 sm:mb-0">
                                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                                            <Input 
                                                placeholder="Search transactions..." 
                                                className="pl-9 h-8 text-sm bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white" 
                                            />
                                        </div>
                                        <div className="flex space-x-2 w-full sm:w-auto">
                                            <Select defaultValue="all">
                                                <SelectTrigger className="h-8 text-xs w-full sm:w-32 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                                                    <SelectValue placeholder="Type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">All Types</SelectItem>
                                                    <SelectItem value="stake">Stake</SelectItem>
                                                    <SelectItem value="reward">Reward</SelectItem>
                                                    <SelectItem value="unstake">Unstake</SelectItem>
                                                    <SelectItem value="multiplier">Multiplier</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <Select defaultValue="all">
                                                <SelectTrigger className="h-8 text-xs w-full sm:w-32 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                                                    <SelectValue placeholder="Status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">All Status</SelectItem>
                                                    <SelectItem value="completed">Completed</SelectItem>
                                                    <SelectItem value="pending">Pending</SelectItem>
                                                    <SelectItem value="received">Received</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="space-y-1 mt-2">
                                        {transactions.map((tx) => (
                                            <TransactionItem
                                                key={tx.id}
                                                type={tx.type}
                                                amount={tx.amount}
                                                status={tx.status}
                                                date={tx.date}
                                                pool={tx.pool}
                                                isPositive={tx.isPositive}
                                                transactionType={tx.transactionType}
                                            />
                                        ))}
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-center border-t border-gray-200 dark:border-gray-700 pt-4">
                                    <Button variant="outline" className="text-xs border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300">
                                        View All Transactions
                                        <ChevronDown className="h-3 w-3 ml-1" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>

                        {/* Right Column - Activity Feed & Learning Progress */}
                        <div className="space-y-6">
                            {/* Activity Feed */}
                            <Card className="border-none shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                <CardHeader>
                                    <CardTitle className="text-gray-900 dark:text-white">Recent Activity</CardTitle>
                                    <CardDescription className="text-gray-500 dark:text-gray-400">Your latest ICP platform interactions</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <ActivityItem
                                            title="Staked 500 ICP in Canister Masters Pool"
                                            timestamp="Today, 10:45 AM"
                                            icon={<Coins className="h-4 w-4" />}
                                            type="stake"
                                        />
                                        <ActivityItem
                                            title="Completed 'Canister Development Basics' Course"
                                            timestamp="Yesterday, 3:20 PM"
                                            icon={<BookOpen className="h-4 w-4" />}
                                            type="learn"
                                        />
                                        <ActivityItem
                                            title="Received 12.5 ICP Neuron Reward"
                                            timestamp="Yesterday, 12:00 PM"
                                            icon={<Coins className="h-4 w-4" />}
                                            type="reward"
                                        />
                                        <ActivityItem
                                            title="Deployed First Canister on IC Mainnet"
                                            timestamp="Mar 25, 2025, 5:15 PM"
                                            icon={<Cpu className="h-4 w-4" />}
                                            type="canister"
                                        />
                                        <ActivityItem
                                            title="Created Neuron with 8-year Dissolve Delay"
                                            timestamp="Mar 24, 2025, 2:30 PM"
                                            icon={<Zap className="h-4 w-4" />}
                                            type="neuron"
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Learning Progress */}
                            <Card className="border-none shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                <CardHeader>
                                    <CardTitle className="text-gray-900 dark:text-white">ICP Learning Progress</CardTitle>
                                    <CardDescription className="text-gray-500 dark:text-gray-400">Your active Internet Computer courses</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <LearningProgressCard
                                        title="Canister Development Fundamentals"
                                        progress={75}
                                        totalModules={8}
                                        completedModules={6}
                                        category="intermediate"
                                    />
                                    <LearningProgressCard
                                        title="Chain Fusion & Bitcoin Integration"
                                        progress={30}
                                        totalModules={10}
                                        completedModules={3}
                                        category="advanced"
                                    />
                                    <LearningProgressCard
                                        title="ICP Network Governance & Neurons"
                                        progress={15}
                                        totalModules={12}
                                        completedModules={2}
                                        category="beginner"
                                    />
                                </CardContent>
                            </Card>

                            {/* ICP Network Stats */}
                            <Card className="border-none shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                <CardHeader>
                                    <CardTitle className="text-gray-900 dark:text-white flex items-center">
                                        <Cpu className="h-5 w-5 mr-2 text-[#29ABE2]" />
                                        Network Stats
                                    </CardTitle>
                                    <CardDescription className="text-gray-500 dark:text-gray-400">Live Internet Computer metrics</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600 dark:text-gray-300">Active Subnets</span>
                                        <span className="font-medium text-gray-900 dark:text-white">42</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600 dark:text-gray-300">Total Canisters</span>
                                        <span className="font-medium text-gray-900 dark:text-white">125,432</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600 dark:text-gray-300">Network Status</span>
                                        <div className="flex items-center">
                                            <div className="h-2 w-2 rounded-full bg-[#50C878] mr-2 animate-pulse" />
                                            <span className="font-medium text-[#50C878] text-sm">Operational</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
