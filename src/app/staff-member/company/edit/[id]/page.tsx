'use client'

import { use } from 'react'
import { CompanyForm } from '@/_components/features/company/form/CompanyForm'

export default function StaffEditCompanyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Edit Company (Staff)</h2>
      </div>
      <div className="mx-auto max-w-2xl">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <CompanyForm companyId={id} />
        </div>
      </div>
    </div>
  )
}
