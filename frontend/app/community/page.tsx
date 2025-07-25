"use client";

import { useState } from "react";
import {
    Search,
    Users,
    User,
    Calendar,
    MessageSquare,
    Star,
    Plus,
    Award,
    TrendingUp,
    CheckCircle,
    Lock,
    ArrowUpRight
} from "lucide-react";
import Sidebar from "@/components/Layout/Sidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Learning Circle Card Component
const LearningCircleCard = ({
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
        <Card className={`border border-gray-200 hover:border-[#0056E0]/40 transition-all duration-300 hover:shadow-md overflow-hidden ${isLocked ? "opacity-80" : ""}`}>
            <div className="relative">
                <div className="h-36 bg-gradient-to-r from-[#0056E0]/80 to-[#00E5BF]/80 relative">
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
                    <Avatar className="h-12 w-12 ring-4 ring-white">
                        <AvatarImage src={`/api/placeholder/40/40`} alt={title} />
                        <AvatarFallback>{title.charAt(0)}</AvatarFallback>
                    </Avatar>
                </div>
            </div>

            <CardHeader className="pt-8">
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-lg">{title}</CardTitle>
                        <CardDescription className="mt-1">{description}</CardDescription>
                    </div>
                    <Badge className="bg-[#0056E0]/10 text-[#0056E0] hover:bg-[#0056E0]/20 border-none">
                        {level}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="pb-2">
                <div className="flex flex-wrap gap-2 mb-4">
                    {topics.map((topic, index) => (
                        <Badge key={index} variant="outline" className="bg-gray-50 text-gray-700 hover:bg-gray-100">
                            {topic}
                        </Badge>
                    ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{members} members</span>
                    </div>
                    <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 mr-1 text-[#0056E0]" />
                        <span className="text-[#0056E0] font-medium">{boost} boost</span>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="pt-4">
                <Button
                    className={`w-full ${isLocked
                        ? "bg-gray-200 text-gray-600"
                        : "bg-gradient-to-r from-[#0056E0] to-[#00E5BF] text-white hover:opacity-90"
                        }`}
                    disabled={isLocked}
                >
                    {isLocked ? "Upgrade to PRO" : "Join Circle"}
                </Button>
            </CardFooter>
        </Card>
    );
};

// Member Card Component
const MemberCard = ({
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
        <div className="flex items-center space-x-4 py-3 border-b border-gray-100">
            <Avatar className="h-10 w-10">
                <AvatarImage src={avatar || `/api/placeholder/40/40`} alt={name} />
                <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{name}</p>
                <p className="text-xs text-gray-500 truncate">{role}</p>
            </div>
            <div className="flex items-center space-x-4">
                <div className="flex flex-col items-center">
                    <span className="text-xs text-gray-500">Level</span>
                    <span className="font-medium text-[#0056E0]">{level}</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-xs text-gray-500">
                        <Award className="h-3 w-3 inline mr-1" />
                    </span>
                    <span className="font-medium">{achievements}</span>
                </div>
            </div>
        </div>
    );
};

export default function CommunityPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOption, setSortOption] = useState("popular");
    const [filterOption, setFilterOption] = useState("all");

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex">
                <Sidebar />
                <main className="flex-1 pt-20 px-6 max-w-6xl mx-auto pb-12">
                    {/* Page Header */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">Learning Circles</h1>
                        <p className="text-gray-600 mt-1">Join communities of like-minded learners and boost your staking rewards</p>
                    </div>

                    {/* PRO Feature Banner */}
                    <div className="bg-gradient-to-r from-[#0056E0] to-[#00E5BF] rounded-lg p-6 text-white mb-8">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold mb-2 flex items-center">
                                    <Star className="h-5 w-5 mr-2" />
                                    Unlock Learning Circles with PRO
                                </h2>
                                <p className="opacity-90 max-w-2xl">
                                    Join exclusive learning communities to accelerate your progress and earn
                                    additional staking multipliers. Collaborate with other learners, participate
                                    in group challenges, and access premium educational content.
                                </p>

                                <div className="flex flex-wrap gap-4 mt-4">
                                    <div className="bg-white/20 rounded-md px-3 py-2">
                                        <p className="text-xs uppercase opacity-75">Members</p>
                                        <p className="text-lg font-bold">10,000+</p>
                                    </div>
                                    <div className="bg-white/20 rounded-md px-3 py-2">
                                        <p className="text-xs uppercase opacity-75">Circles</p>
                                        <p className="text-lg font-bold">50+</p>
                                    </div>
                                    <div className="bg-white/20 rounded-md px-3 py-2">
                                        <p className="text-xs uppercase opacity-75">Extra Boost</p>
                                        <p className="text-lg font-bold">Up to 0.5x</p>
                                    </div>
                                </div>
                            </div>

                            <Button className="bg-white text-[#0056E0] hover:bg-white/90 mt-4 md:mt-0">
                                Upgrade to PRO
                            </Button>
                        </div>
                    </div>

                    {/* Filters and Learning Circles */}
                    <div className="flex flex-col gap-8">
                        {/* Search and Filters */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="md:col-span-2 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Search learning circles..."
                                    className="pl-10"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="flex space-x-2">
                                <Select value={sortOption} onValueChange={setSortOption}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="popular">Most Popular</SelectItem>
                                        <SelectItem value="newest">Newest</SelectItem>
                                        <SelectItem value="boost">Highest Boost</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select value={filterOption} onValueChange={setFilterOption}>
                                    <SelectTrigger>
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
                            <TabsList className="mb-6">
                                <TabsTrigger value="discover">Discover</TabsTrigger>
                                <TabsTrigger value="my-circles">My Circles</TabsTrigger>
                                <TabsTrigger value="recommended">Recommended</TabsTrigger>
                            </TabsList>

                            <TabsContent value="discover" className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <LearningCircleCard
                                        title="Blockchain Basics"
                                        description="A friendly community for blockchain beginners"
                                        members={234}
                                        level="Beginner"
                                        topics={["Blockchain", "Crypto", "Web3"]}
                                        boost="0.2x"
                                        isLocked={true}
                                    />
                                    <LearningCircleCard
                                        title="DeFi Explorers"
                                        description="Learn about decentralized finance together"
                                        members={189}
                                        level="Intermediate"
                                        topics={["DeFi", "Staking", "Yield"]}
                                        boost="0.3x"
                                        isLocked={true}
                                    />
                                    <LearningCircleCard
                                        title="Smart Contract Devs"
                                        description="For coders looking to master smart contracts"
                                        members={156}
                                        level="Advanced"
                                        topics={["Solidity", "Development", "Security"]}
                                        boost="0.4x"
                                        isLocked={true}
                                    />
                                    <LearningCircleCard
                                        title="EDU Chain Stakers"
                                        description="Maximize your staking strategy with others"
                                        members={312}
                                        level="All Levels"
                                        topics={["Staking", "Rewards", "Strategy"]}
                                        boost="0.25x"
                                        isLocked={true}
                                    />
                                    <LearningCircleCard
                                        title="Web3 Education"
                                        description="Focusing on educational applications of Web3"
                                        members={145}
                                        level="Intermediate"
                                        topics={["Education", "Web3", "dApps"]}
                                        boost="0.3x"
                                        isLocked={true}
                                    />
                                    <LearningCircleCard
                                        title="Tokenomics Study Group"
                                        description="Deep dive into token economics and design"
                                        members={98}
                                        level="Advanced"
                                        topics={["Tokenomics", "Economics", "Incentives"]}
                                        boost="0.35x"
                                        isLocked={true}
                                    />
                                </div>

                                <div className="text-center">
                                    <Button variant="outline" className="border-[#0056E0]/30 text-[#0056E0]">
                                        Load More Circles
                                    </Button>
                                </div>
                            </TabsContent>

                            <TabsContent value="my-circles">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="md:col-span-2">
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>You haven't joined any circles yet</CardTitle>
                                                <CardDescription>
                                                    Upgrade to PRO to join learning circles and boost your rewards
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="bg-gray-50 rounded-lg p-6 text-center">
                                                    <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                                                    <p className="text-gray-600 mb-4">
                                                        Learning circles help you connect with other learners,
                                                        share knowledge, and earn additional staking multipliers.
                                                    </p>
                                                    <Button className="bg-gradient-to-r from-[#0056E0] to-[#00E5BF] text-white hover:opacity-90">
                                                        Upgrade to PRO
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    <div>
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>PRO Benefits</CardTitle>
                                                <CardDescription>Exclusive features for PRO members</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <ul className="space-y-3">
                                                    <li className="flex items-start">
                                                        <CheckCircle className="h-5 w-5 text-[#0056E0] mr-2 shrink-0" />
                                                        <span className="text-gray-600">Access to all learning circles</span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <CheckCircle className="h-5 w-5 text-[#0056E0] mr-2 shrink-0" />
                                                        <span className="text-gray-600">Additional staking multiplier (up to 0.5x)</span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <CheckCircle className="h-5 w-5 text-[#0056E0] mr-2 shrink-0" />
                                                        <span className="text-gray-600">Exclusive educational content</span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <CheckCircle className="h-5 w-5 text-[#0056E0] mr-2 shrink-0" />
                                                        <span className="text-gray-600">Community challenges and competitions</span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <CheckCircle className="h-5 w-5 text-[#0056E0] mr-2 shrink-0" />
                                                        <span className="text-gray-600">Direct mentoring from experts</span>
                                                    </li>
                                                </ul>
                                            </CardContent>
                                            <CardFooter>
                                                <Button className="w-full bg-gradient-to-r from-[#0056E0] to-[#00E5BF] text-white hover:opacity-90">
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
                                        <Card className="border-[#0056E0]/30">
                                            <CardHeader>
                                                <CardTitle>Personalized Recommendations</CardTitle>
                                                <CardDescription>
                                                    Based on your learning history and interests
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                    <LearningCircleCard
                                                        title="Blockchain Fundamentals"
                                                        description="Perfect for your current learning path"
                                                        members={234}
                                                        level="Beginner"
                                                        topics={["Blockchain", "Basics"]}
                                                        boost="0.2x"
                                                        isLocked={true}
                                                    />
                                                    <LearningCircleCard
                                                        title="EDU Staking Masters"
                                                        description="Matches your staking activity"
                                                        members={189}
                                                        level="Intermediate"
                                                        topics={["Staking", "APY"]}
                                                        boost="0.3x"
                                                        isLocked={true}
                                                    />
                                                    <div className="flex items-center justify-center h-full p-6 bg-gray-50 rounded-lg border border-dashed">
                                                        <div className="text-center">
                                                            <Plus className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                                                            <p className="text-gray-600 font-medium mb-1">
                                                                Complete more courses
                                                            </p>
                                                            <p className="text-sm text-gray-500">
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