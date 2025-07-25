"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PoolFilterTabsProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export const PoolFilterTabs = ({
    searchQuery,
    onSearchChange,
    activeTab,
    onTabChange
}: PoolFilterTabsProps) => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <Tabs value={activeTab} onValueChange={onTabChange} className="w-full md:w-auto">
                <TabsList className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <TabsTrigger 
                        value="all" 
                        className="data-[state=active]:bg-[#3B00B9] data-[state=active]:text-white dark:data-[state=active]:bg-[#29ABE2]"
                    >
                        All Pools
                    </TabsTrigger>
                    <TabsTrigger 
                        value="education" 
                        className="data-[state=active]:bg-[#3B00B9] data-[state=active]:text-white dark:data-[state=active]:bg-[#29ABE2]"
                    >
                        Learning
                    </TabsTrigger>
                    <TabsTrigger 
                        value="governance" 
                        className="data-[state=active]:bg-[#3B00B9] data-[state=active]:text-white dark:data-[state=active]:bg-[#29ABE2]"
                    >
                        Governance
                    </TabsTrigger>
                    <TabsTrigger 
                        value="development" 
                        className="data-[state=active]:bg-[#3B00B9] data-[state=active]:text-white dark:data-[state=active]:bg-[#29ABE2]"
                    >
                        Development
                    </TabsTrigger>
                </TabsList>
            </Tabs>

            <div className="relative w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                <Input
                    placeholder="Search neuron pools..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-10 w-full md:w-64 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
                />
            </div>
        </div>
    );
};