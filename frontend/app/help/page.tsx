"use client";

import { useState } from "react";
import {
    Search,
    ChevronDown,
    ChevronUp,
    MessageCircle,
    Mail,
    Lightbulb,
    BookOpen,
    Youtube,
    FileText,
    ArrowUpRight
} from "lucide-react";
import Sidebar from "@/components/Layout/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// FAQ Item Component
const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
    return (
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-b border-gray-200">
                <AccordionTrigger className="py-4 text-left font-medium hover:no-underline">
                    {question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-gray-600">
                    {answer}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

// Resource Card Component
const ResourceCard = ({
    icon,
    title,
    description,
    link
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
    link: string;
}) => {
    return (
        <Card className="hover:border-[#0056E0]/40 transition-all duration-300 hover:shadow-md">
            <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-[#0056E0]/10 to-[#00E5BF]/10 flex items-center justify-center mb-4">
                        {icon}
                    </div>
                    <h3 className="font-medium text-lg mb-2">{title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{description}</p>
                    <Button className="bg-gradient-to-r from-[#0056E0] to-[#00E5BF] hover:opacity-90 text-white w-full">
                        <span>{title}</span>
                        <ArrowUpRight className="h-4 w-4 ml-2" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default function HelpPage() {
    const [searchQuery, setSearchQuery] = useState("");

    // Sample FAQ data
    const faqData = [
        {
            question: "What is EDU Chain?",
            answer: "EDU Chain is a blockchain platform that combines education with staking. Users can earn rewards by completing educational courses, which in turn increase their staking multipliers."
        },
        {
            question: "How do staking multipliers work?",
            answer: "Staking multipliers increase your base APY when staking EDU tokens. By completing educational courses and earning achievements, you can boost your multiplier up to 2.5x, significantly increasing your staking rewards."
        },
        {
            question: "How do I connect my wallet?",
            answer: "To connect your wallet, click on the 'Connect Wallet' button in the top right corner of the dashboard. We support MetaMask, WalletConnect, and other popular Ethereum-compatible wallets."
        },
        {
            question: "Can I unstake my tokens at any time?",
            answer: "Each staking pool has a specific lock period, ranging from 30 to 120 days. Once the lock period ends, you can unstake your tokens. Some pools may have early unstaking options with a penalty fee."
        },
        {
            question: "How are educational rewards calculated?",
            answer: "Educational rewards are calculated based on the completion of courses and learning paths. Each course has a set number of points, and your overall learning progress contributes to your staking multiplier."
        },
        {
            question: "What happens if I don't complete a course?",
            answer: "There's no penalty for not completing a course. However, you won't earn the associated rewards or multiplier boosts. You can always come back and continue where you left off."
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex">
                <Sidebar />
                <main className="flex-1 pt-20 px-6 max-w-6xl mx-auto pb-12">
                    {/* Page Header */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">Help Center</h1>
                        <p className="text-gray-600 mt-1">Find answers to your questions and get support</p>
                    </div>

                    {/* Search */}
                    <div className="relative mb-8 max-w-2xl mx-auto">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                            placeholder="Search for help topics..."
                            className="pl-10 py-6 text-lg"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <Tabs defaultValue="faq" className="space-y-8">
                        <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
                            <TabsTrigger value="faq">FAQs</TabsTrigger>
                            <TabsTrigger value="resources">Resources</TabsTrigger>
                            <TabsTrigger value="contact">Contact Us</TabsTrigger>
                        </TabsList>

                        <TabsContent value="faq" className="mt-0">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Frequently Asked Questions</CardTitle>
                                    <CardDescription>Find quick answers to common questions</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {faqData.map((faq, index) => (
                                            <FAQItem
                                                key={index}
                                                question={faq.question}
                                                answer={faq.answer}
                                            />
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="resources" className="mt-0">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <ResourceCard
                                    icon={<BookOpen className="h-6 w-6 text-[#0056E0]" />}
                                    title="Documentation"
                                    description="Comprehensive guides on how to use EDU Chain"
                                    link="#"
                                />
                                <ResourceCard
                                    icon={<Youtube className="h-6 w-6 text-[#0056E0]" />}
                                    title="Video Tutorials"
                                    description="Step-by-step video guides for beginners"
                                    link="#"
                                />
                                <ResourceCard
                                    icon={<FileText className="h-6 w-6 text-[#0056E0]" />}
                                    title="API Reference"
                                    description="Technical documentation for developers"
                                    link="#"
                                />
                                <ResourceCard
                                    icon={<Lightbulb className="h-6 w-6 text-[#0056E0]" />}
                                    title="Knowledge Base"
                                    description="In-depth articles and tutorials"
                                    link="#"
                                />
                            </div>

                            <Card className="mt-8">
                                <CardHeader>
                                    <CardTitle>Latest Articles</CardTitle>
                                    <CardDescription>Read our most recent guides and announcements</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="border-b border-gray-100 pb-4">
                                            <h3 className="font-medium mb-1">Getting Started with EDU Chain Staking</h3>
                                            <p className="text-sm text-gray-600 mb-2">A beginner's guide to staking and earning rewards</p>
                                            <Button variant="link" className="text-[#0056E0] p-0 h-auto">
                                                Read Article
                                            </Button>
                                        </div>
                                        <div className="border-b border-gray-100 pb-4">
                                            <h3 className="font-medium mb-1">How to Maximize Your Learning Multipliers</h3>
                                            <p className="text-sm text-gray-600 mb-2">Strategies to optimize your staking returns</p>
                                            <Button variant="link" className="text-[#0056E0] p-0 h-auto">
                                                Read Article
                                            </Button>
                                        </div>
                                        <div>
                                            <h3 className="font-medium mb-1">Understanding Learning Paths</h3>
                                            <p className="text-sm text-gray-600 mb-2">How to progress through structured learning paths</p>
                                            <Button variant="link" className="text-[#0056E0] p-0 h-auto">
                                                Read Article
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="contact" className="mt-0">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <Card className="lg:col-span-2">
                                    <CardHeader>
                                        <CardTitle>Contact Support</CardTitle>
                                        <CardDescription>Fill out the form below and we'll get back to you</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <form className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium">Name</label>
                                                    <Input placeholder="Your name" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium">Email</label>
                                                    <Input placeholder="Your email" />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Subject</label>
                                                <Input placeholder="What's this about?" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Message</label>
                                                <Textarea
                                                    placeholder="Please describe your issue in detail"
                                                    rows={5}
                                                />
                                            </div>
                                            <div className="pt-4">
                                                <Button className="w-full md:w-auto bg-gradient-to-r from-[#0056E0] to-[#00E5BF] hover:opacity-90 text-white">
                                                    <Mail className="h-4 w-4 mr-2" />
                                                    Submit Ticket
                                                </Button>
                                            </div>
                                        </form>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Contact Options</CardTitle>
                                        <CardDescription>Other ways to get in touch</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div>
                                            <h3 className="font-medium mb-2 flex items-center">
                                                <Mail className="h-4 w-4 mr-2 text-[#0056E0]" />
                                                Email Support
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                For general inquiries, email us at:
                                                <a href="mailto:support@educhain.com" className="text-[#0056E0] block mt-1">
                                                    support@educhain.com
                                                </a>
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="font-medium mb-2 flex items-center">
                                                <MessageCircle className="h-4 w-4 mr-2 text-[#0056E0]" />
                                                Live Chat
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                Chat with our support team during business hours.
                                            </p>
                                            <Button className="mt-2 w-full bg-gradient-to-r from-[#0056E0] to-[#00E5BF] hover:opacity-90 text-white">
                                                Start Chat
                                            </Button>
                                        </div>

                                        <div className="bg-gradient-to-r from-[#0056E0]/5 to-[#00E5BF]/5 rounded-lg p-4">
                                            <h3 className="font-medium mb-2">Response Times</h3>
                                            <p className="text-sm text-gray-600">
                                                We typically respond to email inquiries within 24 hours and support tickets within 12 hours.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                    </Tabs>
                </main>
            </div>
        </div>
    );
}