
"use client"

import { use, useEffect, useState } from "react"
import { QuestionForm } from "@/_components/features/question/QuestionForm"
import { QuestionFormData } from "@/lib/schemas/admin-content"

const mockCompanies = [
    { label: "Google", value: "comp-1" },
    { label: "Meta", value: "comp-2" },
    { label: "Amazon", value: "comp-3" },
]

const mockCategories = [
    { label: "React", value: "cat-1" },
    { label: "Node.js", value: "cat-2" },
    { label: "System Design", value: "cat-3" },
]

// Mock fetch function
const getQuestion = (id: string): QuestionFormData => {
    return {
        question: "What is React?",
        answer: "<p>React is a library...</p>",
        difficulty: "easy",
        level: "entry",
        companyIds: ["comp-1"],
        categoryIds: ["cat-1"],
    }
}

export default function EditQuestionPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = use(params)
    const [data, setData] = useState<QuestionFormData | undefined>(undefined)

    useEffect(() => {
        // Simulate fetch
        const qt = getQuestion(id)
        setData(qt)
    }, [id])

    const handleSubmit = (data: any) => {
        console.log("Updated:", data)
    }

    if (!data) return <div>Loading...</div>

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Edit Question</h2>
            </div>
            <div className="mx-auto max-w-4xl">
                <div className="rounded-lg border bg-card p-6 shadow-sm">
                    <QuestionForm
                        initialData={data}
                        companies={mockCompanies}
                        categories={mockCategories}
                        onSubmit={handleSubmit}
                    />
                </div>
            </div>
        </div>
    )
}
