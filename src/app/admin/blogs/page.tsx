"use client"

import { PlusCircle, Search, FileText, Calendar, User, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"
import paths from "@/navigate/paths"

import { Button } from "@/_components/ui/button"
import { DataTable } from "@/_components/ui/data-table"
import { Badge } from "@/_components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/_components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"

type Blog = {
    id: string
    title: string
    author: string
    status: 'published' | 'draft'
    date: string
    tags: string[]
}

const mockBlogs: Blog[] = [
    { id: "1", title: "Top 5 Javascript Interview Questions in 2024", author: "Admin", status: "published", date: "Jan 12, 2024", tags: ["tips", "engineering"] },
    { id: "2", title: "Understanding the React 18 Concurrent Mode", author: "Staff User", status: "draft", date: "Feb 01, 2024", tags: ["engineering"] },
    { id: "3", title: "How to design a scalable Notification System", author: "Admin", status: "published", date: "Dec 15, 2023", tags: ["engineering", "tips"] },
]

export default function AdminBlogListing() {
    const columns: ColumnDef<Blog>[] = [
        {
            accessorKey: "title",
            header: "Blog Post",
            cell: ({ row }) => (
                <div className="flex flex-col max-w-[400px]">
                    <span className="font-bold truncate">{row.original.title}</span>
                    <div className="flex gap-1 mt-1">
                        {row.original.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-[9px] h-4 px-1 capitalize">{tag}</Badge>
                        ))}
                    </div>
                </div>
            )
        },
        {
            accessorKey: "author",
            header: "Author",
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm font-medium">{row.original.author}</span>
                </div>
            )
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.original.status
                return (
                    <Badge variant={status === 'published' ? 'success' : 'secondary'} className="font-sans uppercase text-[10px] tracking-widest font-black">
                        {status}
                    </Badge>
                )
            }
        },
        {
            accessorKey: "date",
            header: "Last Updated",
            cell: ({ row }) => (
                <div className="flex items-center gap-2 text-muted-foreground text-xs font-sans">
                    <Calendar className="h-3 w-3" />
                    {row.original.date}
                </div>
            )
        },
        {
            id: "actions",
            cell: ({ row }) => (
                <div className="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 border-none">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <Link href={paths.admin.blogs.edit(row.original.id)}>
                                <DropdownMenuItem className="gap-2 cursor-pointer">
                                    <Edit className="h-4 w-4" />
                                    Edit Post
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem className="gap-2 text-primary cursor-pointer">
                                <Eye className="h-4 w-4" />
                                View Post
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-2 text-red-600 focus:text-red-600 cursor-pointer">
                                <Trash2 className="h-4 w-4" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        }
    ]

    return (
        <div className="container mx-auto py-10 px-4 md:px-8 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight">Blog Management</h1>
                    <p className="text-muted-foreground">Draft, publish and manage company articles and news.</p>
                </div>
                <Link href={paths.admin.blogs.add()}>
                    <Button className="gap-2 h-12 px-6 shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
                        <PlusCircle className="h-5 w-5" />
                        Create New Blog
                    </Button>
                </Link>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        placeholder="Search by title or author..."
                        className="flex h-12 w-full rounded-md border border-input bg-card px-10 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all font-sans"
                    />
                </div>
                <Button variant="outline" className="h-12 gap-2 border-muted-foreground/20 font-sans">
                    <FileText className="h-4 w-4" />
                    Export Data
                </Button>
            </div>

            <div className="rounded-2xl border-none shadow-2xl bg-card overflow-hidden">
                <DataTable columns={columns} data={mockBlogs} />
            </div>
        </div>
    )
}
