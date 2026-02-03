"use client"

import { CompanyForm } from "@/_components/features/company/CompanyForm"

export default function AddCompanyPage() {
    const handleSubmit = (data: any) => {
        console.log("Submitted:", data)
    }

    return (
        <div className="container mx-auto py-10 px-4 md:px-8 space-y-8">
            <div>
                <h2 className="text-3xl font-extrabold tracking-tight">Add New Company</h2>
                <p className="text-muted-foreground">Expand our registry with a new corporate profile.</p>
            </div>
            <div className="max-w-2xl">
                <CompanyForm onSubmit={handleSubmit} />
            </div>
        </div>
    )
}
