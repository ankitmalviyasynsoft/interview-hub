"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/_components/ui/badge"
import { Button } from "@/_components/ui/button"
import { Mail, ShieldCheck, UserCheck, MoreHorizontal } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/_components/ui/dropdown-menu"

export type User = {
    id: string
    name: string
    email: string
    role: string
    status: string
    plan: string
}

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "name",
        header: "User",
        cell: ({ row }) => {
            const user = row.original
            return (
                <div className="flex flex-col">
                    <span className="font-bold">{user.name}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {user.email}
                    </span>
                </div>
            )
        },
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => {
            const role = row.getValue("role") as string
            return (
                <Badge variant="outline" className="gap-1 font-sans">
                    {role === 'Admin' ? <ShieldCheck className="h-3 w-3 text-red-500" /> : <UserCheck className="h-3 w-3 text-blue-500" />}
                    {role}
                </Badge>
            )
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string
            return (
                <Badge
                    variant={status === 'Active' ? 'success' : 'secondary'}
                    className={status === 'Active' ? 'bg-emerald-500/10 text-emerald-600 border-none font-sans font-bold' : 'font-sans'}
                >
                    {status}
                </Badge>
            )
        },
    },
    {
        accessorKey: "plan",
        header: "Plan",
        cell: ({ row }) => {
            const plan = row.getValue("plan") as string
            return (
                <Badge
                    variant={plan === 'Pro' ? 'default' : 'outline'}
                    className={plan === 'Pro' ? 'bg-yellow-500/10 text-yellow-700 border-yellow-200 font-bold' : ''}
                >
                    {plan}
                </Badge>
            )
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <div className="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 border-none">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(row.original.id)}>
                                Copy User ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View profile</DropdownMenuItem>
                            <DropdownMenuItem>Manage permissions</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Suspend user</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
    },
]
