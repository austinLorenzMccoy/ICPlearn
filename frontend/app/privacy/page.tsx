"use client";

import Link from "next/link";
import {
    Shield,
    Lock,
    Eye,
    Database,
    Trash,
    MessageCircle,
    Globe,
    Mail,
    Calendar,
    ArrowLeft,
    Printer,
    Cpu,
    Vote,
    GraduationCap,
    Coins
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function ICPPrivacyPolicyPage() {
    const currentDate = new Date();
    const formattedDate = `${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <div className="max-w-4xl mx-auto px-6 py-12">
                <div className="flex justify-between items-center mb-8">
                    <Link href="/">
                        <Button variant="ghost" className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Home
                        </Button>
                    </Link>
                    <Button 
                        variant="ghost" 
                        className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" 
                        onClick={() => window.print()}
                    >
                        <Printer className="h-4 w-4 mr-2" />
                        Print
                    </Button>
                </div>

                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center mb-6">
                        <Shield className="h-8 w-8 text-[#3B00B9] dark:text-[#29ABE2] mr-3" />
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Privacy Policy</h1>
                    </div>

                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                        <p>Last Updated: {formattedDate}</p>
                    </div>

                    <div className="prose max-w-none text-gray-700 dark:text-gray-300">
                        <p className="lead text-lg text-gray-800 dark:text-gray-200">
                            At ICP Learn & Stake, we take your privacy seriously. This Privacy Policy explains how we collect, use,
                            disclose, and safeguard your information when you use our Internet Computer Protocol (ICP) educational platform.
                        </p>

                        <h2 className="text-xl font-bold mt-8 mb-4 flex items-center text-gray-900 dark:text-white">
                            <Database className="h-5 w-5 mr-2 text-[#3B00B9] dark:text-[#29ABE2]" />
                            Information We Collect
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            We collect information that you provide directly to us when you:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                            <li>Register for an account on our platform</li>
                            <li>Connect your Internet Identity or other ICP-compatible wallet</li>
                            <li>Participate in ICP educational courses and assessments</li>
                            <li>Create neurons and stake ICP tokens</li>
                            <li>Participate in Network Nervous System (NNS) governance</li>
                            <li>Communicate with our support team</li>
                            <li>Complete your learner profile and achievements</li>
                        </ul>

                        <p className="mt-4 text-gray-700 dark:text-gray-300">
                            This information may include:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                            <li>Internet Identity principal and authentication data</li>
                            <li>ICP wallet addresses and neuron identifiers</li>
                            <li>Transaction history on the Internet Computer blockchain</li>
                            <li>Educational progress, course completions, and learning achievements</li>
                            <li>Staking rewards, voting records, and governance participation</li>
                            <li>Communication history with our educational support team</li>
                            <li>Learning multiplier calculations and bonus reward distributions</li>
                        </ul>

                        <h2 className="text-xl font-bold mt-8 mb-4 flex items-center text-gray-900 dark:text-white">
                            <Eye className="h-5 w-5 mr-2 text-[#3B00B9] dark:text-[#29ABE2]" />
                            How We Use Your Information
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            We use the information we collect for various purposes, including to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                            <li>Provide, maintain, and improve the ICP Learn & Stake platform</li>
                            <li>Process neuron creation, staking transactions, and reward distributions</li>
                            <li>Track your ICP educational progress and calculate learning boost multipliers</li>
                            <li>Send notifications about your neurons, maturity rewards, and educational opportunities</li>
                            <li>Facilitate participation in Network Nervous System governance and voting</li>
                            <li>Respond to your questions about ICP concepts, staking, and canister development</li>
                            <li>Monitor platform usage and analyze learning effectiveness</li>
                            <li>Prevent fraudulent activities and enhance security across the IC ecosystem</li>
                            <li>Provide personalized learning recommendations based on your ICP knowledge level</li>
                        </ul>

                        <h2 className="text-xl font-bold mt-8 mb-4 flex items-center text-gray-900 dark:text-white">
                            <Cpu className="h-5 w-5 mr-2 text-[#3B00B9] dark:text-[#29ABE2]" />
                            ICP Blockchain Integration
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            Our platform integrates directly with the Internet Computer Protocol blockchain. This means:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                            <li>Your neuron data and staking transactions are recorded on the ICP blockchain</li>
                            <li>Voting records and governance participation are publicly visible on-chain</li>
                            <li>Learning reward distributions are processed through ICP canisters</li>
                            <li>Some information may be permanently stored on the decentralized Internet Computer network</li>
                            <li>We utilize Internet Identity for secure, privacy-preserving authentication</li>
                        </ul>

                        <h2 className="text-xl font-bold mt-8 mb-4 flex items-center text-gray-900 dark:text-white">
                            <Lock className="h-5 w-5 mr-2 text-[#3B00B9] dark:text-[#29ABE2]" />
                            Information Security
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            We implement appropriate technical and organizational measures to protect the security of
                            your personal information, leveraging ICP's built-in security features:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-2 text-gray-700 dark:text-gray-300">
                            <li>Internet Identity provides secure, anonymous authentication without storing personal data</li>
                            <li>All sensitive operations are secured by ICP's cryptographic protocols</li>
                            <li>Educational data is stored in secure canisters with proper access controls</li>
                            <li>We follow DFINITY Foundation security best practices for canister development</li>
                        </ul>
                        <p className="mt-4 text-gray-700 dark:text-gray-300">
                            However, please be aware that no security system is impenetrable, and we cannot guarantee 
                            the absolute security of your data, whether stored on traditional servers or on the blockchain.
                        </p>

                        <h2 className="text-xl font-bold mt-8 mb-4 flex items-center text-gray-900 dark:text-white">
                            <Vote className="h-5 w-5 mr-2 text-[#3B00B9] dark:text-[#29ABE2]" />
                            Governance and Transparency
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            As part of the ICP ecosystem, certain aspects of your platform usage contribute to network governance:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                            <li>Your voting participation through neurons is recorded on the NNS for transparency</li>
                            <li>Learning achievements may be represented as on-chain credentials or NFTs</li>
                            <li>Aggregate educational statistics may be shared to improve the ICP learning ecosystem</li>
                            <li>Platform improvements may be proposed and voted on through ICP governance mechanisms</li>
                        </ul>

                        <h2 className="text-xl font-bold mt-8 mb-4 flex items-center text-gray-900 dark:text-white">
                            <Globe className="h-5 w-5 mr-2 text-[#3B00B9] dark:text-[#29ABE2]" />
                            Decentralized Infrastructure
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            Our platform operates on the Internet Computer's decentralized infrastructure, which means:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                            <li>Data may be stored across multiple subnet blockchains globally</li>
                            <li>Some information becomes part of the permanent blockchain record</li>
                            <li>Data processing occurs in a decentralized manner across ICP nodes</li>
                            <li>Traditional data localization requirements may not apply to blockchain-stored data</li>
                        </ul>

                        <h2 className="text-xl font-bold mt-8 mb-4 flex items-center text-gray-900 dark:text-white">
                            <Trash className="h-5 w-5 mr-2 text-[#3B00B9] dark:text-[#29ABE2]" />
                            Your Data Rights
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            Depending on your location, you may have the following rights regarding your personal information:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                            <li>Access to your personal information and learning records</li>
                            <li>Correction of inaccurate or incomplete educational progress data</li>
                            <li>Deletion of your personal information (subject to blockchain immutability)</li>
                            <li>Restriction or objection to certain processing activities</li>
                            <li>Portability of your learning achievements and credentials</li>
                            <li>Withdrawal of consent for optional data processing</li>
                        </ul>
                        <p className="mt-4 text-gray-700 dark:text-gray-300">
                            <strong>Important:</strong> Some data stored on the ICP blockchain (such as transaction records and voting history) 
                            cannot be deleted due to the immutable nature of blockchain technology.
                        </p>

                        <h2 className="text-xl font-bold mt-8 mb-4 flex items-center text-gray-900 dark:text-white">
                            <GraduationCap className="h-5 w-5 mr-2 text-[#3B00B9] dark:text-[#29ABE2]" />
                            Educational Data Handling
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            Special considerations for educational information:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                            <li>Course progress and completion records are used to calculate staking multipliers</li>
                            <li>Learning achievements may be minted as verifiable credentials on ICP</li>
                            <li>Educational performance data helps improve course content and platform features</li>
                            <li>Anonymized learning analytics may be shared with ICP education partners</li>
                        </ul>

                        <h2 className="text-xl font-bold mt-8 mb-4 flex items-center text-gray-900 dark:text-white">
                            <Calendar className="h-5 w-5 mr-2 text-[#3B00B9] dark:text-[#29ABE2]" />
                            Policy Updates
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            We may update this Privacy Policy from time to time to reflect changes in our practices, 
                            ICP protocol updates, or for other operational, legal, or regulatory reasons. We will notify 
                            you of any material changes by posting the updated Privacy Policy on this page with a new 
                            "Last Updated" date and may also notify you through the platform or via your registered contact methods.
                        </p>

                        <h2 className="text-xl font-bold mt-8 mb-4 flex items-center text-gray-900 dark:text-white">
                            <MessageCircle className="h-5 w-5 mr-2 text-[#3B00B9] dark:text-[#29ABE2]" />
                            Contact Us
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            If you have any questions about this Privacy Policy, ICP blockchain interactions, or your data rights, please contact us at:
                        </p>
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md mt-4 border border-gray-200 dark:border-gray-600">
                            <p className="flex items-center text-gray-700 dark:text-gray-300">
                                <Mail className="h-4 w-4 text-[#3B00B9] dark:text-[#29ABE2] mr-2" />
                                <a href="mailto:privacy@icplearn.com" className="text-[#3B00B9] dark:text-[#29ABE2] hover:underline">
                                    privacy@icplearn.com
                                </a>
                            </p>
                            <p className="flex items-center mt-2 text-gray-700 dark:text-gray-300">
                                <Cpu className="h-4 w-4 text-[#3B00B9] dark:text-[#29ABE2] mr-2" />
                                <span>Internet Computer Protocol Canister: [ic-privacy-canister-id]</span>
                            </p>
                        </div>

                        <div className="bg-gradient-to-r from-[#3B00B9]/5 to-[#29ABE2]/5 dark:from-[#3B00B9]/10 dark:to-[#29ABE2]/10 p-4 rounded-md mt-6 border border-[#3B00B9]/20 dark:border-[#29ABE2]/20">
                            <div className="flex items-start">
                                <Coins className="h-5 w-5 text-[#3B00B9] dark:text-[#29ABE2] mt-0.5 mr-2" />
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">ICP Ecosystem Integration</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                        This platform operates as part of the Internet Computer ecosystem. For more information about 
                                        ICP's privacy features, Internet Identity, and blockchain data handling, visit the 
                                        <a href="https://internetcomputer.org" className="text-[#3B00B9] dark:text-[#29ABE2] hover:underline ml-1">
                                            official Internet Computer website
                                        </a>.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Separator className="my-8 border-gray-200 dark:border-gray-700" />

                    <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
                        <p>© {currentDate.getFullYear()} ICP Learn & Stake. Built on Internet Computer Protocol.</p>
                        <p className="mt-1">Empowering education through decentralized blockchain technology.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}