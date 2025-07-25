import { ReactNode } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

interface SidebarLinkProps {
    title: string;
    href: string;
    icon?: ReactNode;
    isActive?: boolean;
    hasChildren?: boolean;
    isOpen?: boolean;
    onClick?: () => void;
}

export default function SidebarLink({
    title,
    href,
    icon,
    isActive = false,
    hasChildren = false,
    isOpen = false,
    onClick
}: SidebarLinkProps) {
    return (
        <a
            href={href}
            onClick={onClick}
            className={`flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${isActive
                    ? "bg-[#0056E0]/10 text-[#0056E0] font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
        >
            <div className="flex items-center">
                {icon && <span className="mr-2">{icon}</span>}
                <span>{title}</span>
            </div>
            {hasChildren && (
                <span className="text-gray-400">
                    {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </span>
            )}
        </a>
    );
}