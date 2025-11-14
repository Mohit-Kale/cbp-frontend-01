import { api } from '../api.config'

export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardData: builder.query<any, void>({
      query: () => ({
        url: '/dashboard/recent-users',
        method: 'GET',
      }),
      providesTags: [
        { type: 'User', id: 'LIST' },
        { type: 'AdminUsers', id: 'LIST' },
      ],
    }),
    getUserCount: builder.query<any, void>({
      query: () => ({
        url: '/dashboard/user-counts',
        method: 'GET',
      }),
      providesTags: [
        { type: 'User', id: 'LIST' },
        { type: 'AdminUsers', id: 'LIST' },
      ],
    }),
  }),
})

export const { useGetDashboardDataQuery, useGetUserCountQuery } = extendedApi
