
"use client"

import { use, useEffect, useState } from "react"
import { CompanyForm } from "@/_components/features/company/CompanyForm"
import { CompanyFormData } from "@/lib/schemas/admin-content"

const getCompany = (id: string): CompanyFormData => {
    return { name: "Google" }
}

export default function StaffEditCompanyPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = use(params)
    const [data, setData] = useState<CompanyFormData | undefined>(undefined)

    useEffect(() => {
        setData(getCompany(id))
    }, [id])

    const handleSubmit = (data: any) => {
        console.log("Updated (Staff):", data)
    }

    if (!data) return <div>Loading...</div>

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Edit Company (Staff)</h2>
            </div>
            <div className="mx-auto max-w-2xl">
                <div className="rounded-lg border bg-card p-6 shadow-sm">
                    <CompanyForm initialData={data} onSubmit={handleSubmit} />
                </div>
            </div>
        </div>
    )
}
