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
          console.log('result-------------', result)
          if (result.success) {
            dispatch(setCredentials({ user: result as any, token }))
          }
        } catch (error) {
          console.error('Failed to restore session:', error)
        }
      }
      setIsLoading(false)
    }

    initAuth()
  }, [dispatch, getProfile])

  if (isLoading) {
    return <>{children}</>
  }

  return <>{children}</>
}
