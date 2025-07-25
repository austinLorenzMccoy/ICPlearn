"use client";

import { useState } from "react";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface DocsTabsProps {
    prev?: string;
    next?: string;
}

export default function DocsTabs({ prev = "Introduction", next = "Core Concepts" }: DocsTabsProps) {
    const [activeTab, setActiveTab] = useState<string>("guide");

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
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="outline" size="sm" className="text-xs gap-1">
                                        <ArrowLeft className="h-3 w-3" />
                                        Previous
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{prev}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="outline" size="sm" className="text-xs gap-1">
                                        Next
                                        <ChevronRight className="h-3 w-3" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{next}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
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