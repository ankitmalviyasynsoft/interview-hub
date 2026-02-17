'use client'

import React from 'react'
import Link from 'next/link'
import paths from '@/navigate/paths'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signUpSchema, SignUpSchema } from './signup.schema'
import { ControlledInput } from '@/_components/ui/ControlledInput'
import { useRouter } from 'next/navigation'
import { useRegisterMutation } from '@/redux/services/auth.api'
// Assuming we removed sonner, using console/alert instead
// Actually let's just use console.error for now since I removed sonner from signin

export const SignUpComponent = () => {
  const router = useRouter()
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      role: '',
      companyName: '',
      password: '',
      confirmPassword: '',
    },
  })

  const role = watch('role')
  const showCompanyField = role === 'job'

  const [registerUser, { isLoading }] = useRegisterMutation()

  const onSubmit = async (data: SignUpSchema) => {
    try {
      const result = await registerUser(data).unwrap()
      if (result.success) {
        // toast.success("Account created successfully");
        alert('Account created successfully! Please sign in.')
        router.push(paths.signIn())
      }
    } catch (error: any) {
      console.error('Signup failed', error)
      alert(error.data?.message || 'Signup failed')
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto p-6">
      <div className="bg-background rounded-2xl shadow-xl border border-border p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground tracking-tight mb-2">Create Account</h1>
          <p className="text-muted-foreground">Join us to start your journey</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name Field */}
          <ControlledInput name="name" control={control} label="Full Name" type="text" placeholder="John Doe" error={errors.name?.message} />

          {/* Email Field */}
          <ControlledInput name="email" control={control} label="Email Address" type="email" placeholder="you@example.com" error={errors.email?.message} />

          {/* Role Selection */}
          <div className="space-y-1.5">
            <label htmlFor="role" className="text-sm font-medium text-foreground block">
              What do you do?
            </label>
            <div className="relative">
              <select
                id="role"
                {...register('role')}
                className={`w-full px-4 py-3 rounded-xl bg-secondary border border-transparent focus:bg-background focus:border-ring focus:ring-2 focus:ring-ring/20 outline-none transition-all duration-200 text-foreground appearance-none cursor-pointer ${
                  errors.role ? 'border-red-500 focus:border-red-500' : ''
                }`}
              >
                <option value="" disabled>
                  Select your role
                </option>
                <option value="student">Student</option>
                <option value="job">Employed / Job</option>
                <option value="freelancer">Freelancer</option>
                <option value="other">Other</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-muted-foreground">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {errors.role && <p className="text-sm text-red-500 animate-in fade-in slide-in-from-top-1">{errors.role.message}</p>}
          </div>

          {/* Company Name - Conditional */}
          {showCompanyField && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
              <ControlledInput name="companyName" control={control} label="Company Name" type="text" placeholder="Where do you work?" error={errors.companyName?.message} />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Password Field */}
            <ControlledInput name="password" control={control} label="Password" type="password" placeholder="••••••••" error={errors.password?.message} />

            {/* Confirm Password Field */}
            <ControlledInput name="confirmPassword" control={control} label="Confirm Password" type="password" placeholder="••••••••" error={errors.confirmPassword?.message} />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-6 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/20 transition-all duration-200 transform hover:-translate-y-0.5 mt-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-muted-foreground text-sm">
            Already have an account?{' '}
            <Link href={paths.signIn()} className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUpComponent
