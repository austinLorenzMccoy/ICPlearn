import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CodeBlock from "./CodeBlock";

export default function CoreConcepts() {
    return (
        <section id="core-concepts" data-section="core-concepts" className="mb-12">
            <div className="flex items-center mb-6">
                <h2 className="text-3xl font-bold">Core Concepts</h2>
                <Badge variant="outline" className="ml-3 text-xs bg-[#0056E0]/10 text-[#0056E0] border-none">
                    Fundamental
                </Badge>
            </div>
            <p className="text-gray-600 mb-6">
                Understanding the fundamental concepts behind EduStake will help you optimize your experience on the platform.
            </p>

            {/* EDU Tokens Subsection */}
            <section id="edu-tokens" data-section="edu-tokens" className="mb-8">
                <h3 className="text-xl font-bold mb-4">EDU Tokens</h3>
                <p className="text-gray-600 mb-4">
                    EDU tokens are the native cryptocurrency of the EduStake platform, used for staking, rewards, and governance.
                </p>

                <h4 className="text-lg font-medium mt-6 mb-2">Token Economics</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Total Supply:</span>
                            <span className="font-medium">100,000,000 EDU</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Circulating Supply:</span>
                            <span className="font-medium">42,500,000 EDU</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Staking Allocation:</span>
                            <span className="font-medium">35,000,000 EDU</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Education Rewards:</span>
                            <span className="font-medium">15,000,000 EDU</span>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-md">
                        <h5 className="font-medium mb-2">Token Utility</h5>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                            <li>Stake in various educational pools</li>
                            <li>Earn rewards for completing courses</li>
                            <li>Governance voting on platform decisions</li>
                            <li>Access premium educational content</li>
                            <li>Create and verify educational credentials</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Staking Mechanism Subsection */}
            <section id="staking-mechanism" data-section="staking-mechanism" className="mb-8">
                <h3 className="text-xl font-bold mb-4">Staking Mechanism</h3>
                <p className="text-gray-600 mb-4">
                    EduStake's unique staking mechanism combines traditional yield generation with educational incentives.
                </p>

                <h4 className="text-lg font-medium mt-6 mb-2">How Staking Works</h4>
                <ol className="list-decimal pl-6 text-gray-600 space-y-4">
                    <li>
                        <strong>Select a Pool</strong>: Choose a staking pool that aligns with your educational interests and investment timeline.
                    </li>
                    <li>
                        <strong>Deposit Tokens</strong>: Stake your EDU tokens in the selected pool for a specific lock period.
                    </li>
                    <li>
                        <strong>Earn Base Rewards</strong>: Receive base APY rewards for the duration of your stake.
                    </li>
                    <li>
                        <strong>Complete Educational Tasks</strong>: Enhance your rewards by completing associated educational courses and activities.
                    </li>
                    <li>
                        <strong>Apply Multipliers</strong>: Educational achievements provide multipliers that increase your staking rewards.
                    </li>
                </ol>

                <div className="mt-6 p-4 border rounded-md">
                    <h4 className="text-lg font-medium mb-2">Staking Formula</h4>
                    <p className="text-gray-600 mb-2">The total rewards are calculated using the following formula:</p>
                    <CodeBlock
                        code="Rewards = Staked Amount × Base APY × Educational Multiplier × Time Period"
                        language="plaintext"
                    />
                    <p className="text-sm text-gray-500 mt-2">
                        Educational multipliers range from 1.0x (no educational completion) to 2.0x (complete mastery).
                    </p>
                </div>
            </section>

            {/* Educational Rewards Subsection */}
            <section id="educational-rewards" data-section="educational-rewards" className="mb-8">
                <h3 className="text-xl font-bold mb-4">Educational Rewards</h3>
                <p className="text-gray-600 mb-4">
                    Educational rewards are what make EduStake unique in the blockchain space, incentivizing continuous learning and skill development.
                </p>

                <h4 className="text-lg font-medium mt-6 mb-2">Multiplier System</h4>
                <p className="text-gray-600 mb-4">
                    Educational achievements award multipliers that increase your staking rewards:
                </p>

                <table className="w-full border-collapse mt-2">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="py-2 px-4 text-left border text-sm font-medium">Achievement</th>
                            <th className="py-2 px-4 text-left border text-sm font-medium">Multiplier Boost</th>
                            <th className="py-2 px-4 text-left border text-sm font-medium">Requirements</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="py-2 px-4 border text-sm">Blockchain Basics</td>
                            <td className="py-2 px-4 border text-sm">+0.1x</td>
                            <td className="py-2 px-4 border text-sm">Complete Blockchain 101 course</td>
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border text-sm">DeFi Explorer</td>
                            <td className="py-2 px-4 border text-sm">+0.2x</td>
                            <td className="py-2 px-4 border text-sm">Complete DeFi Fundamentals course</td>
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border text-sm">Smart Contract Developer</td>
                            <td className="py-2 px-4 border text-sm">+0.3x</td>
                            <td className="py-2 px-4 border text-sm">Complete Smart Contract Development course</td>
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border text-sm">Learning Path Master</td>
                            <td className="py-2 px-4 border text-sm">+0.4x</td>
                            <td className="py-2 px-4 border text-sm">Complete a full Learning Path</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </section>
    );
}