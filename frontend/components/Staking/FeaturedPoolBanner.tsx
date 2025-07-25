"use client";

import { Sparkles, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FeaturedPoolBannerProps {
    onJoinPool: () => void;
}

export const FeaturedPoolBanner = ({ onJoinPool }: FeaturedPoolBannerProps) => {
    return (
        <div className="bg-gradient-to-r from-[#3B00B9] via-[#ED1E79] to-[#29ABE2] rounded-lg p-6 text-white mb-8 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%">
                    <pattern id="featuredHexPattern" width="60" height="52" patternUnits="userSpaceOnUse">
                        <path d="M30,0 L60,17.3 L60,34.6 L30,52 L0,34.6 L0,17.3 Z" fill="none" stroke="white" strokeWidth="0.5" />
                        <circle cx="30" cy="26" r="2" fill="white" opacity="0.3" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#featuredHexPattern)" />
                </svg>
            </div>

            <div className="relative z-10">
                <div className="flex flex-col md:flex-row justify-between">
                    <div className="mb-6 md:mb-0">
                        <div className="flex items-center mb-2">
                            <Cpu className="h-6 w-6 mr-2 text-[#29ABE2]" />
                            <h2 className="text-xl font-bold">Internet Computer Masters Pool</h2>
                        </div>
                        <p className="opacity-90 max-w-xl">
                            Our premium neuron pool with enhanced rewards for dedicated ICP learners. 
                            Complete the Canister Development Mastery course to unlock maximum multipliers and governance voting power.
                        </p>

                        <div className="flex flex-wrap gap-4 mt-4">
                            <div className="bg-white/20 backdrop-blur-sm rounded-md px-3 py-2">
                                <p className="text-xs uppercase opacity-75">APR</p>
                                <p className="text-lg font-bold">18-25%</p>
                            </div>
                            <div className="bg-white/20 backdrop-blur-sm rounded-md px-3 py-2">
                                <p className="text-xs uppercase opacity-75">Dissolve Delay</p>
                                <p className="text-lg font-bold">8 Years</p>
                            </div>
                            <div className="bg-white/20 backdrop-blur-sm rounded-md px-3 py-2">
                                <p className="text-xs uppercase opacity-75">Min Stake</p>
                                <p className="text-lg font-bold">500 ICP</p>
                            </div>
                            <div className="bg-white/20 backdrop-blur-sm rounded-md px-3 py-2">
                                <p className="text-xs uppercase opacity-75">Learning Boost</p>
                                <p className="text-lg font-bold">Up to 2.5x</p>
                            </div>
                        </div>

                        {/* Network stats */}
                        <div className="flex items-center mt-3 text-xs opacity-75">
                            <div className="h-2 w-2 rounded-full bg-[#50C878] mr-2 animate-pulse" />
                            <span>Network Nervous System: Active • 42 Subnets • 125k+ Canisters</span>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center">
                        <Button 
                            onClick={onJoinPool}
                            className="bg-white text-[#3B00B9] hover:bg-white/90 font-medium transition-all duration-200 hover:scale-105"
                        >
                            <Sparkles className="h-4 w-4 mr-2" />
                            Join Featured Pool
                        </Button>
                        <p className="text-xs opacity-75 mt-2 text-center">
                            DFINITY Verified • High Voting Rewards
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};