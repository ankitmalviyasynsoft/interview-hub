"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
    LayoutDashboard,
    FileQuestion,
    Building2,
    Tags,
    Users,
    Settings,
    ChevronRight,
    BookOpen,
    Menu,
    X,
    Sparkles
} from "lucide-react"
import paths from "@/navigate/paths"
import { useState, useEffect } from "react"
import { Button } from "@/_components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose
} from "@/_components/ui/sheet"

interface SidebarProps {
    role: "admin" | "staff"
}

export function Sidebar({ role }: SidebarProps) {
    const pathname = usePathname()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const adminLinks = [
        { label: "Dashboard", href: paths.admin.dashboard(), icon: LayoutDashboard },
        { label: "Questions", href: paths.admin.question.root(), icon: FileQuestion },
        { label: "Companies", href: paths.admin.company.root(), icon: Building2 },
        { label: "Categories", href: paths.admin.categories.root(), icon: Tags },
        { label: "Blogs", href: paths.admin.blogs.root(), icon: BookOpen },
        { label: "Users", href: paths.admin.users(), icon: Users },
    ]

    const staffLinks = [
        { label: "Dashboard", href: paths.staffMember.dashboard(), icon: LayoutDashboard },
        { label: "Questions", href: paths.staffMember.question.root(), icon: FileQuestion },
        { label: "Companies", href: paths.staffMember.company.root(), icon: Building2 },
        { label: "Categories", href: paths.staffMember.categories.root(), icon: Tags },
    ]

    const links = role === "admin" ? adminLinks : staffLinks
    const settingsPath = role === "admin" ? paths.admin.settings() : paths.staffMember.settings()

    if (!mounted) return null

    const SidebarContent = ({ className, isMobile = false }: { className?: string; isMobile?: boolean }) => (
        <div className={cn("flex flex-col h-full bg-card", className)}>
            <div className="flex-1 overflow-y-auto py-6">
                <div className="px-6 mb-8 lg:hidden">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary text-primary-foreground p-2 rounded-xl shadow-lg shadow-orange-500/30">
                            <Sparkles className="h-5 w-5 fill-current" />
                        </div>
                        <span className="font-black text-xl tracking-tighter uppercase tabular-nums">
                            {role === "admin" ? "Admin Panel" : "Staff Panel"}
                        </span>
                    </div>
                </div>

                <div className="px-3 space-y-1">
                    <h2 className="mb-4 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
                        Main Navigation
                    </h2>
                    <nav className="space-y-1.5">
                        {links.map((link) => {
                            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
                            const LinkComponent = isMobile ? SheetClose : 'div'

                            return (
                                <Link key={link.href} href={link.href}>
                                    <div
                                        className={cn(
                                            "group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold transition-all duration-300 cursor-pointer",
                                            isActive
                                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]"
                                                : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <link.icon className={cn("h-5 w-5 transition-transform duration-300 group-hover:scale-110", isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-primary")} />
                                            <span className="tracking-tight uppercase text-[11px] font-black">{link.label}</span>
                                        </div>
                                        {isActive && <ChevronRight className="h-4 w-4 opacity-50 animate-in slide-in-from-left-2" />}
                                    </div>
                                </Link>
                            )
                        })}
                    </nav>
                </div>

                <div className="px-3 mt-10 pt-8 border-t border-border/40 space-y-1">
                    <h2 className="mb-4 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
                        Preferences
                    </h2>
                    <nav className="space-y-1.5">
                        <Link href={settingsPath}>
                            <div
                                className={cn(
                                    "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all duration-300 cursor-pointer",
                                    pathname === settingsPath
                                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]"
                                        : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                                )}
                            >
                                <Settings className={cn("h-5 w-5 transition-transform duration-300 group-hover:scale-110", pathname === settingsPath ? "text-primary-foreground" : "text-muted-foreground group-hover:text-primary")} />
                                <span className="tracking-tight uppercase text-[11px] font-black">Settings</span>
                            </div>
                        </Link>
                    </nav>
                </div>
            </div>

            <div className="p-6 border-t border-border/40 bg-muted/20">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-card border border-border/50">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white font-black shadow-lg">
                        {role[0].toUpperCase()}
                    </div>
                    <div className="flex flex-col -space-y-1">
                        <span className="text-[10px] font-black uppercase text-foreground">Active Account</span>
                        <span className="text-[10px] font-bold text-muted-foreground capitalize">{role} Access</span>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-72 border-r border-border/40 bg-card h-[calc(100vh-64px)] sticky top-16 overflow-hidden">
                <SidebarContent />
            </aside>

            {/* Mobile Sidebar Trigger (Floating Button) */}
            <div className="lg:hidden fixed bottom-6 right-6 z-50">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button size="icon" className="h-14 w-14 rounded-2xl shadow-2xl shadow-primary/40 active:scale-95 transition-all">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-[300px] border-none rounded-r-[2rem]">
                        <SidebarContent className="h-full" isMobile={true} />
                    </SheetContent>
                </Sheet>
            </div>
        </>
    )
}
