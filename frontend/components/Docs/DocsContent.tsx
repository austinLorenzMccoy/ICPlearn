"use client";

import { ReactNode, useEffect } from "react";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";
import { useDocs } from "./DocsContext";

interface DocsContentProps {
    children: ReactNode;
}

export default function DocsContent({ children }: DocsContentProps) {
    const { setActiveSection } = useDocs();

    // Effect to handle scrolling and setting active section
    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll("[data-section]");
            let currentActiveSection = "introduction";

            sections.forEach((section) => {
                const sectionTop = section.getBoundingClientRect().top;

                if (sectionTop < 200) {
                    currentActiveSection = section.getAttribute("data-section") || "introduction";
                }
            });

            setActiveSection(currentActiveSection);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [setActiveSection]);

    return (
        <main className="flex-1 md:pl-64 pt-16 md:pt-0">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <DocsBreadcrumb />
                <DocsTabs />
                {children}
            </div>
        </main>
    );
}

// DocsBreadcrumb Component
function DocsBreadcrumb() {
    const { activeSection } = useDocs();

    // Map section IDs to readable names
    const sectionNames: { [key: string]: string } = {
        "introduction": "Introduction",
        "getting-started": "Getting Started",
        "core-concepts": "Core Concepts",
        "staking-pools": "Staking Pools",
        "educational-courses": "Educational Courses",
        "api-reference": "API Reference",
        "faq": "FAQ",
        // Subsections
        "installation": "Installation",
        "connecting-wallets": "Connecting Wallets",
        "user-accounts": "User Accounts",
        "edu-tokens": "EDU Tokens",
        "staking-mechanism": "Staking Mechanism",
        "educational-rewards": "Educational Rewards",
        "pool-types": "Pool Types",
        "reward-calculation": "Reward Calculation",
        "staking-strategies": "Staking Strategies",
        "course-structure": "Course Structure",
        "completion-requirements": "Completion Requirements",
        "learning-paths": "Learning Paths",
        "authentication": "Authentication",
        "staking-endpoints": "Staking Endpoints",
        "education-endpoints": "Education Endpoints"
    };

    // Determine the current section name
    const sectionName = sectionNames[activeSection] || "Documentation";

    return (
        <div className="flex items-center text-sm text-gray-500 mb-8">
            <a href="#" className="hover:text-[#0056E0]">Home</a>
            <ChevronRight className="h-4 w-4 mx-1" />
            <a href="#" className="hover:text-[#0056E0]">Documentation</a>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="text-gray-900 font-medium">{sectionName}</span>
        </div>
    );
}

// DocsTabs Component
function DocsTabs() {
    const { activeSection } = useDocs();
    const [activeTab, setActiveTab] = React.useState("guide");

    // Determine previous and next sections based on current active section
    const sectionOrder = [
        "introduction",
        "getting-started",
        "core-concepts",
        "staking-pools",
        "educational-courses",
        "api-reference",
        "faq"
    ];

    const currentIndex = sectionOrder.indexOf(activeSection.split("-")[0]);
    const prevSection = currentIndex > 0 ? sectionOrder[currentIndex - 1] : null;
    const nextSection = currentIndex < sectionOrder.length - 1 ? sectionOrder[currentIndex + 1] : null;

    // Map section IDs to readable names
    const sectionNames: { [key: string]: string } = {
        "introduction": "Introduction",
        "getting-started": "Getting Started",
        "core-concepts": "Core Concepts",
        "staking-pools": "Staking Pools",
        "educational-courses": "Educational Courses",
        "api-reference": "API Reference",
        "faq": "FAQ"
    };

    return (
        <div className="mb-8">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <div className="flex justify-between items-center mb-4">
                    <TabsList>
                        <TabsTrigger value="guide">Guide</TabsTrigger>
                        <TabsTrigger value="api">API Reference</TabsTrigger>
                        <TabsTrigger value="examples">Examples</TabsTrigger>
                    </TabsList>

                    <div className="flex items-center space-x-2">
                        {prevSection && (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="text-xs gap-1"
                                            onClick={() => {
                                                const element = document.getElementById(prevSection);
                                                element?.scrollIntoView({ behavior: 'smooth' });
                                            }}
                                        >
                                            <ArrowLeft className="h-3 w-3" />
                                            Previous
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{sectionNames[prevSection]}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )}

                        {nextSection && (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="text-xs gap-1"
                                            onClick={() => {
                                                const element = document.getElementById(nextSection);
                                                element?.scrollIntoView({ behavior: 'smooth' });
                                            }}
                                        >
                                            Next
                                            <ChevronRight className="h-3 w-3" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{sectionNames[nextSection]}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )}
                    </div>
                </div>

                <TabsContent value="guide" className="mt-0">
                    {/* Guide content is rendered through children */}
                </TabsContent>

                <TabsContent value="api" className="mt-0">
                    <div className="border rounded-md p-6 text-center">
                        <h3 className="text-lg font-medium mb-2">API Reference</h3>
                        <p className="text-gray-600">
                            Detailed API documentation for developers who want to integrate with EduStake.
                        </p>
                    </div>
                </TabsContent>

                <TabsContent value="examples" className="mt-0">
                    <div className="border rounded-md p-6 text-center">
                        <h3 className="text-lg font-medium mb-2">Examples</h3>
                        <p className="text-gray-600">
                            Code examples and implementation guides for common use cases.
                        </p>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}