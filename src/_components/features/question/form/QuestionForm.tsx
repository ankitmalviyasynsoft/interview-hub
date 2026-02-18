'use client'

import { useEffect, useMemo } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Sparkles, Info, Settings2 } from 'lucide-react'

import { Button } from '@/_components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/_components/ui/form'
import { Input } from '@/_components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/_components/ui/select'
import { MultiSelect } from '@/_components/ui/multi-select'
import { RichTextEditor } from '@/_components/ui/rich-text-editor'
import { Card, CardContent } from '@/_components/ui/card'
import { questionSchema, QuestionFormData } from '@/lib/schemas/admin-content'
import { useCreateQuestionMutation, useGetQuestionQuery, useUpdateQuestionMutation } from '@/redux/services/question.api'
// Note: Assuming these are exported from question.api or their respective apis.
// Based on previous context, separate apis exist.
// Importing correctly from their respective files as per previous edits.
import { useGetCompaniesQuery as useGetCompanies } from '@/redux/services/company.api'
import { useGetCategoriesQuery as useGetCategories } from '@/redux/services/category.api'
import paths from '@/navigate/paths'

interface QuestionFormProps {
  questionId?: string
}

export function QuestionForm({ questionId }: QuestionFormProps) {
  const router = useRouter()
  const isEditMode = !!questionId

  // API Hooks
  const { data: questionData, isLoading: isLoadingQuestion, error: errorQuestion } = useGetQuestionQuery(questionId!, { skip: !isEditMode })
  console.log(questionData)
  const { data: companiesData } = useGetCompanies()
  const { data: categoriesData } = useGetCategories()
  const [createQuestion, { isLoading: isCreating }] = useCreateQuestionMutation()
  const [updateQuestion, { isLoading: isUpdating }] = useUpdateQuestionMutation()

  const isSubmitting = isCreating || isUpdating

  const companies = useMemo(
    () =>
      companiesData?.data?.map((comp) => ({
        label: comp.name,
        value: comp._id,
      })) || [],
    [companiesData],
  )

  const categories = useMemo(
    () =>
      categoriesData?.data?.map((cat) => ({
        label: cat.name,
        value: cat._id,
      })) || [],
    [categoriesData],
  )

  const defaultValues = useMemo(
    () => ({
      title: '',
      modelAnswer: '',
      companyIds: [],
      categoryIds: [],
      difficulty: 'easy' as const,
      experience: 'entry' as const,
    }),
    [],
  )

  const form = useForm<QuestionFormData>({
    resolver: zodResolver(questionSchema),
    defaultValues,
  })

  // Reset form when data is fetched in edit mode
  useEffect(() => {
    if (isEditMode && questionData) {
      const anyQuestionData = questionData as any
      const companyIds = anyQuestionData.targetCompanies?.map((c: any) => c._id || c) || questionData.companyIds || []
      const categoryIds = anyQuestionData.categories?.map((c: any) => c._id || c) || questionData.categoryIds || []

      const complexity = anyQuestionData?.complexity
      // experience from api seems to be lowercase 'mid', 'entry' etc. ensure it matches expected enum values if needed.
      const experience = anyQuestionData?.experience

      console.log('============?', {
        title: questionData.title,
        modelAnswer: questionData.modelAnswer,
        companyIds,
        categoryIds,
        complexity,
        experience,
        id: questionData._id,
      })

      form.reset({
        title: questionData.title,
        modelAnswer: questionData.modelAnswer,
        companyIds,
        categoryIds,
        complexity,
        experience,
        id: questionData._id,
      })
    }
  }, [isEditMode, questionData, form])

  const onSubmit = async (data: QuestionFormData) => {
    try {
      if (isEditMode && questionId) {
        await updateQuestion({ id: questionId, data }).unwrap()
        toast.success('Question updated successfully')
      } else {
        await createQuestion(data).unwrap()
        toast.success('Question created successfully')
      }
      router.push(paths.admin.question.root())
    } catch (error) {
      console.error('Question form error:', error)
      toast.error('Failed to save question')
    }
  }

  if (isEditMode && isLoadingQuestion) {
    return <div className="p-8 text-center text-muted-foreground">Loading question details...</div>
  }

  if (isEditMode && errorQuestion) {
    return <div className="p-8 text-center text-destructive">Error loading question details</div>
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        {/* Basic Information Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-primary font-semibold">
            <Info className="h-5 w-5" />
            <h3>Basic Content</h3>
          </div>
          <Card className="border-none shadow-sm bg-muted/30">
            <CardContent className="p-6 space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Question Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Explain the concept of Closures in Javascript" className="bg-background h-12 border-muted-foreground/20 focus:border-primary transition-all" disabled={isSubmitting} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="modelAnswer"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Modal Answer</FormLabel>
                    <FormControl>
                      <div className="rounded-md border border-muted-foreground/20 bg-background overflow-hidden">
                        <RichTextEditor value={field.value} onChange={field.onChange} placeholder="Provide a comprehensive and accurate answer..." />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </section>

        {/* Classification Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-primary font-semibold">
            <Sparkles className="h-5 w-5" />
            <h3>Categorization</h3>
          </div>
          <Card className="border-none shadow-sm bg-muted/30">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="companyIds"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Target Companies</FormLabel>
                      <FormControl>
                        <MultiSelect options={companies} selected={field.value} onChange={field.onChange} placeholder="Select one or more companies..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="categoryIds"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Categories & Skills</FormLabel>
                      <FormControl>
                        <MultiSelect options={categories} selected={field.value} onChange={field.onChange} placeholder="Select relevant categories..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Difficulty Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-primary font-semibold">
            <Settings2 className="h-5 w-5" />
            <h3>Level & Difficulty</h3>
          </div>
          <Card className="border-none shadow-sm bg-muted/30">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="complexity"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Complexity Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-11 bg-background border-muted-foreground/20">
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="easy">Easy</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="hard">Hard</SelectItem>
                          <SelectItem value="super hard">Super Hard</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Experience Breadth</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-11 bg-background border-muted-foreground/20">
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="entry">Entry Level</SelectItem>
                          <SelectItem value="junior">Junior Role</SelectItem>
                          <SelectItem value="mid">Mid-Level</SelectItem>
                          <SelectItem value="senior">Senior Level</SelectItem>
                          <SelectItem value="expert">Expert / Architect</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        </section>

        <div className="flex justify-end pt-4">
          <Button size="lg" type="submit" disabled={isSubmitting} className="px-12 h-14 text-base font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
            {isSubmitting ? 'Processing...' : isEditMode ? 'Update Question' : 'Submit Question'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
