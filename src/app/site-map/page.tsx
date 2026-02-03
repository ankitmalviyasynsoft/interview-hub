'use client'

import Link from 'next/link'
import { Shield, Users, Lock, Globe, LayoutDashboard, FileQuestion, Building2, Tags, PlusCircle, Edit, ExternalLink, Settings as SettingsIcon, BookOpen } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/_components/ui/card"
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import paths from '@/navigate/paths'

export default function SiteMapPage() {
    const sections = [
        {
            title: 'Admin Portal',
            description: 'Manage content, users, and settings.',
            icon: Shield,
            color: 'text-red-500',
            bg: 'bg-red-500/10',
            links: [
                { label: 'Admin Dashboard', href: paths.admin.dashboard(), icon: LayoutDashboard },
                { label: 'Manage Questions', href: paths.admin.question.root(), icon: FileQuestion },
                { label: 'Add Question', href: paths.admin.question.add(), icon: PlusCircle },
                { label: 'Edit Question (Demo)', href: paths.admin.question.edit('1'), icon: Edit },
                { label: 'Manage Companies', href: paths.admin.company.root(), icon: Building2 },
                { label: 'Add Company', href: paths.admin.company.add(), icon: PlusCircle },
                { label: 'Edit Company (Demo)', href: paths.admin.company.edit('1'), icon: Edit },
                { label: 'Manage Categories', href: paths.admin.categories.root(), icon: Tags },
                { label: 'Add Category', href: paths.admin.categories.add(), icon: PlusCircle },
                { label: 'Edit Category (Demo)', href: paths.admin.categories.edit('1'), icon: Edit },
                { label: 'Manage Blogs', href: paths.admin.blogs.root(), icon: BookOpen },
                { label: 'Add Blog Post', href: paths.admin.blogs.add(), icon: PlusCircle },
                { label: 'Manage Users', href: paths.admin.users(), icon: Users },
                { label: 'Admin Settings', href: paths.admin.settings(), icon: SettingsIcon },
            ],
        },
        {
            title: 'Staff Member Portal',
            description: 'Contribute and review content.',
            icon: Users,
            color: 'text-blue-500',
            bg: 'bg-blue-500/10',
            links: [
                { label: 'Staff Dashboard', href: paths.staffMember.dashboard(), icon: LayoutDashboard },
                { label: 'Questions', href: paths.staffMember.question.root(), icon: FileQuestion },
                { label: 'Add Question', href: paths.staffMember.question.add(), icon: PlusCircle },
                { label: 'Edit Question (Demo)', href: paths.staffMember.question.edit('1'), icon: Edit },
                { label: 'Companies', href: paths.staffMember.company.root(), icon: Building2 },
                { label: 'Add Company', href: paths.staffMember.company.add(), icon: PlusCircle },
                { label: 'Edit Company (Demo)', href: paths.staffMember.company.edit('1'), icon: Edit },
                { label: 'Categories', href: paths.staffMember.categories.root(), icon: Tags },
                { label: 'Add Category', href: paths.staffMember.categories.add(), icon: PlusCircle },
                { label: 'Edit Category (Demo)', href: paths.staffMember.categories.edit('1'), icon: Edit },
                { label: 'Staff Settings', href: paths.staffMember.settings(), icon: SettingsIcon },
            ],
        },
        {
            title: 'Authentication',
            description: 'User access control screens.',
            icon: Lock,
            color: 'text-amber-500',
            bg: 'bg-amber-500/10',
            links: [
                { label: 'Sign In', href: paths.signIn(), icon: ExternalLink },
                { label: 'Sign Up', href: paths.signUp(), icon: ExternalLink },
                { label: 'Forgot Password', href: paths.forgotPassword(), icon: ExternalLink },
                { label: 'Reset Password', href: paths.resetPassword(), icon: ExternalLink },
            ],
        },
        {
            title: 'Public / Customer',
            description: 'Main user facing application.',
            icon: Globe,
            color: 'text-emerald-500',
            bg: 'bg-emerald-500/10',
            links: [
                { label: 'Home Page', href: paths.home(), icon: ExternalLink },
                { label: 'Customer Profile', href: paths.customerProfile(), icon: ExternalLink }, // Assuming this exists based on history
            ],
        },
    ]

    return (
        <div className="container py-12 px-4 md:px-6 mx-auto max-w-7xl">
            <div className="space-y-4 mb-10 text-center">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Project Site Map</h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">Quick global navigation to all implemented modules and pages in the Interview Hub application.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sections.map((section, index) => (
                    <Card key={index} className="border-l-4 overflow-hidden" style={{ borderLeftColor: 'var(--border)' }}>
                        <div className={`h-1.5 w-full ${section.bg.replace('/10', '')}`} />
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-md ${section.bg}`}>
                                    <section.icon className={`w-6 h-6 ${section.color}`} />
                                </div>
                                <div>
                                    <CardTitle>{section.title}</CardTitle>
                                    <CardDescription>{section.description}</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {section.links.map((link, linkIndex) => (
                                    <Link key={linkIndex} href={link.href} className="w-full group">
                                        <Button variant="outline" className="w-full justify-start gap-2 h-auto py-3 px-4 hover:border-primary/50 hover:bg-muted/50 transition-all font-normal">
                                            <link.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                            <span className="truncate">{link.label}</span>
                                            {link.label.includes('Demo') && (
                                                <Badge variant="secondary" className="ml-auto text-[10px] h-5 px-1.5">
                                                    Demo
                                                </Badge>
                                            )}
                                        </Button>
                                    </Link>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
