'use client'

import { BlogForm } from '@/_components/features/blog/form/BlogForm'

export default function AddBlogPage() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-8 space-y-8">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight">Add New Blog</h2>
        <p className="text-muted-foreground">Create a new blog post.</p>
      </div>
      <div className="max-w-4xl">
        <BlogForm />
      </div>
    </div>
  )
}
