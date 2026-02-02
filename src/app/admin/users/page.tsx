"use client"

import { Search, Users as UsersIcon } from "lucide-react"
import { Input } from "@/_components/ui/input"
import { DataTable } from "@/_components/ui/data-table"
import { columns, User } from "@/_components/features/user/columns"
import { Card, CardContent } from "@/_components/ui/card"

const mockUsers: User[] = [
    { id: "1", name: "John Doe", email: "john@example.com", role: "Admin", status: "Active", plan: "Pro" },
    { id: "2", name: "Jane Smith", email: "jane@smith.com", role: "Staff", status: "Active", plan: "Free" },
    { id: "3", name: "Bob Wilson", email: "bob@wilson.com", role: "Customer", status: "Inactive", plan: "Pro" },
    { id: "4", name: "Alice Brown", email: "alice@brown.com", role: "Customer", status: "Active", plan: "Free" },
    { id: "5", name: "Charlie Davis", email: "charlie@davis.com", role: "Customer", status: "Active", plan: "Pro" },
    { id: "6", name: "Diana Prince", email: "diana@amazon.com", role: "Staff", status: "Active", plan: "Pro" },
    { id: "7", name: "Edward Norton", email: "edward@fightclub.com", role: "Customer", status: "Active", plan: "Free" },
    { id: "8", name: "Fiona Apple", email: "fiona@music.com", role: "Customer", status: "Inactive", plan: "Free" },
    { id: "9", name: "George Miller", email: "george@madmax.com", role: "Admin", status: "Active", plan: "Pro" },
    { id: "10", name: "Hannah Arendt", email: "hannah@philosophy.com", role: "Customer", status: "Active", plan: "Free" },
    { id: "11", name: "Ian Holm", email: "ian@bilbo.com", role: "Customer", status: "Active", plan: "Pro" },
    { id: "12", name: "Jack Sparrow", email: "jack@pearl.com", role: "Customer", status: "Inactive", plan: "Free" },
]

export default function UsersPage() {
    return (
        <div className="container mx-auto py-10 px-4 md:px-8 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-left">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight">User Management</h1>
                    <p className="text-muted-foreground">Monitor and manage platform users, their roles, and subscription plans.</p>
                </div>
                <div className="flex items-center gap-2 bg-primary/5 px-4 py-2 rounded-xl border border-primary/10">
                    <UsersIcon className="h-5 w-5 text-primary" />
                    <span className="font-bold text-lg">{mockUsers.length}</span>
                    <span className="text-sm text-muted-foreground uppercase font-black tracking-widest px-1">Total Users</span>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by name or email..."
                        className="pl-10 h-12 bg-card border-muted-foreground/20 focus:ring-primary transition-all"
                    />
                </div>
            </div>

            <Card className="border-none shadow-xl bg-card overflow-hidden">
                <CardContent className="p-0">
                    <DataTable columns={columns} data={mockUsers} />
                </CardContent>
            </Card>
        </div>
    )
}
