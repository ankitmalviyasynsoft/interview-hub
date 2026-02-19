import { complexityEnum, experienceEnum } from '@/utils'
import { z } from 'zod'

export const companySchema = z.object({
  id: z.string().optional(), // For edit
  name: z.string().min(1, 'Company name is required'),
  description: z.string().optional(),
})

export const categorySchema = z.object({
  id: z.string().optional(), // For edit
  name: z.string().min(1, 'Category name is required'),
  description: z.string().optional(),
})

export const questionSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Title is required'),
  modelAnswer: z.string().min(1, 'Model Answer is required'),
  companyIds: z.array(z.string()).min(1, 'At least one company must be selected'),
  categoryIds: z.array(z.string()).min(1, 'At least one category must be selected'),
  complexity: z.enum(complexityEnum),
  experience: z.enum(experienceEnum),
})

export const blogSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  excerpt: z.string().min(1, 'Excerpt is required'),
  author: z.string().min(1, 'Author is required'),
  tags: z.array(z.string()).optional(),
  status: z.enum(['draft', 'published']),
  publishDate: z.string().optional(),
})

export type CompanyFormData = z.infer<typeof companySchema>
export type CategoryFormData = z.infer<typeof categorySchema>
export type QuestionFormData = z.infer<typeof questionSchema>
export type BlogFormData = z.infer<typeof blogSchema>
