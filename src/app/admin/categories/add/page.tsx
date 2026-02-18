'use client'

import { CategoryForm } from '@/_components/features/category/form/CategoryForm'

export default function AddCategoryPage() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-8 space-y-8">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight">Add New Category</h2>
        <p className="text-muted-foreground">Define a new technical topic or skill category.</p>
      </div>
      <div className="max-w-2xl">
        <CategoryForm />
      </div>
    </div>
  )
}
