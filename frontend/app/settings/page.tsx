"use client";

import { useState } from "react";
import {
    User,
    Shield,
    BellRing,
    Globe,
    Wallet as WalletIcon,
    Moon,
    Sun,
    Save,
    Lock,
    Key,
    AlertTriangle,
    Info
} from "lucide-react";
import Sidebar from "@/components/Layout/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function SettingsPage() {
    const [darkMode, setDarkMode] = useState(false);
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [stakeNotifications, setStakeNotifications] = useState(true);
    const [rewardNotifications, setRewardNotifications] = useState(true);
    const [learningNotifications, setLearningNotifications] = useState(true);
    const [language, setLanguage] = useState("english");

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex">
                <Sidebar />
                <main className="flex-1 pt-20 px-6 max-w-6xl mx-auto pb-12">
                    {/* Page Header */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                        <p className="text-gray-600 mt-1">Manage your account preferences and settings</p>
                    </div>

                    <Tabs defaultValue="account" className="space-y-6">
                        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
                            <TabsTrigger value="account" className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                <span>Account</span>
                            </TabsTrigger>
                            <TabsTrigger value="security" className="flex items-center gap-2">
                                <Shield className="h-4 w-4" />
                                <span>Security</span>
                            </TabsTrigger>
                            <TabsTrigger value="notifications" className="flex items-center gap-2">
                                <BellRing className="h-4 w-4" />
                                <span>Notifications</span>
                            </TabsTrigger>
                            <TabsTrigger value="preferences" className="flex items-center gap-2">
                                <Globe className="h-4 w-4" />
                                <span>Preferences</span>
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="account" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Profile Information</CardTitle>
                                    <CardDescription>Update your account profile details</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="flex items-center space-x-4">
                                        <Avatar className="h-20 w-20">
                                            <AvatarImage src="/api/placeholder/80/80" alt="Profile" />
                                            <AvatarFallback>JD</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <Button variant="outline" size="sm" className="mb-2">
                                                Upload Photo
                                            </Button>
                                            <p className="text-xs text-gray-500">
                                                JPG, PNG or GIF. Max size of 2MB.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">First Name</Label>
                                            <Input id="firstName" defaultValue="John" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">Last Name</Label>
                                            <Input id="lastName" defaultValue="Doe" />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <Label htmlFor="email">Email Address</Label>
                                            <Input id="email" defaultValue="john.doe@example.com" />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <Label htmlFor="bio">Bio</Label>
                                            <Textarea
                                                id="bio"
                                                placeholder="Tell us about yourself"
                                                rows={3}
                                                defaultValue="Blockchain enthusiast and lifelong learner on EDU Chain."
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-end">
                                        <Button className="bg-gradient-to-r from-[#0056E0] to-[#00E5BF] hover:opacity-90 text-white">
                                            <Save className="h-4 w-4 mr-2" />
                                            Save Changes
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Connected Wallets</CardTitle>
                                    <CardDescription>Manage your connected blockchain wallets</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#0056E0]/5 to-[#00E5BF]/5 rounded-lg">
                                            <div className="flex items-center space-x-4">
                                                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#0056E0]/10 to-[#00E5BF]/10 flex items-center justify-center">
                                                    <WalletIcon className="h-5 w-5 text-[#0056E0]" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">Metamask</p>
                                                    <p className="text-xs text-gray-500">0x71C...8a4E (Primary)</p>
                                                </div>
                                            </div>
                                            <Button variant="outline" size="sm">
                                                Disconnect
                                            </Button>
                                        </div>

                                        <div className="flex items-center justify-between p-4 border border-dashed rounded-lg">
                                            <div className="text-center w-full">
                                                <p className="text-sm text-gray-600">Connect another wallet</p>
                                                <Button className="mt-2 bg-gradient-to-r from-[#0056E0] to-[#00E5BF] hover:opacity-90 text-white">
                                                    Connect Wallet
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="security" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Password</CardTitle>
                                    <CardDescription>Change your account password</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="currentPassword">Current Password</Label>
                                            <Input id="currentPassword" type="password" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="newPassword">New Password</Label>
                                            <Input id="newPassword" type="password" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                                            <Input id="confirmPassword" type="password" />
                                        </div>
                                    </div>

                                    <div className="flex justify-end">
                                        <Button className="bg-gradient-to-r from-[#0056E0] to-[#00E5BF] hover:opacity-90 text-white">
                                            <Lock className="h-4 w-4 mr-2" />
                                            Update Password
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Two-Factor Authentication</CardTitle>
                                    <CardDescription>Add an extra layer of security to your account</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#0056E0]/10 to-[#00E5BF]/10 flex items-center justify-center">
                                                <Key className="h-5 w-5 text-[#0056E0]" />
                                            </div>
                                            <div>
                                                <p className="font-medium">Two-Factor Authentication</p>
                                                <p className="text-xs text-gray-500">Enhance your account security</p>
                                            </div>
                                        </div>
                                        <Switch />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-red-200">
                                <CardHeader>
                                    <CardTitle className="text-red-600 flex items-center">
                                        <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
                                        Danger Zone
                                    </CardTitle>
                                    <CardDescription>
                                        Irreversible actions for your account
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button variant="destructive" className="w-full sm:w-auto">
                                        Delete Account
                                    </Button>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="notifications" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Notification Settings</CardTitle>
                                    <CardDescription>Configure how and when you receive notifications</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="emailNotifications" className="flex flex-col">
                                                <span>Email Notifications</span>
                                                <span className="text-xs text-gray-500">Receive notifications via email</span>
                                            </Label>
                                            <Switch
                                                id="emailNotifications"
                                                checked={emailNotifications}
                                                onCheckedChange={setEmailNotifications}
                                            />
                                        </div>

                                        <Separator />

                                        <div className="space-y-4">
                                            <h3 className="text-sm font-medium">Notification Types</h3>

                                            <div className="flex items-center justify-between">
                                                <Label htmlFor="stakeNotifications" className="flex flex-col">
                                                    <span>Staking Updates</span>
                                                    <span className="text-xs text-gray-500">Notifications about your stake status</span>
                                                </Label>
                                                <Switch
                                                    id="stakeNotifications"
                                                    checked={stakeNotifications}
                                                    onCheckedChange={setStakeNotifications}
                                                    disabled={!emailNotifications}
                                                />
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <Label htmlFor="rewardNotifications" className="flex flex-col">
                                                    <span>Reward Alerts</span>
                                                    <span className="text-xs text-gray-500">Get notified when you earn rewards</span>
                                                </Label>
                                                <Switch
                                                    id="rewardNotifications"
                                                    checked={rewardNotifications}
                                                    onCheckedChange={setRewardNotifications}
                                                    disabled={!emailNotifications}
                                                />
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <Label htmlFor="learningNotifications" className="flex flex-col">
                                                    <span>Learning Opportunities</span>
                                                    <span className="text-xs text-gray-500">Updates about new courses and learning paths</span>
                                                </Label>
                                                <Switch
                                                    id="learningNotifications"
                                                    checked={learningNotifications}
                                                    onCheckedChange={setLearningNotifications}
                                                    disabled={!emailNotifications}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end">
                                        <Button className="bg-gradient-to-r from-[#0056E0] to-[#00E5BF] hover:opacity-90 text-white">
                                            Save Preferences
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="preferences" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>System Preferences</CardTitle>
                                    <CardDescription>Customize your application experience</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="darkMode" className="flex flex-col">
                                                <span>Dark Mode</span>
                                                <span className="text-xs text-gray-500">Switch between light and dark themes</span>
                                            </Label>
                                            <div className="flex items-center gap-2">
                                                <Sun className="h-4 w-4 text-gray-500" />
                                                <Switch
                                                    id="darkMode"
                                                    checked={darkMode}
                                                    onCheckedChange={setDarkMode}
                                                />
                                                <Moon className="h-4 w-4 text-gray-500" />
                                            </div>
                                        </div>

                                        <Separator />

                                        <div className="space-y-2">
                                            <Label htmlFor="language">Language</Label>
                                            <Select value={language} onValueChange={setLanguage}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select language" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="english">English</SelectItem>
                                                    <SelectItem value="spanish">Spanish</SelectItem>
                                                    <SelectItem value="french">French</SelectItem>
                                                    <SelectItem value="german">German</SelectItem>
                                                    <SelectItem value="japanese">Japanese</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="flex justify-end">
                                        <Button className="bg-gradient-to-r from-[#0056E0] to-[#00E5BF] hover:opacity-90 text-white">
                                            Save Preferences
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Data Privacy</CardTitle>
                                    <CardDescription>Manage your data and privacy settings</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="analyticsConsent" className="flex flex-col">
                                                <span>Analytics Consent</span>
                                                <span className="text-xs text-gray-500">Allow us to collect anonymous usage data</span>
                                            </Label>
                                            <Switch id="analyticsConsent" defaultChecked />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="marketingEmails" className="flex flex-col">
                                                <span>Marketing Emails</span>
                                                <span className="text-xs text-gray-500">Receive updates and offers</span>
                                            </Label>
                                            <Switch id="marketingEmails" />
                                        </div>

                                        <div className="bg-blue-50 p-4 rounded-lg flex items-start mt-4">
                                            <Info className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                                            <p className="text-sm text-blue-700">
                                                Your data is stored and processed in accordance with our
                                                <a href="#" className="text-[#0056E0] underline ml-1">Privacy Policy</a>.
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </main>
            </div>
        </div>
    );
}