'use client'

import { useEffect, useMemo } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { FileText } from 'lucide-react'

import { Button } from '@/_components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/_components/ui/form'
import { Input } from '@/_components/ui/input'
import { Textarea } from '@/_components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/_components/ui/select'
import { Card, CardContent } from '@/_components/ui/card'
import { blogSchema, BlogFormData } from '@/lib/schemas/admin-content'
import { useCreateBlogMutation, useGetBlogQuery, useUpdateBlogMutation } from '@/redux/services/blog.api'
import paths from '@/navigate/paths'

interface BlogFormProps {
  blogId?: string
}

export function BlogForm({ blogId }: BlogFormProps) {
  const router = useRouter()
  const isEditMode = !!blogId

  // API Hooks
  const { data: blogData, isLoading: isLoadingData, error: errorData } = useGetBlogQuery(blogId!, { skip: !isEditMode })
  const [createBlog, { isLoading: isCreating }] = useCreateBlogMutation()
  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation()

  const isSubmitting = isCreating || isUpdating

  const defaultValues = useMemo(
    () => ({
      title: '',
      content: '',
      excerpt: '',
      author: '',
      tags: [],
      status: 'draft' as const,
      publishDate: '',
    }),
    [],
  )

  const form = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues,
  })

  // Reset form when data is fetched in edit mode
  useEffect(() => {
    if (isEditMode && blogData) {
      form.reset({
        title: blogData.title || '',
        content: blogData.content || '',
        excerpt: blogData.excerpt || '',
        author: blogData.author || '',
        tags: blogData.tags || [],
        status: blogData.status as 'draft' | 'published',
        publishDate: blogData.publishDate || '',
        id: blogData._id || '',
      })
    }
  }, [isEditMode, blogData, form, isLoadingData])

  const onSubmit = async (data: BlogFormData) => {
    try {
      if (isEditMode && blogId) {
        await updateBlog({ id: blogId, data }).unwrap()
        toast.success('Blog updated successfully')
      } else {
        await createBlog(data).unwrap()
        toast.success('Blog created successfully')
      }
      router.push(paths.admin.blogs.root())
    } catch (error) {
      console.error('Blog form error:', error)
      toast.error('Failed to save blog')
    }
  }

  if (isEditMode && isLoadingData) {
    return <div className="p-8 text-center text-muted-foreground">Loading blog details...</div>
  }

  if (isEditMode && errorData) {
    return <div className="p-8 text-center text-destructive">Error loading blog details</div>
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="border-none shadow-sm bg-muted/30">
          <CardContent className="p-8 space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 p-2 rounded-lg">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold">Blog Details</h3>
            </div>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Blog Title" className="bg-background h-12 border-muted-foreground/20 text-lg focus:ring-primary transition-all" disabled={isSubmitting} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Content</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Blog Content..." className="bg-background min-h-[200px] border-muted-foreground/20 text-base focus:ring-primary transition-all" disabled={isSubmitting} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Excerpt</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Brief excerpt..." className="bg-background min-h-[100px] border-muted-foreground/20 text-base focus:ring-primary transition-all" disabled={isSubmitting} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Author</FormLabel>
                    <FormControl>
                      <Input placeholder="Author Name" className="bg-background h-12 border-muted-foreground/20 text-base focus:ring-primary transition-all" disabled={isSubmitting} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Tags (comma separated)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. React, Tech, News"
                        className="bg-background h-12 border-muted-foreground/20 text-base focus:ring-primary transition-all"
                        disabled={isSubmitting}
                        value={field.value?.join(',') || ''}
                        onChange={(e) => field.onChange(e.target.value ? e.target.value.split(',').map((t) => t.trim()) : [])}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-background h-12 border-muted-foreground/20 text-base focus:ring-primary transition-all">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="publishDate"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Publish Date</FormLabel>
                    <FormControl>
                      <Input type="date" className="bg-background h-12 border-muted-foreground/20 text-base focus:ring-primary transition-all" disabled={isSubmitting} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button size="lg" type="submit" disabled={isSubmitting} className="h-12 px-10 shadow-lg shadow-primary/10">
            {isSubmitting ? 'Saving...' : isEditMode ? 'Update Blog' : 'Save Blog'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
