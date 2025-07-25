"use client";

import { ChevronUp, ChevronDown, GraduationCap, Coins, Cpu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface LeaderboardTableProps {
    data: any[];
    sortField: string;
    sortDirection: "asc" | "desc";
    onSort: (field: string) => void;
    currentUser?: string;
}

export const ICPLeaderboardTable = ({
    data,
    sortField,
    sortDirection,
    onSort,
    currentUser
}: LeaderboardTableProps) => {
    const SortHeader = ({ field, label }: { field: string; label: string }) => (
        <div
            className="flex items-center space-x-1 cursor-pointer hover:text-[#3B00B9] dark:hover:text-[#29ABE2] transition-colors"
            onClick={() => onSort(field)}
        >
            <span>{label}</span>
            {sortField === field ? (
                sortDirection === "asc" ? (
                    <ChevronUp className="h-4 w-4" />
                ) : (
                    <ChevronDown className="h-4 w-4" />
                )
            ) : null}
        </div>
    );

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="py-3 px-4 text-left font-medium text-gray-500 dark:text-gray-400 w-16">Rank</th>
                        <th className="py-3 px-4 text-left font-medium text-gray-500 dark:text-gray-400">User</th>
                        <th className="py-3 px-4 text-left font-medium text-gray-500 dark:text-gray-400">
                            <SortHeader field="level" label="Level" />
                        </th>
                        <th className="py-3 px-4 text-left font-medium text-gray-500 dark:text-gray-400">
                            <SortHeader field="points" label="Points" />
                        </th>
                        <th className="py-3 px-4 text-left font-medium text-gray-500 dark:text-gray-400">
                            <SortHeader field="stakingAmount" label="Staked ICP" />
                        </th>
                        <th className="py-3 px-4 text-left font-medium text-gray-500 dark:text-gray-400">
                            <SortHeader field="neuronBoost" label="Neuron Boost" />
                        </th>
                        <th className="py-3 px-4 text-left font-medium text-gray-500 dark:text-gray-400">Achievements</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((user, index) => (
                        <tr
                            key={user.id}
                            className={`
                                ${index % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800"}
                                ${user.name === currentUser ? "bg-[#3B00B9]/5 dark:bg-[#29ABE2]/5" : ""}
                                hover:bg-[#3B00B9]/5 dark:hover:bg-[#29ABE2]/5 transition-colors
                            `}
                        >
                            <td className="py-3 px-4">
                                <div className="flex justify-center items-center">
                                    {index < 3 ? (
                                        <div className={`
                                            h-7 w-7 rounded-full flex items-center justify-center text-white font-bold
                                            ${index === 0 ? "bg-[#FFD700]" :
                                                index === 1 ? "bg-[#A9A9A9]" :
                                                    "bg-[#CD7F32]"}
                                        `}>
                                            {index + 1}
                                        </div>
                                    ) : (
                                        <div className="px-2 font-semibold text-gray-600 dark:text-gray-300">{index + 1}</div>
                                    )}
                                </div>
                            </td>
                            <td className="py-3 px-4">
                                <div className="flex items-center space-x-3">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={user.avatar} alt={user.name} />
                                        <AvatarFallback className="bg-[#3B00B9]/10 dark:bg-[#29ABE2]/10 text-[#3B00B9] dark:text-[#29ABE2]">
                                            {user.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Joined {user.joinDate}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="py-3 px-4">
                                <div className="flex items-center space-x-1">
                                    <GraduationCap className="h-4 w-4 text-[#3B00B9] dark:text-[#29ABE2]" />
                                    <span className="text-gray-900 dark:text-white">{user.level}</span>
                                </div>
                            </td>
                            <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">
                                {user.points.toLocaleString()}
                            </td>
                            <td className="py-3 px-4">
                                <div className="flex items-center space-x-1">
                                    <Coins className="h-4 w-4 text-[#3B00B9] dark:text-[#29ABE2]" />
                                    <span className="text-gray-900 dark:text-white">{user.stakingAmount.toLocaleString()} ICP</span>
                                </div>
                            </td>
                            <td className="py-3 px-4">
                                <div className="flex items-center space-x-1">
                                    <Cpu className="h-4 w-4 text-[#ED1E79] dark:text-[#F15A24]" />
                                    <span className="font-medium text-[#ED1E79] dark:text-[#F15A24]">{user.neuronBoost}x</span>
                                </div>
                            </td>
                            <td className="py-3 px-4">
                                <div className="flex flex-wrap gap-1">
                                    {user.achievements.map((achievement: string, i: number) => (
                                        <Badge
                                            key={i}
                                            variant="outline"
                                            className="bg-gradient-to-r from-[#3B00B9]/10 to-[#29ABE2]/10 dark:from-[#3B00B9]/20 dark:to-[#29ABE2]/20 border-none text-[#3B00B9] dark:text-[#29ABE2] text-xs"
                                        >
                                            {achievement}
                                        </Badge>
                                    ))}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};