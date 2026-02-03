"use client"

import { CompanyForm } from "@/_components/features/company/CompanyForm"

export default function StaffAddCompanyPage() {
    const handleSubmit = (data: any) => {
        console.log("Submitted (Staff):", data)
    }

    return (
        <div className="container mx-auto py-10 px-4 md:px-8 space-y-8">
            <div>
                <h2 className="text-3xl font-extrabold tracking-tight">Staff: Add Company</h2>
                <p className="text-muted-foreground">Log a new company into our interview registry.</p>
            </div>
            <div className="max-w-2xl">
                <CompanyForm onSubmit={handleSubmit} />
            </div>
        </div>
    )
}
