"use client";

interface ActivityItemProps {
    title: string;
    timestamp: string;
    icon: React.ReactNode;
    type: "stake" | "learn" | "reward" | "canister" | "neuron";
}

export const ActivityItem = ({
    title,
    timestamp,
    icon,
    type
}: ActivityItemProps) => {
    const getBg = () => {
        switch (type) {
            case "stake":
                return "bg-[#3B00B9]/10 text-[#3B00B9] dark:bg-[#3B00B9]/20 dark:text-[#29ABE2]";
            case "learn":
                return "bg-[#29ABE2]/10 text-[#29ABE2] dark:bg-[#29ABE2]/20 dark:text-[#29ABE2]";
            case "reward":
                return "bg-[#50C878]/10 text-[#50C878] dark:bg-[#50C878]/20 dark:text-[#50C878]";
            case "canister":
                return "bg-[#ED1E79]/10 text-[#ED1E79] dark:bg-[#ED1E79]/20 dark:text-[#F15A24]";
            case "neuron":
                return "bg-[#F15A24]/10 text-[#F15A24] dark:bg-[#F15A24]/20 dark:text-[#F15A24]";
            default:
                return "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300";
        }
    };

    return (
        <div className="flex items-start space-x-4 mb-4">
            <div className={`h-8 w-8 rounded-full ${getBg()} flex items-center justify-center mt-1 flex-shrink-0`}>
                {icon}
            </div>
            <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">{title}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">{timestamp}</p>
            </div>
        </div>
    );
};