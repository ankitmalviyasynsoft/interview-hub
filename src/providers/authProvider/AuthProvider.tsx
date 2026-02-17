'use client'

import { useEffect, useState } from 'react'
import { logout, setCredentials, selectCurrentUser, selectIsAuthenticated } from '@/redux/slices/authSlice'
import { useLazyGetProfileQuery } from '@/redux/services/auth.api'
import { useReduxDispatch, useReduxSelector } from '@/hooks/redux.hook'
import { removeCookie } from '@/utils/cookie.utils'
import { usePathname, useRouter } from 'next/navigation'
import { roles } from '@/utils'
import getCookie from '@/utils/getCookie'
import paths from '@/navigate/paths'

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useReduxDispatch()
  const [getProfile] = useLazyGetProfileQuery()
  const [isLoading, setIsLoading] = useState(true)

  const user = useReduxSelector(selectCurrentUser)
  const isAuthenticated = useReduxSelector(selectIsAuthenticated)

  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const initAuth = async () => {
      const token = getCookie('token')

      if (!token) {
        setIsLoading(false)
        return
      }

      try {
        const result = await getProfile().unwrap()
        if (result) {
          // Assuming response structure follows AuthResponse<User>
          const userData = result.data ? result.data : (result as any)
          dispatch(setCredentials({ user: userData, token }))
        }
      } catch (error) {
        console.error('Failed to restore session:', error)
        dispatch(logout())
        removeCookie('token')
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()
  }, [dispatch, getProfile])

  useEffect(() => {
    if (isLoading) return

    const checkAuth = () => {
      const isAuthRoute = pathname.startsWith('/auth')
      const isAdminRoute = pathname.startsWith('/admin')
      const isStaffRoute = pathname.startsWith('/staff-member')
      const isUserRoute = pathname.startsWith('/users')

      const isProtectedRoute = isAdminRoute || isStaffRoute || isUserRoute

      // 1. If not authenticated and trying to access protected routes
      if (!isAuthenticated) {
        if (isProtectedRoute) {
          router.push(paths.signIn())
        }
        return
      }

      // 2. If authenticated, manage role-based access
      if (isAuthenticated && user) {
        const role = user?.role?.name

        // Prevent access to auth pages if already logged in - Redirect to respective dashboard
        if (isAuthRoute) {
          if (role === roles.admin) {
            router.push(paths.admin.dashboard())
          } else if (role === roles.staff) {
            router.push(paths.staffMember.dashboard())
          } else {
            router.push(paths.home())
          }
          return
        }

        // Role-based protection for specific routes
        if (role === roles.admin) {
          // Admin attempting to access staff routes
          if (isStaffRoute) {
            router.push(paths.admin.dashboard())
          }
        } else if (role === roles.staff) {
          // Staff attempting to access admin routes
          if (isAdminRoute) {
            router.push(paths.staffMember.dashboard())
          }
        } else {
          // Regular user attempting to access admin or staff routes
          if (isAdminRoute || isStaffRoute) {
            router.push(paths.home())
          }
        }
      }
    }

    checkAuth()
  }, [isLoading, isAuthenticated, user, pathname, router])

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      </div>
    )
  }

  return <>{children}</>
}
