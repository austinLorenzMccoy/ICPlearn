/**
 * Network Analytics Page - ICP network statistics and analytics
 */

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Activity, 
  Cpu, 
  Globe, 
  Zap, 
  Database, 
  Users,
  Clock,
  DollarSign,
  ArrowUp,
  ArrowDown,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ICPSidebar from '@/components/Layout/Sidebar';

interface NetworkStat {
  label: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  color: string;
}

interface SubnetData {
  id: string;
  name: string;
  nodes: number;
  canisters: number;
  utilization: number;
  status: 'healthy' | 'warning' | 'critical';
}

export default function NetworkAnalyticsPage() {
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const networkStats: NetworkStat[] = [
    {
      label: 'Total Canisters',
      value: '156,234',
      change: 12.5,
      icon: <Cpu className="h-5 w-5" />,
      color: 'text-[#3B00B9]'
    },
    {
      label: 'Active Nodes',
      value: '487',
      change: 2.1,
      icon: <Globe className="h-5 w-5" />,
      color: 'text-[#29ABE2]'
    },
    {
      label: 'Transactions/sec',
      value: '2,847',
      change: -5.3,
      icon: <Activity className="h-5 w-5" />,
      color: 'text-[#ED1E79]'
    },
    {
      label: 'Network Utilization',
      value: '67%',
      change: 8.7,
      icon: <BarChart3 className="h-5 w-5" />,
      color: 'text-[#F15A24]'
    },
    {
      label: 'Total Cycles Burned',
      value: '45.2T',
      change: 15.2,
      icon: <Zap className="h-5 w-5" />,
      color: 'text-[#50C878]'
    },
    {
      label: 'Storage Used',
      value: '892 TB',
      change: 6.8,
      icon: <Database className="h-5 w-5" />,
      color: 'text-purple-600'
    }
  ];

  const subnets: SubnetData[] = [
    {
      id: 'subnet-1',
      name: 'Application Subnet 1',
      nodes: 13,
      canisters: 24567,
      utilization: 78,
      status: 'healthy'
    },
    {
      id: 'subnet-2',
      name: 'Application Subnet 2',
      nodes: 13,
      canisters: 18923,
      utilization: 65,
      status: 'healthy'
    },
    {
      id: 'subnet-3',
      name: 'System Subnet',
      nodes: 34,
      canisters: 156,
      utilization: 45,
      status: 'healthy'
    },
    {
      id: 'subnet-4',
      name: 'Application Subnet 3',
      nodes: 13,
      canisters: 31245,
      utilization: 89,
      status: 'warning'
    }
  ];

  const refreshData = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLastUpdated(new Date());
    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="flex">
        <ICPSidebar />
        <main className="flex-1 pt-20 px-6 max-w-6xl mx-auto pb-12">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Network Analytics
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Real-time Internet Computer network statistics and performance metrics
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Last updated: {formatTime(lastUpdated)}
              </div>
              <Button 
                variant="outline" 
                onClick={refreshData}
                disabled={loading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>

          {/* Network Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {networkStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                          {stat.label}
                        </p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {stat.value}
                        </p>
                        <div className="flex items-center mt-2">
                          {stat.change > 0 ? (
                            <ArrowUp className="h-4 w-4 text-green-600 mr-1" />
                          ) : (
                            <ArrowDown className="h-4 w-4 text-red-600 mr-1" />
                          )}
                          <span className={`text-sm ${stat.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {Math.abs(stat.change)}%
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                            vs last hour
                          </span>
                        </div>
                      </div>
                      <div className={`p-3 rounded-lg bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 ${stat.color}`}>
                        {stat.icon}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Network Overview</TabsTrigger>
              <TabsTrigger value="subnets">Subnet Details</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="governance">Governance</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Network Health */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Activity className="h-5 w-5 text-green-600 mr-2" />
                      Network Health
                    </CardTitle>
                    <CardDescription>
                      Overall network status and key indicators
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Network Status</span>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          Healthy
                        </Badge>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Consensus Success Rate</span>
                            <span>99.8%</span>
                          </div>
                          <Progress value={99.8} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Network Uptime</span>
                            <span>99.95%</span>
                          </div>
                          <Progress value={99.95} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Average Block Time</span>
                            <span>1.2s</span>
                          </div>
                          <Progress value={85} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Transaction Volume */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="h-5 w-5 text-[#3B00B9] mr-2" />
                      Transaction Volume
                    </CardTitle>
                    <CardDescription>
                      Network activity over the last 24 hours
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900 dark:text-white">
                          2.4M
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Total transactions (24h)
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="text-lg font-bold text-[#ED1E79]">1.8M</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Query Calls</div>
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="text-lg font-bold text-[#F15A24]">0.6M</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Update Calls</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Subnets Tab */}
            <TabsContent value="subnets" className="space-y-4">
              {subnets.map((subnet, index) => (
                <motion.div
                  key={subnet.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-gradient-to-r from-[#3B00B9]/10 to-[#29ABE2]/10 rounded-lg">
                            <Globe className="h-6 w-6 text-[#3B00B9]" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {subnet.name}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                              {subnet.id}
                            </p>
                            <Badge className={getStatusColor(subnet.status)}>
                              {subnet.status}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex items-center space-x-8">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                              {subnet.nodes}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Nodes</div>
                          </div>
                          
                          <div className="text-center">
                            <div className="text-2xl font-bold text-[#ED1E79]">
                              {subnet.canisters.toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Canisters</div>
                          </div>
                          
                          <div className="text-center min-w-[120px]">
                            <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                              Utilization: {subnet.utilization}%
                            </div>
                            <Progress value={subnet.utilization} className="h-2" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>

            {/* Performance Tab */}
            <TabsContent value="performance">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Response Times</CardTitle>
                    <CardDescription>Average response times by call type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Query Calls</span>
                        <span className="text-sm font-bold">45ms</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Update Calls</span>
                        <span className="text-sm font-bold">1.2s</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Inter-Canister Calls</span>
                        <span className="text-sm font-bold">890ms</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Resource Usage</CardTitle>
                    <CardDescription>Network resource consumption</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Compute Utilization</span>
                          <span>67%</span>
                        </div>
                        <Progress value={67} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Memory Usage</span>
                          <span>54%</span>
                        </div>
                        <Progress value={54} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Storage Usage</span>
                          <span>78%</span>
                        </div>
                        <Progress value={78} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Governance Tab */}
            <TabsContent value="governance">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="h-5 w-5 text-[#3B00B9] mr-2" />
                      Network Nervous System
                    </CardTitle>
                    <CardDescription>
                      Governance and voting statistics
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Active Proposals</span>
                        <span className="text-lg font-bold text-[#3B00B9]">23</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Total Neurons</span>
                        <span className="text-lg font-bold text-[#ED1E79]">47,892</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Voting Participation</span>
                        <span className="text-lg font-bold text-[#50C878]">89.2%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Total ICP Staked</span>
                        <span className="text-lg font-bold text-[#F15A24]">234.5M</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                      Economic Metrics
                    </CardTitle>
                    <CardDescription>
                      Network economic indicators
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">ICP Price</span>
                        <span className="text-lg font-bold text-green-600">$12.45</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Market Cap</span>
                        <span className="text-lg font-bold">$5.8B</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">24h Volume</span>
                        <span className="text-lg font-bold">$145M</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Staking Rewards APY</span>
                        <span className="text-lg font-bold text-[#50C878]">8.25%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}