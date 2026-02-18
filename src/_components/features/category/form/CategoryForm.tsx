'use client'

import { useEffect, useMemo } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Tags } from 'lucide-react'

import { Button } from '@/_components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/_components/ui/form'
import { Input } from '@/_components/ui/input'
import { Card, CardContent } from '@/_components/ui/card'
import { categorySchema, CategoryFormData } from '@/lib/schemas/admin-content'
import { useCreateCategoryMutation, useGetCategoryQuery, useUpdateCategoryMutation } from '@/redux/services/category.api'
import paths from '@/navigate/paths'

interface CategoryFormProps {
  categoryId?: string
}

export function CategoryForm({ categoryId }: CategoryFormProps) {
  const router = useRouter()
  const isEditMode = !!categoryId

  // API Hooks
  const { data: categoryData, isLoading: isLoadingData, error: errorData } = useGetCategoryQuery(categoryId!, { skip: !isEditMode })
  const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation()
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation()

  const isSubmitting = isCreating || isUpdating

  const defaultValues = useMemo(() => ({ name: '', description: '' }), [])

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues,
  })

  // Reset form when data is fetched in edit mode
  useEffect(() => {
    if (isEditMode && categoryData) {
      form.reset({
        name: categoryData?.name || '',
        description: categoryData?.description || '',
        id: categoryData?._id || '',
      })
    }
  }, [isEditMode, categoryData, form, isLoadingData])

  const onSubmit = async (data: CategoryFormData) => {
    try {
      if (isEditMode && categoryId) {
        await updateCategory({ id: categoryId, data }).unwrap()
      } else {
        await createCategory(data).unwrap()
      }
      router.push(paths.admin.categories.root())
    } catch (error) {
      console.error('Category form error:', error)
    }
  }

  if (isEditMode && isLoadingData) {
    return <div className="p-8 text-center text-muted-foreground">Loading category details...</div>
  }

  if (isEditMode && errorData) {
    return <div className="p-8 text-center text-destructive">Error loading category details</div>
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="border-none shadow-sm bg-muted/30">
          <CardContent className="p-8 space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Tags className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold">Topic Classification</h3>
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Category Designation</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. React, System Design, or Algorithms" className="bg-background h-12 border-muted-foreground/20 text-lg focus:ring-primary transition-all" disabled={isSubmitting} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Brief description of the category..." className="bg-background h-12 border-muted-foreground/20 text-lg focus:ring-primary transition-all" disabled={isSubmitting} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button size="lg" type="submit" disabled={isSubmitting} className="h-12 px-10 shadow-lg shadow-primary/10">
            {isSubmitting ? 'Saving...' : isEditMode ? 'Update Category' : 'Save Category'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
