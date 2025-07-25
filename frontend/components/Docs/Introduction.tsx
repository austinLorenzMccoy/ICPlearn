import { BookOpen, Hash } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Introduction() {
    return (
        <section id="introduction" data-section="introduction" className="mb-12">
            <h1 className="text-4xl font-bold mb-6">EduStake Documentation</h1>
            <p className="text-lg text-gray-600 mb-6">
                Welcome to the official documentation for EduStake - a revolutionary platform that combines blockchain staking with educational incentives.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <BookOpen className="h-5 w-5 mr-2 text-[#0056E0]" />
                            Getting Started
                        </CardTitle>
                        <CardDescription>Set up your environment and connect your wallet</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="#installation" className="text-[#0056E0] hover:underline">
                                    Installation guide
                                </a>
                            </li>
                            <li>
                                <a href="#connecting-wallets" className="text-[#0056E0] hover:underline">
                                    Connecting wallets
                                </a>
                            </li>
                            <li>
                                <a href="#user-accounts" className="text-[#0056E0] hover:underline">
                                    Setting up user accounts
                                </a>
                            </li>
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Hash className="h-5 w-5 mr-2 text-[#0056E0]" />
                            Core Concepts
                        </CardTitle>
                        <CardDescription>Understand the fundamental principles</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="#edu-tokens" className="text-[#0056E0] hover:underline">
                                    EDU token economy
                                </a>
                            </li>
                            <li>
                                <a href="#staking-mechanism" className="text-[#0056E0] hover:underline">
                                    Staking mechanism
                                </a>
                            </li>
                            <li>
                                <a href="#educational-rewards" className="text-[#0056E0] hover:underline">
                                    Educational rewards system
                                </a>
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}