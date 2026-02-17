import { baseConfig } from '@/config'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'apis',
  tagTypes: [],
  baseQuery: fetchBaseQuery({
    baseUrl: baseConfig.API_BASE_URL,
    prepareHeaders: async (headers, {}) => {
      const token = (await import('@/utils/getCookie')).default('token')
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),

  endpoints: () => ({}),
})
