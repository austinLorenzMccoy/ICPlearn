import { HelpCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import CodeBlock from "./CodeBlock";

export default function GettingStarted() {
    return (
        <section id="getting-started" data-section="getting-started" className="mb-12">
            <div className="flex items-center mb-6">
                <h2 className="text-3xl font-bold">Getting Started</h2>
                <Badge variant="outline" className="ml-3 text-xs bg-[#0056E0]/10 text-[#0056E0] border-none">
                    Essential
                </Badge>
            </div>
            <p className="text-gray-600 mb-6">
                Follow these steps to get up and running with EduStake quickly and easily.
            </p>

            {/* Installation Subsection */}
            <section id="installation" data-section="installation" className="mb-8">
                <h3 className="text-xl font-bold mb-4">Installation</h3>
                <p className="text-gray-600 mb-4">
                    You can install EduStake using npm, yarn, or access it directly through our web interface.
                </p>

                <h4 className="text-lg font-medium mt-6 mb-2">Using npm</h4>
                <CodeBlock
                    code="npm install @educhain/edustack"
                    language="bash"
                />

                <h4 className="text-lg font-medium mt-6 mb-2">Using yarn</h4>
                <CodeBlock
                    code="yarn add @educhain/edustack"
                    language="bash"
                />

                <h4 className="text-lg font-medium mt-6 mb-2">Web Access</h4>
                <p className="text-gray-600 mb-4">
                    Alternatively, you can access EduStake directly through our web interface at <a href="https://app.edustack.io" className="text-[#0056E0] hover:underline">https://app.edustack.io</a>.
                </p>
            </section>

            {/* Connecting Wallets Subsection */}
            <section id="connecting-wallets" data-section="connecting-wallets" className="mb-8">
                <h3 className="text-xl font-bold mb-4">Connecting Wallets</h3>
                <p className="text-gray-600 mb-4">
                    EduStake supports multiple wallet providers for connecting to the platform.
                </p>

                <h4 className="text-lg font-medium mt-6 mb-2">Supported Wallets</h4>
                <ul className="list-disc pl-6 mb-4 text-gray-600 space-y-2">
                    <li>MetaMask</li>
                    <li>WalletConnect</li>
                    <li>Coinbase Wallet</li>
                    <li>Trust Wallet</li>
                </ul>

                <h4 className="text-lg font-medium mt-6 mb-2">Code Example</h4>
                <CodeBlock
                    code={`import { EduStakeClient } from '@educhain/edustack';

// Initialize the client
const client = new EduStakeClient({
  apiKey: 'YOUR_API_KEY',
  environment: 'production' // or 'testnet'
});

// Connect wallet
async function connectWallet() {
  try {
    const walletConnection = await client.connectWallet('metamask');
    console.log('Connected wallet address:', walletConnection.address);
    return walletConnection;
  } catch (error) {
    console.error('Failed to connect wallet:', error);
  }
}`}
                    language="typescript"
                />

                <div className="bg-[#0056E0]/5 p-4 rounded-md mt-6">
                    <h4 className="text-lg font-medium mb-2 flex items-center">
                        <HelpCircle className="h-5 w-5 mr-2 text-[#0056E0]" />
                        Security Tips
                    </h4>
                    <ul className="list-disc pl-6 text-gray-600 space-y-2">
                        <li>Always verify you're on the official EduStake website before connecting your wallet</li>
                        <li>Never share your private keys or recovery phrases</li>
                        <li>Consider using a hardware wallet for enhanced security</li>
                        <li>Disconnect your wallet when not actively using the platform</li>
                    </ul>
                </div>
            </section>

            {/* User Accounts Subsection */}
            <section id="user-accounts" data-section="user-accounts" className="mb-8">
                <h3 className="text-xl font-bold mb-4">User Accounts</h3>
                <p className="text-gray-600 mb-4">
                    Learn how to create and manage user accounts on the EduStake platform.
                </p>

                <div className="bg-[#00E5BF]/5 p-4 rounded-md mt-2 mb-4">
                    <p className="text-sm text-gray-600">
                        <strong>Note:</strong> Your wallet address serves as your unique identifier on EduStake, but creating a profile allows you to personalize your experience, track your educational progress, and optimize your staking rewards.
                    </p>
                </div>

                <h4 className="text-lg font-medium mt-6 mb-2">Creating a User Profile</h4>
                <p className="text-gray-600 mb-4">
                    After connecting your wallet, you'll need to create a user profile to access all features of the platform.
                </p>

                <CodeBlock
                    code={`// Create a user profile
async function createUserProfile(walletConnection, userData) {
  try {
    const profile = await client.users.create({
      walletAddress: walletConnection.address,
      username: userData.username,
      email: userData.email,
      preferences: userData.preferences
    });
    
    console.log('User profile created:', profile);
    return profile;
  } catch (error) {
    console.error('Failed to create user profile:', error);
  }
}`}
                    language="typescript"
                />
            </section>
        </section>
    );
}