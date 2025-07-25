"use client";

import { useState } from "react";
import {
    ChevronRight,
    ChevronLeft,
    Play,
    CheckCircle,
    Download,
    BookOpen,
    ArrowRight,
    HelpCircle,
    ClipboardCopy,
    Code
} from "lucide-react";
import Sidebar from "@/components/Layout/Sidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function TutorialPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 5;

    // Function to handle navigation
    const navigateStep = (direction: 'next' | 'prev') => {
        if (direction === 'next' && currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        } else if (direction === 'prev' && currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    // Content for each step
    const stepContent = [
        // Step 1
        {
            title: "Welcome to EDU Chain",
            description: "Learn how to stake tokens and earn rewards through education",
            content: (
                <div className="space-y-6">
                    <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                        <Play className="h-16 w-16 text-white bg-[#0056E0]/80 p-4 rounded-full" />
                    </div>
                    <div className="prose max-w-none">
                        <p>
                            Welcome to the EDU Chain tutorial! This guide will walk you through the process of staking your
                            EDU tokens and earning rewards by completing educational courses. Our platform combines the best
                            aspects of blockchain staking with educational incentives.
                        </p>
                        <h3>What you'll learn in this tutorial:</h3>
                        <ul>
                            <li>How to connect your wallet to EDU Chain</li>
                            <li>How to stake your EDU tokens</li>
                            <li>How to enroll in educational courses</li>
                            <li>How to track your rewards and boost your staking multiplier</li>
                            <li>How to participate in learning circles (for PRO members)</li>
                        </ul>
                        <p>
                            Let's get started with connecting your wallet and navigating the platform!
                        </p>
                    </div>
                </div>
            )
        },
        // Step 2
        {
            title: "Connecting Your Wallet",
            description: "Set up your wallet to interact with EDU Chain",
            content: (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-200 rounded-lg p-4 flex items-center justify-center">
                            <p className="text-gray-500">Wallet Connection Demo</p>
                        </div>
                        <div className="prose max-w-none">
                            <h3>Connect Your Wallet</h3>
                            <p>
                                To get started with EDU Chain, you need to connect your cryptocurrency wallet.
                                We support multiple wallet providers:
                            </p>
                            <ul>
                                <li>MetaMask</li>
                                <li>WalletConnect</li>
                                <li>Coinbase Wallet</li>
                                <li>Trust Wallet</li>
                            </ul>
                            <p>
                                Simply click on the "Connect Wallet" button in the top-right corner of the dashboard and
                                select your preferred wallet provider.
                            </p>
                        </div>
                    </div>

                    <Card className="border-[#0056E0]/20 bg-[#0056E0]/5">
                        <CardContent className="pt-6">
                            <div className="flex items-start">
                                <HelpCircle className="h-5 w-5 text-[#0056E0] mt-0.5 mr-2" />
                                <div>
                                    <h4 className="font-medium text-[#0056E0] mb-1">Wallet Security Tip</h4>
                                    <p className="text-sm text-gray-700">
                                        Always ensure you're on the official EDU Chain website (https://educhain.com)
                                        before connecting your wallet. Be cautious of phishing attempts and never share
                                        your private keys or recovery phrases with anyone.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )
        },
        // Step 3
        {
            title: "Staking Your Tokens",
            description: "Learn how to stake EDU tokens and select the right pool",
            content: (
                <div className="space-y-6">
                    <div className="prose max-w-none">
                        <h3>Choose a Staking Pool</h3>
                        <p>
                            EDU Chain offers several staking pools, each with different requirements, lock periods,
                            and reward structures. Here's how to select the right pool for you:
                        </p>

                        <ol>
                            <li>Navigate to the "Staking Pools" section in the sidebar</li>
                            <li>Review the available pools and their characteristics</li>
                            <li>Consider your investment timeline and educational goals</li>
                            <li>Select a pool that aligns with your preferences</li>
                        </ol>

                        <h3>Stake Your Tokens</h3>
                        <p>
                            Once you've selected a pool, you can stake your tokens by:
                        </p>

                        <ol>
                            <li>Clicking on the "Stake Now" button</li>
                            <li>Entering the amount of EDU tokens you wish to stake</li>
                            <li>Confirming the transaction in your wallet</li>
                            <li>Waiting for the transaction to be confirmed on the blockchain</li>
                        </ol>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base">Beginner Pool</CardTitle>
                                <CardDescription>For new users</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Base APY:</span>
                                        <span className="font-medium">10%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Lock Period:</span>
                                        <span className="font-medium">30 days</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Min Stake:</span>
                                        <span className="font-medium">100 EDU</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base">Intermediate Pool</CardTitle>
                                <CardDescription>Balanced option</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Base APY:</span>
                                        <span className="font-medium">12%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Lock Period:</span>
                                        <span className="font-medium">60 days</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Min Stake:</span>
                                        <span className="font-medium">250 EDU</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base">Advanced Pool</CardTitle>
                                <CardDescription>For high rewards</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Base APY:</span>
                                        <span className="font-medium">15%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Lock Period:</span>
                                        <span className="font-medium">90 days</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Min Stake:</span>
                                        <span className="font-medium">500 EDU</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )
        },
        // Step 4
        {
            title: "Educational Courses",
            description: "Learn how to boost your rewards through education",
            content: (
                <div className="space-y-6">
                    <div className="prose max-w-none">
                        <h3>Boost Your Rewards with Education</h3>
                        <p>
                            EDU Chain's unique feature is the ability to increase your staking rewards by completing
                            educational courses. The more you learn, the higher your staking multiplier becomes.
                        </p>

                        <h3>How the Multiplier Works</h3>
                        <p>
                            Each educational course you complete contributes to your staking multiplier. For example:
                        </p>
                        <ul>
                            <li>Completing "Blockchain 101" adds a 0.1x boost</li>
                            <li>Completing "DeFi Fundamentals" adds a 0.2x boost</li>
                            <li>Completing "Smart Contract Development" adds a 0.3x boost</li>
                        </ul>
                        <p>
                            These boosts are cumulative, allowing you to potentially double or even triple your
                            staking rewards based on your educational achievements.
                        </p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h4 className="font-medium text-lg mb-4">Example Calculation</h4>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span>Base APY (Advanced Pool)</span>
                                    <span className="font-medium">15%</span>
                                </div>
                                <div className="flex justify-between mb-1">
                                    <span>Educational Boost</span>
                                    <span className="font-medium text-[#0056E0]">+1.2x</span>
                                </div>
                                <Separator className="my-2" />
                                <div className="flex justify-between">
                                    <span className="font-medium">Effective APY</span>
                                    <span className="font-medium text-[#50C878]">33%</span>
                                </div>
                            </div>

                            <div className="text-sm text-gray-600">
                                <p className="mb-2">With 500 EDU staked at 33% APY:</p>
                                <div className="flex justify-between">
                                    <span>Annual Earnings</span>
                                    <span className="font-medium">165 EDU</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Monthly Earnings</span>
                                    <span className="font-medium">13.75 EDU</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Card className="border-[#50C878]/20 bg-[#50C878]/5">
                        <CardContent className="pt-6">
                            <div className="flex items-start">
                                <CheckCircle className="h-5 w-5 text-[#50C878] mt-0.5 mr-2" />
                                <div>
                                    <h4 className="font-medium text-[#50C878] mb-1">Pro Tip</h4>
                                    <p className="text-sm text-gray-700">
                                        Focus on completing courses that align with your staking pool's theme for
                                        maximum boost. For example, the "DeFi Scholar" pool offers higher boosts for
                                        DeFi-related educational content.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )
        },
        // Step 5
        {
            title: "Tracking & Managing Rewards",
            description: "Learn how to monitor and optimize your earnings",
            content: (
                <div className="space-y-6">
                    <div className="prose max-w-none">
                        <h3>Monitoring Your Rewards</h3>
                        <p>
                            You can track your staking rewards and educational achievements in several places:
                        </p>
                        <ul>
                            <li><strong>Dashboard:</strong> Overview of your current stakes and rewards</li>
                            <li><strong>My Stakes:</strong> Detailed view of each active stake</li>
                            <li><strong>Learning Center:</strong> Progress on educational courses and multipliers</li>
                            <li><strong>Transaction History:</strong> Record of all staking and reward transactions</li>
                        </ul>

                        <h3>Optimizing Your Strategy</h3>
                        <p>
                            To maximize your staking rewards on EDU Chain, consider these strategies:
                        </p>
                        <ol>
                            <li>Complete educational courses relevant to your staking pool</li>
                            <li>Stake for longer periods to benefit from higher base APYs</li>
                            <li>Enable compound rewards when available</li>
                            <li>Join learning circles for additional boosts (PRO feature)</li>
                            <li>Participate in educational challenges for bonus multipliers</li>
                        </ol>
                    </div>

                    <div className="bg-gradient-to-r from-[#0056E0] to-[#00E5BF] rounded-lg p-6 text-white">
                        <h3 className="text-xl font-bold mb-4">Ready to Start Your Journey?</h3>
                        <p className="opacity-90 mb-6">
                            Now that you understand how EDU Chain works, it's time to start staking, learning, and earning!
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button className="bg-white text-[#0056E0] hover:bg-white/90">
                                Start Staking
                            </Button>
                            <Button variant="outline" className="text-white border-white/30 hover:bg-white/10">
                                Explore Courses
                            </Button>
                        </div>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Additional Resources</CardTitle>
                            <CardDescription>Continue your learning journey with these resources</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <BookOpen className="h-5 w-5 text-[#0056E0] mt-0.5 mr-3" />
                                    <div>
                                        <h4 className="font-medium">Documentation</h4>
                                        <p className="text-sm text-gray-600">Comprehensive guides and reference materials</p>
                                        <Button variant="link" className="p-0 h-auto text-[#0056E0]">
                                            View Documentation
                                        </Button>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <Code className="h-5 w-5 text-[#0056E0] mt-0.5 mr-3" />
                                    <div>
                                        <h4 className="font-medium">API References</h4>
                                        <p className="text-sm text-gray-600">Technical documentation for developers</p>
                                        <Button variant="link" className="p-0 h-auto text-[#0056E0]">
                                            Explore APIs
                                        </Button>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <ClipboardCopy className="h-5 w-5 text-[#0056E0] mt-0.5 mr-3" />
                                    <div>
                                        <h4 className="font-medium">Staking Calculator</h4>
                                        <p className="text-sm text-gray-600">Estimate your potential earnings</p>
                                        <Button variant="link" className="p-0 h-auto text-[#0056E0]">
                                            Open Calculator
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex">
                <Sidebar />
                <main className="flex-1 pt-20 px-6 max-w-6xl mx-auto pb-12">
                    {/* Page Header */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">EDU Chain Tutorial</h1>
                        <p className="text-gray-600 mt-1">Learn how to use the platform to stake tokens and earn rewards</p>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">Progress</span>
                            <span className="text-sm font-medium">{currentStep} of {totalSteps}</span>
                        </div>
                        <div className="relative">
                            <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
                        </div>
                    </div>

                    {/* Step Navigation */}
                    <div className="flex items-center space-x-3 mb-6">
                        {Array.from({ length: totalSteps }).map((_, index) => (
                            <Button
                                key={index}
                                variant={currentStep === index + 1 ? "default" : "outline"}
                                className={`h-8 w-8 p-0 rounded-full ${currentStep === index + 1 ? "bg-[#0056E0]" : "text-gray-600"}`}
                                onClick={() => setCurrentStep(index + 1)}
                            >
                                {index + 1}
                            </Button>
                        ))}
                    </div>

                    {/* Content Card */}
                    <Card className="border-[#0056E0]/20 shadow-sm">
                        <CardHeader>
                            <div className="flex items-center">
                                <Badge className="bg-[#0056E0]/10 text-[#0056E0] hover:bg-[#0056E0]/20 border-none mr-3">
                                    Step {currentStep}
                                </Badge>
                                <div>
                                    <CardTitle>{stepContent[currentStep - 1].title}</CardTitle>
                                    <CardDescription>{stepContent[currentStep - 1].description}</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {stepContent[currentStep - 1].content}
                        </CardContent>
                        <CardFooter className="justify-between border-t pt-6">
                            <Button
                                variant="outline"
                                onClick={() => navigateStep('prev')}
                                disabled={currentStep === 1}
                                className="flex items-center"
                            >
                                <ChevronLeft className="mr-2 h-4 w-4" />
                                Previous Step
                            </Button>

                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    className="border-[#0056E0]/30 text-[#0056E0]"
                                >
                                    <Download className="mr-2 h-4 w-4" />
                                    Download Guide
                                </Button>

                                <Button
                                    onClick={() => navigateStep('next')}
                                    disabled={currentStep === totalSteps}
                                    className="bg-gradient-to-r from-[#0056E0] to-[#00E5BF] hover:opacity-90 text-white"
                                >
                                    Next Step
                                    <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                </main>
            </div>
        </div>
    );
}