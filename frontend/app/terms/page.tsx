"use client";

import Link from "next/link";
import {
    FileText,
    Scale,
    AlertTriangle,
    Shield,
    Globe,
    MessageCircle,
    MailIcon,
    ArrowLeft,
    Printer
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// ... continuing from the previous Terms and Conditions code
export default function TermsAndConditionsPage() {
    const currentDate = new Date();
    const formattedDate = `${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-6 py-12">
                <div className="flex justify-between items-center mb-8">
                    <Link href="/">
                        <Button variant="ghost" className="flex items-center">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Home
                        </Button>
                    </Link>
                    <Button variant="ghost" className="flex items-center" onClick={() => window.print()}>
                        <Printer className="h-4 w-4 mr-2" />
                        Print
                    </Button>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-sm">
                    <div className="flex items-center mb-6">
                        <FileText className="h-8 w-8 text-[#0056E0] mr-3" />
                        <h1 className="text-3xl font-bold text-gray-900">Terms and Conditions</h1>
                    </div>

                    <div className="text-sm text-gray-500 mb-8">
                        <p>Last Updated: {formattedDate}</p>
                    </div>

                    <div className="prose max-w-none text-gray-700">
                        <p className="lead text-lg">
                            Welcome to EDU Chain. These Terms and Conditions govern your use of our platform,
                            services, and products. By accessing or using EDU Chain, you agree to be bound by
                            these Terms.
                        </p>

                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="text-xl font-bold py-4 flex items-center">
                                    <Scale className="h-5 w-5 mr-2 text-[#0056E0]" />
                                    Agreement to Terms
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-700">
                                    <p>
                                        By accessing or using the EDU Chain platform, you agree to be bound by these
                                        Terms and Conditions and all applicable laws and regulations. If you do not
                                        agree with any of these terms, you are prohibited from using or accessing this
                                        platform.
                                    </p>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-2">
                                <AccordionTrigger className="text-xl font-bold py-4 flex items-center">
                                    <Globe className="h-5 w-5 mr-2 text-[#0056E0]" />
                                    Platform Use
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-700">
                                    <p>
                                        EDU Chain provides an educational platform combined with staking mechanisms.
                                        Users can earn rewards by completing educational courses and staking EDU tokens.
                                    </p>
                                    <ul className="list-disc pl-6 space-y-2 mt-4">
                                        <li>You must be at least 18 years old to use the platform.</li>
                                        <li>You are responsible for maintaining the confidentiality of your account information.</li>
                                        <li>You agree not to share your account credentials with any third party.</li>
                                        <li>You are responsible for all activities that occur under your account.</li>
                                        <li>You agree to use the platform for lawful purposes only.</li>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-3">
                                <AccordionTrigger className="text-xl font-bold py-4 flex items-center">
                                    <AlertTriangle className="h-5 w-5 mr-2 text-[#0056E0]" />
                                    Risk Disclosure
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-700">
                                    <p>
                                        Using EDU Chain involves significant risks, including but not limited to:
                                    </p>
                                    <ul className="list-disc pl-6 space-y-2 mt-4">
                                        <li>Cryptocurrency price volatility</li>
                                        <li>Smart contract vulnerabilities</li>
                                        <li>Regulatory uncertainty</li>
                                        <li>Technical and operational risks</li>
                                        <li>Market liquidity risks</li>
                                    </ul>
                                    <p className="mt-4">
                                        You acknowledge and accept these risks when using our platform. Do not stake
                                        funds that you cannot afford to lose.
                                    </p>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-4">
                                <AccordionTrigger className="text-xl font-bold py-4 flex items-center">
                                    <Shield className="h-5 w-5 mr-2 text-[#0056E0]" />
                                    Intellectual Property
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-700">
                                    <p>
                                        All content on the EDU Chain platform, including but not limited to text,
                                        graphics, logos, icons, images, audio clips, digital downloads, and software,
                                        is the property of EDU Chain or its content suppliers and is protected by
                                        international copyright laws.
                                    </p>
                                    <p className="mt-4">
                                        Educational content is provided for your personal, non-commercial use only.
                                        You may not modify, reproduce, distribute, or create derivative works based
                                        on any platform content without express written consent from EDU Chain.
                                    </p>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-5">
                                <AccordionTrigger className="text-xl font-bold py-4 flex items-center">
                                    <MessageCircle className="h-5 w-5 mr-2 text-[#0056E0]" />
                                    Contact Us
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-700">
                                    <p>
                                        If you have any questions about these Terms and Conditions, please contact us at:
                                    </p>
                                    <div className="bg-gray-50 p-4 rounded-md mt-4">
                                        <p className="flex items-center">
                                            <MailIcon className="h-4 w-4 text-[#0056E0] mr-2" />
                                            <a href="mailto:legal@educhain.com" className="text-[#0056E0]">legal@educhain.com</a>
                                        </p>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                        <Separator className="my-8" />

                        <div className="text-sm text-gray-500 text-center">
                            <p>© {currentDate.getFullYear()} EDU Chain. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}