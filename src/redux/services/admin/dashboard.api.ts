import { api } from '../api.config'

export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardData: builder.query<any, void>({
      query: () => ({
        url: '/dashboard/recent-users',
        method: 'GET',
      }),
    }),
    getUserCount: builder.query<any, void>({
      query: () => ({
        url: '/dashboard/user-counts',
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetDashboardDataQuery, useGetUserCountQuery } = extendedApi
