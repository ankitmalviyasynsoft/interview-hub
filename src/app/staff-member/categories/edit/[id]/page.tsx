'use client'

import { use } from 'react'
import { CategoryForm } from '@/_components/features/category/form/CategoryForm'

async function StaffEditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Edit Category (Staff)</h2>
      </div>
      <div className="mx-auto max-w-2xl">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <CategoryForm categoryId={id} />
        </div>
      </div>
    </div>
  )
}

export default StaffEditCategoryPage
