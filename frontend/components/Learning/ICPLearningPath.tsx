"use client";

import { BookOpen, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface LearningPathProps {
    title: string;
    description: string;
    courses: number;
    progress: number;
    reward: string;
    category: "development" | "governance" | "defi" | "content";
}

export const ICPLearningPath = ({
    title,
    description,
    courses,
    progress,
    reward,
    category
}: LearningPathProps) => {
    const getCategoryColor = () => {
        switch (category) {
            case "development":
                return "bg-[#3B00B9] text-white";
            case "governance":
                return "bg-[#29ABE2] text-white";
            case "defi":
                return "bg-[#ED1E79] text-white";
            case "content":
                return "bg-[#F15A24] text-white";
            default:
                return "bg-gray-500 text-white";
        }
    };

    return (
        <Card className="border border-gray-200 dark:border-gray-700 hover:border-[#3B00B9]/40 dark:hover:border-[#29ABE2]/40 transition-all duration-300 hover:shadow-md bg-white dark:bg-gray-800">
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div>
                        <CardTitle className="text-gray-900 dark:text-white">{title}</CardTitle>
                        <CardDescription className="mt-1 text-gray-600 dark:text-gray-300">{description}</CardDescription>
                    </div>
                    <Badge variant="outline" className={`${getCategoryColor()} border-none`}>
                        Learning Path
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-900 dark:text-white">Progress</span>
                            <span className="text-sm text-gray-600 dark:text-gray-300">{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center space-x-1">
                            <BookOpen className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                            <span className="text-sm text-gray-600 dark:text-gray-300">{courses} Courses</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Zap className="h-4 w-4 text-[#ED1E79] dark:text-[#F15A24]" />
                            <span className="text-sm text-gray-600 dark:text-gray-300">Neuron Boost: {reward}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full bg-gradient-to-r from-[#3B00B9] to-[#29ABE2] hover:from-[#2E0092] hover:to-[#1E8FBF] text-white">
                    Continue Path
                </Button>
            </CardFooter>
        </Card>
    );
};