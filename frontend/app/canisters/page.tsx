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
  Wifi,
  Upload,
  FileCode,
  X
} from 'lucide-react';
import Sidebar from "@/components/Layout/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
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
  // const { isAuthenticated } = useICPBackend();
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
  const [deployModalOpen, setDeployModalOpen] = useState(false);
  const [deployForm, setDeployForm] = useState({
    name: '',
    type: '',
    wasmFile: null as File | null,
    didFile: null as File | null,
    initialCycles: '',
    description: '',
    memory: '2',
    compute: 'normal'
  });

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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, fileType: 'wasm' | 'did') => {
    const file = event.target.files?.[0];
    if (file) {
      setDeployForm(prev => ({
        ...prev,
        [fileType === 'wasm' ? 'wasmFile' : 'didFile']: file
      }));
    }
  };

  const handleDeployCanister = async () => {
    setLoading(true);
    
    // Simulate deployment process
    try {
      console.log('Deploying canister with form data:', deployForm);
      
      // Generate a mock canister ID
      const mockCanisterId = `${Math.random().toString(36).substr(2, 5)}-${Math.random().toString(36).substr(2, 5)}-aaaah-qcaaw-cai`;
      
      // Create new canister object
      const newCanister: Canister = {
        id: mockCanisterId,
        name: deployForm.name,
        status: 'running',
        type: deployForm.type as 'backend' | 'frontend' | 'asset',
        cycles: parseInt(deployForm.initialCycles) || 1000000000000,
        memory: 5.2,
        maxMemory: parseInt(deployForm.memory) * 1024, // Convert GB to MB
        lastUpdated: 'Just now',
        version: '1.0.0',
        calls: 0
      };

      // Add to canisters list
      setCanisters(prev => [...prev, newCanister]);
      
      // Reset form and close modal
      setDeployForm({
        name: '',
        type: '',
        wasmFile: null,
        didFile: null,
        initialCycles: '',
        description: '',
        memory: '2',
        compute: 'normal'
      });
      setDeployModalOpen(false);
      
      // Show success message (you can replace with toast notification)
      alert('Canister deployed successfully!');
    } catch (error) {
      console.error('Deployment failed:', error);
      alert('Deployment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Filter canisters by type for different tabs
  const filterCanistersByType = (type: string) => {
    if (type === 'all') return canisters;
    return canisters.filter(canister => canister.type === type);
  };

  const renderCanistersList = (canistersToRender: Canister[]) => (
    <div className="space-y-4">
      {canistersToRender.map((canister, index) => (
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
    </div>
  );

  // if (!isAuthenticated) {
  //   return (
  //     <div className="min-h-screen bg-gray-50">
  //       <div className="flex">
  //         <Sidebar />
  //         <main className="flex-1 pt-20 px-6 max-w-6xl mx-auto pb-12">
  //           <Card className="max-w-md mx-auto">
  //             <CardHeader className="text-center">
  //               <CardTitle>Authentication Required</CardTitle>
  //               <CardDescription>
  //                 Please login with Internet Identity to manage canisters
  //               </CardDescription>
  //             </CardHeader>
  //           </Card>
  //         </main>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 pt-20 px-6 max-w-6xl mx-auto pb-12">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Canister Management
              </h1>
              <p className="text-gray-600">
                Monitor and manage your Internet Computer canisters
              </p>
            </div>
            <Dialog open={deployModalOpen} onOpenChange={setDeployModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-[#3B00B9] to-[#29ABE2] hover:from-[#2D0088] hover:to-[#1E8BB8] text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Deploy Canister
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold">Deploy New Canister</DialogTitle>
                  <DialogDescription>
                    Deploy a new canister to the Internet Computer network
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-6 mt-6">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="canister-name">Canister Name</Label>
                        <Input
                          id="canister-name"
                          placeholder="e.g., My DApp Backend"
                          value={deployForm.name}
                          onChange={(e) => setDeployForm(prev => ({ ...prev, name: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="canister-type">Canister Type</Label>
                        <Select 
                          value={deployForm.type} 
                          onValueChange={(value) => setDeployForm(prev => ({ ...prev, type: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="backend">Backend</SelectItem>
                            <SelectItem value="frontend">Frontend</SelectItem>
                            <SelectItem value="asset">Asset Storage</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description (Optional)</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe what this canister does..."
                        value={deployForm.description}
                        onChange={(e) => setDeployForm(prev => ({ ...prev, description: e.target.value }))}
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* File Uploads */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Code & Interface</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="wasm-file">WASM File</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#3B00B9] transition-colors">
                          <input
                            id="wasm-file"
                            type="file"
                            accept=".wasm"
                            onChange={(e) => handleFileUpload(e, 'wasm')}
                            className="hidden"
                          />
                          <label htmlFor="wasm-file" className="cursor-pointer">
                            <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                            <p className="text-sm text-gray-600">
                              {deployForm.wasmFile ? deployForm.wasmFile.name : 'Click to upload WASM file'}
                            </p>
                          </label>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="did-file">Candid Interface (Optional)</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#3B00B9] transition-colors">
                          <input
                            id="did-file"
                            type="file"
                            accept=".did"
                            onChange={(e) => handleFileUpload(e, 'did')}
                            className="hidden"
                          />
                          <label htmlFor="did-file" className="cursor-pointer">
                            <FileCode className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                            <p className="text-sm text-gray-600">
                              {deployForm.didFile ? deployForm.didFile.name : 'Click to upload .did file'}
                            </p>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Resource Configuration */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Resource Configuration</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="initial-cycles">Initial Cycles</Label>
                        <Input
                          id="initial-cycles"
                          placeholder="e.g., 1000000000000"
                          value={deployForm.initialCycles}
                          onChange={(e) => setDeployForm(prev => ({ ...prev, initialCycles: e.target.value }))}
                        />
                        <p className="text-xs text-gray-500">Cycles for initial deployment</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="memory-limit">Memory Limit (GB)</Label>
                        <Select 
                          value={deployForm.memory} 
                          onValueChange={(value) => setDeployForm(prev => ({ ...prev, memory: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 GB</SelectItem>
                            <SelectItem value="2">2 GB</SelectItem>
                            <SelectItem value="4">4 GB</SelectItem>
                            <SelectItem value="8">8 GB</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="compute-allocation">Compute Allocation</Label>
                        <Select 
                          value={deployForm.compute} 
                          onValueChange={(value) => setDeployForm(prev => ({ ...prev, compute: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="normal">Normal</SelectItem>
                            <SelectItem value="high">High Performance</SelectItem>
                            <SelectItem value="low">Low Resource</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-3 pt-6 border-t">
                    <Button 
                      variant="outline" 
                      onClick={() => setDeployModalOpen(false)}
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleDeployCanister}
                      disabled={loading || !deployForm.name || !deployForm.type}
                      className="bg-gradient-to-r from-[#3B00B9] to-[#29ABE2] hover:from-[#2D0088] hover:to-[#1E8BB8] text-white"
                    >
                      {loading ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Deploying...
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4 mr-2" />
                          Deploy Canister
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Canisters
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
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
                    <p className="text-sm font-medium text-gray-600">
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
                    <p className="text-sm font-medium text-gray-600">
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
                    <p className="text-sm font-medium text-gray-600">
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
              {renderCanistersList(filterCanistersByType('all'))}
            </TabsContent>

            <TabsContent value="backend" className="space-y-4">
              {renderCanistersList(filterCanistersByType('backend'))}
            </TabsContent>

            <TabsContent value="frontend" className="space-y-4">
              {renderCanistersList(filterCanistersByType('frontend'))}
            </TabsContent>

            <TabsContent value="asset" className="space-y-4">
              {renderCanistersList(filterCanistersByType('asset'))}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}