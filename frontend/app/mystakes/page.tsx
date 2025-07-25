
"use client";

import { useState } from "react";
import {
    Wallet,
    Clock,
    TrendingUp,
    BarChart,
    RefreshCw,
    Plus,
    ChevronDown,
    ChevronUp,
    Calculator,
    Calendar,
    GraduationCap,
    Info,
    ArrowRight,
    Coins,
    Cpu,
    Vote,
    Zap
} from "lucide-react";
import Sidebar from "@/components/Layout/Sidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import React from "react";

// ICP Neuron Card Component
const NeuronCard = ({
    neuronName,
    amount,
    baseApr,
    learningBoost,
    effectiveApr,
    dissolveDate,
    progress,
    daysLeft,
    isReadyToUnlock,
    isFollowingNNS,
    dissolveDelay
}: {
    neuronName: string;
    amount: string;
    baseApr: string;
    learningBoost: string;
    effectiveApr: string;
    dissolveDate: string;
    progress: number;
    daysLeft: number;
    isReadyToUnlock: boolean;
    isFollowingNNS: boolean;
    dissolveDelay: string;
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <Card className="border border-gray-200 dark:border-gray-700 hover:border-[#3B00B9]/40 dark:hover:border-[#29ABE2]/40 transition-all duration-300 hover:shadow-md bg-white dark:bg-gray-800">
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-gray-900 dark:text-white">{neuronName}</CardTitle>
                        <CardDescription className="mt-1 text-gray-600 dark:text-gray-300">
                            {isReadyToUnlock ? "Ready to dissolve" : `Dissolves on ${dissolveDate} (${dissolveDelay})`}
                        </CardDescription>
                    </div>
                    <div className="flex flex-col items-end">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{amount} <span className="text-sm font-normal">ICP</span></div>
                        {isFollowingNNS && (
                            <Badge variant="outline" className="bg-[#3B00B9]/10 dark:bg-[#29ABE2]/10 text-[#3B00B9] dark:text-[#29ABE2] border-none text-xs">
                                Auto-voting
                            </Badge>
                        )}
                    </div>
                </div>
            </CardHeader>

            <CardContent className="pb-2">
                <div className="mb-4">
                    {!isReadyToUnlock ? (
                        <>
                            <div className="flex items-center justify-between mb-1 text-sm">
                                <span className="text-gray-600 dark:text-gray-300">Dissolve progress</span>
                                <span className="text-gray-600 dark:text-gray-300">{progress}%</span>
                            </div>
                            <Progress value={progress} className="h-2" />
                            <div className="flex justify-between mt-1">
                                <span className="text-xs text-gray-500 dark:text-gray-400">{daysLeft} days left</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">{dissolveDate}</span>
                            </div>
                        </>
                    ) : (
                        <div className="bg-[#3B00B9]/5 dark:bg-[#29ABE2]/10 p-2 rounded-md text-center border border-[#3B00B9]/20 dark:border-[#29ABE2]/20">
                            <span className="text-[#3B00B9] dark:text-[#29ABE2] text-sm font-medium">Ready to dissolve or increase delay</span>
                        </div>
                    )}
                </div>

                <div className="flex flex-wrap justify-between items-center text-sm mb-4 gap-2">
                    <div className="flex items-center">
                        <Coins className="h-4 w-4 text-gray-400 dark:text-gray-500 mr-1" />
                        <span className="text-gray-600 dark:text-gray-300">Base APY: </span>
                        <span className="font-medium ml-1 text-gray-900 dark:text-white">{baseApr}</span>
                    </div>
                    <div className="flex items-center">
                        <GraduationCap className="h-4 w-4 text-[#3B00B9] dark:text-[#29ABE2] mr-1" />
                        <span className="text-gray-600 dark:text-gray-300">Learning: </span>
                        <span className="font-medium text-[#3B00B9] dark:text-[#29ABE2] ml-1">{learningBoost}</span>
                    </div>
                    <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 text-[#50C878] mr-1" />
                        <span className="text-gray-600 dark:text-gray-300">Effective: </span>
                        <span className="font-medium text-[#50C878] ml-1">{effectiveApr}</span>
                    </div>
                </div>

                <Collapsible
                    open={isExpanded}
                    onOpenChange={setIsExpanded}
                    className="border-t border-gray-100 dark:border-gray-600 pt-4"
                >
                    <CollapsibleTrigger className="flex items-center justify-center w-full text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                        <span>
                            {isExpanded ? "Hide details" : "Show details"}
                        </span>
                        {isExpanded ? (
                            <ChevronUp className="h-4 w-4 ml-1" />
                        ) : (
                            <ChevronDown className="h-4 w-4 ml-1" />
                        )}
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pt-4 space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-gray-500 dark:text-gray-400">Staked on</p>
                                <p className="font-medium text-gray-900 dark:text-white">Jan 15, 2024</p>
                            </div>
                            <div>
                                <p className="text-gray-500 dark:text-gray-400">Voting rewards</p>
                                <p className="font-medium text-gray-900 dark:text-white">45.2 ICP</p>
                            </div>
                            <div>
                                <p className="text-gray-500 dark:text-gray-400">Daily rewards</p>
                                <p className="font-medium text-gray-900 dark:text-white">0.8 ICP / day</p>
                            </div>
                            <div>
                                <p className="text-gray-500 dark:text-gray-400">Learning boost from</p>
                                <p className="font-medium text-gray-900 dark:text-white">8 completed courses</p>
                            </div>
                            <div>
                                <p className="text-gray-500 dark:text-gray-400">Neuron age</p>
                                <p className="font-medium text-gray-900 dark:text-white">11 months</p>
                            </div>
                            <div>
                                <p className="text-gray-500 dark:text-gray-400">Voting power</p>
                                <p className="font-medium text-gray-900 dark:text-white">2,850.5</p>
                            </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md text-sm border border-gray-100 dark:border-gray-600">
                            <div className="flex items-start">
                                <Info className="h-4 w-4 text-[#3B00B9] dark:text-[#29ABE2] mt-0.5 mr-2" />
                                <p className="text-gray-600 dark:text-gray-300">
                                    Complete more ICP courses to increase your staking multiplier and governance knowledge.
                                    <Button variant="link" className="h-auto p-0 text-[#3B00B9] dark:text-[#29ABE2] hover:text-[#2E0092] dark:hover:text-[#1E8FBF]">
                                        Learn more
                                    </Button>
                                </p>
                            </div>
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            </CardContent>

            <CardFooter className="pt-4 grid grid-cols-2 gap-2">
                {isReadyToUnlock ? (
                    <>
                        <Button 
                            variant="outline" 
                            className="border-[#ED1E79] text-[#ED1E79] hover:bg-[#ED1E79]/10 dark:border-[#F15A24] dark:text-[#F15A24] dark:hover:bg-[#F15A24]/10"
                        >
                            Dissolve
                        </Button>
                        <Button className="bg-gradient-to-r from-[#3B00B9] to-[#29ABE2] hover:from-[#2E0092] hover:to-[#1E8FBF] text-white">
                            Increase Delay
                        </Button>
                    </>
                ) : (
                    <>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div>
                                        <Button 
                                            variant="outline" 
                                            className="w-full border-gray-200 dark:border-gray-600 text-gray-400 dark:text-gray-500" 
                                            disabled
                                        >
                                            Dissolve
                                        </Button>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="text-xs">Cannot dissolve until delay period ends</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <Button className="bg-gradient-to-r from-[#3B00B9] to-[#29ABE2] hover:from-[#2E0092] hover:to-[#1E8FBF] text-white">
                            Add ICP
                        </Button>
                    </>
                )}
            </CardFooter>
        </Card>
    );
};

// ICP Reward Card Component
const ICPRewardCard = ({
    title,
    amount,
    icon,
    bgClass,
    iconColorClass,
    description
}: {
    title: string;
    amount: string;
    icon: React.ReactNode;
    bgClass: string;
    iconColorClass: string;
    description: string;
}) => {
    return (
        <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">{title}</p>
                        <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">{amount} <span className="text-sm font-normal">ICP</span></p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{description}</p>
                    </div>
                    <div className={`h-10 w-10 rounded-full ${bgClass} flex items-center justify-center`}>
                        {React.cloneElement(icon as React.ReactElement, { className: `h-5 w-5 ${iconColorClass}` })}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default function ICPMyStakesPage() {
    const [calculatorOpen, setCalculatorOpen] = useState(false);

    // Sample ICP neuron data
    const activeNeurons = [
        {
            neuronName: "ICP Master Neuron",
            amount: "2,450",
            baseApr: "15.4%",
            learningBoost: "2.0x",
            effectiveApr: "30.8%",
            dissolveDate: "Jan 15, 2032",
            progress: 15,
            daysLeft: 2850,
            isReadyToUnlock: false,
            isFollowingNNS: true,
            dissolveDelay: "8 years"
        },
        {
            neuronName: "Learning Boost Neuron",
            amount: "800",
            baseApr: "18.2%",
            learningBoost: "1.5x",
            effectiveApr: "27.3%",
            dissolveDate: "Ready",
            progress: 100,
            daysLeft: 0,
            isReadyToUnlock: true,
            isFollowingNNS: false,
            dissolveDelay: "6 months"
        },
        {
            neuronName: "Chain Fusion Explorer",
            amount: "1,200",
            baseApr: "16.8%",
            learningBoost: "2.3x",
            effectiveApr: "38.6%",
            dissolveDate: "Jun 20, 2028",
            progress: 35,
            daysLeft: 1200,
            isReadyToUnlock: false,
            isFollowingNNS: true,
            dissolveDelay: "4 years"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <div className="flex">
                <Sidebar />
                <main className="flex-1 pt-20 px-6 max-w-6xl mx-auto pb-12">
                    {/* Page Header */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My ICP Neurons</h1>
                        <p className="text-gray-600 dark:text-gray-300 mt-1">Manage your neurons and track your voting rewards</p>
                    </div>

                    {/* ICP Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <ICPRewardCard
                            title="Total Staked"
                            amount="4,450"
                            icon={<Wallet />}
                            bgClass="bg-[#3B00B9]/10 dark:bg-[#29ABE2]/10"
                            iconColorClass="text-[#3B00B9] dark:text-[#29ABE2]"
                            description="Across 3 active neurons"
                        />
                        <ICPRewardCard
                            title="Voting Rewards"
                            amount="186.4"
                            icon={<TrendingUp />}
                            bgClass="bg-[#50C878]/10"
                            iconColorClass="text-[#50C878]"
                            description="All-time earnings"
                        />
                        <ICPRewardCard
                            title="Avg. APY"
                            amount="32.2%"
                            icon={<BarChart />}
                            bgClass="bg-[#ED1E79]/10 dark:bg-[#F15A24]/10"
                            iconColorClass="text-[#ED1E79] dark:text-[#F15A24]"
                            description="With learning boost"
                        />
                        <ICPRewardCard
                            title="Next Maturity"
                            amount="2.8"
                            icon={<Clock />}
                            bgClass="bg-[#6A3DE8]/10"
                            iconColorClass="text-[#6A3DE8]"
                            description="In 1 day"
                        />
                    </div>

                    {/* Calculator and Add Neuron */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                        <div className="flex space-x-2">
                            <Button 
                                variant="outline" 
                                className="text-[#3B00B9] dark:text-[#29ABE2] border-[#3B00B9]/30 dark:border-[#29ABE2]/30 hover:bg-[#3B00B9]/10 dark:hover:bg-[#29ABE2]/10" 
                                onClick={() => setCalculatorOpen(!calculatorOpen)}
                            >
                                <Calculator className="h-4 w-4 mr-2" />
                                Rewards Calculator
                            </Button>
                            <Button 
                                variant="outline" 
                                className="text-[#3B00B9] dark:text-[#29ABE2] border-[#3B00B9]/30 dark:border-[#29ABE2]/30 hover:bg-[#3B00B9]/10 dark:hover:bg-[#29ABE2]/10"
                            >
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Refresh
                            </Button>
                        </div>
                        <Button className="bg-gradient-to-r from-[#3B00B9] to-[#29ABE2] hover:from-[#2E0092] hover:to-[#1E8FBF] text-white">
                            <Plus className="h-4 w-4 mr-2" />
                            Create Neuron
                        </Button>
                    </div>

                    {/* Calculator Panel */}
                    {calculatorOpen && (
                        <Card className="mb-6 border-[#3B00B9]/30 dark:border-[#29ABE2]/30 bg-white dark:bg-gray-800">
                            <CardHeader>
                                <CardTitle className="text-lg text-gray-900 dark:text-white">ICP Rewards Calculator</CardTitle>
                                <CardDescription className="dark:text-gray-300">
                                    Estimate your potential voting rewards based on stake amount, dissolve delay, and learning multiplier
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="md:col-span-3 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-100 dark:border-gray-600">
                                        <p className="text-sm text-center text-gray-600 dark:text-gray-300">
                                            ICP rewards calculator functionality would be implemented here
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Neurons Tabs */}
                    <Tabs defaultValue="active" className="w-full">
                        <TabsList className="mb-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                            <TabsTrigger 
                                value="active"
                                className="data-[state=active]:bg-[#3B00B9] data-[state=active]:text-white dark:data-[state=active]:bg-[#29ABE2] dark:text-gray-300"
                            >
                                Active Neurons (3)
                            </TabsTrigger>
                            <TabsTrigger 
                                value="dissolving"
                                className="data-[state=active]:bg-[#3B00B9] data-[state=active]:text-white dark:data-[state=active]:bg-[#29ABE2] dark:text-gray-300"
                            >
                                Dissolving (1)
                            </TabsTrigger>
                            <TabsTrigger 
                                value="dissolved"
                                className="data-[state=active]:bg-[#3B00B9] data-[state=active]:text-white dark:data-[state=active]:bg-[#29ABE2] dark:text-gray-300"
                            >
                                Dissolved (2)
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="active" className="space-y-6">
                            {/* Learning Boost Prompt */}
                            <Card className="border-[#50C878]/30 bg-[#50C878]/5 dark:bg-[#50C878]/10 mb-6 dark:border-[#50C878]/40">
                                <CardContent className="pt-6">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                                        <div className="flex items-start">
                                            <Zap className="h-5 w-5 text-[#50C878] mt-0.5 mr-2" />
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">Boost your ICP rewards!</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                                    Complete more ICP courses to increase your neuron voting power and effective APY.
                                                </p>
                                            </div>
                                        </div>
                                        <Button className="mt-4 md:mt-0 bg-[#50C878] hover:bg-[#50C878]/90 text-white">
                                            <GraduationCap className="h-4 w-4 mr-2" />
                                            Learn ICP
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Active Neurons */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
                                {activeNeurons.map((neuron, index) => (
                                    <NeuronCard
                                        key={index}
                                        neuronName={neuron.neuronName}
                                        amount={neuron.amount}
                                        baseApr={neuron.baseApr}
                                        learningBoost={neuron.learningBoost}
                                        effectiveApr={neuron.effectiveApr}
                                        dissolveDate={neuron.dissolveDate}
                                        progress={neuron.progress}
                                        daysLeft={neuron.daysLeft}
                                        isReadyToUnlock={neuron.isReadyToUnlock}
                                        isFollowingNNS={neuron.isFollowingNNS}
                                        dissolveDelay={neuron.dissolveDelay}
                                    />
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="dissolving">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
                                <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                                    <CardHeader className="pb-2">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <CardTitle className="text-gray-900 dark:text-white">Bitcoin Integration Neuron</CardTitle>
                                                <CardDescription className="mt-1 dark:text-gray-300">
                                                    Currently dissolving
                                                </CardDescription>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <div className="text-2xl font-bold text-gray-900 dark:text-white">500 <span className="text-sm font-normal">ICP</span></div>
                                                <Badge variant="outline" className="bg-[#ED1E79]/10 dark:bg-[#F15A24]/10 text-[#ED1E79] dark:text-[#F15A24] border-none text-xs">
                                                    Dissolving
                                                </Badge>
                                            </div>
                                        </div>
                                    </CardHeader>

                                    <CardContent className="pb-2">
                                        <div className="mb-4">
                                            <div className="bg-[#ED1E79]/5 dark:bg-[#F15A24]/10 p-3 rounded-md border border-[#ED1E79]/20 dark:border-[#F15A24]/20">
                                                <div className="flex items-start">
                                                    <Info className="h-4 w-4 text-[#ED1E79] dark:text-[#F15A24] mt-0.5 mr-2" />
                                                    <p className="text-sm text-[#ED1E79] dark:text-[#F15A24]">
                                                        This neuron is dissolving and will be available in 45 days.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap justify-between items-center text-sm mb-4 gap-2">
                                            <div className="flex items-center">
                                                <Coins className="h-4 w-4 text-gray-400 dark:text-gray-500 mr-1" />
                                                <span className="text-gray-600 dark:text-gray-300">Final APY: </span>
                                                <span className="font-medium ml-1 text-gray-900 dark:text-white">22.4%</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Vote className="h-4 w-4 text-[#ED1E79] dark:text-[#F15A24] mr-1" />
                                                <span className="text-gray-600 dark:text-gray-300">No longer voting</span>
                                            </div>
                                        </div>
                                    </CardContent>

                                    <CardFooter className="pt-4">
                                        <Button 
                                            variant="outline" 
                                            className="w-full text-[#ED1E79] dark:text-[#F15A24] border-[#ED1E79]/30 dark:border-[#F15A24]/30 hover:bg-[#ED1E79]/10 dark:hover:bg-[#F15A24]/10"
                                        >
                                            <RefreshCw className="h-4 w-4 mr-2" />
                                            Check Status
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </div>
                        </TabsContent>

                        <TabsContent value="dissolved">
                            <div className="space-y-6">
                                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center border border-gray-200 dark:border-gray-700">
                                    <Calendar className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Dissolved Neurons History</h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-md mx-auto">
                                        You have 2 dissolved neurons. View your past staking activity and final rewards.
                                    </p>
                                    <Button className="bg-gradient-to-r from-[#3B00B9] to-[#29ABE2] hover:from-[#2E0092] hover:to-[#1E8FBF] text-white">
                                        View History
                                        <ArrowRight className="h-4 w-4 ml-2" />
                                    </Button>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>

                    {/* ICP Network Status */}
                    <div className="mt-8 bg-gradient-to-r from-[#3B00B9]/5 to-[#29ABE2]/5 dark:from-[#3B00B9]/10 dark:to-[#29ABE2]/10 rounded-lg p-6 border border-[#29ABE2]/10 dark:border-[#29ABE2]/20">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                            <Cpu className="h-5 w-5 mr-2 text-[#29ABE2]" />
                            Internet Computer Network Status
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-[#3B00B9] dark:text-[#29ABE2]">125k+</p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">Total Canisters</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-[#3B00B9] dark:text-[#29ABE2]">294M+</p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">ICP Staked</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-[#50C878]">98.7%</p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">Network Health</p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}