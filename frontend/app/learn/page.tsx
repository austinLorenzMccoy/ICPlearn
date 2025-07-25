"use client";

import { useState } from "react";
import {
    Search,
    Award,
    TrendingUp,
    BarChart,
    Zap,
    Sliders,
    ArrowUpRight,
    Cpu,
    Brain,
    Sparkles
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import ICPSidebar from "@/components/Layout/Sidebar";
import { ICPFilterSection } from "@/components/Learning/ICPFilterSection";
import { ICPCourseCard } from "@/components/Learning/ICPCourseCard";
import { ICPLearningPath } from "@/components/Learning/ICPLearningPath";



// Sample ICP course data
const icpCourses = [
    {
        title: "ICP Fundamentals",
        description: "Learn the core concepts of the Internet Computer Protocol and its revolutionary approach to blockchain.",
        image: "/api/placeholder/400/240",
        level: "beginner" as const,
        duration: "2 hours",
        reward: 100,
        modules: 5,
        stakingBoost: "1.1x",
        completionRate: 75,
        category: "beginner" as const
    },
    {
        title: "Canister Development with Motoko",
        description: "Master Motoko programming language and build powerful canisters on the Internet Computer.",
        image: "/api/placeholder/400/240",
        level: "intermediate" as const,
        duration: "4 hours",
        reward: 200,
        modules: 8,
        stakingBoost: "1.3x",
        completionRate: 30,
        category: "development" as const
    },
    {
        title: "Chain Fusion & Bitcoin Integration",
        description: "Explore ICP's revolutionary Chain Fusion technology and native Bitcoin integration.",
        image: "/api/placeholder/400/240",
        level: "advanced" as const,
        duration: "3.5 hours",
        reward: 250,
        modules: 7,
        stakingBoost: "1.5x",
        category: "development" as const
    },
    {
        title: "Network Nervous System Governance",
        description: "Understand how ICP's decentralized governance works and participate in network decisions.",
        image: "/api/placeholder/400/240",
        level: "intermediate" as const,
        duration: "2.5 hours",
        reward: 180,
        modules: 6,
        stakingBoost: "1.2x",
        category: "governance" as const
    },
    {
        title: "Advanced Neuron Management",
        description: "Optimize your neuron strategies to maximize voting rewards and network participation.",
        image: "/api/placeholder/400/240",
        level: "advanced" as const,
        duration: "3 hours",
        reward: 220,
        modules: 8,
        stakingBoost: "1.4x",
        isLocked: true,
        category: "governance" as const
    },
    {
        title: "ICP DeFi Ecosystem",
        description: "Discover decentralized finance applications built on the Internet Computer Protocol.",
        image: "/api/placeholder/400/240",
        level: "intermediate" as const,
        duration: "3 hours",
        reward: 160,
        modules: 7,
        stakingBoost: "1.2x",
        category: "network" as const
    },
    {
        title: "Rust CDK for ICP",
        description: "Build high-performance canisters using Rust and the ICP Canister Development Kit.",
        image: "/api/placeholder/400/240",
        level: "advanced" as const,
        duration: "5 hours",
        reward: 300,
        modules: 10,
        stakingBoost: "1.6x",
        category: "development" as const
    },
    {
        title: "Internet Identity & Authentication",
        description: "Implement secure, privacy-preserving authentication using Internet Identity.",
        image: "/api/placeholder/400/240",
        level: "beginner" as const,
        duration: "1.5 hours",
        reward: 120,
        modules: 4,
        stakingBoost: "1.1x",
        completionRate: 100,
        category: "beginner" as const
    }
];

// Sample learning paths
const learningPaths = [
    {
        title: "ICP Developer Mastery",
        description: "Master canister development with Motoko and Rust on the Internet Computer",
        courses: 8,
        progress: 25,
        reward: "Up to 2.5x",
        category: "development" as const
    },
    {
        title: "Network Governance Expert",
        description: "Become a voting expert and maximize your neuron rewards",
        courses: 6,
        progress: 40,
        reward: "Up to 2.0x",
        category: "governance" as const
    },
    {
        title: "Chain Fusion Specialist",
        description: "Master multi-chain development with Bitcoin and Ethereum integration",
        courses: 5,
        progress: 0,
        reward: "Up to 1.8x",
        category: "defi" as const
    },
    {
        title: "ICP Educator",
        description: "Create valuable educational content about the Internet Computer",
        courses: 7,
        progress: 60,
        reward: "Up to 1.6x",
        category: "content" as const
    }
];

export default function ICPLearningPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("all");

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <div className="flex">
                <ICPSidebar />
                <main className="flex-1 pt-20 px-6 max-w-6xl mx-auto pb-12">
                    {/* Page Header */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">ICP Learning Center</h1>
                        <p className="text-gray-600 dark:text-gray-300 mt-1">
                            Master the Internet Computer Protocol and boost your neuron rewards through education
                        </p>
                    </div>

                    {/* Learning Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-md">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">ICP Learning Progress</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between mb-2">
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white">68%</div>
                                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#3B00B9]/10 to-[#29ABE2]/10 dark:from-[#3B00B9]/20 dark:to-[#29ABE2]/20 flex items-center justify-center">
                                        <BarChart className="h-4 w-4 text-[#3B00B9] dark:text-[#29ABE2]" />
                                    </div>
                                </div>
                                <Progress value={68} className="h-2 mb-2" />
                                <p className="text-xs text-gray-500 dark:text-gray-400">15 of 22 courses completed</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-md">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Current Neuron Boost</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between mb-2">
                                    <div className="text-2xl font-bold text-[#ED1E79] dark:text-[#F15A24]">1.8x</div>
                                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#3B00B9]/10 to-[#29ABE2]/10 dark:from-[#3B00B9]/20 dark:to-[#29ABE2]/20 flex items-center justify-center">
                                        <TrendingUp className="h-4 w-4 text-[#3B00B9] dark:text-[#29ABE2]" />
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Applied to all your neurons</p>
                                <div className="mt-4">
                                    <Button variant="outline" size="sm" className="text-[#3B00B9] dark:text-[#29ABE2] text-xs border-gray-200 dark:border-gray-600">
                                        <ArrowUpRight className="h-3 w-3 mr-1" />
                                        How to increase
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-md">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">ICP Learning Points</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between mb-2">
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white">4,350</div>
                                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#3B00B9]/10 to-[#29ABE2]/10 dark:from-[#3B00B9]/20 dark:to-[#29ABE2]/20 flex items-center justify-center">
                                        <Award className="h-4 w-4 text-[#3B00B9] dark:text-[#29ABE2]" />
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Lifetime points earned</p>
                                <div className="mt-4">
                                    <Button variant="outline" size="sm" className="text-[#3B00B9] dark:text-[#29ABE2] text-xs border-gray-200 dark:border-gray-600">
                                        View rewards
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Featured Learning Path */}
                    <div className="bg-gradient-to-r from-[#3B00B9] via-[#ED1E79] to-[#29ABE2] rounded-lg p-6 text-white mb-8 relative overflow-hidden">
                        {/* Background pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <svg width="100%" height="100%">
                                <pattern id="learningHexPattern" width="60" height="52" patternUnits="userSpaceOnUse">
                                    <path d="M30,0 L60,17.3 L60,34.6 L30,52 L0,34.6 L0,17.3 Z" fill="none" stroke="white" strokeWidth="0.5" />
                                    <circle cx="30" cy="26" r="2" fill="white" opacity="0.3" />
                                </pattern>
                                <rect width="100%" height="100%" fill="url(#learningHexPattern)" />
                            </svg>
                        </div>

                        <div className="relative z-10">
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                                <div>
                                    <div className="flex items-center mb-2">
                                        <Brain className="h-6 w-6 mr-2 text-[#29ABE2]" />
                                        <h2 className="text-xl font-bold">Internet Computer Mastery Path</h2>
                                    </div>
                                    <p className="opacity-90 max-w-2xl">
                                        Master the complete Internet Computer ecosystem from canisters to governance. 
                                        Complete all courses to earn a 2.5x neuron boost and become an ICP expert.
                                    </p>

                                    <div className="flex flex-wrap gap-4 mt-4">
                                        <div className="bg-white/20 backdrop-blur-sm rounded-md px-3 py-2">
                                            <p className="text-xs uppercase opacity-75">Courses</p>
                                            <p className="text-lg font-bold">12</p>
                                        </div>
                                        <div className="bg-white/20 backdrop-blur-sm rounded-md px-3 py-2">
                                            <p className="text-xs uppercase opacity-75">Duration</p>
                                            <p className="text-lg font-bold">28 hours</p>
                                        </div>
                                        <div className="bg-white/20 backdrop-blur-sm rounded-md px-3 py-2">
                                            <p className="text-xs uppercase opacity-75">Neuron Boost</p>
                                            <p className="text-lg font-bold">Up to 2.5x</p>
                                        </div>
                                        <div className="bg-white/20 backdrop-blur-sm rounded-md px-3 py-2">
                                            <p className="text-xs uppercase opacity-75">Completion</p>
                                            <p className="text-lg font-bold">45%</p>
                                        </div>
                                    </div>

                                    {/* Network stats */}
                                    <div className="flex items-center mt-3 text-xs opacity-75">
                                        <div className="h-2 w-2 rounded-full bg-[#50C878] mr-2 animate-pulse" />
                                        <span>42 Active Subnets • 125k+ Canisters • DFINITY Certified</span>
                                    </div>
                                </div>

                                <Button className="bg-white text-[#3B00B9] hover:bg-white/90 mt-4 md:mt-0 transition-all duration-200 hover:scale-105">
                                    <Sparkles className="h-4 w-4 mr-2" />
                                    Continue Path
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Filters and Courses */}
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Filters - Desktop */}
                        <div className="hidden lg:block w-64 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 sticky top-24 h-fit">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-medium text-gray-900 dark:text-white">Filters</h3>
                                <Button variant="ghost" size="sm" className="h-8 px-2 text-xs text-gray-500 dark:text-gray-400">
                                    Reset
                                </Button>
                            </div>

                            <ICPFilterSection
                                title="Level"
                                options={["Beginner", "Intermediate", "Advanced"]}
                            />

                            <ICPFilterSection
                                title="Duration"
                                options={["< 2 hours", "2-4 hours", "4-6 hours", "> 6 hours"]}
                            />

                            <ICPFilterSection
                                title="Category"
                                options={["Canisters", "Governance", "Chain Fusion", "Motoko", "Network"]}
                            />

                            <ICPFilterSection
                                title="Neuron Boost"
                                options={["1.1x", "1.2x", "1.5x", "2x+"]}
                            />

                            <Button className="w-full mt-2 bg-gradient-to-r from-[#3B00B9] to-[#29ABE2] hover:from-[#2E0092] hover:to-[#1E8FBF] text-white">
                                Apply Filters
                            </Button>
                        </div>

                        {/* Filters - Mobile */}
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="lg:hidden mb-4 flex items-center border-gray-200 dark:border-gray-600"
                                >
                                    <Sliders className="h-4 w-4 mr-2" />
                                    Filters
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-full sm:max-w-md bg-white dark:bg-gray-800">
                                <SheetHeader>
                                    <SheetTitle className="text-gray-900 dark:text-white">Filters</SheetTitle>
                                    <SheetDescription className="text-gray-600 dark:text-gray-300">
                                        Filter ICP courses by different criteria
                                    </SheetDescription>
                                </SheetHeader>
                                <div className="py-4">
                                    <ICPFilterSection
                                        title="Level"
                                        options={["Beginner", "Intermediate", "Advanced"]}
                                    />

                                    <ICPFilterSection
                                        title="Duration"
                                        options={["< 2 hours", "2-4 hours", "4-6 hours", "> 6 hours"]}
                                    />

                                    <ICPFilterSection
                                        title="Category"
                                        options={["Canisters", "Governance", "Chain Fusion", "Motoko", "Network"]}
                                    />

                                    <ICPFilterSection
                                        title="Neuron Boost"
                                        options={["1.1x", "1.2x", "1.5x", "2x+"]}
                                    />
                                </div>
                                <div className="mt-4 flex space-x-2">
                                    <Button variant="outline" className="flex-1 border-gray-200 dark:border-gray-600">Reset</Button>
                                    <Button className="flex-1 bg-gradient-to-r from-[#3B00B9] to-[#29ABE2] hover:from-[#2E0092] hover:to-[#1E8FBF] text-white">Apply</Button>
                                </div>
                            </SheetContent>
                        </Sheet>

                        {/* Courses Content */}
                        <div className="flex-1">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
                                    <TabsList className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                        <TabsTrigger 
                                            value="all" 
                                            className="data-[state=active]:bg-[#3B00B9] data-[state=active]:text-white dark:data-[state=active]:bg-[#29ABE2]"
                                        >
                                            All Courses
                                        </TabsTrigger>
                                        <TabsTrigger 
                                            value="my-courses" 
                                            className="data-[state=active]:bg-[#3B00B9] data-[state=active]:text-white dark:data-[state=active]:bg-[#29ABE2]"
                                        >
                                            My Courses
                                        </TabsTrigger>
                                        <TabsTrigger 
                                            value="learning-paths" 
                                            className="data-[state=active]:bg-[#3B00B9] data-[state=active]:text-white dark:data-[state=active]:bg-[#29ABE2]"
                                        >
                                            Learning Paths
                                        </TabsTrigger>
                                    </TabsList>
                                </Tabs>

                                <div className="relative w-full sm:w-64">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                                    <Input
                                        placeholder="Search ICP courses..."
                                        className="pl-10 w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>

                            <Tabs value={activeTab} className="mt-0">
                                <TabsContent value="all" className="mt-0">
                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                        {icpCourses.map((course, index) => (
                                            <ICPCourseCard
                                                key={index}
                                                title={course.title}
                                                description={course.description}
                                                image={course.image}
                                                level={course.level}
                                                duration={course.duration}
                                                reward={course.reward}
                                                modules={course.modules}
                                                stakingBoost={course.stakingBoost}
                                                completionRate={course.completionRate}
                                                isLocked={course.isLocked}
                                                category={course.category}
                                            />
                                        ))}
                                    </div>
                                </TabsContent>

                                <TabsContent value="my-courses" className="mt-0">
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="font-medium text-lg mb-4 text-gray-900 dark:text-white">In Progress</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                                <ICPCourseCard
                                                    title="ICP Fundamentals"
                                                    description="Learn the core concepts of the Internet Computer Protocol and its revolutionary approach to blockchain."
                                                    image="/api/placeholder/400/240"
                                                    level="beginner"
                                                    duration="2 hours"
                                                    reward={100}
                                                    modules={5}
                                                    stakingBoost="1.1x"
                                                    completionRate={75}
                                                    category="beginner"
                                                />

                                                <ICPCourseCard
                                                    title="Canister Development with Motoko"
                                                    description="Master Motoko programming language and build powerful canisters on the Internet Computer."
                                                    image="/api/placeholder/400/240"
                                                    level="intermediate"
                                                    duration="4 hours"
                                                    reward={200}
                                                    modules={8}
                                                    stakingBoost="1.3x"
                                                    completionRate={30}
                                                    category="development"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="font-medium text-lg mb-4 text-gray-900 dark:text-white">Completed</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                                <ICPCourseCard
                                                    title="Internet Identity & Authentication"
                                                    description="Implement secure, privacy-preserving authentication using Internet Identity."
                                                    image="/api/placeholder/400/240"
                                                    level="beginner"
                                                    duration="1.5 hours"
                                                    reward={120}
                                                    modules={4}
                                                    stakingBoost="1.1x"
                                                    completionRate={100}
                                                    category="beginner"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="learning-paths" className="mt-0">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        {learningPaths.map((path, index) => (
                                            <ICPLearningPath
                                                key={index}
                                                title={path.title}
                                                description={path.description}
                                                courses={path.courses}
                                                progress={path.progress}
                                                reward={path.reward}
                                                category={path.category}
                                            />
                                        ))}
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>

                    {/* ICP Learning Benefits */}
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center mb-4">
                                <Zap className="h-5 w-5 text-[#ED1E79] dark:text-[#F15A24] mr-2" />
                                <h3 className="font-semibold text-gray-900 dark:text-white">How Neuron Boosts Work</h3>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">
                                Complete ICP educational courses to increase your neuron voting rewards. Each course completion 
                                unlocks higher multipliers and deeper understanding of the Internet Computer ecosystem.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center mb-4">
                                <Cpu className="h-5 w-5 text-[#3B00B9] dark:text-[#29ABE2] mr-2" />
                                <h3 className="font-semibold text-gray-900 dark:text-white">Master the Internet Computer</h3>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">
                                Learn about canisters, neurons, Chain Fusion, and governance. Build the future of the decentralized 
                                internet while earning rewards for your knowledge and participation.
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
