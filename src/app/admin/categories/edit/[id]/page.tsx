import { CategoryForm } from '@/_components/features/category/form/CategoryForm'

async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <div className="container mx-auto py-10 px-4 md:px-8 space-y-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight">Edit Category</h2>
          <p className="text-muted-foreground">Modify existing category details.</p>
        </div>
      </div>
      <div className="max-w-2xl">
        <div className="rounded-lg">
          <CategoryForm categoryId={id} />
        </div>
      </div>
    </div>
  )
}

export default EditCategoryPage
