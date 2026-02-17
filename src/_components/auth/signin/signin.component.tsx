'use client'

import Link from 'next/link'
import paths from '@/navigate/paths'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInSchema, SignInSchema } from './signin.schema'
import { ControlledInput } from '@/_components/ui/ControlledInput'
import { useLoginMutation } from '@/redux/services/auth.api'
import { toast } from 'sonner'
import { setCookie } from '@/utils/cookie.utils'
import { setCredentials } from '@/redux/slices/authSlice'
import { useReduxDispatch } from '@/hooks/redux.hook'
import { useRouter } from 'next/navigation'
import { roles } from '@/utils'

export const SignInComponent = () => {
  const dispatch = useReduxDispatch()
  const router = useRouter()
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const [login, { isLoading, error }] = useLoginMutation()

  const onSubmit = async (data: SignInSchema) => {
    try {
      const result = await login(data).unwrap()
      setCookie('token', result?.token)

      const role = result?.user?.role?.name
      if (role === roles.admin) {
        router.push(paths.admin.dashboard())
      } else if (role === roles.staff) {
        router.push(paths.staffMember.dashboard())
      } else {
        router.push(paths.home())
      }
    } catch (error: any) {
      console.log('===========>', error)
      toast.error(error?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="bg-background rounded-2xl shadow-xl border border-border p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground tracking-tight mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Enter your credentials to access your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <ControlledInput name="email" control={control} label="Email Address" type="email" placeholder="you@example.com" error={errors.email?.message} />

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium text-foreground block">
                Password
              </label>
              <Link href={paths.forgotPassword()} className="text-xs text-primary/80 hover:text-primary hover:underline transition-colors">
                Forgot password?
              </Link>
            </div>
            <ControlledInput
              name="password"
              control={control}
              label="" // Label is handled above custom for the "Forgot Password" link layout
              type="password"
              placeholder="••••••••"
              error={errors.password?.message}
              className="mt-0" // Reset margin since label is separate
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-6 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/20 transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-muted-foreground text-sm">
            Don&apos;t have an account?{' '}
            <Link href={paths.signUp()} className="text-primary font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignInComponent
