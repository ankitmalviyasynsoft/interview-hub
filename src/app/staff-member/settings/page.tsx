"use client"

import {
    User,
    Bell,
    Shield,
    Palette,
    Mail,
    Lock,
} from "lucide-react"
import { Button } from "@/_components/ui/button"
import { Input } from "@/_components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/_components/ui/card"
import { Badge } from "@/_components/ui/badge"
import { Separator } from "@/_components/ui/separator"

export default function StaffSettingsPage() {
    return (
        <div className="container mx-auto py-10 px-4 md:px-8 space-y-10">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-extrabold tracking-tight">Staff Settings</h1>
                <p className="text-muted-foreground text-lg">Manage your personal profile and preferences as a staff member.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Navigation Tabs (Simulated) */}
                <div className="lg:col-span-1 space-y-2">
                    <Button variant="secondary" className="w-full justify-start gap-3 h-12 font-bold bg-primary/10 text-primary">
                        <User className="h-4 w-4" />
                        My Profile
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-3 h-12 text-muted-foreground hover:bg-muted/50">
                        <Bell className="h-4 w-4" />
                        Email Alerts
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-3 h-12 text-muted-foreground hover:bg-muted/50">
                        <Lock className="h-4 w-4" />
                        Security
                    </Button>
                </div>

                {/* Content Area */}
                <div className="lg:col-span-3 space-y-8">
                    {/* Profile Section */}
                    <Card className="border-none shadow-sm bg-muted/30">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5 text-primary" />
                                Staff Information
                            </CardTitle>
                            <CardDescription>Update your personal details and how you appear on the platform.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Full Name</label>
                                    <Input defaultValue="Staff Member" className="bg-background h-11 border-muted-foreground/20" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Specialization</label>
                                    <Input defaultValue="Fullstack Developer" className="bg-background h-11 border-muted-foreground/20" />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Staff Email</label>
                                    <Input defaultValue="staff@interviewhub.com" className="bg-background h-11 border-muted-foreground/20" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Security Section */}
                    <Card className="border-none shadow-sm bg-muted/30">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shield className="h-5 w-5 text-primary" />
                                Account Security
                            </CardTitle>
                            <CardDescription>Manage your authentication and password.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex justify-between items-center">
                                <div className="space-y-1">
                                    <p className="font-bold">Password Management</p>
                                    <p className="text-sm text-muted-foreground">It is recommended to change your password every 90 days.</p>
                                </div>
                                <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">Update Password</Button>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end pt-6 gap-4 border-t">
                        <Button variant="ghost" className="px-8">Cancel Changes</Button>
                        <Button className="px-10 h-12 shadow-xl shadow-primary/20">Apply Settings</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
