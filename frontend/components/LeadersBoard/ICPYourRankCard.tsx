"use client";

import { Medal, GraduationCap, Coins, ArrowUpRight, BookOpen, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface YourRankCardProps {
    rank: number;
    points: number;
    level: string;
    stakingAmount: number;
    neuronBoost: number;
}

export const ICPYourRankCard = ({ 
    rank, 
    points, 
    level, 
    stakingAmount, 
    neuronBoost 
}: YourRankCardProps) => {
    return (
        <Card className="bg-gradient-to-r from-[#3B00B9]/10 to-[#29ABE2]/10 dark:from-[#3B00B9]/20 dark:to-[#29ABE2]/20 border-[#29ABE2]/20 dark:border-[#29ABE2]/30 shadow-md">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg text-gray-900 dark:text-white">Your ICP Leaderboard Position</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                    Keep learning about the Internet Computer to climb the ranks!
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-6">
                    <div className="flex items-center space-x-2">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#3B00B9] to-[#29ABE2] flex items-center justify-center text-white font-bold">
                            {rank}
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Current Rank</p>
                            <p className="font-medium text-gray-900 dark:text-white">#{rank} of 2,850</p>
                        </div>
                    </div>

                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">ICP Points</p>
                        <div className="flex items-center">
                            <p className="font-medium text-gray-900 dark:text-white">{points.toLocaleString()}</p>
                            <span className="text-xs text-[#50C878] ml-2 flex items-center">
                                <ArrowUpRight className="h-3 w-3 mr-1" />
                                +185 this week
                            </span>
                        </div>
                    </div>

                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">ICP Level</p>
                        <div className="flex items-center">
                            <GraduationCap className="h-4 w-4 text-[#3B00B9] dark:text-[#29ABE2] mr-1" />
                            <p className="font-medium text-gray-900 dark:text-white">{level}</p>
                        </div>
                    </div>

                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Staked ICP</p>
                        <div className="flex items-center">
                            <Coins className="h-4 w-4 text-[#3B00B9] dark:text-[#29ABE2] mr-1" />
                            <p className="font-medium text-gray-900 dark:text-white">{stakingAmount.toLocaleString()} ICP</p>
                        </div>
                    </div>

                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Neuron Boost</p>
                        <div className="flex items-center">
                            <Zap className="h-4 w-4 text-[#ED1E79] dark:text-[#F15A24] mr-1" />
                            <p className="font-medium text-[#ED1E79] dark:text-[#F15A24]">{neuronBoost}x</p>
                        </div>
                    </div>
                </div>

                <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                    <p className="text-sm font-medium mb-2 text-gray-900 dark:text-white">Next Milestone</p>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#3B00B9] to-[#29ABE2] flex items-center justify-center text-white">
                                <Medal className="h-4 w-4" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">Top 100 ICP Experts</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">650 more points needed</p>
                            </div>
                        </div>
                        <Button
                            size="sm"
                            className="bg-gradient-to-r from-[#3B00B9] to-[#29ABE2] hover:from-[#2E0092] hover:to-[#1E8FBF] text-white"
                        >
                            <BookOpen className="h-4 w-4 mr-1" />
                            Learn ICP
                        </Button>
                    </div>
                </div>

                {/* ICP Network Status */}
                <div className="mt-4 p-3 bg-gradient-to-r from-[#3B00B9]/5 to-[#29ABE2]/5 dark:from-[#3B00B9]/10 dark:to-[#29ABE2]/10 rounded-md border border-[#29ABE2]/10 dark:border-[#29ABE2]/20">
                    <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-[#50C878] mr-2 animate-pulse" />
                            <span className="text-gray-600 dark:text-gray-300">Internet Computer Network</span>
                        </div>
                        <span className="text-[#50C878] font-medium">Operational</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};