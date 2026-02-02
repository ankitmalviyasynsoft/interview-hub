"use client"

import { Plus, PlusCircle, Building2, Search, ExternalLink } from "lucide-react"
import Link from "next/link"
import paths from "@/navigate/paths"

import { Button } from "@/_components/ui/button"
import { DataTable } from "@/_components/ui/data-table"
import { columns, Company } from "@/_components/features/company/columns"
import { Input } from "@/_components/ui/input"

// Mock data
const mockCompanies: Company[] = [
    { id: "comp-1", name: "Google" },
    { id: "comp-2", name: "Meta" },
    { id: "comp-3", name: "Amazon" },
    { id: "comp-4", name: "Netflix" },
    { id: "comp-5", name: "Apple" },
    { id: "comp-6", name: "Microsoft" },
]

export default function CompanyPage() {
    return (
        <div className="container mx-auto py-10 px-4 md:px-8 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight">Companies</h1>
                    <p className="text-muted-foreground">Manage the list of companies associated with interview questions.</p>
                </div>
                <Link href={paths.admin.company.add()}>
                    <Button className="gap-2 shadow-lg shadow-primary/20">
                        <PlusCircle className="h-4 w-4" />
                        Add Company
                    </Button>
                </Link>
            </div>

            <div className="flex items-center gap-2 max-w-sm mb-4">
                <div className="relative w-full">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search companies..." className="pl-9 h-10 border-muted-foreground/20" />
                </div>
            </div>

            <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
                <DataTable columns={columns} data={mockCompanies} />
            </div>
        </div>
    )
}
