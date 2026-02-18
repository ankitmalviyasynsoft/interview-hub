'use client'

import { useEffect, useMemo } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Building2 } from 'lucide-react'

import { Button } from '@/_components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/_components/ui/form'
import { Input } from '@/_components/ui/input'
import { Card, CardContent } from '@/_components/ui/card'
import { companySchema, CompanyFormData } from '@/lib/schemas/admin-content'
import { useCreateCompanyMutation, useGetCompanyQuery, useUpdateCompanyMutation } from '@/redux/services/company.api'
import paths from '@/navigate/paths'

interface CompanyFormProps {
  companyId?: string
}

export function CompanyForm({ companyId }: CompanyFormProps) {
  const router = useRouter()
  const isEditMode = !!companyId

  // API Hooks
  const { data: companyData, isLoading: isLoadingData, error: errorData } = useGetCompanyQuery(companyId!, { skip: !isEditMode })
  const [createCompany, { isLoading: isCreating }] = useCreateCompanyMutation()
  const [updateCompany, { isLoading: isUpdating }] = useUpdateCompanyMutation()

  const isSubmitting = isCreating || isUpdating

  const defaultValues = useMemo(() => ({ name: '', description: '' }), [])

  const form = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    defaultValues,
  })

  // Reset form when data is fetched in edit mode
  useEffect(() => {
    if (isEditMode && companyData) {
      form.reset({
        name: companyData.name || '',
        description: companyData.description || '',
        id: companyData._id || '',
      })
    }
  }, [isEditMode, companyData, form, isLoadingData])

  const onSubmit = async (data: CompanyFormData) => {
    try {
      if (isEditMode && companyId) {
        await updateCompany({ id: companyId, data }).unwrap()
        toast.success('Company updated successfully')
      } else {
        await createCompany(data).unwrap()
        toast.success('Company created successfully')
      }
      router.push(paths.admin.company.root())
    } catch (error) {
      console.error('Company form error:', error)
      toast.error('Failed to save company')
    }
  }

  if (isEditMode && isLoadingData) {
    return <div className="p-8 text-center text-muted-foreground">Loading company details...</div>
  }

  if (isEditMode && errorData) {
    return <div className="p-8 text-center text-destructive">Error loading company details</div>
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="border-none shadow-sm bg-muted/30">
          <CardContent className="p-8 space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold">Company Profile</h3>
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Company Identity</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Google, Meta, or Start-up name" className="bg-background h-12 border-muted-foreground/20 text-lg focus:ring-primary transition-all" disabled={isSubmitting} {...field} />
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
                    <Input placeholder="Brief description of the company..." className="bg-background h-12 border-muted-foreground/20 text-lg focus:ring-primary transition-all" disabled={isSubmitting} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button size="lg" type="submit" disabled={isSubmitting} className="h-12 px-10 shadow-lg shadow-primary/10">
            {isSubmitting ? 'Saving...' : isEditMode ? 'Update Company' : 'Save Company'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
