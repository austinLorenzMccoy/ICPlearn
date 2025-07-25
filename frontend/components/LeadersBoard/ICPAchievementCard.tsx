"use client";

interface AchievementCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    progress: number;
    category: "canister" | "governance" | "learning" | "community";
}

export const ICPAchievementCard = ({ 
    title, 
    description, 
    icon, 
    progress, 
    category 
}: AchievementCardProps) => {
    const getCategoryGradient = () => {
        switch (category) {
            case "canister":
                return "from-[#3B00B9] to-[#29ABE2]";
            case "governance":
                return "from-[#ED1E79] to-[#F15A24]";
            case "learning":
                return "from-[#50C878] to-[#29ABE2]";
            case "community":
                return "from-[#F15A24] to-[#ED1E79]";
            default:
                return "from-[#3B00B9] to-[#29ABE2]";
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-100 dark:border-gray-700">
            <div className="flex items-start space-x-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#3B00B9]/10 to-[#29ABE2]/10 dark:from-[#3B00B9]/20 dark:to-[#29ABE2]/20 flex items-center justify-center">
                    {icon}
                </div>
                <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">{title}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{description}</p>
                    <div className="mt-3 w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                        <div
                            className={`bg-gradient-to-r ${getCategoryGradient()} h-2 rounded-full transition-all duration-300`}
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-500 dark:text-gray-400">Progress</span>
                        <span className="text-xs font-medium text-gray-900 dark:text-white">{progress}%</span>
                    </div>
                </div>
            </div>
        </div>
    );
};