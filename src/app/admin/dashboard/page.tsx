"use client"

import {
    FileQuestion,
    Tags,
    Building2,
    BookOpen,
    Users,
    Zap,
    TrendingUp,
    ArrowRight
} from "lucide-react"
import Link from "next/link"
import paths from "@/navigate/paths"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/_components/ui/card"
import { Badge } from "@/_components/ui/badge"
import { Button } from "@/_components/ui/button"

const stats = [
    { label: "Questions", value: "1,280", icon: FileQuestion, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Categories", value: "48", icon: Tags, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Companies", value: "112", icon: Building2, color: "text-amber-500", bg: "bg-amber-500/10" },
    { label: "Blogs", value: "32", icon: BookOpen, color: "text-rose-500", bg: "bg-rose-500/10" },
    { label: "Users", value: "4,500", icon: Users, color: "text-indigo-500", bg: "bg-indigo-500/10" },
    { label: "Pro Users", value: "850", icon: Zap, color: "text-yellow-500", bg: "bg-yellow-500/10" },
]

const recentQuestions = [
    { id: "1", title: "Explain Javascript Event Loop in deep detail", company: "Google", category: "Javascript", date: "2 mins ago" },
    { id: "2", title: "How does React Fiber work under the hood?", company: "Meta", category: "React", date: "1 hour ago" },
    { id: "3", title: "Scale a SQL database for 1M reads/second", company: "Amazon", category: "System Design", date: "3 hours ago" },
    { id: "4", title: "implement a debounce function from scratch", company: "Meta", category: "Javascript", date: "5 hours ago" },
]

export default function AdminDashboard() {
    return (
        <div className="container mx-auto py-10 px-4 md:px-8 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight">Admin Dashboard</h1>
                    <p className="text-muted-foreground">Welcome back, Admin. Here's what's happening today.</p>
                </div>
                <div className="flex gap-2">
                    <Link href={paths.admin.question.add()}>
                        <Button className="gap-2">
                            <FileQuestion className="h-4 w-4" />
                            Add Question
                        </Button>
                    </Link>
                    <Button variant="outline" className="gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Reports
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {stats.map((stat) => {
                    const href = stat.label === "Questions" ? paths.admin.question.root() :
                        stat.label === "Categories" ? paths.admin.categories.root() :
                            stat.label === "Companies" ? paths.admin.company.root() :
                                stat.label === "Users" ? paths.admin.users() : "#";

                    return (
                        <Link key={stat.label} href={href} className="block group">
                            <Card className="border-none shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                                <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
                                    <div className={`p-3 rounded-2xl ${stat.bg} group-hover:scale-110 transition-transform`}>
                                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold">{stat.value}</p>
                                        <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest font-sans">{stat.label}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    )
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Questions */}
                <Card className="lg:col-span-2 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div>
                            <CardTitle className="text-xl">Recent Questions</CardTitle>
                            <CardDescription>Latest questions added to the platform.</CardDescription>
                        </div>
                        <Link href={paths.admin.question.root()}>
                            <Button variant="ghost" size="sm" className="gap-1 text-primary">
                                View All
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentQuestions.map((q) => (
                                <div key={q.id} className="flex items-center justify-between p-4 rounded-xl border bg-card hover:bg-muted/50 transition-colors cursor-pointer group">
                                    <div className="space-y-1 overflow-hidden">
                                        <p className="font-bold truncate group-hover:text-primary transition-colors">{q.title}</p>
                                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <Building2 className="h-3 w-3" />
                                                {q.company}
                                            </span>
                                            <span className="flex items-center gap-1 font-sans">
                                                <Tags className="h-3 w-3" />
                                                {q.category}
                                            </span>
                                            <span>• {q.date}</span>
                                        </div>
                                    </div>
                                    <Link href={paths.admin.question.edit(q.id)}>
                                        <Button variant="ghost" size="icon" className="shrink-0 rounded-full">
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* User Insights */}
                <div className="space-y-8">
                    <Card className="shadow-sm overflow-hidden">
                        <CardHeader className="pb-2 bg-gradient-to-br from-indigo-500/10 to-transparent">
                            <CardTitle className="text-xl flex items-center gap-2">
                                <Users className="h-5 w-5 text-indigo-500" />
                                User Distribution
                            </CardTitle>
                            <CardDescription>Total Breakdown</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-4 space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm font-medium">
                                    <span>Pro Users</span>
                                    <span className="text-primary tracking-tighter">18.8%</span>
                                </div>
                                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-primary" style={{ width: "18.8%" }} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm font-medium">
                                    <span>Regular Users</span>
                                    <span className="text-zinc-600 tracking-tighter">81.2%</span>
                                </div>
                                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-400" style={{ width: "81.2%" }} />
                                </div>
                            </div>
                            <div className="pt-4 border-t space-y-3">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Active Today</span>
                                    <Badge variant="secondary" className="font-sans">1,240</Badge>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">New Signups (24h)</span>
                                    <Badge variant="success" className="bg-emerald-500/10 text-emerald-600 border-none font-sans font-black">+42</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm border-primary/20 bg-primary/5">
                        <CardContent className="p-6 space-y-4">
                            <div className="bg-primary/10 w-fit p-3 rounded-xl">
                                <TrendingUp className="h-6 w-6 text-primary" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="font-bold text-lg">Growth Insights</h3>
                                <p className="text-sm text-muted-foreground">You recorded 15% more traffic this week compared to last month.</p>
                            </div>
                            <Button className="w-full text-xs" variant="outline">Learn More</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

function Edit({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
            <path d="m15 5 4 4" />
        </svg>
    )
}

