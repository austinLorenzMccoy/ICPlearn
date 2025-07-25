import { Badge } from "@/components/ui/badge";
import CodeBlock from "./CodeBlock";

export default function APIReference() {
    return (
        <section id="api-reference" data-section="api-reference" className="mb-12">
            <div className="flex items-center mb-6">
                <h2 className="text-3xl font-bold">API Reference</h2>
                <Badge variant="outline" className="ml-3 text-xs bg-[#0056E0]/10 text-[#0056E0] border-none">
                    Technical
                </Badge>
            </div>
            <p className="text-gray-600 mb-6">
                The EduStake API allows developers to interact with the platform programmatically, integrating staking and educational features into their applications.
            </p>

            {/* Authentication Subsection */}
            <section id="authentication" data-section="authentication" className="mb-8">
                <h3 className="text-xl font-bold mb-4">Authentication</h3>
                <p className="text-gray-600 mb-4">
                    All API requests must be authenticated using an API key or JWT token.
                </p>

                <h4 className="text-lg font-medium mt-6 mb-2">API Key Authentication</h4>
                <p className="text-gray-600 mb-4">
                    Include your API key in the request headers:
                </p>

                <CodeBlock
                    code={`// API Key Authentication
const response = await fetch('https://api.edustack.io/v1/staking/pools', {
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'YOUR_API_KEY'
  }
});`}
                    language="typescript"
                />

                <h4 className="text-lg font-medium mt-6 mb-2">JWT Authentication</h4>
                <p className="text-gray-600 mb-4">
                    For user-specific operations, use JWT tokens:
                </p>

                <CodeBlock
                    code={`// JWT Authentication
const response = await fetch('https://api.edustack.io/v1/user/profile', {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_JWT_TOKEN'
  }
});`}
                    language="typescript"
                />
            </section>

            {/* Staking Endpoints Subsection */}
            <section id="staking-endpoints" data-section="staking-endpoints" className="mb-8">
                <h3 className="text-xl font-bold mb-4">Staking Endpoints</h3>
                <p className="text-gray-600 mb-4">
                    Use these endpoints to interact with the staking functionality of EduStake.
                </p>

                <div className="mt-6 space-y-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-2">
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">GET</span>
                            <code className="text-sm">/v1/staking/pools</code>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Returns a list of all available staking pools.</p>

                        <h5 className="text-sm font-medium mt-4 mb-1">Response Example:</h5>
                        <CodeBlock
                            code={`{
  "status": "success",
  "data": {
    "pools": [
      {
        "id": "learn-earn-basic",
        "name": "Learn & Earn Basic",
        "description": "Perfect for beginners",
        "baseAPR": 10.5,
        "lockPeriod": 30,
        "lockPeriodUnit": "days",
        "minStake": 100,
        "maxStake": 10000,
        "maxBoost": 1.2,
        "totalStaked": 125500,
        "stakersCount": 453,
        "requirements": {
          "courseIds": ["blockchain-101"]
        }
      },
      // Additional pools...
    ]
  }
}`}
                            language="json"
                        />
                    </div>

                    <div>
                        <div className="flex items-center space-x-2 mb-2">
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">POST</span>
                            <code className="text-sm">/v1/staking/stake</code>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Initiates a staking transaction for a user.</p>

                        <h5 className="text-sm font-medium mt-4 mb-1">Request Body:</h5>
                        <CodeBlock
                            code={`{
  "poolId": "learn-earn-basic",
  "amount": 500,
  "walletAddress": "0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
}`}
                            language="json"
                        />
                    </div>
                </div>
            </section>

            {/* Education Endpoints Subsection */}
            <section id="education-endpoints" data-section="education-endpoints" className="mb-8">
                <h3 className="text-xl font-bold mb-4">Education Endpoints</h3>
                <p className="text-gray-600 mb-4">
                    Use these endpoints to interact with the educational content and track learning progress.
                </p>

                <div className="mt-6 space-y-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-2">
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">GET</span>
                            <code className="text-sm">/v1/education/courses</code>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Returns a list of all available educational courses.</p>

                        <h5 className="text-sm font-medium mt-4 mb-1">Response Example:</h5>
                        <CodeBlock
                            code={`{
  "status": "success",
  "data": {
    "courses": [
      {
        "id": "blockchain-101",
        "title": "Blockchain Fundamentals",
        "description": "Learn the core concepts of blockchain technology",
        "level": "beginner",
        "duration": "2 hours",
        "modules": 5,
        "reward": 100,
        "stakingBoost": "1.1x",
        "prerequisites": []
      },
      // Additional courses...
    ]
  }
}`}
                            language="json"
                        />
                    </div>
                </div>
            </section>
        </section>
    );
}