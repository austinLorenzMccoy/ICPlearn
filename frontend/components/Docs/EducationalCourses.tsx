import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function EducationalCourses() {
    return (
        <section id="educational-courses" data-section="educational-courses" className="mb-12">
            <div className="flex items-center mb-6">
                <h2 className="text-3xl font-bold">Educational Courses</h2>
                <Badge variant="outline" className="ml-3 text-xs bg-[#0056E0]/10 text-[#0056E0] border-none">
                    Learning
                </Badge>
            </div>
            <p className="text-gray-600 mb-6">
                Educational courses are central to the EduStake platform, allowing users to expand their knowledge while earning rewards and multipliers.
            </p>

            {/* Course Structure Subsection */}
            <section id="course-structure" data-section="course-structure" className="mb-8">
                <h3 className="text-xl font-bold mb-4">Course Structure</h3>
                <p className="text-gray-600 mb-4">
                    EduStake courses follow a structured learning approach designed to provide comprehensive education on blockchain and related topics.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="p-4 border rounded-md">
                        <h4 className="font-medium mb-2 flex items-center">
                            <div className="h-6 w-6 rounded-full bg-[#0056E0] text-white flex items-center justify-center mr-2 text-xs font-medium">1</div>
                            Modules
                        </h4>
                        <p className="text-sm text-gray-600">
                            Courses are divided into bite-sized modules focusing on specific topics. Each module includes various learning materials and activities.
                        </p>
                    </div>

                    <div className="p-4 border rounded-md">
                        <h4 className="font-medium mb-2 flex items-center">
                            <div className="h-6 w-6 rounded-full bg-[#0056E0] text-white flex items-center justify-center mr-2 text-xs font-medium">2</div>
                            Content Types
                        </h4>
                        <p className="text-sm text-gray-600">
                            Courses include video lectures, interactive tutorials, reading materials, coding exercises, and practical assignments tailored to different learning styles.
                        </p>
                    </div>

                    <div className="p-4 border rounded-md">
                        <h4 className="font-medium mb-2 flex items-center">
                            <div className="h-6 w-6 rounded-full bg-[#0056E0] text-white flex items-center justify-center mr-2 text-xs font-medium">3</div>
                            Assessments
                        </h4>
                        <p className="text-sm text-gray-600">
                            Each module contains quizzes and assessments to test understanding and retention. Successful completion contributes to course progress and rewards.
                        </p>
                    </div>
                </div>

                <h4 className="text-lg font-medium mt-8 mb-4">Course Categories</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="overflow-hidden">
                        <div className="h-12 bg-gradient-to-r from-[#0056E0]/80 to-[#00E5BF]/80"></div>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">Blockchain Fundamentals</CardTitle>
                            <CardDescription>Core blockchain concepts and technologies</CardDescription>
                        </CardHeader>
                        <CardContent className="text-sm">
                            <ul className="space-y-1">
                                <li>• Introduction to Blockchain</li>
                                <li>• Cryptography Basics</li>
                                <li>• Consensus Mechanisms</li>
                                <li>• Blockchain Architecture</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="overflow-hidden">
                        <div className="h-12 bg-gradient-to-r from-[#0056E0]/80 to-[#00E5BF]/80"></div>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">DeFi & Financial Systems</CardTitle>
                            <CardDescription>Decentralized finance applications</CardDescription>
                        </CardHeader>
                        <CardContent className="text-sm">
                            <ul className="space-y-1">
                                <li>• Introduction to DeFi</li>
                                <li>• Lending & Borrowing</li>
                                <li>• Liquidity Pools</li>
                                <li>• Yield Farming Strategies</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="overflow-hidden">
                        <div className="h-12 bg-gradient-to-r from-[#0056E0]/80 to-[#00E5BF]/80"></div>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">Smart Contract Development</CardTitle>
                            <CardDescription>Build on blockchain platforms</CardDescription>
                        </CardHeader>
                        <CardContent className="text-sm">
                            <ul className="space-y-1">
                                <li>• Solidity Programming</li>
                                <li>• Contract Architecture</li>
                                <li>• Security Best Practices</li>
                                <li>• Testing & Deployment</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="overflow-hidden">
                        <div className="h-12 bg-gradient-to-r from-[#0056E0]/80 to-[#00E5BF]/80"></div>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">Educational Technologies</CardTitle>
                            <CardDescription>Web3 applications in education</CardDescription>
                        </CardHeader>
                        <CardContent className="text-sm">
                            <ul className="space-y-1">
                                <li>• Credentials on Blockchain</li>
                                <li>• Educational NFTs</li>
                                <li>• Decentralized Learning</li>
                                <li>• Incentivized Education</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Completion Requirements Subsection */}
            <section id="completion-requirements" data-section="completion-requirements" className="mb-8">
                <h3 className="text-xl font-bold mb-4">Completion Requirements</h3>
                <p className="text-gray-600 mb-4">
                    To earn rewards and multipliers, users must meet specific completion requirements for each course.
                </p>

                <div className="mt-6 p-6 bg-white rounded-lg border">
                    <h4 className="font-medium mb-4">Standard Completion Requirements</h4>
                    <ul className="space-y-4">
                        <li className="flex items-start">
                            <div className="h-6 w-6 rounded-full bg-[#0056E0] text-white flex items-center justify-center mt-0.5 mr-3 text-xs">1</div>
                            <div>
                                <h5 className="font-medium">Module Completion</h5>
                                <p className="text-sm text-gray-600 mt-1">
                                    View all required content in each module, including videos, readings, and interactive elements.
                                </p>
                            </div>
                        </li>

                        <li className="flex items-start">
                            <div className="h-6 w-6 rounded-full bg-[#0056E0] text-white flex items-center justify-center mt-0.5 mr-3 text-xs">2</div>
                            <div>
                                <h5 className="font-medium">Assessment Passing</h5>
                                <p className="text-sm text-gray-600 mt-1">
                                    Score at least 70% on all quizzes and assessments to demonstrate understanding of the material.
                                </p>
                            </div>
                        </li>

                        <li className="flex items-start">
                            <div className="h-6 w-6 rounded-full bg-[#0056E0] text-white flex items-center justify-center mt-0.5 mr-3 text-xs">3</div>
                            <div>
                                <h5 className="font-medium">Practical Assignments</h5>
                                <p className="text-sm text-gray-600 mt-1">
                                    Complete any required hands-on assignments or projects that demonstrate practical application of knowledge.
                                </p>
                            </div>
                        </li>

                        <li className="flex items-start">
                            <div className="h-6 w-6 rounded-full bg-[#0056E0] text-white flex items-center justify-center mt-0.5 mr-3 text-xs">4</div>
                            <div>
                                <h5 className="font-medium">Final Assessment</h5>
                                <p className="text-sm text-gray-600 mt-1">
                                    Pass the comprehensive final assessment that covers all course material with a minimum score of 75%.
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>

                <h4 className="text-lg font-medium mt-8 mb-4">Verification Process</h4>
                <p className="text-gray-600 mb-4">
                    EduStake uses a multi-layered verification process to ensure the integrity of educational achievements:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-md">
                        <h5 className="font-medium mb-2">Automated Verification</h5>
                        <p className="text-sm text-gray-600">
                            The platform automatically tracks course progress, assessment scores, and completion status through smart contracts that record achievements on-chain.
                        </p>
                    </div>

                    <div className="p-4 border rounded-md">
                        <h5 className="font-medium mb-2">Anti-Fraud Measures</h5>
                        <p className="text-sm text-gray-600">
                            Advanced algorithms detect unusual patterns or suspicious activity to prevent cheating or manipulation of the educational reward system.
                        </p>
                    </div>
                </div>
            </section>

            {/* Learning Paths Subsection */}
            <section id="learning-paths" data-section="learning-paths" className="mb-8">
                <h3 className="text-xl font-bold mb-4">Learning Paths</h3>
                <p className="text-gray-600 mb-4">
                    Learning paths are curated sequences of courses designed to develop comprehensive expertise in specific areas.
                </p>

                <div className="mt-6">
                    <Card className="border border-gray-200 hover:border-[#0056E0]/40 transition-all duration-300 hover:shadow-md mb-6">
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div>
                                    <CardTitle>EDU Chain Developer Path</CardTitle>
                                    <CardDescription className="mt-1">Master the skills to build on the EDU Chain platform</CardDescription>
                                </div>
                                <Badge variant="outline" className="bg-gradient-to-r from-[#0056E0] to-[#00E5BF] text-white border-none">
                                    Learning Path
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-sm font-medium">Path Progress</span>
                                        <span className="text-sm">0%</span>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full">
                                        <div className="h-2 bg-[#0056E0] rounded-full" style={{ width: '0%' }}></div>
                                    </div>
                                </div>

                                <div className="space-y-3 mt-4">
                                    <h4 className="text-sm font-medium">Included Courses:</h4>
                                    <div className="p-2 rounded-md hover:bg-gray-50 flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="h-6 w-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center mr-2 text-xs font-medium">1</div>
                                            <span className="text-sm">Introduction to EDU Chain</span>
                                        </div>
                                        <div className="text-xs text-gray-500">1 hour</div>
                                    </div>
                                    <div className="p-2 rounded-md hover:bg-gray-50 flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="h-6 w-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center mr-2 text-xs font-medium">2</div>
                                            <span className="text-sm">Smart Contract Development</span>
                                        </div>
                                        <div className="text-xs text-gray-500">6 hours</div>
                                    </div>
                                    <div className="p-2 rounded-md hover:bg-gray-50 flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="h-6 w-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center mr-2 text-xs font-medium">3</div>
                                            <span className="text-sm">Building Educational dApps</span>
                                        </div>
                                        <div className="text-xs text-gray-500">4 hours</div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-4 pt-2">
                                    <div className="flex items-center space-x-1">
                                        <span className="text-sm text-gray-600">8 Courses</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <span className="text-sm text-gray-600">16 Hours Total</span>
                                    </div>
                                    <div className="flex items-center space-x-1 text-[#0056E0]">
                                        <span className="text-sm font-medium">Staking Boost: Up to 2x</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="border border-gray-200 hover:border-[#0056E0]/40 transition-all duration-300 hover:shadow-md">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle>DeFi Specialist</CardTitle>
                                        <CardDescription className="mt-1">Master decentralized finance concepts</CardDescription>
                                    </div>
                                    <Badge variant="outline" className="bg-gradient-to-r from-[#0056E0] to-[#00E5BF] text-white border-none">
                                        Learning Path
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-sm font-medium">Path Progress</span>
                                            <span className="text-sm">0%</span>
                                        </div>
                                        <div className="h-2 bg-gray-100 rounded-full">
                                            <div className="h-2 bg-[#0056E0] rounded-full" style={{ width: '0%' }}></div>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-4 pt-2">
                                        <div className="flex items-center space-x-1">
                                            <span className="text-sm text-gray-600">6 Courses</span>
                                        </div>
                                        <div className="flex items-center space-x-1 text-[#0056E0]">
                                            <span className="text-sm font-medium">Boost: Up to 1.5x</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border border-gray-200 hover:border-[#0056E0]/40 transition-all duration-300 hover:shadow-md">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle>Educational Content Creator</CardTitle>
                                        <CardDescription className="mt-1">Learn to build educational resources</CardDescription>
                                    </div>
                                    <Badge variant="outline" className="bg-gradient-to-r from-[#0056E0] to-[#00E5BF] text-white border-none">
                                        Learning Path
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-sm font-medium">Path Progress</span>
                                            <span className="text-sm">0%</span>
                                        </div>
                                        <div className="h-2 bg-gray-100 rounded-full">
                                            <div className="h-2 bg-[#0056E0] rounded-full" style={{ width: '0%' }}></div>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-4 pt-2">
                                        <div className="flex items-center space-x-1">
                                            <span className="text-sm text-gray-600">7 Courses</span>
                                        </div>
                                        <div className="flex items-center space-x-1 text-[#0056E0]">
                                            <span className="text-sm font-medium">Boost: Up to 1.6x</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </section>
    );
}