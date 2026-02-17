import { isRejectedWithValue, isFulfilled } from '@reduxjs/toolkit'
import { MiddlewareAPI, Middleware } from '@reduxjs/toolkit'
import { isObject } from '@/utils'
import { toast } from 'sonner'

export const rtkQueryLogger: Middleware = (api: MiddlewareAPI) => (next) => (action: any) => {
  if (isRejectedWithValue(action)) handleRejectedAction(action)
  if (isFulfilled(action)) handleFulfilledAction(action)
  return next(action)
}

const handleRejectedAction = (action: any) => {
  const { payload, meta } = action
  console.warn(`😲 OMG Api Failed - Details: `, action)
  const status = meta.baseQueryMeta.response?.status
  const message = getErrorMessage(status, payload.data?.message)

  const hideToast = meta.baseQueryMeta.request.headers.get('hideErrorToast') === 'true' || payload.status === 'PARSING_ERROR' || !message

  if (!hideToast) toast.error(payload.data?.apiMessage || message)
}

const handleFulfilledAction = (action: any) => {
  const { payload, meta } = action
  const message = payload?.message
  const method = meta.baseQueryMeta.request.method
  const hideToast = meta.baseQueryMeta.request.headers.get('hideSuccessToast') === 'true' || method === 'GET' || !message
  if (!hideToast) toast.success(message)
  action.payload = isObject(payload) && Object.keys(payload).includes('data') ? payload.data : payload
}

const getErrorMessage = (status: number, message: string) => {
  switch (status) {
    case 0:
      return 'Server unreachable. Check your internet connection'
    case 401:
      // handleLogout()
      return 'Unauthorized User'
    case 429:
      return 'Too many requests: You have exceeded the rate limit'
    case 503:
      return 'Service temporarily unavailable: Please try again later'
    default:
      if (status >= 500) return message || 'Sorry! Something went wrong with server'
      return message || 'Sorry! Something went wrong with server'
  }
}
