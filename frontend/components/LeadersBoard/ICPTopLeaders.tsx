"use client";

import { Trophy, Medal, Zap } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TopLeadersProps {
    data: any[];
}

export const ICPTopLeaders = ({ data }: TopLeadersProps) => {
    return (
        <div className="flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-12 my-8">
            {/* Second Place */}
            <div className="order-2 lg:order-1">
                <div className="flex flex-col items-center">
                    <div className="relative">
                        <Avatar className="h-24 w-24 border-4 border-[#A9A9A9] shadow-lg">
                            <AvatarImage src={data[1].avatar} alt={data[1].name} />
                            <AvatarFallback className="bg-[#29ABE2] text-white text-2xl">{data[1].name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-[#A9A9A9] text-white rounded-full h-8 w-8 flex items-center justify-center font-bold text-lg">
                            2
                        </div>
                    </div>
                    <h3 className="mt-4 font-semibold text-lg text-gray-900 dark:text-white">{data[1].name}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{data[1].points} points</p>
                    <div className="mt-1 flex items-center space-x-1 bg-[#A9A9A9]/10 dark:bg-[#A9A9A9]/20 px-2 py-1 rounded-full">
                        <Medal className="h-3 w-3 text-[#A9A9A9]" />
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{data[1].level}</span>
                    </div>
                    <div className="mt-2 flex items-center space-x-1 text-[#29ABE2]">
                        <Zap className="h-3 w-3" />
                        <span className="text-xs font-medium">{data[1].neuronBoost}x Boost</span>
                    </div>
                </div>
            </div>

            {/* First Place */}
            <div className="order-1 lg:order-2 -mt-8 lg:mt-0">
                <div className="flex flex-col items-center">
                    <div className="relative">
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                            <Trophy className="h-8 w-8 text-[#FFD700]" />
                        </div>
                        <Avatar className="h-32 w-32 border-4 border-[#FFD700] shadow-lg">
                            <AvatarImage src={data[0].avatar} alt={data[0].name} />
                            <AvatarFallback className="bg-[#3B00B9] text-white text-3xl">{data[0].name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-[#FFD700] text-white rounded-full h-10 w-10 flex items-center justify-center font-bold text-xl">
                            1
                        </div>
                    </div>
                    <h3 className="mt-6 font-bold text-xl text-gray-900 dark:text-white">{data[0].name}</h3>
                    <p className="text-gray-800 dark:text-gray-200 font-medium">{data[0].points} points</p>
                    <div className="mt-2 flex items-center space-x-1 bg-[#FFD700]/10 dark:bg-[#FFD700]/20 px-3 py-1 rounded-full">
                        <Medal className="h-4 w-4 text-[#FFD700]" />
                        <span className="text-sm font-medium text-gray-800 dark:text-white">{data[0].level}</span>
                    </div>
                    <div className="mt-2 flex items-center space-x-1 text-[#3B00B9] dark:text-[#29ABE2]">
                        <Zap className="h-4 w-4" />
                        <span className="text-sm font-medium">{data[0].neuronBoost}x Boost</span>
                    </div>
                </div>
            </div>

            {/* Third Place */}
            <div className="order-3">
                <div className="flex flex-col items-center">
                    <div className="relative">
                        <Avatar className="h-24 w-24 border-4 border-[#CD7F32] shadow-lg">
                            <AvatarImage src={data[2].avatar} alt={data[2].name} />
                            <AvatarFallback className="bg-[#ED1E79] text-white text-2xl">{data[2].name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-[#CD7F32] text-white rounded-full h-8 w-8 flex items-center justify-center font-bold text-lg">
                            3
                        </div>
                    </div>
                    <h3 className="mt-4 font-semibold text-lg text-gray-900 dark:text-white">{data[2].name}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{data[2].points} points</p>
                    <div className="mt-1 flex items-center space-x-1 bg-[#CD7F32]/10 dark:bg-[#CD7F32]/20 px-2 py-1 rounded-full">
                        <Medal className="h-3 w-3 text-[#CD7F32]" />
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{data[2].level}</span>
                    </div>
                    <div className="mt-2 flex items-center space-x-1 text-[#ED1E79] dark:text-[#F15A24]">
                        <Zap className="h-3 w-3" />
                        <span className="text-xs font-medium">{data[2].neuronBoost}x Boost</span>
                    </div>
                </div>
            </div>
        </div>
    );
};