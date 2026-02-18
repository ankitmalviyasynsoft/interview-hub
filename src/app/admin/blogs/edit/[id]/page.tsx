import { BlogForm } from '@/_components/features/blog/form/BlogForm'

async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <div className="container mx-auto py-10 px-4 md:px-8 space-y-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight">Edit Blog</h2>
          <p className="text-muted-foreground">Modify existing blog post details.</p>
        </div>
      </div>
      <div className="max-w-4xl">
        <div className="rounded-lg">
          <BlogForm blogId={id} />
        </div>
      </div>
    </div>
  )
}

export default EditBlogPage
