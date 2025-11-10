import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCookie } from '@/utils'

export const api = createApi({
  reducerPath: 'apis',
  tagTypes: ['user', 'profile', 'User', 'Consultants'],

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: async (headers) => {
      if (getCookie('accessToken')) headers.set('Authorization', `Bearer ${getCookie('accessToken')}`)
      return headers
    },
  }),
  endpoints: () => ({}),
})
