"use client"

import { BlogForm } from "@/_components/features/blog/BlogForm"
import { BlogFormData } from "@/lib/schemas/admin-content"
import { useRouter, useParams } from "next/navigation"
import paths from "@/navigate/paths"
import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

export default function EditBlogPage() {
    const router = useRouter()
    const params = useParams()
    const [initialData, setInitialData] = useState<BlogFormData | null>(null)

    useEffect(() => {
        // Simulate fetching data based on ID
        const mockBlog: BlogFormData = {
            id: params.id as string,
            title: "Top 5 Javascript Interview Questions in 2024",
            content: "<p>This is a simulated blog content for editing.</p>",
            excerpt: "Sharing the most frequent JS questions.",
            author: "Admin User",
            status: "published",
            tags: ["tips", "engineering"]
        }
        setInitialData(mockBlog)
    }, [params.id])

    const handleSubmit = (data: BlogFormData) => {
        console.log("Updating blog:", data)
        router.push(paths.admin.blogs.root())
    }

    if (!initialData) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="container mx-auto py-10 px-4 md:px-8 space-y-8">
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-extrabold tracking-tight">Edit Blog Post</h2>
                <p className="text-muted-foreground text-lg">Modify your article content and publishing settings.</p>
            </div>
            <div className="max-w-4xl mx-auto">
                <BlogForm initialData={initialData} onSubmit={handleSubmit} />
            </div>
        </div>
    )
}
