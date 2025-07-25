"use client";

import { ArrowUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsCardProps {
    title: string;
    value: string;
    description: string;
    icon: React.ReactNode;
    trend: "up" | "down" | "neutral";
    trendValue: string;
}

export const StatsCard = ({
    title,
    value,
    description,
    icon,
    trend,
    trendValue
}: StatsCardProps) => {
    return (
        <Card className="border-none shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</CardTitle>
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#3B00B9]/10 to-[#29ABE2]/10 dark:from-[#3B00B9]/20 dark:to-[#29ABE2]/20 flex items-center justify-center">
                    {icon}
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{description}</p>
                <div className="flex items-center mt-4">
                    <span className={`text-xs font-medium ${trend === "up"
                        ? "text-[#50C878]"
                        : trend === "down"
                            ? "text-[#ED1E79]"
                            : "text-gray-500 dark:text-gray-400"
                        } flex items-center`}>
                        {trend === "up" && <ArrowUp className="h-3 w-3 mr-1" />}
                        {trend === "down" && <ArrowUp className="h-3 w-3 mr-1 rotate-180" />}
                        {trendValue}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">vs last month</span>
                </div>
            </CardContent>
        </Card>
    );
};