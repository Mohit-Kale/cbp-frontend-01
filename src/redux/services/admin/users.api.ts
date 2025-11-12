import { UserDTO } from '@/dto'
import { api } from '../api.config'
import { TPaginationApiParams, TPaginationApiResponse } from '@/types'

export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    AdminUsers: builder.query<TPaginationApiResponse<UserDTO>, TPaginationApiParams>({
      query: ({ page = 1, limit = 10 }) => ({
        url: '/admin/users',
        method: 'GET',
        headers: { hideSuccessToast: 'true' },
        params: { page, limit },
      }),
      providesTags: [{ type: 'User', id: 'LIST' }],
    }),

    userDetail: builder.query<any, any>({
      query: ({ id }) => ({
        url: `/admin/users/${id}`,
        method: 'GET',
        headers: { hideSuccessToast: 'true' },
      }),
      providesTags: (result, error, { id }) => [
        { type: 'User', id },
        { type: 'AdminUsers', id: 'LIST' },
      ],
    }),

    updateUser: builder.mutation<any, { id: string; isVerified?: boolean; status?: 'ACTIVE' | 'INACTIVE' }>({
      query: ({ id, isVerified, status }) => ({
        url: `/admin/users/${id}`,
        method: 'PATCH',
        body: { isVerified, status },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'User', id },
        { type: 'AdminUsers', id: 'LIST' },
      ],
    }),
  }),
})

export const { useAdminUsersQuery, useLazyAdminUsersQuery, useUserDetailQuery, useUpdateUserMutation } = extendedApi
