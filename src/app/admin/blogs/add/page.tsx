"use client"

import { BlogForm } from "@/_components/features/blog/BlogForm"
import { BlogFormData } from "@/lib/schemas/admin-content"
import { useRouter } from "next/navigation"
import paths from "@/navigate/paths"

export default function AddBlogPage() {
  const router = useRouter()

  const handleSubmit = (data: BlogFormData) => {
    console.log("Submitting blog:", data)
    // Here logic for API call would go
    router.push(paths.admin.blogs.root())
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-8 space-y-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-extrabold tracking-tight">Create New Blog</h2>
        <p className="text-muted-foreground text-lg">Share knowledge and updates with the community.</p>
      </div>
      <div className="max-w-4xl mx-auto">
        <BlogForm onSubmit={handleSubmit} />
      </div>
    </div>
  )
}
