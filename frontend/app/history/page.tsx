"use client";

import { useState } from "react";
import {
    Calendar,
    ArrowDown,
    ArrowUp,
    Filter,
    Search,
    Eye,
    Download,
    ChevronLeft,
    ChevronRight,
    Coins,
    Vote,
    Zap,
    TrendingUp,
    Brain,
    ExternalLink,
    CalendarIcon
} from "lucide-react";
import Sidebar from "@/components/Layout/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// ICP Transaction component
const ICPTransaction = ({
    type,
    amount,
    date,
    status,
    neuronId,
    blockHeight,
    transactionFee
}: {
    type: "stake" | "dissolve" | "voting_reward" | "maturity" | "merge" | "spawn" | "learning_reward";
    amount: string;
    date: string;
    status: "completed" | "pending" | "failed";
    neuronId?: string;
    blockHeight: string;
    transactionFee?: string;
}) => {
    const getStatusBadge = () => {
        switch (status) {
            case "completed":
                return <Badge className="bg-[#50C878]/10 text-[#50C878] border-none dark:bg-[#50C878]/20 dark:text-[#50C878]">Completed</Badge>;
            case "pending":
                return <Badge className="bg-[#F15A24]/10 text-[#F15A24] border-none dark:bg-[#F15A24]/20 dark:text-[#F15A24]">Pending</Badge>;
            case "failed":
                return <Badge className="bg-[#ED1E79]/10 text-[#ED1E79] border-none dark:bg-[#ED1E79]/20 dark:text-[#ED1E79]">Failed</Badge>;
            default:
                return null;
        }
    };

    const getTypeIcon = () => {
        switch (type) {
            case "stake":
                return <ArrowDown className="h-4 w-4 text-[#3B00B9] dark:text-[#29ABE2]" />;
            case "dissolve":
                return <ArrowUp className="h-4 w-4 text-[#ED1E79] dark:text-[#F15A24]" />;
            case "voting_reward":
                return <Vote className="h-4 w-4 text-[#50C878]" />;
            case "maturity":
                return <TrendingUp className="h-4 w-4 text-[#6A3DE8]" />;
            case "merge":
                return <Coins className="h-4 w-4 text-[#29ABE2]" />;
            case "spawn":
                return <Zap className="h-4 w-4 text-[#F15A24]" />;
            case "learning_reward":
                return <Brain className="h-4 w-4 text-[#3B00B9] dark:text-[#29ABE2]" />;
            default:
                return null;
        }
    };

    const getTypeLabel = () => {
        switch (type) {
            case "stake":
                return "Neuron Creation";
            case "dissolve":
                return "Neuron Dissolution";
            case "voting_reward":
                return "Voting Reward";
            case "maturity":
                return "Maturity";
            case "merge":
                return "Neuron Merge";
            case "spawn":
                return "Neuron Spawn";
            case "learning_reward":
                return "Learning Boost Reward";
            default:
                return "";
        }
    };

    const getTypeColor = () => {
        switch (type) {
            case "stake":
                return "from-[#3B00B9]/10 to-[#29ABE2]/10 dark:from-[#3B00B9]/20 dark:to-[#29ABE2]/20";
            case "dissolve":
                return "from-[#ED1E79]/10 to-[#F15A24]/10 dark:from-[#ED1E79]/20 dark:to-[#F15A24]/20";
            case "voting_reward":
                return "from-[#50C878]/10 to-[#50C878]/10 dark:from-[#50C878]/20 dark:to-[#50C878]/20";
            case "maturity":
                return "from-[#6A3DE8]/10 to-[#6A3DE8]/10 dark:from-[#6A3DE8]/20 dark:to-[#6A3DE8]/20";
            case "merge":
                return "from-[#29ABE2]/10 to-[#29ABE2]/10 dark:from-[#29ABE2]/20 dark:to-[#29ABE2]/20";
            case "spawn":
                return "from-[#F15A24]/10 to-[#F15A24]/10 dark:from-[#F15A24]/20 dark:to-[#F15A24]/20";
            case "learning_reward":
                return "from-[#3B00B9]/10 to-[#ED1E79]/10 dark:from-[#3B00B9]/20 dark:to-[#ED1E79]/20";
            default:
                return "from-gray-100 to-gray-100 dark:from-gray-700 dark:to-gray-700";
        }
    };

    return (
        <div className="flex items-center justify-between py-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            <div className="flex items-center">
                <div className={`h-10 w-10 rounded-full bg-gradient-to-r ${getTypeColor()} flex items-center justify-center mr-4 border border-gray-200/50 dark:border-gray-600/50`}>
                    {getTypeIcon()}
                </div>
                <div>
                    <div className="font-medium text-gray-900 dark:text-white">{getTypeLabel()}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
                        <span>{date}</span>
                        {neuronId && (
                            <>
                                <span>•</span>
                                <span>Neuron: {neuronId}</span>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className="text-right flex-1 mx-4">
                <div className="font-medium text-gray-900 dark:text-white">
                    {type === "learning_reward" ? "+" : ""}{amount} ICP
                    {type === "learning_reward" && (
                        <span className="ml-1 text-xs text-[#3B00B9] dark:text-[#29ABE2]">(Boost)</span>
                    )}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                    Block: {blockHeight}
                    {transactionFee && <span className="ml-2">Fee: {transactionFee} ICP</span>}
                </div>
            </div>
            <div className="flex items-center space-x-2">
                {getStatusBadge()}
                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                    <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                    <ExternalLink className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};

export default function ICPHistoryPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [dateRange, setDateRange] = useState("all-time");
    const [transactionType, setTransactionType] = useState("all");

    // Sample ICP transaction data
    const transactions = [
        {
            type: "stake" as const,
            amount: "2,450",
            date: "Jan 15, 2024 - 10:34 AM",
            status: "completed" as const,
            neuronId: "12849",
            blockHeight: "4,892,156",
            transactionFee: "0.0001"
        },
        {
            type: "voting_reward" as const,
            amount: "12.5",
            date: "Jul 20, 2024 - 12:00 PM",
            status: "completed" as const,
            neuronId: "12849",
            blockHeight: "5,124,789"
        },
        {
            type: "learning_reward" as const,
            amount: "8.2",
            date: "Jul 18, 2024 - 3:45 PM",
            status: "completed" as const,
            neuronId: "12849",
            blockHeight: "5,118,432"
        },
        {
            type: "maturity" as const,
            amount: "45.8",
            date: "Jul 15, 2024 - 9:12 AM",
            status: "completed" as const,
            neuronId: "12849",
            blockHeight: "5,102,156"
        },
        {
            type: "stake" as const,
            amount: "800",
            date: "Jun 10, 2024 - 2:22 PM",
            status: "pending" as const,
            neuronId: "15673",
            blockHeight: "4,987,234",
            transactionFee: "0.0001"
        },
        {
            type: "spawn" as const,
            amount: "156.2",
            date: "May 25, 2024 - 4:18 PM",
            status: "completed" as const,
            neuronId: "14892",
            blockHeight: "4,856,789"
        },
        {
            type: "dissolve" as const,
            amount: "500",
            date: "Apr 12, 2024 - 11:45 AM",
            status: "completed" as const,
            neuronId: "11256",
            blockHeight: "4,723,456",
            transactionFee: "0.0001"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <div className="flex">
                <Sidebar />
                <main className="flex-1 pt-20 px-6 max-w-6xl mx-auto pb-12">
                    {/* Page Header */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">ICP Transaction History</h1>
                        <p className="text-gray-600 dark:text-gray-300 mt-1">View and track all your neuron activity and rewards</p>
                    </div>

                    {/* Summary Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Total Transactions</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">156</p>
                                    </div>
                                    <div className="h-10 w-10 rounded-full bg-[#3B00B9]/10 dark:bg-[#29ABE2]/10 flex items-center justify-center">
                                        <CalendarIcon className="h-5 w-5 text-[#3B00B9] dark:text-[#29ABE2]" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        
                        <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Total Rewards</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">234.8 ICP</p>
                                    </div>
                                    <div className="h-10 w-10 rounded-full bg-[#50C878]/10 flex items-center justify-center">
                                        <TrendingUp className="h-5 w-5 text-[#50C878]" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        
                        <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Learning Rewards</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">48.2 ICP</p>
                                    </div>
                                    <div className="h-10 w-10 rounded-full bg-[#ED1E79]/10 dark:bg-[#F15A24]/10 flex items-center justify-center">
                                        <Brain className="h-5 w-5 text-[#ED1E79] dark:text-[#F15A24]" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Filters */}
                    <Card className="mb-6 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg text-gray-900 dark:text-white">Filters</CardTitle>
                            <CardDescription className="dark:text-gray-300">Refine your transaction history view</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-4">
                                <div className="flex-1 min-w-[200px]">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Search</label>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                                        <Input
                                            placeholder="Search by neuron ID or block height..."
                                            className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="w-[180px]">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Date Range</label>
                                    <Select value={dateRange} onValueChange={setDateRange}>
                                        <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                            <SelectValue placeholder="Select date range" />
                                        </SelectTrigger>
                                        <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                                            <SelectItem value="today">Today</SelectItem>
                                            <SelectItem value="this-week">This Week</SelectItem>
                                            <SelectItem value="this-month">This Month</SelectItem>
                                            <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                                            <SelectItem value="all-time">All Time</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="w-[180px]">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Transaction Type</label>
                                    <Select value={transactionType} onValueChange={setTransactionType}>
                                        <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                                            <SelectItem value="all">All Types</SelectItem>
                                            <SelectItem value="stake">Neuron Creation</SelectItem>
                                            <SelectItem value="dissolve">Dissolve</SelectItem>
                                            <SelectItem value="voting_reward">Voting Rewards</SelectItem>
                                            <SelectItem value="learning_reward">Learning Rewards</SelectItem>
                                            <SelectItem value="maturity">Maturity</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex items-end">
                                    <Button className="bg-gradient-to-r from-[#3B00B9] to-[#29ABE2] hover:from-[#2E0092] hover:to-[#1E8FBF] text-white">
                                        <Filter className="h-4 w-4 mr-2" />
                                        Apply Filters
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Transactions */}
                    <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                        <CardHeader className="pb-3 flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-lg text-gray-900 dark:text-white">Transactions</CardTitle>
                                <CardDescription className="dark:text-gray-300">Recent neuron and reward activity</CardDescription>
                            </div>
                            <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-[#3B00B9] dark:text-[#29ABE2] border-[#3B00B9]/30 dark:border-[#29ABE2]/30 hover:bg-[#3B00B9]/10 dark:hover:bg-[#29ABE2]/10"
                            >
                                <Download className="h-4 w-4 mr-2" />
                                Export CSV
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="all" className="w-full">
                                <TabsList className="mb-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                    <TabsTrigger 
                                        value="all"
                                        className="data-[state=active]:bg-[#3B00B9] data-[state=active]:text-white dark:data-[state=active]:bg-[#29ABE2] dark:text-gray-300"
                                    >
                                        All
                                    </TabsTrigger>
                                    <TabsTrigger 
                                        value="neurons"
                                        className="data-[state=active]:bg-[#3B00B9] data-[state=active]:text-white dark:data-[state=active]:bg-[#29ABE2] dark:text-gray-300"
                                    >
                                        Neurons
                                    </TabsTrigger>
                                    <TabsTrigger 
                                        value="rewards"
                                        className="data-[state=active]:bg-[#3B00B9] data-[state=active]:text-white dark:data-[state=active]:bg-[#29ABE2] dark:text-gray-300"
                                    >
                                        Rewards
                                    </TabsTrigger>
                                    <TabsTrigger 
                                        value="learning"
                                        className="data-[state=active]:bg-[#3B00B9] data-[state=active]:text-white dark:data-[state=active]:bg-[#29ABE2] dark:text-gray-300"
                                    >
                                        Learning
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="all" className="mt-0">
                                    <div className="divide-y divide-gray-100 dark:divide-gray-700">
                                        {transactions.map((transaction, index) => (
                                            <ICPTransaction
                                                key={index}
                                                type={transaction.type}
                                                amount={transaction.amount}
                                                date={transaction.date}
                                                status={transaction.status}
                                                neuronId={transaction.neuronId}
                                                blockHeight={transaction.blockHeight}
                                                transactionFee={transaction.transactionFee}
                                            />
                                        ))}
                                    </div>

                                    {/* Pagination */}
                                    <div className="flex items-center justify-between mt-6">
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            Showing 1-7 of 156 transactions
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Button 
                                                variant="outline" 
                                                size="sm" 
                                                className="h-8 w-8 p-0 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                            >
                                                <ChevronLeft className="h-4 w-4" />
                                            </Button>
                                            <Button 
                                                variant="outline" 
                                                size="sm" 
                                                className="h-8 w-8 p-0 bg-[#3B00B9] dark:bg-[#29ABE2] text-white border-[#3B00B9] dark:border-[#29ABE2]"
                                            >
                                                1
                                            </Button>
                                            <Button 
                                                variant="outline" 
                                                size="sm" 
                                                className="h-8 w-8 p-0 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                            >
                                                2
                                            </Button>
                                            <Button 
                                                variant="outline" 
                                                size="sm" 
                                                className="h-8 w-8 p-0 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                            >
                                                3
                                            </Button>
                                            <Button 
                                                variant="outline" 
                                                size="sm" 
                                                className="h-8 w-8 p-0 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                            >
                                                <ChevronRight className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="neurons" className="mt-0">
                                    <div className="divide-y divide-gray-100 dark:divide-gray-700">
                                        {transactions
                                            .filter(t => t.type === "stake" || t.type === "dissolve" || t.type === "spawn")
                                            .map((transaction, index) => (
                                                <ICPTransaction
                                                    key={index}
                                                    type={transaction.type}
                                                    amount={transaction.amount}
                                                    date={transaction.date}
                                                    status={transaction.status}
                                                    neuronId={transaction.neuronId}
                                                    blockHeight={transaction.blockHeight}
                                                    transactionFee={transaction.transactionFee}
                                                />
                                            ))}
                                    </div>
                                </TabsContent>

                                <TabsContent value="rewards" className="mt-0">
                                    <div className="divide-y divide-gray-100 dark:divide-gray-700">
                                        {transactions
                                            .filter(t => t.type === "voting_reward" || t.type === "maturity")
                                            .map((transaction, index) => (
                                                <ICPTransaction
                                                    key={index}
                                                    type={transaction.type}
                                                    amount={transaction.amount}
                                                    date={transaction.date}
                                                    status={transaction.status}
                                                    neuronId={transaction.neuronId}
                                                    blockHeight={transaction.blockHeight}
                                                    transactionFee={transaction.transactionFee}
                                                />
                                            ))}
                                    </div>
                                </TabsContent>

                                <TabsContent value="learning" className="mt-0">
                                    <div className="divide-y divide-gray-100 dark:divide-gray-700">
                                        {transactions
                                            .filter(t => t.type === "learning_reward")
                                            .map((transaction, index) => (
                                                <ICPTransaction
                                                    key={index}
                                                    type={transaction.type}
                                                    amount={transaction.amount}
                                                    date={transaction.date}
                                                    status={transaction.status}
                                                    neuronId={transaction.neuronId}
                                                    blockHeight={transaction.blockHeight}
                                                    transactionFee={transaction.transactionFee}
                                                />
                                            ))}
                                    </div>
                                    
                                    {/* Learning rewards info card */}
                                    <div className="mt-6 bg-gradient-to-r from-[#3B00B9]/5 to-[#ED1E79]/5 dark:from-[#3B00B9]/10 dark:to-[#ED1E79]/10 rounded-lg p-4 border border-[#3B00B9]/20 dark:border-[#29ABE2]/20">
                                        <div className="flex items-start">
                                            <Brain className="h-5 w-5 text-[#3B00B9] dark:text-[#29ABE2] mt-0.5 mr-2" />
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">Learning Reward System</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                                    Additional ICP rewards earned by completing educational courses. These boost your overall staking returns and improve your understanding of the Internet Computer ecosystem.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </main>
            </div>
        </div>
    );
}