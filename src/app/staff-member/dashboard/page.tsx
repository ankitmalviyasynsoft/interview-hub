"use client"

import {
    FilePlus,
    CheckCircle2,
    Clock,
    LayoutDashboard,
    FileQuestion,
    Tags,
    Building2,
    ArrowRight,
    MessageSquare
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
import { Button } from "@/_components/ui/button"
import { Badge } from "@/_components/ui/badge"

const yourStats = [
    { label: "Questions Added", value: "24", icon: FileQuestion, color: "text-blue-500" },
    { label: "Pending Review", value: "5", icon: Clock, color: "text-amber-500" },
    { label: "Approved", value: "19", icon: CheckCircle2, color: "text-emerald-500" },
]

const pendingTasks = [
    { id: "1", task: "Review 'Closure in JS'", priority: "High", deadline: "Today" },
    { id: "2", task: "Add Meta Interview Qs", priority: "Medium", deadline: "Tomorrow" },
    { id: "3", task: "Fix typo in 'SQL Joins'", priority: "Low", deadline: "Friday" },
]

export default function StaffDashboard() {
    return (
        <div className="container mx-auto py-10 px-4 md:px-8 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight">Staff Dashboard</h1>
                    <p className="text-muted-foreground">Welcome back. Let's contribute some high-quality content today.</p>
                </div>
                <Link href={paths.staffMember.question.add()}>
                    <Button className="gap-2 shadow-lg shadow-primary/20">
                        <PlusCircle className="h-4 w-4" />
                        New Question
                    </Button>
                </Link>
            </div>

            {/* Contribution Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {yourStats.map((stat) => (
                    <Card key={stat.label} className="relative overflow-hidden group hover:border-primary/50 transition-all">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest font-sans">{stat.label}</p>
                                    <p className="text-3xl font-bold mt-1 tracking-tighter">{stat.value}</p>
                                </div>
                                <div className={`p-2 rounded-lg bg-background border ${stat.color} group-hover:scale-110 transition-transform`}>
                                    <stat.icon className="h-5 w-5" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Your Recent Contributions */}
                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div>
                            <CardTitle className="text-lg">Recent Contributions</CardTitle>
                            <CardDescription>Your latest added questions.</CardDescription>
                        </div>
                        <Link href={paths.staffMember.question.root()}>
                            <Button variant="link" className="text-primary font-sans">See all</Button>
                        </Link>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors border-transparent border hover:border-border">
                                <div className="bg-muted h-10 w-10 shrink-0 rounded-lg flex items-center justify-center">
                                    <FilePlus className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-bold">Implement a recursive function for deep merging objects</p>
                                    <div className="flex gap-2">
                                        <Badge variant="outline" className="text-[10px] h-4 px-1.5 font-sans uppercase">Javascript</Badge>
                                        <span className="text-[10px] text-muted-foreground tracking-widest uppercase font-sans">2 days ago</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Tasks & Feedback */}
                <div className="space-y-8">
                    <Card className="shadow-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                Pending Tasks
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4 px-0">
                            {pendingTasks.map((task) => (
                                <div key={task.id} className="flex items-center justify-between px-6 py-3 hover:bg-muted/30 transition-colors border-b last:border-0">
                                    <div className="space-y-0.5">
                                        <p className="text-sm font-medium">{task.task}</p>
                                        <p className="text-xs text-muted-foreground">Due: {task.deadline}</p>
                                    </div>
                                    <Badge
                                        variant={task.priority === 'High' ? 'destructive' : 'secondary'}
                                        className="text-[10px] uppercase font-sans font-black"
                                    >
                                        {task.priority}
                                    </Badge>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-none shadow-xl">
                        <CardContent className="p-6 flex items-center gap-6">
                            <div className="bg-white/20 p-4 rounded-full">
                                <MessageSquare className="h-8 w-8 text-white" />
                            </div>
                            <div className="space-y-1">
                                <p className="font-bold text-lg leading-tight tracking-tight">Feedback Hub</p>
                                <p className="text-xs text-white/80 leading-relaxed tracking-wider font-sans uppercase">You have 3 new comments from reviewers on your latest question.</p>
                                <Button variant="secondary" size="sm" className="mt-2 text-xs font-bold font-sans tracking-widest uppercase h-8 px-4 rounded-full">View Feedback</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

function PlusCircle({ className }: { className?: string }) {
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
            <circle cx="12" cy="12" r="10" />
            <path d="M8 12h8" />
            <path d="M12 8v8" />
        </svg>
    )
}
