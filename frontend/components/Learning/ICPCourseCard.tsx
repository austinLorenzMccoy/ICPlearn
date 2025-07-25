"use client";

import { useState } from "react";
import {
    BookOpen,
    Clock,
    Award,
    CheckCircle,
    PlayCircle,
    Lock,
    Zap,
    Cpu,
    Code
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface CourseCardProps {
    title: string;
    description: string;
    image: string;
    level: "beginner" | "intermediate" | "advanced";
    duration: string;
    reward: number;
    completionRate?: number;
    isLocked?: boolean;
    modules: number;
    stakingBoost: string;
    category: "canisters" | "governance" | "development" | "network" | "beginner";
}

export const ICPCourseCard = ({
    title,
    description,
    image,
    level,
    duration,
    reward,
    completionRate,
    isLocked,
    modules,
    stakingBoost,
    category
}: CourseCardProps) => {
    const [showDialog, setShowDialog] = useState(false);

    // Get color based on level
    const getLevelColor = () => {
        switch (level) {
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

    // Get category icon
    const getCategoryIcon = () => {
        switch (category) {
            case "canisters":
                return <Cpu className="h-4 w-4" />;
            case "development":
                return <Code className="h-4 w-4" />;
            case "governance":
                return <Award className="h-4 w-4" />;
            default:
                return <BookOpen className="h-4 w-4" />;
        }
    };

    return (
        <>
            <Card className={`border border-gray-200 dark:border-gray-700 hover:border-[#3B00B9]/40 dark:hover:border-[#29ABE2]/40 transition-all duration-300 hover:shadow-md overflow-hidden bg-white dark:bg-gray-800 ${isLocked ? "opacity-80" : ""}`}>
                <div className="relative">
                    <div className="h-48 bg-gradient-to-r from-[#3B00B9]/80 via-[#ED1E79]/80 to-[#29ABE2]/80 relative overflow-hidden">
                        {image && (
                            <div
                                className="absolute inset-0 bg-center bg-cover mix-blend-overlay"
                                style={{ backgroundImage: `url(${image})` }}
                            />
                        )}
                        {/* ICP hexagon pattern overlay */}
                        <div className="absolute inset-0 opacity-20">
                            <svg width="100%" height="100%">
                                <pattern id={`hexPattern-${title}`} width="60" height="52" patternUnits="userSpaceOnUse">
                                    <path d="M30,0 L60,17.3 L60,34.6 L30,52 L0,34.6 L0,17.3 Z" fill="none" stroke="white" strokeWidth="0.5" />
                                </pattern>
                                <rect width="100%" height="100%" fill={`url(#hexPattern-${title})`} />
                            </svg>
                        </div>
                        
                        {isLocked && (
                            <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
                                <Lock className="h-10 w-10 text-white opacity-80" />
                            </div>
                        )}
                    </div>

                    {/* Level badge */}
                    <div className="absolute top-3 left-3">
                        <Badge className={`${getLevelColor()} border-none`}>
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                        </Badge>
                    </div>

                    {/* Completion badge if applicable */}
                    {completionRate !== undefined && !isLocked && (
                        <div className="absolute top-3 right-3">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="h-8 w-8 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-md">
                                            <div className="h-6 w-6 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                                                <div
                                                    className="h-6 w-6 rounded-full"
                                                    style={{
                                                        background: `conic-gradient(#3B00B9 ${completionRate}%, transparent 0)`
                                                    }}
                                                />
                                                <span className="absolute text-xs font-medium text-gray-900 dark:text-white">{completionRate}%</span>
                                            </div>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="text-xs">{completionRate}% completed</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    )}
                </div>

                <CardHeader className="pb-2">
                    <CardTitle className="text-lg line-clamp-1 text-gray-900 dark:text-white">{title}</CardTitle>
                    <CardDescription className="line-clamp-2 text-gray-600 dark:text-gray-300">{description}</CardDescription>
                </CardHeader>

                <CardContent className="pb-2">
                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                            <span className="text-sm text-gray-600 dark:text-gray-300">{duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            {getCategoryIcon()}
                            <span className="text-sm text-gray-600 dark:text-gray-300">{modules} Modules</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Award className="h-4 w-4 text-[#3B00B9] dark:text-[#29ABE2]" />
                            <span className="text-sm text-gray-600 dark:text-gray-300">{reward} Points</span>
                        </div>
                    </div>

                    <div className="mt-4 bg-gradient-to-r from-[#3B00B9]/5 to-[#29ABE2]/5 dark:from-[#3B00B9]/10 dark:to-[#29ABE2]/10 p-2 rounded-md border border-[#29ABE2]/10 dark:border-[#29ABE2]/20">
                        <div className="flex items-center">
                            <Zap className="h-4 w-4 text-[#ED1E79] dark:text-[#F15A24] mr-2" />
                            <div className="text-sm text-[#3B00B9] dark:text-[#29ABE2] font-medium">
                                Neuron Boost: <span>{stakingBoost}</span>
                            </div>
                        </div>
                    </div>
                </CardContent>

                <CardFooter>
                    <Button
                        className={`w-full ${isLocked
                            ? "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                            : "bg-gradient-to-r from-[#3B00B9] to-[#29ABE2] text-white hover:from-[#2E0092] hover:to-[#1E8FBF]"
                            }`}
                        disabled={isLocked}
                        onClick={() => setShowDialog(true)}
                    >
                        {isLocked ? "Locked" : completionRate ? "Continue Learning" : "Start Course"}
                    </Button>
                </CardFooter>
            </Card>

            {/* Course Dialog */}
            <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogContent className="sm:max-w-3xl bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <DialogHeader>
                        <DialogTitle className="text-gray-900 dark:text-white">{title}</DialogTitle>
                        <DialogDescription className="text-gray-600 dark:text-gray-300">
                            {description}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 space-y-6">
                            <div>
                                <h3 className="text-sm font-medium mb-2 text-gray-900 dark:text-white">Course Overview</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    This course is designed to help you master the Internet Computer Protocol and learn how to build on the world's most advanced blockchain. You'll gain valuable knowledge that will boost your neuron rewards.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium mb-2 text-gray-900 dark:text-white">What You'll Learn</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-start space-x-2">
                                        <CheckCircle className="h-4 w-4 text-[#50C878] mt-0.5" />
                                        <span className="text-sm text-gray-600 dark:text-gray-300">Understanding ICP's unique architecture and capabilities</span>
                                    </li>
                                    <li className="flex items-start space-x-2">
                                        <CheckCircle className="h-4 w-4 text-[#50C878] mt-0.5" />
                                        <span className="text-sm text-gray-600 dark:text-gray-300">How to deploy canisters on the Internet Computer</span>
                                    </li>
                                    <li className="flex items-start space-x-2">
                                        <CheckCircle className="h-4 w-4 text-[#50C878] mt-0.5" />
                                        <span className="text-sm text-gray-600 dark:text-gray-300">Optimizing neuron strategies for maximum rewards</span>
                                    </li>
                                    <li className="flex items-start space-x-2">
                                        <CheckCircle className="h-4 w-4 text-[#50C878] mt-0.5" />
                                        <span className="text-sm text-gray-600 dark:text-gray-300">Participating in Network Nervous System governance</span>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium mb-2 text-gray-900 dark:text-white">Course Modules</h3>
                                <div className="space-y-2">
                                    <div className="p-2 rounded-md bg-[#3B00B9]/5 dark:bg-[#3B00B9]/10 flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="h-6 w-6 rounded-full bg-[#3B00B9] text-white flex items-center justify-center mr-2 text-xs font-medium">1</div>
                                            <span className="text-sm font-medium text-gray-900 dark:text-white">Introduction to Internet Computer</span>
                                        </div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">20 min</div>
                                    </div>
                                    <div className="p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 flex items-center justify-center mr-2 text-xs font-medium">2</div>
                                            <span className="text-sm text-gray-900 dark:text-white">Understanding Canisters & Neurons</span>
                                        </div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">35 min</div>
                                    </div>
                                    <div className="p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 flex items-center justify-center mr-2 text-xs font-medium">3</div>
                                            <span className="text-sm text-gray-900 dark:text-white">Chain Fusion & Bitcoin Integration</span>
                                        </div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">45 min</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                <h3 className="text-sm font-medium mb-2 text-gray-900 dark:text-white">Course Details</h3>
                                <ul className="space-y-3">
                                    <li className="flex justify-between text-sm">
                                        <span className="text-gray-500 dark:text-gray-400">Level:</span>
                                        <span className="font-medium capitalize text-gray-900 dark:text-white">{level}</span>
                                    </li>
                                    <li className="flex justify-between text-sm">
                                        <span className="text-gray-500 dark:text-gray-400">Duration:</span>
                                        <span className="font-medium text-gray-900 dark:text-white">{duration}</span>
                                    </li>
                                    <li className="flex justify-between text-sm">
                                        <span className="text-gray-500 dark:text-gray-400">Modules:</span>
                                        <span className="font-medium text-gray-900 dark:text-white">{modules}</span>
                                    </li>
                                    <li className="flex justify-between text-sm">
                                        <span className="text-gray-500 dark:text-gray-400">Points:</span>
                                        <span className="font-medium text-gray-900 dark:text-white">{reward}</span>
                                    </li>
                                    <li className="flex justify-between text-sm">
                                        <span className="text-gray-500 dark:text-gray-400">Neuron Boost:</span>
                                        <span className="font-medium text-[#ED1E79] dark:text-[#F15A24]">{stakingBoost}</span>
                                    </li>
                                </ul>
                            </div>

                            <Button
                                className="w-full bg-gradient-to-r from-[#3B00B9] to-[#29ABE2] hover:from-[#2E0092] hover:to-[#1E8FBF] text-white"
                            >
                                <PlayCircle className="h-4 w-4 mr-2" />
                                {completionRate ? "Continue Course" : "Start Learning ICP"}
                            </Button>

                            <div className="text-center text-xs text-gray-500 dark:text-gray-400">
                                <p>This course rewards you with both ICP knowledge and neuron benefits</p>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};