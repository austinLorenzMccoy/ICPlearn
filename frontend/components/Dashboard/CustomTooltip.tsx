"use client";

interface CustomTooltipProps {
    active?: boolean;
    payload?: any[];
    label?: string;
}

export const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
        // Make sure we have all the data points before trying to access them
        const baseRewards = payload[0] ? payload[0].value.toFixed(2) : '0.00';
        const educationalBonus = payload[1] ? payload[1].value.toFixed(2) : '0.00';
        // Calculate total if payload[2] is not available
        const total = payload[2] ? payload[2].value.toFixed(2) :
            ((payload[0]?.value || 0) + (payload[1]?.value || 0)).toFixed(2);

        return (
            <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-600 shadow-md rounded-md">
                <p className="font-medium text-sm text-gray-800 dark:text-white">{label}</p>
                <p className="text-xs text-[#3B00B9] dark:text-[#29ABE2]">Base Rewards: {baseRewards} ICP</p>
                <p className="text-xs text-[#29ABE2]">Educational Bonus: {educationalBonus} ICP</p>
                <p className="text-xs font-medium text-gray-800 dark:text-white mt-1">Total: {total} ICP</p>
            </div>
        );
    }

    return null;
};