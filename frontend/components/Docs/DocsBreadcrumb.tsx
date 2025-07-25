import { ChevronRight } from "lucide-react";

interface DocsBreadcrumbProps {
    section?: string;
}

export default function DocsBreadcrumb({ section = "Getting Started" }: DocsBreadcrumbProps) {
    return (
        <div className="flex items-center text-sm text-gray-500 mb-8">
            <a href="#" className="hover:text-[#0056E0]">Home</a>
            <ChevronRight className="h-4 w-4 mx-1" />
            <a href="#" className="hover:text-[#0056E0]">Documentation</a>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="text-gray-900 font-medium">{section}</span>
        </div>
    );
}