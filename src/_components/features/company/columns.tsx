
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, FileEdit, Trash } from "lucide-react"
import Link from "next/link"

import { Button } from "@/_components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/_components/ui/dropdown-menu"
import { CompanyFormData } from "@/lib/schemas/admin-content"

export type Company = CompanyFormData & {
    id: string
}

export const columns: ColumnDef<Company>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const company = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(company.id)}
                        >
                            Copy ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <Link href={`/admin/company/edit/${company.id}`}>
                            <DropdownMenuItem>
                                <FileEdit className="mr-2 h-4 w-4" />
                                Edit
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem className="text-destructive focus:text-destructive">
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
