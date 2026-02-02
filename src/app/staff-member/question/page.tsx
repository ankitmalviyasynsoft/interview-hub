"use client"

import { PlusCircle, Search, FileQuestion, Filter } from "lucide-react"
import Link from "next/link"
import paths from "@/navigate/paths"

import { Button } from "@/_components/ui/button"
import { DataTable } from "@/_components/ui/data-table"
import { columns, Question } from "@/_components/features/question/columns"
import { Input } from "@/_components/ui/input"

const mockQuestions: Question[] = [
    {
        id: "1",
        question: "What is React?",
        answer: "<p>React is a library...</p>",
        difficulty: "easy",
        level: "entry",
        companyIds: ["comp-1"],
        categoryIds: ["cat-1"],
    },
    {
        id: "2",
        question: "Explain the virtual DOM.",
        answer: "<p>The virtual DOM is...</p>",
        difficulty: "medium",
        level: "junior",
        companyIds: ["comp-2"],
        categoryIds: ["cat-1"],
    },
]

export default function StaffQuestionPage() {
    return (
        <div className="container mx-auto py-10 px-4 md:px-8 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight">Staff Questions</h1>
                    <p className="text-muted-foreground">Manage and contribute to the interview questions library.</p>
                </div>
                <Link href={paths.staffMember.question.add()}>
                    <Button className="gap-2 shadow-lg shadow-primary/20">
                        <PlusCircle className="h-4 w-4" />
                        Add Question
                    </Button>
                </Link>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search questions..." className="pl-9 h-10 border-muted-foreground/20" />
                </div>
            </div>

            <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
                <DataTable columns={columns} data={mockQuestions} />
            </div>
        </div>
    )
}
