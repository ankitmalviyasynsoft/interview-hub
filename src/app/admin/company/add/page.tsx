'use client'

import { CompanyForm } from '@/_components/features/company/form/CompanyForm'

export default function AddCompanyPage() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-8 space-y-8">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight">Add New Company</h2>
        <p className="text-muted-foreground">Expand our registry with a new corporate profile.</p>
      </div>
      <div className="max-w-2xl">
        <CompanyForm />
      </div>
    </div>
  )
}
