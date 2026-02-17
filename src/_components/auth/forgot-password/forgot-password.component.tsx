'use client'

import React from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { ControlledInput } from '@/_components/ui/ControlledInput'
import paths from '@/navigate/paths'
import { zodResolver } from '@hookform/resolvers/zod'
import { forgotPasswordSchema, ForgotPasswordSchema } from './forgot-password.schema'
import { useForgotPasswordMutation } from '@/redux/services/auth.api'

export const ForgotPasswordComponent = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation()

  const onSubmit = async (data: ForgotPasswordSchema) => {
    try {
      const result = await forgotPassword(data).unwrap()
      if (result.success) {
        alert('Reset link sent to ' + data.email)
      }
    } catch (error: any) {
      console.error('Failed to send reset link', error)
      alert(error.data?.message || 'Failed to send reset link')
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="bg-background rounded-2xl shadow-xl border border-border p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground tracking-tight mb-2">Forgot Password?</h1>
          <p className="text-muted-foreground">Enter your email to receive replacement instructions</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <ControlledInput name="email" control={control} label="Email Address" type="email" placeholder="you@example.com" error={errors.email?.message} />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-6 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/20 transition-all duration-200 transform hover:-translate-y-0.5 mt-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-muted-foreground text-sm">
            Remember your password?{' '}
            <Link href={paths.signIn()} className="text-primary font-medium hover:underline">
              Back to Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
