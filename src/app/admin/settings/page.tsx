"use client"

import {
    User,
    Bell,
    Shield,
    Palette,
    Globe,
    Mail,
    Lock,
    Smartphone
} from "lucide-react"
import { Button } from "@/_components/ui/button"
import { Input } from "@/_components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/_components/ui/card"
import { Badge } from "@/_components/ui/badge"
import { Separator } from "@/_components/ui/separator"

export default function SettingsPage() {
    return (
        <div className="container mx-auto py-10 px-4 md:px-8 space-y-10">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-extrabold tracking-tight">System Settings</h1>
                <p className="text-muted-foreground text-lg">Manage your account preferences and global platform configurations.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Navigation Tabs (Simulated) */}
                <div className="lg:col-span-1 space-y-2">
                    <Button variant="secondary" className="w-full justify-start gap-3 h-12 font-bold bg-primary/10 text-primary">
                        <User className="h-4 w-4" />
                        Profile & Account
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-3 h-12 text-muted-foreground hover:bg-muted/50">
                        <Bell className="h-4 w-4" />
                        Notifications
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-3 h-12 text-muted-foreground hover:bg-muted/50">
                        <Shield className="h-4 w-4" />
                        Security
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-3 h-12 text-muted-foreground hover:bg-muted/50">
                        <Palette className="h-4 w-4" />
                        Appearance
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-3 h-12 text-muted-foreground hover:bg-muted/50">
                        <Globe className="h-4 w-4" />
                        Regional & Language
                    </Button>
                </div>

                {/* Content Area */}
                <div className="lg:col-span-3 space-y-8">
                    {/* Profile Section */}
                    <Card className="border-none shadow-sm bg-muted/30">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5 text-primary" />
                                Public Profile
                            </CardTitle>
                            <CardDescription>How others see you on the platform.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex flex-col md:flex-row gap-8 items-start">
                                <div className="relative group">
                                    <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white text-3xl font-black shadow-xl">
                                        AD
                                    </div>
                                    <button className="absolute -bottom-2 -right-2 bg-background border rounded-full p-2 shadow-sm hover:scale-110 transition-transform">
                                        <Smartphone className="h-4 w-4" />
                                    </button>
                                </div>
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Display Name</label>
                                        <Input defaultValue="Admin User" className="bg-background h-11 border-muted-foreground/20" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Admin ID</label>
                                        <Input readOnly value="admin_889241" className="bg-muted h-11 border-muted-foreground/10" />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Contact Details */}
                    <Card className="border-none shadow-sm bg-muted/30">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Mail className="h-5 w-5 text-primary" />
                                Contact Information
                            </CardTitle>
                            <CardDescription>Primary account handlers for system alerts.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email Address</label>
                                    <div className="flex gap-2">
                                        <Input defaultValue="admin@interviewhub.com" className="bg-background h-11 border-muted-foreground/20" />
                                        <Badge className="bg-emerald-500/10 text-emerald-600 border-none h-11 px-4 items-center flex">Verified</Badge>
                                    </div>
                                </div>
                                <p className="text-[10px] text-muted-foreground italic">Sending account verification code to this email will disable other forms of authentication.</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Security Section */}
                    <Card className="border-none shadow-sm bg-muted/30">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Lock className="h-5 w-5 text-primary" />
                                Security & Password
                            </CardTitle>
                            <CardDescription>Secure your account with multi-factor authentication.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between p-4 rounded-xl border bg-background group hover:border-primary/50 transition-colors">
                                <div className="space-y-1">
                                    <p className="font-bold">Two-Factor Authentication</p>
                                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
                                </div>
                                <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50 leading-relaxed px-3">Disabled</Badge>
                            </div>
                            <Separator className="bg-muted-foreground/10" />
                            <div className="flex justify-end">
                                <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">Change Password</Button>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end pt-6 gap-4 border-t">
                        <Button variant="ghost" className="px-8">Cancel</Button>
                        <Button className="px-10 h-12 shadow-xl shadow-primary/20">Save Changes</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
