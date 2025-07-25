import { HelpCircle, BookOpen, Code, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import CodeBlock from "./CodeBlock";

export default function StakingPools() {
    return (
        <section id="staking-pools" data-section="staking-pools" className="mb-12">
            <div className="flex items-center mb-6">
                <h2 className="text-3xl font-bold">Staking Pools</h2>
                <Badge variant="outline" className="ml-3 text-xs bg-[#0056E0]/10 text-[#0056E0] border-none">
                    Advanced
                </Badge>
            </div>
            <p className="text-gray-600 mb-6">
                EduStake offers various staking pools, each with unique characteristics, requirements, and educational focus areas.
            </p>

            {/* Pool Types Subsection */}
            <section id="pool-types" data-section="pool-types" className="mb-8">
                <h3 className="text-xl font-bold mb-4">Pool Types</h3>
                <p className="text-gray-600 mb-4">
                    Understanding the different types of staking pools will help you choose the right one for your goals.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <Card className="border border-gray-200 hover:border-[#0056E0]/40 transition-all duration-300 hover:shadow-md">
                        <CardHeader>
                            <div className="flex items-center">
                                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#0056E0]/10 to-[#00E5BF]/10 flex items-center justify-center mr-3">
                                    <BookOpen className="h-4 w-4 text-[#0056E0]" />
                                </div>
                                <CardTitle className="text-lg">Learn & Earn Basic</CardTitle>
                            </div>
                            <CardDescription>Perfect for beginners</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-3">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <p className="text-xs text-gray-500">APR</p>
                                    <p className="font-medium">10-12%</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-gray-500">Lock Period</p>
                                    <p className="font-medium">30 days</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-gray-500">Min Stake</p>
                                    <p className="font-medium">100 EDU</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-gray-500">Max Boost</p>
                                    <p className="font-medium">1.2x</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-gray-200 hover:border-[#0056E0]/40 transition-all duration-300 hover:shadow-md">
                        <CardHeader>
                            <div className="flex items-center">
                                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#0056E0]/10 to-[#00E5BF]/10 flex items-center justify-center mr-3">
                                    <Code className="h-4 w-4 text-[#0056E0]" />
                                </div>
                                <CardTitle className="text-lg">DeFi Scholar</CardTitle>
                            </div>
                            <CardDescription>For DeFi enthusiasts</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-3">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <p className="text-xs text-gray-500">APR</p>
                                    <p className="font-medium">12-15%</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-gray-500">Lock Period</p>
                                    <p className="font-medium">60 days</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-gray-500">Min Stake</p>
                                    <p className="font-medium">250 EDU</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-gray-500">Max Boost</p>
                                    <p className="font-medium">1.5x</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-gray-200 hover:border-[#0056E0]/40 transition-all duration-300 hover:shadow-md">
                        <CardHeader>
                            <div className="flex items-center">
                                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#0056E0]/10 to-[#00E5BF]/10 flex items-center justify-center mr-3">
                                    <Settings className="h-4 w-4 text-[#0056E0]" />
                                </div>
                                <CardTitle className="text-lg">Advanced Developer</CardTitle>
                            </div>
                            <CardDescription>For technical users</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-3">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <p className="text-xs text-gray-500">APR</p>
                                    <p className="font-medium">15-18%</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-gray-500">Lock Period</p>
                                    <p className="font-medium">90 days</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-gray-500">Min Stake</p>
                                    <p className="font-medium">500 EDU</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-gray-500">Max Boost</p>
                                    <p className="font-medium">2.0x</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Reward Calculation Subsection */}
            <section id="reward-calculation" data-section="reward-calculation" className="mb-8">
                <h3 className="text-xl font-bold mb-4">Reward Calculation</h3>
                <p className="text-gray-600 mb-4">
                    Understanding how rewards are calculated will help you optimize your staking strategy.
                </p>

                <h4 className="text-lg font-medium mt-6 mb-2">Basic Formula</h4>
                <div className="bg-gray-50 p-4 rounded-md">
                    <CodeBlock
                        code="Rewards = Principal × Base APR × Time × Educational Multiplier"
                        language="plaintext"
                    />

                    <div className="mt-4 text-sm text-gray-600">
                        <p><strong>Where:</strong></p>
                        <ul className="list-disc pl-5 space-y-1 mt-2">
                            <li><strong>Principal</strong>: Amount of EDU tokens staked</li>
                            <li><strong>Base APR</strong>: Annual percentage rate for the selected pool</li>
                            <li><strong>Time</strong>: Duration of stake as a fraction of a year</li>
                            <li><strong>Educational Multiplier</strong>: Boost earned from educational achievements</li>
                        </ul>
                    </div>
                </div>

                <h4 className="text-lg font-medium mt-6 mb-2">Example Calculation</h4>
                <div className="bg-white p-6 rounded-lg border">
                    <h5 className="font-medium mb-4">Scenario: DeFi Scholar Pool</h5>
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span>Amount Staked</span>
                            <span className="font-medium">500 EDU</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Base APR</span>
                            <span className="font-medium">15%</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Lock Period</span>
                            <span className="font-medium">60 days (0.164 years)</span>
                        </div>
                        <div className="flex justify-between text-[#0056E0]">
                            <span>Educational Multiplier</span>
                            <span className="font-medium">1.3x (DeFi Fundamentals course completed)</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-medium">
                            <span>Calculation</span>
                            <span>500 × 0.15 × 0.164 × 1.3</span>
                        </div>
                        <div className="flex justify-between font-bold">
                            <span>Total Reward</span>
                            <span>15.99 EDU</span>
                        </div>
                    </div>
                </div>

                <h4 className="text-lg font-medium mt-6 mb-2">Code Implementation</h4>
                <CodeBlock
                    code={`// Calculate staking rewards
function calculateRewards(principal, baseAPR, lockPeriodDays, educationalMultiplier) {
  const timeInYears = lockPeriodDays / 365;
  const rewards = principal * (baseAPR / 100) * timeInYears * educationalMultiplier;
  return rewards;
}

// Example usage
const stakingAmount = 500;  // EDU tokens
const baseAPR = 15;         // 15%
const lockPeriod = 60;      // 60 days
const eduMultiplier = 1.3;  // Educational multiplier

const estimatedRewards = calculateRewards(
  stakingAmount, 
  baseAPR, 
  lockPeriod, 
  eduMultiplier
);

console.log(\`Estimated rewards: \${estimatedRewards.toFixed(2)} EDU\`);
// Output: Estimated rewards: 15.99 EDU`}
                    language="typescript"
                />
            </section>
        </section>
    );
}