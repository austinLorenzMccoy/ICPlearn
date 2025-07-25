"use client";

import { useState } from "react";
import {
    Search,
    BookOpen,
    FileText,
    Hash,
    Code,
    HelpCircle,
    Settings,
    ExternalLink,
    Moon,
    Sun,
    ChevronDown,
    ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useDocs } from "@/components/Docs/DocsContext";

interface OpenCategoriesState {
    [key: string]: boolean;
}

export default function DocsSidebar() {
    const { activeSection, darkMode, toggleDarkMode } = useDocs();
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [openCategories, setOpenCategories] = useState<OpenCategoriesState>({
        "getting-started": true,
        "core-concepts": false,
        "staking-pools": false,
        "educational-courses": false,
        "apis": false
    });

    // Toggle category open/closed state
    const toggleCategory = (category: string) => {
        setOpenCategories({
            ...openCategories,
            [category]: !openCategories[category]
        });
    };

    // SidebarLink component
    const SidebarLink = ({
        title,
        href,
        icon,
        isActive = false,
        hasChildren = false,
        isOpen = false,
        onClick
    }: {
        title: string;
        href: string;
        icon?: React.ReactNode;
        isActive?: boolean;
        hasChildren?: boolean;
        isOpen?: boolean;
        onClick?: () => void;
    }) => {
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
    };

    return (
        <aside className="w-64 bg-white sticky h-fit inset-y-0 border-r border-gray-200 hidden md:block pt-16">
            <div className="flex items-center justify-between h-16 px-4 border-b">
                <div className="flex items-center">
                    <div className="h-8 w-8 rounded-md bg-gradient-to-r from-[#0056E0] to-[#00E5BF] mr-2"></div>
                    <span className="font-bold text-lg">EduStake Docs</span>
                </div>
                {/* <Button variant="ghost" size="sm" onClick={toggleDarkMode} className="h-8 w-8 p-0">
                    {darkMode ? (
                        <Sun className="h-4 w-4" />
                    ) : (
                        <Moon className="h-4 w-4" />
                    )}
                </Button> */}
            </div>

            <div className="p-4">
                <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Search documentation..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <ScrollArea className="h-[calc(100vh-132px)] pb-4">
                    <div className="space-y-1">
                        <SidebarLink
                            title="Introduction"
                            href="#introduction"
                            icon={<BookOpen className="h-4 w-4" />}
                            isActive={activeSection === "introduction"}
                        />

                        {/* Getting Started */}
                        <Collapsible open={openCategories["getting-started"]}>
                            <CollapsibleTrigger asChild>
                                <div onClick={() => toggleCategory("getting-started")}>
                                    <SidebarLink
                                        title="Getting Started"
                                        href="#getting-started"
                                        icon={<FileText className="h-4 w-4" />}
                                        hasChildren
                                        isOpen={openCategories["getting-started"]}
                                        isActive={activeSection === "getting-started"}
                                    />
                                </div>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="pl-4 my-1 space-y-1 border-l border-gray-200 ml-3">
                                <SidebarLink
                                    title="Installation"
                                    href="#installation"
                                    isActive={activeSection === "installation"}
                                />
                                <SidebarLink
                                    title="Connecting Wallets"
                                    href="#connecting-wallets"
                                    isActive={activeSection === "connecting-wallets"}
                                />
                                <SidebarLink
                                    title="User Accounts"
                                    href="#user-accounts"
                                    isActive={activeSection === "user-accounts"}
                                />
                            </CollapsibleContent>
                        </Collapsible>

                        {/* Core Concepts */}
                        <Collapsible open={openCategories["core-concepts"]}>
                            <CollapsibleTrigger asChild>
                                <div onClick={() => toggleCategory("core-concepts")}>
                                    <SidebarLink
                                        title="Core Concepts"
                                        href="#core-concepts"
                                        icon={<Hash className="h-4 w-4" />}
                                        hasChildren
                                        isOpen={openCategories["core-concepts"]}
                                        isActive={activeSection === "core-concepts"}
                                    />
                                </div>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="pl-4 my-1 space-y-1 border-l border-gray-200 ml-3">
                                <SidebarLink
                                    title="EDU Tokens"
                                    href="#edu-tokens"
                                    isActive={activeSection === "edu-tokens"}
                                />
                                <SidebarLink
                                    title="Staking Mechanism"
                                    href="#staking-mechanism"
                                    isActive={activeSection === "staking-mechanism"}
                                />
                                <SidebarLink
                                    title="Educational Rewards"
                                    href="#educational-rewards"
                                    isActive={activeSection === "educational-rewards"}
                                />
                            </CollapsibleContent>
                        </Collapsible>

                        {/* Staking Pools */}
                        <Collapsible open={openCategories["staking-pools"]}>
                            <CollapsibleTrigger asChild>
                                <div onClick={() => toggleCategory("staking-pools")}>
                                    <SidebarLink
                                        title="Staking Pools"
                                        href="#staking-pools"
                                        icon={<FileText className="h-4 w-4" />}
                                        hasChildren
                                        isOpen={openCategories["staking-pools"]}
                                        isActive={activeSection === "staking-pools"}
                                    />
                                </div>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="pl-4 my-1 space-y-1 border-l border-gray-200 ml-3">
                                <SidebarLink
                                    title="Pool Types"
                                    href="#pool-types"
                                    isActive={activeSection === "pool-types"}
                                />
                                <SidebarLink
                                    title="Reward Calculation"
                                    href="#reward-calculation"
                                    isActive={activeSection === "reward-calculation"}
                                />
                                <SidebarLink
                                    title="Staking Strategies"
                                    href="#staking-strategies"
                                    isActive={activeSection === "staking-strategies"}
                                />
                            </CollapsibleContent>
                        </Collapsible>

                        {/* Educational Courses */}
                        <Collapsible open={openCategories["educational-courses"]}>
                            <CollapsibleTrigger asChild>
                                <div onClick={() => toggleCategory("educational-courses")}>
                                    <SidebarLink
                                        title="Educational Courses"
                                        href="#educational-courses"
                                        icon={<BookOpen className="h-4 w-4" />}
                                        hasChildren
                                        isOpen={openCategories["educational-courses"]}
                                        isActive={activeSection === "educational-courses"}
                                    />
                                </div>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="pl-4 my-1 space-y-1 border-l border-gray-200 ml-3">
                                <SidebarLink
                                    title="Course Structure"
                                    href="#course-structure"
                                    isActive={activeSection === "course-structure"}
                                />
                                <SidebarLink
                                    title="Completion Requirements"
                                    href="#completion-requirements"
                                    isActive={activeSection === "completion-requirements"}
                                />
                                <SidebarLink
                                    title="Learning Paths"
                                    href="#learning-paths"
                                    isActive={activeSection === "learning-paths"}
                                />
                            </CollapsibleContent>
                        </Collapsible>

                        {/* APIs */}
                        <Collapsible open={openCategories["apis"]}>
                            <CollapsibleTrigger asChild>
                                <div onClick={() => toggleCategory("apis")}>
                                    <SidebarLink
                                        title="API Reference"
                                        href="#api-reference"
                                        icon={<Code className="h-4 w-4" />}
                                        hasChildren
                                        isOpen={openCategories["apis"]}
                                        isActive={activeSection === "api-reference"}
                                    />
                                </div>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="pl-4 my-1 space-y-1 border-l border-gray-200 ml-3">
                                <SidebarLink
                                    title="Authentication"
                                    href="#authentication"
                                    isActive={activeSection === "authentication"}
                                />
                                <SidebarLink
                                    title="Staking Endpoints"
                                    href="#staking-endpoints"
                                    isActive={activeSection === "staking-endpoints"}
                                />
                                <SidebarLink
                                    title="Education Endpoints"
                                    href="#education-endpoints"
                                    isActive={activeSection === "education-endpoints"}
                                />
                            </CollapsibleContent>
                        </Collapsible>

                        <SidebarLink
                            title="FAQ"
                            href="#faq"
                            icon={<HelpCircle className="h-4 w-4" />}
                            isActive={activeSection === "faq"}
                        />

                        <Separator className="my-4" />

                        <SidebarLink
                            title="Settings"
                            href="#settings"
                            icon={<Settings className="h-4 w-4" />}
                        />

                        <div className="pt-4">
                            <Button variant="outline" className="w-full justify-start">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                View on GitHub
                            </Button>
                        </div>
                    </div>
                </ScrollArea>
            </div>
        </aside>
    );
}