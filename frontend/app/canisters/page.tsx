/**
 * Canisters Page - Manage and monitor ICP canisters
 */

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Zap, 
  Database, 
  Activity, 
  Plus, 
  Settings, 
  Eye, 
  Play, 
  Pause, 
  Trash2,
  RefreshCw,
  Code,
  BarChart3,
  Clock,
  HardDrive,
  Wifi
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useICPBackend } from '@/hooks/useICPBackend';

interface Canister {
  id: string;
  name: string;
  status: 'running' | 'stopped' | 'stopping';
  type: 'backend' | 'frontend' | 'asset';
  cycles: number;
  memory: number;
  maxMemory: number;
  lastUpdated: string;
  version: string;
  calls: number;
}

export default function CanistersPage() {
  const { isAuthenticated } = useICPBackend();
  const [canisters, setCanisters] = useState<Canister[]>([
    {
      id: 'rdmx6-jaaaa-aaaah-qcaaw-cai',
      name: 'ICPlearn Backend',
      status: 'running',
      type: 'backend',
      cycles: 2500000000000,
      memory: 45.2,
      maxMemory: 100,
      lastUpdated: '2 minutes ago',
      version: '1.2.3',
      calls: 15420
    },
    {
      id: 'rrkah-fqaaa-aaaah-qcaaw-cai',
      name: 'ICPlearn Frontend',
      status: 'running',
      type: 'frontend',
      cycles: 1800000000000,
      memory: 32.1,
      maxMemory: 100,
      lastUpdated: '5 minutes ago',
      version: '2.1.0',
      calls: 8932
    },
    {
      id: 'rno2w-sqaaa-aaaah-qcaaw-cai',
      name: 'Asset Storage',
      status: 'running',
      type: 'asset',
      cycles: 950000000000,
      memory: 78.5,
      maxMemory: 100,
      lastUpdated: '1 hour ago',
      version: '1.0.5',
      calls: 3421
    }
  ]);

  const [loading, setLoading] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'stopped': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'stopping': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'backend': return <Database className="h-4 w-4" />;
      case 'frontend': return <Code className="h-4 w-4" />;
      case 'asset': return <HardDrive className="h-4 w-4" />;
      default: return <Cpu className="h-4 w-4" />;
    }
  };

  const formatCycles = (cycles: number) => {
    if (cycles >= 1e12) return `${(cycles / 1e12).toFixed(1)}T`;
    if (cycles >= 1e9) return `${(cycles / 1e9).toFixed(1)}B`;
    if (cycles >= 1e6) return `${(cycles / 1e6).toFixed(1)}M`;
    return cycles.toLocaleString();
  };

  const handleCanisterAction = (canisterId: string, action: string) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log(`${action} canister:`, canisterId);
      setLoading(false);
    }, 1000);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>
              Please login with Internet Identity to manage canisters
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Canister Management
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Monitor and manage your Internet Computer canisters
              </p>
            </div>
            <Button className="bg-gradient-to-r from-[#3B00B9] to-[#29ABE2] hover:from-[#2D0088] hover:to-[#1E8BB8] text-white">
              <Plus className="h-4 w-4 mr-2" />
              Deploy Canister
            </Button>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      Total Canisters
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {canisters.length}
                    </p>
                  </div>
                  <Cpu className="h-8 w-8 text-[#3B00B9]" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      Running
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      {canisters.filter(c => c.status === 'running').length}
                    </p>
                  </div>
                  <Activity className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      Total Cycles
                    </p>
                    <p className="text-2xl font-bold text-[#ED1E79]">
                      {formatCycles(canisters.reduce((sum, c) => sum + c.cycles, 0))}
                    </p>
                  </div>
                  <Zap className="h-8 w-8 text-[#ED1E79]" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      Total Calls
                    </p>
                    <p className="text-2xl font-bold text-[#F15A24]">
                      {canisters.reduce((sum, c) => sum + c.calls, 0).toLocaleString()}
                    </p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-[#F15A24]" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Canisters List */}
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList>
              <TabsTrigger value="all">All Canisters</TabsTrigger>
              <TabsTrigger value="backend">Backend</TabsTrigger>
              <TabsTrigger value="frontend">Frontend</TabsTrigger>
              <TabsTrigger value="asset">Assets</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {canisters.map((canister, index) => (
                <motion.div
                  key={canister.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-gradient-to-r from-[#3B00B9]/10 to-[#29ABE2]/10 rounded-lg">
                            {getTypeIcon(canister.type)}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {canister.name}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                              {canister.id}
                            </p>
                            <div className="flex items-center space-x-4 mt-2">
                              <Badge className={getStatusColor(canister.status)}>
                                <Wifi className="h-3 w-3 mr-1" />
                                {canister.status}
                              </Badge>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                v{canister.version}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {canister.lastUpdated}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-6">
                          {/* Memory Usage */}
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              Memory Usage
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {canister.memory.toFixed(1)}% of {canister.maxMemory}MB
                            </p>
                            <Progress value={canister.memory} className="w-24 h-2 mt-1" />
                          </div>

                          {/* Cycles */}
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              Cycles
                            </p>
                            <p className="text-lg font-bold text-[#ED1E79]">
                              {formatCycles(canister.cycles)}
                            </p>
                          </div>

                          {/* Calls */}
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              Calls
                            </p>
                            <p className="text-lg font-bold text-[#F15A24]">
                              {canister.calls.toLocaleString()}
                            </p>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCanisterAction(canister.id, 'view')}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCanisterAction(canister.id, 'settings')}
                            >
                              <Settings className="h-4 w-4" />
                            </Button>
                            {canister.status === 'running' ? (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleCanisterAction(canister.id, 'stop')}
                                disabled={loading}
                              >
                                <Pause className="h-4 w-4" />
                              </Button>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleCanisterAction(canister.id, 'start')}
                                disabled={loading}
                              >
                                <Play className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>

            {/* Type-specific tabs would filter the canisters */}
            <TabsContent value="backend">
              {/* Backend canisters only */}
            </TabsContent>
            <TabsContent value="frontend">
              {/* Frontend canisters only */}
            </TabsContent>
            <TabsContent value="asset">
              {/* Asset canisters only */}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
