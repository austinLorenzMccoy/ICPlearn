"use client";

import { Checkbox } from "@/components/ui/checkbox";

interface FilterSectionProps {
    title: string;
    options: string[];
}

export const ICPFilterSection = ({ title, options }: FilterSectionProps) => {
    return (
        <div className="mb-4">
            <h3 className="text-sm font-medium mb-2 text-gray-900 dark:text-white">{title}</h3>
            <div className="space-y-2">
                {options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <Checkbox id={`${title.toLowerCase()}-${index}`} />
                        <label
                            htmlFor={`${title.toLowerCase()}-${index}`}
                            className="text-sm text-gray-600 dark:text-gray-300 cursor-pointer"
                        >
                            {option}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};