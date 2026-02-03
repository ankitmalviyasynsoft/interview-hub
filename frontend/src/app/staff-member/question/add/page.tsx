"use client"

import { QuestionForm } from "@/_components/features/question/QuestionForm"

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

export default function StaffAddQuestionPage() {
    const handleSubmit = (data: any) => {
        console.log("Submitted (Staff):", data)
    }

    return (
        <div className="container mx-auto py-10 px-4 md:px-8 space-y-8">
            <div>
                <h2 className="text-3xl font-extrabold tracking-tight">Staff: Add Question</h2>
                <p className="text-muted-foreground">Contribute a new question to the platform's knowledge base.</p>
            </div>
            <div className="max-w-4xl">
                <QuestionForm
                    companies={mockCompanies}
                    categories={mockCategories}
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    )
}
