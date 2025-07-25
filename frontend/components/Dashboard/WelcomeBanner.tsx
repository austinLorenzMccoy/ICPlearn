"use client";

import { Coins, Cpu, Zap } from "lucide-react";

interface WelcomeBannerProps {
    userName: string;
    currentMultiplier: string;
    stakedICP: string;
    nextReward: string;
    onStakeMore: () => void;
}

export const WelcomeBanner = ({
    userName,
    currentMultiplier,
    stakedICP,
    nextReward,
    onStakeMore
}: WelcomeBannerProps) => {
    return (
        <div className="bg-gradient-to-r from-[#3B00B9] via-[#ED1E79] to-[#29ABE2] rounded-lg p-6 text-white mb-6 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%">
                    <pattern id="hexagonPattern" width="60" height="52" patternUnits="userSpaceOnUse">
                        <path d="M30,0 L60,17.3 L60,34.6 L30,52 L0,34.6 L0,17.3 Z" fill="none" stroke="white" strokeWidth="0.5" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#hexagonPattern)" />
                </svg>
            </div>

            <div className="relative z-10">
                <h1 className="text-2xl font-bold">Welcome back, {userName}</h1>
                <p className="opacity-90 mt-1">Your ICP learning journey is boosting your staking rewards on the Internet Computer.</p>
                
                <div className="flex flex-wrap items-center mt-4 bg-white/10 backdrop-blur-sm rounded-lg p-3 gap-4">
                    <div className="flex items-center">
                        <Zap className="h-5 w-5 mr-2 text-[#F15A24]" />
                        <div>
                            <div className="text-xs uppercase tracking-wider opacity-75">Learning Multiplier</div>
                            <div className="text-2xl font-bold">{currentMultiplier}</div>
                        </div>
                    </div>
                    
                    <div className="flex items-center">
                        <Coins className="h-5 w-5 mr-2 text-[#29ABE2]" />
                        <div>
                            <div className="text-xs uppercase tracking-wider opacity-75">Staked ICP</div>
                            <div className="text-2xl font-bold">{stakedICP}</div>
                        </div>
                    </div>
                    
                    <div className="flex items-center">
                        <Cpu className="h-5 w-5 mr-2 text-[#50C878]" />
                        <div>
                            <div className="text-xs uppercase tracking-wider opacity-75">Next Reward</div>
                            <div className="text-2xl font-bold">~{nextReward} ICP</div>
                        </div>
                    </div>
                    
                    <div className="ml-auto">
                        <button 
                            onClick={onStakeMore}
                            className="flex items-center bg-white text-[#3B00B9] rounded-md px-4 py-2 font-medium text-sm hover:bg-opacity-90 cursor-pointer transition-all duration-200 hover:scale-105"
                        >
                            <Coins className="h-4 w-4 mr-2" />
                            Stake More ICP
                        </button>
                    </div>
                </div>

                {/* ICP Network status indicator */}
                <div className="flex items-center mt-3 text-xs opacity-75">
                    <div className="h-2 w-2 rounded-full bg-[#50C878] mr-2 animate-pulse" />
                    <span>Internet Computer Network: Operational</span>
                </div>
            </div>
        </div>
    );
};