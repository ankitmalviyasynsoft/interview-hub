'use client'

import { CategoryForm } from '@/_components/features/category/form/CategoryForm'

export default function StaffAddCategoryPage() {
  const handleSubmit = (data: any) => {
    console.log('Submitted (Staff):', data)
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-8 space-y-8">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight">Staff: Add Category</h2>
        <p className="text-muted-foreground">Define a new category for community questions.</p>
      </div>
      <div className="max-w-2xl">
        <CategoryForm onSubmit={handleSubmit} />
      </div>
    </div>
  )
}
