"use client";

import { ArrowUpRight, ArrowDownRight, Cpu, Zap } from "lucide-react";

interface TransactionItemProps {
    type: string;
    amount: string;
    status: string;
    date: string;
    pool: string;
    isPositive: boolean;
    transactionType: "stake" | "reward" | "unstake" | "multiplier" | "neuron" | "canister";
}

export const TransactionItem = ({
    type,
    amount,
    status,
    date,
    pool,
    isPositive,
    transactionType
}: TransactionItemProps) => {
    const getIcon = () => {
        switch (transactionType) {
            case "neuron":
                return <Cpu className="h-4 w-4" />;
            case "multiplier":
                return <Zap className="h-4 w-4" />;
            default:
                return isPositive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />;
        }
    };

    const getIconBg = () => {
        if (transactionType === "multiplier") {
            return "bg-[#F15A24]/10 text-[#F15A24] dark:bg-[#F15A24]/20";
        }
        if (transactionType === "neuron") {
            return "bg-[#ED1E79]/10 text-[#ED1E79] dark:bg-[#ED1E79]/20";
        }
        return isPositive 
            ? 'bg-[#50C878]/10 text-[#50C878] dark:bg-[#50C878]/20' 
            : 'bg-[#3B00B9]/10 text-[#3B00B9] dark:bg-[#3B00B9]/20 dark:text-[#29ABE2]';
    };

    const getAmountColor = () => {
        if (transactionType === "multiplier") {
            return "text-[#F15A24]";
        }
        return isPositive ? 'text-[#50C878]' : 'text-[#3B00B9] dark:text-[#29ABE2]';
    };

    const getStatusBg = () => {
        switch (status.toLowerCase()) {
            case "completed":
                return "bg-[#50C878]/10 text-[#50C878] dark:bg-[#50C878]/20";
            case "pending":
                return "bg-[#F15A24]/10 text-[#F15A24] dark:bg-[#F15A24]/20";
            case "received":
                return "bg-[#29ABE2]/10 text-[#29ABE2] dark:bg-[#29ABE2]/20";
            case "applied":
                return "bg-[#ED1E79]/10 text-[#ED1E79] dark:bg-[#ED1E79]/20";
            default:
                return "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300";
        }
    };

    return (
        <div className="flex items-center py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
            <div className={`h-8 w-8 rounded-full ${getIconBg()} flex items-center justify-center mr-3 flex-shrink-0`}>
                {getIcon()}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">{type}</h4>
                    <span className={`text-sm font-medium ${getAmountColor()} flex-shrink-0 ml-2`}>
                        {amount}
                    </span>
                </div>
                <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate mr-2">
                        {date} • {pool}
                    </p>
                    <span className={`text-xs rounded-full px-2 py-0.5 flex-shrink-0 ${getStatusBg()}`}>
                        {status}
                    </span>
                </div>
            </div>
        </div>
    );
};