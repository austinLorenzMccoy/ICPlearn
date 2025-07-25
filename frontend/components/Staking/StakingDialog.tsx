"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface StakingDialogProps {
    isOpen: boolean;
    onClose: () => void;
    poolTitle: string;
    lockPeriod: string;
    apr: string;
    minStake: string;
    boostMultiplier: string;
}

export const StakingDialog = ({
    isOpen,
    onClose,
    poolTitle,
    lockPeriod,
    apr,
    minStake,
    boostMultiplier
}: StakingDialogProps) => {
    const [stakeAmount, setStakeAmount] = useState(100);
    const maxBalance = 5000; // Mock balance

    const handleConfirmStake = () => {
        // Handle staking logic here
        console.log(`Staking ${stakeAmount} ICP in ${poolTitle}`);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <DialogHeader>
                    <DialogTitle className="text-gray-900 dark:text-white">Stake in {poolTitle}</DialogTitle>
                    <DialogDescription className="text-gray-600 dark:text-gray-300">
                        Enter the amount of ICP tokens you want to stake in this neuron.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">Amount to Stake</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Min: {minStake}</p>
                        </div>
                        <div className="text-sm text-right">
                            <p className="font-medium text-gray-900 dark:text-white">Balance: {maxBalance.toLocaleString()} ICP</p>
                        </div>
                    </div>

                    <div className="relative">
                        <Input
                            type="number"
                            placeholder="Enter amount"
                            value={stakeAmount}
                            onChange={(e) => setStakeAmount(Number(e.target.value))}
                            className="pr-16 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white"
                            min={1}
                            max={maxBalance}
                        />
                        <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-1 top-1 h-8 text-[#3B00B9] dark:text-[#29ABE2]"
                            onClick={() => setStakeAmount(maxBalance)}
                        >
                            MAX
                        </Button>
                    </div>

                    <div className="py-2">
                        <Slider
                            value={[stakeAmount]}
                            max={maxBalance}
                            step={10}
                            onValueChange={(value) => setStakeAmount(value[0])}
                            className="my-4"
                        />
                    </div>

                    <div className="space-y-2 rounded-md border border-gray-200 dark:border-gray-600 p-4 bg-gray-50 dark:bg-gray-700/50">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500 dark:text-gray-400">Dissolve Delay:</span>
                            <span className="font-medium text-gray-900 dark:text-white">{lockPeriod}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500 dark:text-gray-400">APR:</span>
                            <span className="font-medium text-gray-900 dark:text-white">{apr}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500 dark:text-gray-400">Estimated Rewards:</span>
                            <span className="font-medium text-gray-900 dark:text-white">
                                {(stakeAmount * 0.15).toFixed(2)} ICP / year
                            </span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500 dark:text-gray-400">Learning Boost:</span>
                            <span className="font-medium text-[#ED1E79] dark:text-[#F15A24]">{boostMultiplier} available</span>
                        </div>
                        <div className="flex justify-between text-sm pt-2 border-t border-gray-200 dark:border-gray-600">
                            <span className="text-gray-500 dark:text-gray-400">Neuron Creation:</span>
                            <span className="font-medium text-gray-900 dark:text-white">Automatic</span>
                        </div>
                    </div>

                    {/* ICP Network Information */}
                    <div className="p-3 bg-gradient-to-r from-[#3B00B9]/5 to-[#29ABE2]/5 dark:from-[#3B00B9]/10 dark:to-[#29ABE2]/10 rounded-md border border-[#29ABE2]/10 dark:border-[#29ABE2]/20">
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                            <strong className="text-[#3B00B9] dark:text-[#29ABE2]">Note:</strong> Your ICP will be locked in a neuron for the specified dissolve delay. 
                            You'll participate in network governance and earn rewards based on your voting activity.
                        </p>
                    </div>
                </div>

                <DialogFooter className="flex-col sm:flex-row sm:justify-between">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="mb-2 sm:mb-0 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleConfirmStake}
                        className="bg-gradient-to-r from-[#3B00B9] to-[#29ABE2] hover:from-[#2E0092] hover:to-[#1E8FBF] text-white"
                        disabled={stakeAmount < 1 || stakeAmount > maxBalance}
                    >
                        Create Neuron & Stake
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};