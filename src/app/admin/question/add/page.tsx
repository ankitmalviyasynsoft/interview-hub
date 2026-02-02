
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

export default function AddQuestionPage() {
    const handleSubmit = (data: any) => {
        console.log("Submitted:", data)
        // Here you would call your API to save the question
        // and then redirect to listing or show success toast
    }

    return (
        <div className="container mx-auto py-10 px-4 md:px-8 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight">Add New Question</h2>
                    <p className="text-muted-foreground">Create a high-quality interview question for the community.</p>
                </div>
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
