/**
 * SDK & Tools Page - Developer tools and resources for ICP development
 */

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  Terminal, 
  Download, 
  ExternalLink, 
  BookOpen, 
  Zap, 
  Package, 
  Wrench,
  GitBranch,
  Play,
  Copy,
  CheckCircle2,
  Cpu,
  Globe,
  Database,
  Layers
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Tool {
  id: string;
  name: string;
  description: string;
  category: 'sdk' | 'cli' | 'library' | 'template';
  language: string;
  version: string;
  downloadUrl: string;
  docsUrl: string;
  githubUrl: string;
  icon: React.ReactNode;
  isInstalled?: boolean;
}

interface CodeExample {
  title: string;
  language: string;
  code: string;
  description: string;
}

export default function SDKToolsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const tools: Tool[] = [
    {
      id: 'dfx',
      name: 'DFX CLI',
      description: 'Command-line tool for creating, deploying, and managing ICP projects',
      category: 'cli',
      language: 'Rust',
      version: '0.15.2',
      downloadUrl: 'https://github.com/dfinity/sdk/releases',
      docsUrl: 'https://internetcomputer.org/docs/current/developer-docs/setup/install',
      githubUrl: 'https://github.com/dfinity/sdk',
      icon: <Terminal className="h-6 w-6" />,
      isInstalled: true
    },
    {
      id: 'agent-js',
      name: 'Agent-JS',
      description: 'JavaScript/TypeScript library for interacting with ICP canisters',
      category: 'library',
      language: 'TypeScript',
      version: '0.20.2',
      downloadUrl: 'https://www.npmjs.com/package/@dfinity/agent',
      docsUrl: 'https://agent-js.icp.xyz/',
      githubUrl: 'https://github.com/dfinity/agent-js',
      icon: <Code className="h-6 w-6" />
    },
    {
      id: 'cdk-rs',
      name: 'CDK Rust',
      description: 'Canister Development Kit for Rust programming language',
      category: 'sdk',
      language: 'Rust',
      version: '0.11.1',
      downloadUrl: 'https://crates.io/crates/ic-cdk',
      docsUrl: 'https://docs.rs/ic-cdk/',
      githubUrl: 'https://github.com/dfinity/cdk-rs',
      icon: <Package className="h-6 w-6" />
    },
    {
      id: 'motoko',
      name: 'Motoko SDK',
      description: 'Programming language designed specifically for the Internet Computer',
      category: 'sdk',
      language: 'Motoko',
      version: '0.10.4',
      downloadUrl: 'https://github.com/dfinity/motoko/releases',
      docsUrl: 'https://internetcomputer.org/docs/current/motoko/main/motoko',
      githubUrl: 'https://github.com/dfinity/motoko',
      icon: <Zap className="h-6 w-6" />
    },
    {
      id: 'kybra',
      name: 'Kybra (Python CDK)',
      description: 'Python Canister Development Kit for ICP',
      category: 'sdk',
      language: 'Python',
      version: '0.17.0',
      downloadUrl: 'https://pypi.org/project/kybra/',
      docsUrl: 'https://demergent-labs.github.io/kybra/',
      githubUrl: 'https://github.com/demergent-labs/kybra',
      icon: <Database className="h-6 w-6" />
    },
    {
      id: 'vessel',
      name: 'Vessel',
      description: 'Package manager for Motoko programming language',
      category: 'cli',
      language: 'Dhall',
      version: '0.7.0',
      downloadUrl: 'https://github.com/dfinity/vessel/releases',
      docsUrl: 'https://github.com/dfinity/vessel#readme',
      githubUrl: 'https://github.com/dfinity/vessel',
      icon: <Package className="h-6 w-6" />
    }
  ];

  const codeExamples: CodeExample[] = [
    {
      title: 'Install DFX CLI',
      language: 'bash',
      code: `# Install DFX
sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"

# Verify installation
dfx --version`,
      description: 'Install the DFX command-line tool to start developing on ICP'
    },
    {
      title: 'Create New Project',
      language: 'bash',
      code: `# Create a new ICP project
dfx new my_project --type=motoko

# Navigate to project directory
cd my_project

# Start local replica
dfx start --background`,
      description: 'Create and set up a new Internet Computer project'
    },
    {
      title: 'Deploy Canister',
      language: 'bash',
      code: `# Deploy to local replica
dfx deploy

# Deploy to mainnet
dfx deploy --network ic

# Check canister status
dfx canister status my_project_backend`,
      description: 'Deploy your canister to local or mainnet'
    },
    {
      title: 'Agent-JS Integration',
      language: 'typescript',
      code: `import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from './declarations/my_backend';

// Create agent
const agent = new HttpAgent({ host: 'https://ic0.app' });

// Create actor
const actor = Actor.createActor(idlFactory, {
  agent,
  canisterId: 'your-canister-id',
});

// Call canister method
const result = await actor.greet('World');`,
      description: 'Connect to your canister from a web application'
    }
  ];

  const copyToClipboard = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'sdk': return <Layers className="h-4 w-4" />;
      case 'cli': return <Terminal className="h-4 w-4" />;
      case 'library': return <Code className="h-4 w-4" />;
      case 'template': return <GitBranch className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'sdk': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'cli': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'library': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'template': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              SDK & Developer Tools
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Essential tools and resources for Internet Computer development
            </p>
          </div>

          {/* Quick Start Alert */}
          <Alert className="mb-8 border-[#3B00B9]/20 bg-gradient-to-r from-[#3B00B9]/5 to-[#29ABE2]/5">
            <Zap className="h-4 w-4 text-[#3B00B9]" />
            <AlertDescription className="text-gray-700 dark:text-gray-300">
              <strong>Quick Start:</strong> Install DFX CLI to begin developing on the Internet Computer. 
              Check out our <a href="/learn" className="text-[#3B00B9] hover:underline">learning resources</a> for tutorials.
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="tools" className="space-y-6">
            <TabsList>
              <TabsTrigger value="tools">Development Tools</TabsTrigger>
              <TabsTrigger value="examples">Code Examples</TabsTrigger>
              <TabsTrigger value="templates">Project Templates</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            {/* Tools Tab */}
            <TabsContent value="tools">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.map((tool, index) => (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-gradient-to-r from-[#3B00B9]/10 to-[#29ABE2]/10 rounded-lg">
                              {tool.icon}
                            </div>
                            <div>
                              <CardTitle className="text-lg">{tool.name}</CardTitle>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge className={getCategoryColor(tool.category)}>
                                  {getCategoryIcon(tool.category)}
                                  <span className="ml-1 capitalize">{tool.category}</span>
                                </Badge>
                                {tool.isInstalled && (
                                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                    <CheckCircle2 className="h-3 w-3 mr-1" />
                                    Installed
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="mb-4">
                          {tool.description}
                        </CardDescription>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                          <span>Language: {tool.language}</span>
                          <span>v{tool.version}</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button 
                            size="sm" 
                            className="flex-1 bg-gradient-to-r from-[#3B00B9] to-[#29ABE2] hover:from-[#2D0088] hover:to-[#1E8BB8] text-white"
                            onClick={() => window.open(tool.downloadUrl, '_blank')}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Install
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => window.open(tool.docsUrl, '_blank')}
                          >
                            <BookOpen className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => window.open(tool.githubUrl, '_blank')}
                          >
                            <GitBranch className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Code Examples Tab */}
            <TabsContent value="examples">
              <div className="space-y-6">
                {codeExamples.map((example, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="flex items-center">
                              <Play className="h-5 w-5 text-[#3B00B9] mr-2" />
                              {example.title}
                            </CardTitle>
                            <CardDescription className="mt-2">
                              {example.description}
                            </CardDescription>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(example.code, example.title)}
                          >
                            {copiedCode === example.title ? (
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 overflow-x-auto">
                          <pre className="text-sm text-gray-100">
                            <code>{example.code}</code>
                          </pre>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Templates Tab */}
            <TabsContent value="templates">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Code className="h-5 w-5 text-[#3B00B9] mr-2" />
                      Hello World
                    </CardTitle>
                    <CardDescription>
                      Basic Motoko canister template
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Use Template
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Globe className="h-5 w-5 text-[#ED1E79] mr-2" />
                      React + ICP
                    </CardTitle>
                    <CardDescription>
                      Frontend with ICP backend integration
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Use Template
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Database className="h-5 w-5 text-[#F15A24] mr-2" />
                      Rust CDK
                    </CardTitle>
                    <CardDescription>
                      Rust canister with stable storage
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Use Template
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Resources Tab */}
            <TabsContent value="resources">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Official Documentation</CardTitle>
                    <CardDescription>
                      Comprehensive guides and API references
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Developer Docs
                      <ExternalLink className="h-4 w-4 ml-auto" />
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Code className="h-4 w-4 mr-2" />
                      Motoko Reference
                      <ExternalLink className="h-4 w-4 ml-auto" />
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Terminal className="h-4 w-4 mr-2" />
                      DFX Command Reference
                      <ExternalLink className="h-4 w-4 ml-auto" />
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Community Resources</CardTitle>
                    <CardDescription>
                      Connect with other ICP developers
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Globe className="h-4 w-4 mr-2" />
                      Developer Forum
                      <ExternalLink className="h-4 w-4 ml-auto" />
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <GitBranch className="h-4 w-4 mr-2" />
                      GitHub Examples
                      <ExternalLink className="h-4 w-4 ml-auto" />
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Wrench className="h-4 w-4 mr-2" />
                      Developer Discord
                      <ExternalLink className="h-4 w-4 ml-auto" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
