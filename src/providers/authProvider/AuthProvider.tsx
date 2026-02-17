'use client'

import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCredentials } from '@/redux/slices/authSlice'
import { useLazyGetProfileQuery } from '@/redux/services/auth.api'
import getCookie from '@/utils/getCookie'

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch()
  const [getProfile] = useLazyGetProfileQuery()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      const token = getCookie('token')
      if (token) {
        try {
          const result = await getProfile().unwrap()
          if (result.success) {
            dispatch(setCredentials({ user: result.data, token }))
          }
        } catch (error) {
          console.error('Failed to restore session:', error)
          // Optional: clear token if invalid
        }
      }
      setIsLoading(false)
    }

    initAuth()
  }, [dispatch, getProfile])

  if (isLoading) {
    // Optional: Render a loader here if you want to block UI until auth is checked
    // For now, we return children to avoid layout shift or white screen,
    // but typically you might want a spinner.
    return <>{children}</>
  }

  return <>{children}</>
}
