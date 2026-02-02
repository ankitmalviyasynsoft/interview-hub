"use client"

import { PlusCircle, Search, Tags } from "lucide-react"
import Link from "next/link"
import paths from "@/navigate/paths"

import { Button } from "@/_components/ui/button"
import { DataTable } from "@/_components/ui/data-table"
import { columns, Category } from "@/_components/features/category/columns"
import { Input } from "@/_components/ui/input"

const mockCategories: Category[] = [
    { id: "cat-1", name: "React" },
    { id: "cat-2", name: "Node.js" },
]

export default function StaffCategoriesPage() {
    return (
        <div className="container mx-auto py-10 px-4 md:px-8 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight">Staff Categories</h1>
                    <p className="text-muted-foreground">Manage technical categories used for questions.</p>
                </div>
                <Link href={paths.staffMember.categories.add()}>
                    <Button className="gap-2 shadow-lg shadow-primary/20">
                        <PlusCircle className="h-4 w-4" />
                        Add Category
                    </Button>
                </Link>
            </div>

            <div className="flex items-center gap-2 max-w-sm mb-4">
                <div className="relative w-full">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search categories..." className="pl-9 h-10 border-muted-foreground/20" />
                </div>
            </div>

            <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
                <DataTable columns={columns} data={mockCategories} />
            </div>
        </div>
    )
}
