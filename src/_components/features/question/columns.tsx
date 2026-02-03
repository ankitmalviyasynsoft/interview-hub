
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
import { Badge } from "@/_components/ui/badge"
import { QuestionFormData } from "@/lib/schemas/admin-content"

// Extending FormData with id for table usage
export type Question = QuestionFormData & {
    id: string
}

export const columns: ColumnDef<Question>[] = [
    {
        accessorKey: "question",
        header: "Question",
        cell: ({ row }) => {
            return (
                <span className="max-w-[500px] truncate block font-medium">
                    {row.getValue("question")}
                </span>
            )
        },
    },
    {
        accessorKey: "difficulty",
        header: "Difficulty",
        cell: ({ row }) => {
            const diff = row.getValue("difficulty") as string
            let color = "secondary"
            if (diff === "easy") color = "success" // Customized if simple variants exist, else default/secondary
            if (diff === "hard") color = "destructive"
            return <Badge variant={diff === "hard" || diff === "super hard" ? "destructive" : "secondary"}>{diff}</Badge>
        },
    },
    {
        accessorKey: "level",
        header: "Level",
        cell: ({ row }) => <Badge variant="outline">{row.getValue("level")}</Badge>,
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const question = row.original

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
                            onClick={() => navigator.clipboard.writeText(question.id)}
                        >
                            Copy ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <Link href={`/admin/question/edit/${question.id}`}>
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
