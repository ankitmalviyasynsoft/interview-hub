import { z } from 'zod'

export const signUpSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
    role: z.string().min(1, 'Please select a role'),
    companyName: z.string().optional(),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
  .refine(
    (data) => {
      if (data.role === 'job' && !data.companyName) {
        return false
      }
      return true
    },
    {
      message: 'Company name is required when employed',
      path: ['companyName'],
    },
  )

export type SignUpSchema = z.infer<typeof signUpSchema>
