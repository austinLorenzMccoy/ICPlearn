"use client";

import { useState } from "react";
import { CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { StakingDialog } from "./StakingDialog";

interface StakingPoolCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    apr: string;
    lockPeriod: string;
    minStake: string;
    boostRequirement: string;
    boostMultiplier: string;
    totalStaked: string;
    difficulty: "beginner" | "intermediate" | "advanced";
    isPopular?: boolean;
    isVerified?: boolean;
}

export const StakingPoolCard = ({
    title,
    description,
    icon,
    apr,
    lockPeriod,
    minStake,
    boostRequirement,
    boostMultiplier,
    totalStaked,
    difficulty,
    isPopular,
    isVerified
}: StakingPoolCardProps) => {
    const [isOpen, setIsOpen] = useState(false);

    // Get background color based on difficulty
    const getDifficultyColor = () => {
        switch (difficulty) {
            case "beginner":
                return "bg-[#50C878]/10 text-[#50C878] dark:bg-[#50C878]/20";
            case "intermediate":
                return "bg-[#29ABE2]/10 text-[#29ABE2] dark:bg-[#29ABE2]/20";
            case "advanced":
                return "bg-[#ED1E79]/10 text-[#ED1E79] dark:bg-[#ED1E79]/20";
            default:
                return "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300";
        }
    };

    // Capitalize difficulty text
    const getDifficultyText = () => {
        return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
    };

    return (
        <>
            <Card className="border border-gray-200 dark:border-gray-700 hover:border-[#3B00B9]/50 dark:hover:border-[#29ABE2]/50 transition-all duration-300 hover:shadow-lg bg-white dark:bg-gray-800">
                <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                        <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#3B00B9]/10 to-[#29ABE2]/10 dark:from-[#3B00B9]/20 dark:to-[#29ABE2]/20 flex items-center justify-center mr-3">
                                {icon}
                            </div>
                            <div>
                                <CardTitle className="text-lg flex items-center text-gray-900 dark:text-white">
                                    {title}
                                    {isVerified && (
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <CheckCircle2 className="h-4 w-4 text-[#50C878] ml-1" />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p className="text-xs">DFINITY Verified Pool</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    )}
                                </CardTitle>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            {isPopular && (
                                <Badge variant="outline" className="bg-[#3B00B9] text-white border-none">
                                    Popular
                                </Badge>
                            )}
                            <Badge variant="outline" className={getDifficultyColor()}>
                                {getDifficultyText()}
                            </Badge>
                        </div>
                    </div>
                    <CardDescription className="mt-2 text-gray-600 dark:text-gray-300">{description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <p className="text-xs text-gray-500 dark:text-gray-400">APR</p>
                            <p className="font-medium text-lg text-gray-900 dark:text-white">{apr}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-gray-500 dark:text-gray-400">Dissolve Delay</p>
                            <p className="font-medium text-gray-900 dark:text-white">{lockPeriod}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-gray-500 dark:text-gray-400">Min Stake</p>
                            <p className="font-medium text-gray-900 dark:text-white">{minStake}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-gray-500 dark:text-gray-400">Total Staked</p>
                            <p className="font-medium text-gray-900 dark:text-white">{totalStaked}</p>
                        </div>
                    </div>

                    <div className="mt-4 p-3 bg-gradient-to-r from-[#3B00B9]/5 to-[#29ABE2]/5 dark:from-[#3B00B9]/10 dark:to-[#29ABE2]/10 rounded-md border border-[#29ABE2]/10 dark:border-[#29ABE2]/20">
                        <div className="flex items-center">
                            <Sparkles className="h-4 w-4 text-[#ED1E79] dark:text-[#F15A24] mr-2" />
                            <p className="text-sm font-medium text-[#3B00B9] dark:text-[#29ABE2]">Learning Boost</p>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                            {boostRequirement} to earn a {boostMultiplier} boost on rewards
                        </p>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        className="w-full bg-gradient-to-r from-[#3B00B9] to-[#29ABE2] hover:from-[#2E0092] hover:to-[#1E8FBF] text-white"
                        onClick={() => setIsOpen(true)}
                    >
                        Stake ICP Now
                    </Button>
                </CardFooter>
            </Card>

            {/* Staking Dialog */}
            <StakingDialog
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                poolTitle={title}
                lockPeriod={lockPeriod}
                apr={apr}
                minStake={minStake}
                boostMultiplier={boostMultiplier}
            />
        </>
    );
};