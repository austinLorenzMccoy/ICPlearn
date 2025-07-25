"use client";

import { BookmarkCheck } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface LearningProgressCardProps {
    title: string;
    progress: number;
    totalModules: number;
    completedModules: number;
    category: "beginner" | "intermediate" | "advanced";
}

export const LearningProgressCard = ({
    title,
    progress,
    totalModules,
    completedModules,
    category
}: LearningProgressCardProps) => {
    const getCategoryColor = () => {
        switch (category) {
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

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-sm text-gray-900 dark:text-white">{title}</h3>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${getCategoryColor()}`}>
                    {progress}% Complete
                </span>
            </div>
            <Progress 
                value={progress} 
                className="h-2 mb-2" 
            />
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <BookmarkCheck className="h-3 w-3 mr-1 text-[#29ABE2]" />
                <span>{completedModules}/{totalModules} modules completed</span>
            </div>
        </div>
    );
};