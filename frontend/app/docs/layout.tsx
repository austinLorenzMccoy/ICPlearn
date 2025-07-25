"use client";

import { ReactNode } from "react";
import DocsSidebar from "./DocsSidebar";
import DocsContent from "./DocsContent";
import { DocsProvider } from "@/components/Docs/DocsContext";

interface DocsLayoutProps {
    children: ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
    return (
        <DocsProvider>
            <DocsLayoutContent>{children}</DocsLayoutContent>
        </DocsProvider>
    );
}

function DocsLayoutContent({ children }: DocsLayoutProps) {
    return (
        <div className=" bg-gray-50">
            <div className="flex ">
                {/* Sidebar */}
                <DocsSidebar />

                {/* Main Content */}
                <DocsContent>
                    {children}
                </DocsContent>
            </div>
        </div>
    );
}