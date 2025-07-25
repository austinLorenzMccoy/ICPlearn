"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodeBlockProps {
    code: string;
    language: string;
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
    const [copied, setCopied] = useState<boolean>(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative mt-4 mb-6">
            <div className="absolute right-3 top-3 z-10">
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={copyToClipboard}
                >
                    {copied ? (
                        <Check className="h-4 w-4 text-green-500" />
                    ) : (
                        <Copy className="h-4 w-4 text-gray-500" />
                    )}
                </Button>
            </div>
            <div className="rounded-md bg-gray-900 p-4 text-sm text-gray-50 overflow-x-auto">
                <pre>
                    <code className={`language-${language}`}>{code}</code>
                </pre>
            </div>
            <div className="absolute top-0 right-0 px-2 py-1 rounded-bl-md rounded-tr-md text-xs font-medium bg-gray-800 text-gray-400">
                {language}
            </div>
        </div>
    );
}