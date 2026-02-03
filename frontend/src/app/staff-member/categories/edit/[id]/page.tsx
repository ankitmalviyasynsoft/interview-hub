
"use client"

import { use, useEffect, useState } from "react"
import { CategoryForm } from "@/_components/features/category/CategoryForm"
import { CategoryFormData } from "@/lib/schemas/admin-content"

const getCategory = (id: string): CategoryFormData => {
    return { name: "React" }
}

export default function StaffEditCategoryPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = use(params)
    const [data, setData] = useState<CategoryFormData | undefined>(undefined)

    useEffect(() => {
        setData(getCategory(id))
    }, [id])

    const handleSubmit = (data: any) => {
        console.log("Updated (Staff):", data)
    }

    if (!data) return <div>Loading...</div>

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Edit Category (Staff)</h2>
            </div>
            <div className="mx-auto max-w-2xl">
                <div className="rounded-lg border bg-card p-6 shadow-sm">
                    <CategoryForm initialData={data} onSubmit={handleSubmit} />
                </div>
            </div>
        </div>
    )
}
