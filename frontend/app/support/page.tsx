"use client";

import { useState } from "react";
import {
    MessageSquare,
    MailIcon,
    Phone,
    BookOpen,
    Search,
    CheckCircle,
    Zap,
    Lightbulb,
    Github,
    Twitter,
    MessageCircle,
    FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Sidebar from "@/components/Layout/Sidebar";

export default function SupportPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [messageSent, setMessageSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate sending the message
        setTimeout(() => {
            setMessageSent(true);
            // Reset form fields if needed
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex">
                <Sidebar />
                <main className="flex-1 pt-20 px-6 max-w-6xl mx-auto pb-12">
                    {/* Page Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Support Center</h1>
                        <p className="text-gray-600 mt-1">Get help with EduStake platform issues and questions</p>
                    </div>

                    {/* Search Section */}
                    <div className="bg-gradient-to-r from-[#0056E0] to-[#00E5BF] rounded-lg p-8 mb-10">
                        <div className="max-w-2xl mx-auto text-center text-white">
                            <h2 className="text-2xl font-bold mb-4">How can we help you today?</h2>
                            <p className="mb-6 opacity-90">
                                Search our knowledge base for quick answers or contact our support team
                            </p>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input
                                    placeholder="Search for help articles..."
                                    className="pl-10 py-6 text-gray-800"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        <Card className="border border-gray-200 hover:border-[#0056E0]/40 transition-all duration-300 hover:shadow-md">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg flex items-center">
                                    <BookOpen className="h-5 w-5 mr-2 text-[#0056E0]" />
                                    Documentation
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-gray-600">
                                <p>Comprehensive guides on how to use all features of the EduStake platform.</p>
                            </CardContent>
                            <CardFooter>
                                <Button variant="link" className="p-0 h-auto text-[#0056E0]">
                                    View Documentation
                                </Button>
                            </CardFooter>
                        </Card>

                        <Card className="border border-gray-200 hover:border-[#0056E0]/40 transition-all duration-300 hover:shadow-md">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg flex items-center">
                                    <FileText className="h-5 w-5 mr-2 text-[#0056E0]" />
                                    Tutorials
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-gray-600">
                                <p>Step-by-step tutorials on staking, learning, and earning rewards.</p>
                            </CardContent>
                            <CardFooter>
                                <Button variant="link" className="p-0 h-auto text-[#0056E0]">
                                    View Tutorials
                                </Button>
                            </CardFooter>
                        </Card>

                        <Card className="border border-gray-200 hover:border-[#0056E0]/40 transition-all duration-300 hover:shadow-md">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg flex items-center">
                                    <MessageCircle className="h-5 w-5 mr-2 text-[#0056E0]" />
                                    Community Forum
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-gray-600">
                                <p>Join discussions and get help from other EduStake community members.</p>
                            </CardContent>
                            <CardFooter>
                                <Button variant="link" className="p-0 h-auto text-[#0056E0]">
                                    Visit Forum
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>

                    {/* FAQ & Contact Tabs */}
                    <Tabs defaultValue="faq" className="mb-10">
                        <TabsList className="mb-6">
                            <TabsTrigger value="faq">Frequently Asked Questions</TabsTrigger>
                            <TabsTrigger value="contact">Contact Support</TabsTrigger>
                        </TabsList>

                        <TabsContent value="faq">
                            <div className="mb-6">
                                <h3 className="text-xl font-bold mb-4">Common Questions</h3>
                                <p className="text-gray-600 mb-6">
                                    Find quick answers to the most common questions about using EduStake.
                                </p>

                                <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger>How do educational multipliers work?</AccordionTrigger>
                                        <AccordionContent>
                                            <p className="text-gray-600 mb-2">
                                                Educational multipliers increase your staking rewards based on the courses you complete. For example, if you have a 1.3x multiplier and would normally earn 100 EDU tokens, you'll instead earn 130 EDU tokens.
                                            </p>
                                            <p className="text-gray-600">
                                                Multipliers from different courses stack additively, up to a maximum of 2.0x on most pools.
                                            </p>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-2">
                                        <AccordionTrigger>What happens if I withdraw my stake early?</AccordionTrigger>
                                        <AccordionContent>
                                            <p className="text-gray-600">
                                                Early withdrawals are subject to a fee that decreases over time. The fee starts at 10% and decreases linearly until the end of the lock period. For example, if you withdraw halfway through your lock period, you'll pay a 5% fee on your staked amount.
                                            </p>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-3">
                                        <AccordionTrigger>How do I connect my wallet to EduStake?</AccordionTrigger>
                                        <AccordionContent>
                                            <p className="text-gray-600 mb-2">
                                                To connect your wallet to EduStake:
                                            </p>
                                            <ol className="list-decimal pl-5 space-y-1 text-gray-600">
                                                <li>Click the "Connect Wallet" button in the top right corner</li>
                                                <li>Select your preferred wallet provider (MetaMask, WalletConnect, etc.)</li>
                                                <li>Follow the prompts in your wallet to approve the connection</li>
                                                <li>Once connected, your wallet address will appear in the header</li>
                                            </ol>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-4">
                                        <AccordionTrigger>Can I transfer my educational achievements to another account?</AccordionTrigger>
                                        <AccordionContent>
                                            <p className="text-gray-600">
                                                Educational achievements are linked to your specific account and cannot be transferred. However, they are recorded on the blockchain, so they remain with you even if you change wallets by connecting your new wallet to your existing account.
                                            </p>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-5">
                                        <AccordionTrigger>How are course completion rewards calculated?</AccordionTrigger>
                                        <AccordionContent>
                                            <p className="text-gray-600">
                                                Course completion rewards include both direct token rewards and staking multiplier boosts. Direct rewards are fixed amounts of EDU tokens earned upon completion, while multiplier boosts increase your staking APY across all active stakes. The exact values vary by course, with more advanced courses typically offering higher rewards.
                                            </p>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Card className="bg-[#0056E0]/5 border-none">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-base flex items-center">
                                            <Lightbulb className="h-5 w-5 mr-2 text-[#0056E0]" />
                                            Staking FAQs
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-sm">
                                        <ul className="space-y-2">
                                            <li>
                                                <a href="#" className="text-[#0056E0] hover:underline">Understanding lock periods</a>
                                            </li>
                                            <li>
                                                <a href="#" className="text-[#0056E0] hover:underline">Staking rewards calculation</a>
                                            </li>
                                            <li>
                                                <a href="#" className="text-[#0056E0] hover:underline">Pool selection guide</a>
                                            </li>
                                        </ul>
                                    </CardContent>
                                </Card>

                                <Card className="bg-[#0056E0]/5 border-none">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-base flex items-center">
                                            <Zap className="h-5 w-5 mr-2 text-[#0056E0]" />
                                            Educational Content
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-sm">
                                        <ul className="space-y-2">
                                            <li>
                                                <a href="#" className="text-[#0056E0] hover:underline">Course completion requirements</a>
                                            </li>
                                            <li>
                                                <a href="#" className="text-[#0056E0] hover:underline">Learning paths explained</a>
                                            </li>
                                            <li>
                                                <a href="#" className="text-[#0056E0] hover:underline">Verification process</a>
                                            </li>
                                        </ul>
                                    </CardContent>
                                </Card>

                                <Card className="bg-[#0056E0]/5 border-none">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-base flex items-center">
                                            <Github className="h-5 w-5 mr-2 text-[#0056E0]" />
                                            Technical Support
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-sm">
                                        <ul className="space-y-2">
                                            <li>
                                                <a href="#" className="text-[#0056E0] hover:underline">Wallet connection issues</a>
                                            </li>
                                            <li>
                                                <a href="#" className="text-[#0056E0] hover:underline">Transaction failures</a>
                                            </li>
                                            <li>
                                                <a href="#" className="text-[#0056E0] hover:underline">API integration help</a>
                                            </li>
                                        </ul>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        <TabsContent value="contact">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="md:col-span-2">
                                    <h3 className="text-xl font-bold mb-4">Send Us a Message</h3>
                                    <p className="text-gray-600 mb-6">
                                        Fill out the form below and our support team will get back to you as soon as possible.
                                    </p>

                                    {messageSent ? (
                                        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                                            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                                            <h4 className="text-lg font-medium text-green-800 mb-2">Message Sent Successfully</h4>
                                            <p className="text-green-700">
                                                Thank you for reaching out! Our support team will respond to your inquiry within 24 hours.
                                            </p>
                                            <Button
                                                className="mt-4 bg-green-600 hover:bg-green-700 text-white"
                                                onClick={() => setMessageSent(false)}
                                            >
                                                Send Another Message
                                            </Button>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit}>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                <div>
                                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                                        Name
                                                    </label>
                                                    <Input id="name" placeholder="Your name" required />
                                                </div>
                                                <div>
                                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                                        Email
                                                    </label>
                                                    <Input id="email" type="email" placeholder="Your email address" required />
                                                </div>
                                            </div>

                                            <div className="mb-4">
                                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Subject
                                                </label>
                                                <Input id="subject" placeholder="What is your question about?" required />
                                            </div>

                                            <div className="mb-4">
                                                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Category
                                                </label>
                                                <select
                                                    id="category"
                                                    className="w-full rounded-md border border-gray-300 p-2 text-gray-900 shadow-sm focus:border-[#0056E0] focus:ring-[#0056E0]"
                                                    required
                                                >
                                                    <option value="">Select a category</option>
                                                    <option value="staking">Staking Issues</option>
                                                    <option value="wallet">Wallet Connection</option>
                                                    <option value="education">Educational Content</option>
                                                    <option value="rewards">Rewards & Multipliers</option>
                                                    <option value="technical">Technical Problems</option>
                                                    <option value="other">Other</option>
                                                </select>
                                            </div>

                                            <div className="mb-6">
                                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Message
                                                </label>
                                                <Textarea
                                                    id="message"
                                                    placeholder="Describe your issue or question in detail..."
                                                    rows={6}
                                                    required
                                                />
                                            </div>

                                            <div className="flex items-center mb-6">
                                                <input
                                                    id="terms"
                                                    type="checkbox"
                                                    className="h-4 w-4 rounded border-gray-300 text-[#0056E0] focus:ring-[#0056E0]"
                                                    required
                                                />
                                                <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
                                                    I agree to the processing of my personal data in accordance with the <a href="#" className="text-[#0056E0] hover:underline">Privacy Policy</a>
                                                </label>
                                            </div>

                                            <Button
                                                type="submit"
                                                className="w-full bg-gradient-to-r from-[#0056E0] to-[#00E5BF] hover:opacity-90 text-white"
                                            >
                                                Send Message
                                            </Button>
                                        </form>
                                    )}
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                                    <p className="text-gray-600 mb-6">
                                        You can also reach us through these channels:
                                    </p>

                                    <div className="space-y-4 mb-8">
                                        <div className="flex items-start">
                                            <MailIcon className="h-5 w-5 text-[#0056E0] mt-1 mr-3" />
                                            <div>
                                                <h4 className="font-medium">Email</h4>
                                                <p className="text-sm text-gray-600">support@edustack.io</p>
                                                <p className="text-sm text-gray-500">Response time: 24 hours</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start">
                                            <MessageSquare className="h-5 w-5 text-[#0056E0] mt-1 mr-3" />
                                            <div>
                                                <h4 className="font-medium">Live Chat</h4>
                                                <p className="text-sm text-gray-600">Available on weekdays</p>
                                                <p className="text-sm text-gray-500">9:00 AM - 5:00 PM UTC</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start">
                                            <Phone className="h-5 w-5 text-[#0056E0] mt-1 mr-3" />
                                            <div>
                                                <h4 className="font-medium">Phone</h4>
                                                <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
                                                <p className="text-sm text-gray-500">For premium support only</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-[#0056E0]/5 p-4 rounded-lg">
                                        <h4 className="font-medium mb-2">Connect with Us</h4>
                                        <div className="flex space-x-3">
                                            <Button variant="outline" size="icon" className="h-9 w-9 rounded-full">
                                                <Twitter className="h-4 w-4" />
                                            </Button>
                                            <Button variant="outline" size="icon" className="h-9 w-9 rounded-full">
                                                <Github className="h-4 w-4" />
                                            </Button>
                                            <Button variant="outline" size="icon" className="h-9 w-9 rounded-full">
                                                <MessageCircle className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </main>
            </div>
        </div>
    );
}