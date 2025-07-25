"use client";

import { useState } from "react";
import {
    Zap,
    Clock,
    Vote,
    TrendingUp,
    Settings,
    Eye,
    EyeOff,
    Play,
    Pause,
    MoreHorizontal,
    Plus,
    AlertCircle,
    Coins,
    BarChart,
    Award,
    Lock,
    Unlock
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import ICPSidebar from "@/components/Layout/Sidebar";

// Neuron data interface
interface Neuron {
    id: string;
    stake: number;
    dissolveDelay: number;
    age: number;
    state: "locked" | "dissolving" | "dissolved";
    votingPower: number;
    maturity: number;
    rewards: number;
    followees: number;
    votingActivity: number;
    createdDate: string;
    dissolveDate?: string;
}

// Sample neuron data
const neurons: Neuron[] = [
    {
        id: "12345-abcde-67890",
        stake: 1000,
        dissolveDelay: 2920, // days (8 years)
        age: 365, // days
        state: "locked",
        votingPower: 15.2,
        maturity: 45.8,
        rewards: 127.3,
        followees: 12,
        votingActivity: 85,
        createdDate: "2024-03-15",
        dissolveDate: undefined
    },
    {
        id: "54321-fghij-09876",
        stake: 500,
        dissolveDelay: 730, // days (2 years)
        age: 180,
        state: "locked",
        votingPower: 6.1,
        maturity: 12.4,
        rewards: 38.9,
        followees: 8,
        votingActivity: 92,
        createdDate: "2024-09-20",
        dissolveDate: undefined
    },
    {
        id: "98765-klmno-13579",
        stake: 250,
        dissolveDelay: 45, // dissolving
        age: 90,
        state: "dissolving",
        votingPower: 1.2,
        maturity: 5.7,
        rewards: 15.2,
        followees: 5,
        votingActivity: 67,
        createdDate: "2024-12-01",
        dissolveDate: "2025-02-15"
    }
];

// Neuron Card Component
const NeuronCard = ({ neuron }: { neuron: Neuron }) => {
    const [showDetails, setShowDetails] = useState(false);
    
    const getStateColor = () => {
        switch (neuron.state) {
            case "locked":
                return "bg-[#50C878]/10 text-[#50C878] dark:bg-[#50C878]/20";
            case "dissolving":
                return "bg-[#F15A24]/10 text-[#F15A24] dark:bg-[#F15A24]/20";
            case "dissolved":
                return "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300";
            default:
                return "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300";
        }
    };

    const getStateIcon = () => {
        switch (neuron.state) {
            case "locked":
                return <Lock className="h-4 w-4" />;
            case "dissolving":
                return <Clock className="h-4 w-4" />;
            case "dissolved":
                return <Unlock className="h-4 w-4" />;
            default:
                return <Lock className="h-4 w-4" />;
        }
    };

    const formatDays = (days: number) => {
        const years = Math.floor(days / 365);
        const remainingDays = days % 365;
        const months = Math.floor(remainingDays / 30);
        
        if (years > 0) {
            return `${years}y ${months}m`;
        } else if (months > 0) {
            return `${months}m ${remainingDays % 30}d`;
        } else {
            return `${days}d`;
        }
    };

    return (
        <Card className="border border-gray-200 dark:border-gray-700 hover:border-[#3B00B9]/50 dark:hover:border-[#29ABE2]/50 transition-all duration-300 hover:shadow-lg bg-white dark:bg-gray-800">
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                    <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#3B00B9]/10 to-[#29ABE2]/10 dark:from-[#3B00B9]/20 dark:to-[#29ABE2]/20 flex items-center justify-center mr-3">
                            <Zap className="h-5 w-5 text-[#3B00B9] dark:text-[#29ABE2]" />
                        </div>
                        <div>
                            <CardTitle className="text-lg text-gray-900 dark:text-white">
                                Neuron #{neuron.id.slice(-6)}
                            </CardTitle>
                            <CardDescription className="text-gray-600 dark:text-gray-300">
                                Created {new Date(neuron.createdDate).toLocaleDateString()}
                            </CardDescription>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Badge variant="outline" className={getStateColor()}>
                            {getStateIcon()}
                            {neuron.state.charAt(0).toUpperCase() + neuron.state.slice(1)}
                        </Badge>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                                <DropdownMenuItem className="text-gray-700 dark:text-gray-300">
                                    <Settings className="mr-2 h-4 w-4" />
                                    Configure Following
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-gray-700 dark:text-gray-300">
                                    <Vote className="mr-2 h-4 w-4" />
                                    Voting History
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-600" />
                                <DropdownMenuItem className="text-[#ED1E79] dark:text-[#F15A24]">
                                    {neuron.state === "locked" ? (
                                        <>
                                            <Play className="mr-2 h-4 w-4" />
                                            Start Dissolving
                                        </>
                                    ) : (
                                        <>
                                            <Pause className="mr-2 h-4 w-4" />
                                            Stop Dissolving
                                        </>
                                    )}
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="space-y-1">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Staked ICP</p>
                        <p className="font-bold text-lg text-gray-900 dark:text-white">{neuron.stake.toLocaleString()}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Voting Power</p>
                        <p className="font-bold text-lg text-[#3B00B9] dark:text-[#29ABE2]">{neuron.votingPower}%</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Dissolve Delay</p>
                        <p className="font-medium text-gray-900 dark:text-white">{formatDays(neuron.dissolveDelay)}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Age Bonus</p>
                        <p className="font-medium text-gray-900 dark:text-white">{formatDays(neuron.age)}</p>
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Maturity</span>
                        <span className="font-medium text-[#50C878]">{neuron.maturity.toFixed(2)} ICP</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Total Rewards</span>
                        <span className="font-medium text-[#50C878]">{neuron.rewards.toFixed(2)} ICP</span>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-300">Voting Activity</span>
                            <span className="font-medium text-gray-900 dark:text-white">{neuron.votingActivity}%</span>
                        </div>
                        <Progress value={neuron.votingActivity} className="h-2" />
                    </div>
                </div>

                {neuron.state === "dissolving" && neuron.dissolveDate && (
                    <div className="mt-4 p-3 bg-[#F15A24]/5 dark:bg-[#F15A24]/10 rounded-md border border-[#F15A24]/20">
                        <div className="flex items-center">
                            <Clock className="h-4 w-4 text-[#F15A24] mr-2" />
                            <p className="text-sm font-medium text-[#F15A24]">
                                Dissolving until {new Date(neuron.dissolveDate).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                )}

                <div className="flex space-x-2 mt-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowDetails(!showDetails)}
                        className="flex-1 border-gray-200 dark:border-gray-600"
                    >
                        {showDetails ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
                        {showDetails ? "Hide" : "View"} Details
                    </Button>
                    <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-[#3B00B9] to-[#29ABE2] hover:from-[#2E0092] hover:to-[#1E8FBF] text-white"
                    >
                        <Coins className="h-4 w-4 mr-1" />
                        Spawn Maturity
                    </Button>
                </div>

                {showDetails && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-300">Following Count:</span>
                            <span className="text-gray-900 dark:text-white">{neuron.followees} neurons</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-300">Full Neuron ID:</span>
                            <span className="text-gray-900 dark:text-white font-mono text-xs">{neuron.id}</span>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

// Create Neuron Dialog Component
const CreateNeuronDialog = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [stakeAmount, setStakeAmount] = useState(10);
    const [dissolveDelay, setDissolveDelay] = useState(365);

    const maxBalance = 5000;

    const formatDissolveDelay = (days: number) => {
        const years = Math.floor(days / 365);
        const months = Math.floor((days % 365) / 30);
        return years > 0 ? `${years} year${years > 1 ? 's' : ''} ${months} month${months !== 1 ? 's' : ''}` : `${months} month${months !== 1 ? 's' : ''}`;
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <DialogHeader>
                    <DialogTitle className="text-gray-900 dark:text-white">Create New Neuron</DialogTitle>
                    <DialogDescription className="text-gray-600 dark:text-gray-300">
                        Set up a new neuron to participate in Internet Computer governance.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    <div>
                        <label className="text-sm font-medium text-gray-900 dark:text-white mb-2 block">
                            Stake Amount
                        </label>
                        <div className="relative">
                            <Input
                                type="number"
                                value={stakeAmount}
                                onChange={(e) => setStakeAmount(Number(e.target.value))}
                                className="pr-16 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                                min={1}
                                max={maxBalance}
                            />
                            <Button
                                variant="ghost"
                                size="sm"
                                className="absolute right-1 top-1 h-8 text-[#3B00B9] dark:text-[#29ABE2]"
                                onClick={() => setStakeAmount(maxBalance)}
                            >
                                MAX
                            </Button>
                        </div>
                        <Slider
                            value={[stakeAmount]}
                            max={maxBalance}
                            step={1}
                            onValueChange={(value) => setStakeAmount(value[0])}
                            className="mt-2"
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Balance: {maxBalance.toLocaleString()} ICP
                        </p>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-900 dark:text-white mb-2 block">
                            Dissolve Delay: {formatDissolveDelay(dissolveDelay)}
                        </label>
                        <Slider
                            value={[dissolveDelay]}
                            max={2920} // 8 years
                            min={180} // 6 months
                            step={30}
                            onValueChange={(value) => setDissolveDelay(value[0])}
                            className="mt-2"
                        />
                        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                            <span>6 months</span>
                            <span>8 years</span>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-[#3B00B9]/5 to-[#29ABE2]/5 dark:from-[#3B00B9]/10 dark:to-[#29ABE2]/10 rounded-md p-4 border border-[#29ABE2]/10 dark:border-[#29ABE2]/20">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Neuron Summary</h4>
                        <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-300">Voting Power:</span>
                                <span className="font-medium text-[#3B00B9] dark:text-[#29ABE2]">
                                    ~{((stakeAmount * dissolveDelay) / 100000).toFixed(2)}%
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-300">Est. Annual Rewards:</span>
                                <span className="font-medium text-[#50C878]">
                                    ~{(stakeAmount * 0.1 * (dissolveDelay / 365)).toFixed(2)} ICP
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose} className="border-gray-200 dark:border-gray-600">
                        Cancel
                    </Button>
                    <Button className="bg-gradient-to-r from-[#3B00B9] to-[#29ABE2] hover:from-[#2E0092] hover:to-[#1E8FBF] text-white">
                        Create Neuron
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

// Main Neurons Page Component
export default function ICPNeuronsPage() {
    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");

    // Calculate totals
    const totalStaked = neurons.reduce((sum, neuron) => sum + neuron.stake, 0);
    const totalMaturity = neurons.reduce((sum, neuron) => sum + neuron.maturity, 0);
    const totalRewards = neurons.reduce((sum, neuron) => sum + neuron.rewards, 0);
    const averageVotingActivity = neurons.reduce((sum, neuron) => sum + neuron.votingActivity, 0) / neurons.length;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <div className="flex">
                <ICPSidebar />
                <main className="flex-1 pt-20 px-6 max-w-6xl mx-auto pb-12">
                    {/* Page Header */}
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Neurons</h1>
                            <p className="text-gray-600 dark:text-gray-300 mt-1">
                                Manage your ICP neurons and participate in network governance
                            </p>
                        </div>
                        <Button
                            onClick={() => setShowCreateDialog(true)}
                            className="bg-gradient-to-r from-[#3B00B9] to-[#29ABE2] hover:from-[#2E0092] hover:to-[#1E8FBF] text-white"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Create Neuron
                        </Button>
                    </div>

                    {/* Overview Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Total Staked</p>
                                        <p className="text-xl font-bold text-gray-900 dark:text-white">{totalStaked.toLocaleString()} ICP</p>
                                    </div>
                                    <Coins className="h-8 w-8 text-[#3B00B9] dark:text-[#29ABE2]" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Total Maturity</p>
                                        <p className="text-xl font-bold text-[#50C878]">{totalMaturity.toFixed(2)} ICP</p>
                                    </div>
                                    <TrendingUp className="h-8 w-8 text-[#50C878]" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Total Rewards</p>
                                        <p className="text-xl font-bold text-[#50C878]">{totalRewards.toFixed(2)} ICP</p>
                                    </div>
                                    <Award className="h-8 w-8 text-[#50C878]" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Avg. Voting</p>
                                        <p className="text-xl font-bold text-[#ED1E79] dark:text-[#F15A24]">{averageVotingActivity.toFixed(1)}%</p>
                                    </div>
                                    <Vote className="h-8 w-8 text-[#ED1E79] dark:text-[#F15A24]" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Tabs */}
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
                        <TabsList className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                            <TabsTrigger value="overview" className="data-[state=active]:bg-[#3B00B9] data-[state=active]:text-white dark:data-[state=active]:bg-[#29ABE2]">
                                Overview
                            </TabsTrigger>
                            <TabsTrigger value="voting" className="data-[state=active]:bg-[#3B00B9] data-[state=active]:text-white dark:data-[state=active]:bg-[#29ABE2]">
                                Voting History
                            </TabsTrigger>
                            <TabsTrigger value="rewards" className="data-[state=active]:bg-[#3B00B9] data-[state=active]:text-white dark:data-[state=active]:bg-[#29ABE2]">
                                Rewards
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="mt-6">
                            {/* Neurons Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                {neurons.map((neuron) => (
                                    <NeuronCard key={neuron.id} neuron={neuron} />
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="voting" className="mt-6">
                            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                                <CardHeader>
                                    <CardTitle className="text-gray-900 dark:text-white">Voting Activity</CardTitle>
                                    <CardDescription className="text-gray-600 dark:text-gray-300">
                                        Your participation in Network Nervous System governance
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-center py-8">
                                        <Vote className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                                        <p className="text-gray-600 dark:text-gray-300">Voting history coming soon</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="rewards" className="mt-6">
                            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                                <CardHeader>
                                    <CardTitle className="text-gray-900 dark:text-white">Rewards History</CardTitle>
                                    <CardDescription className="text-gray-600 dark:text-gray-300">
                                        Track your neuron rewards and maturity over time
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-center py-8">
                                        <BarChart className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                                        <p className="text-gray-600 dark:text-gray-300">Rewards analytics coming soon</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>

                    {/* Network Info */}
                    <div className="mt-8 bg-gradient-to-r from-[#3B00B9]/5 to-[#29ABE2]/5 dark:from-[#3B00B9]/10 dark:to-[#29ABE2]/10 rounded-lg p-6 border border-[#29ABE2]/10 dark:border-[#29ABE2]/20">
                        <div className="flex items-center mb-4">
                            <AlertCircle className="h-5 w-5 text-[#29ABE2] mr-2" />
                            <h3 className="font-semibold text-gray-900 dark:text-white">About ICP Neurons</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-300">
                            <div>
                                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Dissolve Delay</h4>
                                <p>Longer dissolve delays provide higher voting power and rewards. Maximum is 8 years.</p>
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Voting Power</h4>
                                <p>Based on your stake amount, dissolve delay, and neuron age. Vote to earn rewards.</p>
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Maturity</h4>
                                <p>Accumulated rewards that can be spawned into new neurons or merged back into existing ones.</p>
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Following</h4>
                                <p>Configure your neurons to follow other neurons on specific topics for automatic voting.</p>
                            </div>
                        </div>
                    </div>

                    {/* Create Neuron Dialog */}
                    <CreateNeuronDialog 
                        isOpen={showCreateDialog} 
                        onClose={() => setShowCreateDialog(false)} 
                    />
                </main>
            </div>
        </div>
    );
}