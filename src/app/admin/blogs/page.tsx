'use client'

import { PlusCircle, Search } from 'lucide-react'
import Link from 'next/link'
import paths from '@/navigate/paths'
import { useState } from 'react'
import { Button } from '@/_components/ui/button'
import { Input } from '@/_components/ui/input'
import { toast } from 'sonner'
import { useGetBlogsQuery, useDeleteBlogMutation, Blog } from '@/redux/services/blog.api'
import BlogsTable from '@/_components/features/blog/table/BlogsTable'

export default function BlogsPage() {
  const { data: blogsData, isLoading, error } = useGetBlogsQuery()
  const [deleteBlog] = useDeleteBlogMutation()

  const [searchQuery, setSearchQuery] = useState('')

  const handleDelete = async (blog: Blog) => {
    try {
      await deleteBlog(blog._id).unwrap()
      toast.success('Blog deleted successfully')
    } catch (error) {
      console.error(error)
      toast.error('Failed to delete blog')
    }
  }

  const filteredData = blogsData?.data?.filter((blog) => blog.title.toLowerCase().includes(searchQuery.toLowerCase())) || []

  return (
    <div className="container mx-auto py-10 px-4 md:px-8 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Blogs</h1>
          <p className="text-muted-foreground">Manage blog posts and articles.</p>
        </div>
        <Link href={paths.admin.blogs.add()}>
          <Button className="gap-2 shadow-lg shadow-primary/20">
            <PlusCircle className="h-4 w-4" />
            Add Blog
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-2 max-w-sm mb-4">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search blogs..." className="pl-9 h-10 border-muted-foreground/20" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
      </div>

      <BlogsTable data={filteredData} isLoading={isLoading} error={error} onDelete={handleDelete} />
    </div>
  )
}
