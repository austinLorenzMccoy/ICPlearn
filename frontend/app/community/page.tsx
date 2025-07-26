"use client";

import { useState } from "react";
import {
    Search,
    Users,
    Star,
    Plus,
    Award,
    TrendingUp,
    CheckCircle,
    Lock,
    Cpu,
    
} from "lucide-react";
import ICPSidebar from "@/components/Layout/Sidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// ICP Learning Circle Card Component
const ICPLearningCircleCard = ({
    title,
    description,
    members,
    level,
    topics,
    boost,
    image,
    isLocked = false
}: {
    title: string;
    description: string;
    members: number;
    level: string;
    topics: string[];
    boost: string;
    image?: string;
    isLocked?: boolean;
}) => {
    return (
        <Card className={`border border-gray-200 dark:border-gray-700 hover:border-[#3B00B9]/40 dark:hover:border-[#29ABE2]/40 transition-all duration-300 hover:shadow-md bg-white dark:bg-gray-800 overflow-hidden ${isLocked ? "opacity-80" : ""}`}>
            <div className="relative">
                <div className="h-36 bg-gradient-to-r from-[#3B00B9]/80 to-[#29ABE2]/80 relative">
                    {image && (
                        <div
                            className="absolute inset-0 bg-center bg-cover mix-blend-overlay"
                            style={{ backgroundImage: `url(${image})` }}
                        />
                    )}
                    {isLocked && (
                        <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
                            <Lock className="h-10 w-10 text-white opacity-80" />
                            <span className="ml-2 text-white font-medium">PRO Feature</span>
                        </div>
                    )}
                </div>

                <div className="absolute -bottom-5 left-4">
                    <Avatar className="h-12 w-12 ring-4 ring-white dark:ring-gray-800">
                        <AvatarImage src={`/api/placeholder/40/40`} alt={title} />
                        <AvatarFallback className="bg-gradient-to-r from-[#3B00B9] to-[#29ABE2] text-white">{title.charAt(0)}</AvatarFallback>
                    </Avatar>
                </div>
            </div>

            <CardHeader className="pt-8">
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-lg text-gray-900 dark:text-white">{title}</CardTitle>
                        <CardDescription className="mt-1 text-gray-600 dark:text-gray-300">{description}</CardDescription>
                    </div>
                    <Badge className="bg-[#3B00B9]/10 dark:bg-[#29ABE2]/20 text-[#3B00B9] dark:text-[#29ABE2] hover:bg-[#3B00B9]/20 border-none">
                        {level}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="pb-2">
                <div className="flex flex-wrap gap-2 mb-4">
                    {topics.map((topic, index) => (
                        <Badge key={index} variant="outline" className="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 border-gray-200 dark:border-gray-600">
                            {topic}
                        </Badge>
                    ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{members} members</span>
                    </div>
                    <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 mr-1 text-[#3B00B9] dark:text-[#29ABE2]" />
                        <span className="text-[#3B00B9] dark:text-[#29ABE2] font-medium">{boost} neuron boost</span>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="pt-4">
                <Button
                    className={`w-full ${isLocked
                        ? "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                        : "bg-gradient-to-r from-[#3B00B9] to-[#29ABE2] text-white hover:from-[#2E0092] hover:to-[#1E8FBF]"
                        }`}
                    disabled={isLocked}
                >
                    {isLocked ? "Upgrade to PRO" : "Join Circle"}
                </Button>
            </CardFooter>
        </Card>
    );
};

// ICP Member Card Component
const ICPMemberCard = ({
    name,
    role,
    level,
    achievements,
    avatar
}: {
    name: string;
    role: string;
    level: number;
    achievements: number;
    avatar?: string;
}) => {
    return (
        <div className="flex items-center space-x-4 py-3 border-b border-gray-100 dark:border-gray-700">
            <Avatar className="h-10 w-10">
                <AvatarImage src={avatar || `/api/placeholder/40/40`} alt={name} />
                <AvatarFallback className="bg-gradient-to-r from-[#3B00B9] to-[#29ABE2] text-white">{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{role}</p>
            </div>
            <div className="flex items-center space-x-4">
                <div className="flex flex-col items-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Level</span>
                    <span className="font-medium text-[#3B00B9] dark:text-[#29ABE2]">{level}</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                        <Award className="h-3 w-3 inline mr-1" />
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">{achievements}</span>
                </div>
            </div>
        </div>
    );
};

export default function ICPCommunityPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOption, setSortOption] = useState("popular");
    const [filterOption, setFilterOption] = useState("all");

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <div className="flex">
                <ICPSidebar />
                <main className="flex-1 pt-20 px-6 max-w-6xl mx-auto pb-12">
                    {/* Page Header */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">ICP Learning Circles</h1>
                        <p className="text-gray-600 dark:text-gray-300 mt-1">Join communities of Internet Computer developers and boost your neuron rewards</p>
                    </div>

                  {/* PRO Feature Banner */}
<div className="bg-gradient-to-r from-[#3B00B9] via-[#ED1E79] to-[#29ABE2] rounded-lg p-6 text-white mb-8 relative overflow-hidden">
    {/* Background pattern */}
    <div className="absolute inset-0">
        <div className="w-full h-full bg-gradient-to-br from-white/5 to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-4 right-8 w-16 h-16 border border-white/10 rounded-full"></div>
            <div className="absolute top-12 right-16 w-8 h-8 border border-white/20 rounded-full"></div>
            <div className="absolute bottom-8 left-8 w-12 h-12 border border-white/15 rounded-full"></div>
            <div className="absolute bottom-16 left-16 w-6 h-6 bg-white/10 rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-white/5 rounded-full"></div>
            <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-white/20 rounded-full"></div>
        </div>
    </div>

    <div className="relative z-10">
        <div className="mb-6">
            <h2 className="text-xl font-bold mb-2 flex items-center">
                <Star className="h-5 w-5 mr-2" />
                Unlock ICP Learning Circles with PRO
            </h2>
            <p className="opacity-90 max-w-2xl">
                Join exclusive Internet Computer developer communities to accelerate your ICP mastery 
                and earn additional neuron multipliers. Collaborate with canister developers, participate 
                in governance discussions, and access premium ICP educational content.
            </p>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="flex flex-wrap gap-4">
                <div className="bg-white/20 rounded-md px-3 py-2">
                    <p className="text-xs uppercase opacity-75">ICP Developers</p>
                    <p className="text-lg font-bold">5,000+</p>
                </div>
                <div className="bg-white/20 rounded-md px-3 py-2">
                    <p className="text-xs uppercase opacity-75">Circles</p>
                    <p className="text-lg font-bold">25+</p>
                </div>
                <div className="bg-white/20 rounded-md px-3 py-2">
                    <p className="text-xs uppercase opacity-75">Neuron Boost</p>
                    <p className="text-lg font-bold">Up to 0.5x</p>
                </div>
            </div>

            <Button className="bg-white text-[#3B00B9] hover:bg-white/90 mt-4 md:mt-0 font-medium">
                Upgrade to PRO
            </Button>
        </div>

        {/* ICP Network status indicator */}
        <div className="mt-6 pt-4 border-t border-white/20">
            <div className="flex items-center text-sm opacity-75">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                Internet Computer Network: Operational
            </div>
        </div>
    </div>
</div>

                    {/* Filters and Learning Circles */}
                    <div className="flex flex-col gap-8">
                        {/* Search and Filters */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="md:col-span-2 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Search ICP learning circles..."
                                    className="pl-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="flex space-x-2">
                                <Select value={sortOption} onValueChange={setSortOption}>
                                    <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="popular">Most Popular</SelectItem>
                                        <SelectItem value="newest">Newest</SelectItem>
                                        <SelectItem value="boost">Highest Boost</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select value={filterOption} onValueChange={setFilterOption}>
                                    <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                                        <SelectValue placeholder="Filter" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Levels</SelectItem>
                                        <SelectItem value="beginner">Beginner</SelectItem>
                                        <SelectItem value="intermediate">Intermediate</SelectItem>
                                        <SelectItem value="advanced">Advanced</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Tabs */}
                        <Tabs defaultValue="discover">
                            <TabsList className="mb-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                <TabsTrigger 
                                    value="discover" 
                                    className="data-[state=active]:bg-[#3B00B9] data-[state=active]:text-white dark:data-[state=active]:bg-[#29ABE2]"
                                >
                                    Discover
                                </TabsTrigger>
                                <TabsTrigger 
                                    value="my-circles"
                                    className="data-[state=active]:bg-[#3B00B9] data-[state=active]:text-white dark:data-[state=active]:bg-[#29ABE2]"
                                >
                                    My Circles
                                </TabsTrigger>
                                <TabsTrigger 
                                    value="recommended"
                                    className="data-[state=active]:bg-[#3B00B9] data-[state=active]:text-white dark:data-[state=active]:bg-[#29ABE2]"
                                >
                                    Recommended
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="discover" className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <ICPLearningCircleCard
                                        title="ICP Basics"
                                        description="Learn Internet Computer fundamentals with other beginners"
                                        members={234}
                                        level="Beginner"
                                        topics={["ICP", "Blockchain", "Canisters"]}
                                        boost="0.2x"
                                        isLocked={true}
                                    />
                                    <ICPLearningCircleCard
                                        title="Motoko Developers"
                                        description="Master the Motoko programming language for ICP"
                                        members={189}
                                        level="Intermediate"
                                        topics={["Motoko", "Development", "Smart Contracts"]}
                                        boost="0.3x"
                                        isLocked={true}
                                    />
                                    <ICPLearningCircleCard
                                        title="Canister Architects"
                                        description="Advanced canister development and architecture patterns"
                                        members={156}
                                        level="Advanced"
                                        topics={["Canisters", "Architecture", "Scalability"]}
                                        boost="0.4x"
                                        isLocked={true}
                                    />
                                    <ICPLearningCircleCard
                                        title="NNS Governance"
                                        description="Participate in Network Nervous System governance"
                                        members={312}
                                        level="All Levels"
                                        topics={["NNS", "Governance", "Voting"]}
                                        boost="0.25x"
                                        isLocked={true}
                                    />
                                    <ICPLearningCircleCard
                                        title="Chain Fusion Builders"
                                        description="Build cross-chain applications with Bitcoin integration"
                                        members={145}
                                        level="Advanced"
                                        topics={["Chain Fusion", "Bitcoin", "Cross-chain"]}
                                        boost="0.35x"
                                        isLocked={true}
                                    />
                                    <ICPLearningCircleCard
                                        title="ICP DeFi Developers"
                                        description="Create decentralized finance applications on ICP"
                                        members={98}
                                        level="Advanced"
                                        topics={["DeFi", "DEX", "Protocols"]}
                                        boost="0.4x"
                                        isLocked={true}
                                    />
                                </div>

                                <div className="text-center">
                                    <Button variant="outline" className="border-[#3B00B9]/30 text-[#3B00B9] dark:border-[#29ABE2]/30 dark:text-[#29ABE2]">
                                        Load More ICP Circles
                                    </Button>
                                </div>
                            </TabsContent>

                            <TabsContent value="my-circles">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="md:col-span-2">
                                        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                                            <CardHeader>
                                                <CardTitle className="text-gray-900 dark:text-white">You haven't joined any ICP circles yet</CardTitle>
                                                <CardDescription className="text-gray-600 dark:text-gray-300">
                                                    Upgrade to PRO to join Internet Computer learning circles and boost your neuron rewards
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center">
                                                    <Cpu className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                                                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                                                        ICP learning circles help you connect with other Internet Computer developers,
                                                        share knowledge about canisters and governance, and earn additional neuron multipliers.
                                                    </p>
                                                    <Button className="bg-gradient-to-r from-[#3B00B9] to-[#29ABE2] text-white hover:from-[#2E0092] hover:to-[#1E8FBF]">
                                                        Upgrade to PRO
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    <div>
                                        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                                            <CardHeader>
                                                <CardTitle className="text-gray-900 dark:text-white">ICP PRO Benefits</CardTitle>
                                                <CardDescription className="text-gray-600 dark:text-gray-300">Exclusive features for Internet Computer PRO members</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <ul className="space-y-3">
                                                    <li className="flex items-start">
                                                        <CheckCircle className="h-5 w-5 text-[#3B00B9] dark:text-[#29ABE2] mr-2 shrink-0" />
                                                        <span className="text-gray-600 dark:text-gray-300">Access to all ICP learning circles</span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <CheckCircle className="h-5 w-5 text-[#3B00B9] dark:text-[#29ABE2] mr-2 shrink-0" />
                                                        <span className="text-gray-600 dark:text-gray-300">Additional neuron multiplier (up to 0.5x)</span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <CheckCircle className="h-5 w-5 text-[#3B00B9] dark:text-[#29ABE2] mr-2 shrink-0" />
                                                        <span className="text-gray-600 dark:text-gray-300">Exclusive ICP educational content</span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <CheckCircle className="h-5 w-5 text-[#3B00B9] dark:text-[#29ABE2] mr-2 shrink-0" />
                                                        <span className="text-gray-600 dark:text-gray-300">Canister development challenges</span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <CheckCircle className="h-5 w-5 text-[#3B00B9] dark:text-[#29ABE2] mr-2 shrink-0" />
                                                        <span className="text-gray-600 dark:text-gray-300">Direct mentoring from ICP experts</span>
                                                    </li>
                                                </ul>
                                            </CardContent>
                                            <CardFooter>
                                                <Button className="w-full bg-gradient-to-r from-[#3B00B9] to-[#29ABE2] text-white hover:from-[#2E0092] hover:to-[#1E8FBF]">
                                                    Upgrade Now
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="recommended">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="md:col-span-3">
                                        <Card className="border-[#3B00B9]/30 dark:border-[#29ABE2]/30 bg-white dark:bg-gray-800">
                                            <CardHeader>
                                                <CardTitle className="text-gray-900 dark:text-white">Personalized ICP Recommendations</CardTitle>
                                                <CardDescription className="text-gray-600 dark:text-gray-300">
                                                    Based on your Internet Computer learning history and canister development interests
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                    <ICPLearningCircleCard
                                                        title="ICP Fundamentals"
                                                        description="Perfect for your current Internet Computer learning path"
                                                        members={234}
                                                        level="Beginner"
                                                        topics={["ICP", "Basics"]}
                                                        boost="0.2x"
                                                        isLocked={true}
                                                    />
                                                    <ICPLearningCircleCard
                                                        title="Neuron Staking Masters"
                                                        description="Matches your governance and staking activity"
                                                        members={189}
                                                        level="Intermediate"
                                                        topics={["Neurons", "Staking"]}
                                                        boost="0.3x"
                                                        isLocked={true}
                                                    />
                                                    <div className="flex items-center justify-center h-full p-6 bg-gray-50 dark:bg-gray-700 rounded-lg border border-dashed border-gray-300 dark:border-gray-600">
                                                        <div className="text-center">
                                                            <Plus className="h-10 w-10 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                                                            <p className="text-gray-600 dark:text-gray-300 font-medium mb-1">
                                                                Complete more ICP courses
                                                            </p>
                                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                                To get more personalized recommendations
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </main>
            </div>
        </div>
    );
}