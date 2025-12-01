import { UserDTO } from '@/dto'
import { api } from './api.config'
import { z } from 'zod'
interface ContactFormSchema {
  fullName: string
  email: string
  subject: string
  message: string
}
export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<any, { email: string; password: string }>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
    register: builder.mutation<any, Pick<UserDTO, 'email' | 'fullName' | 'phone'> & { password: string; role: string }>({
      query: (body) => ({
        url: '/auth/signup',
        method: 'POST',
        body,
      }),
    }),

    profile: builder.query<UserDTO, void>({
      query: () => ({
        url: '/auth/profile',
        method: 'GET',
        headers: { hideSuccessToast: 'true' },
      }),
      providesTags: [{ type: 'profile', id: 'CURRENT' }],
    }),

    updateProfile: builder.mutation<UserDTO, any>({
      query: (body) => ({
        url: '/auth/profile',
        method: 'PUT',
        body,
      }),
      invalidatesTags: [{ type: 'profile', id: 'CURRENT' }],
    }),
    contact: builder.mutation<any, ContactFormSchema>({
      query: (body) => ({
        url: '/enquiry',
        method: 'POST',
        body,
      }),
    }),

    // resetPassword: builder.mutation<void, { token: string; newPassword: string }>({
    //   query: (body) => ({
    //     url: '/auth/reset-password',
    //     method: 'POST',
    //     body,
    //   }),
    // }),

    // forgotPassword: builder.mutation<void, { email: string }>({
    //   query: (body) => ({
    //     url: '/auth/forgot-password',
    //     method: 'POST',
    //     body,
    //   }),
    // }),
  }),
})

export const { useLoginMutation, useRegisterMutation, useProfileQuery, useLazyProfileQuery, useUpdateProfileMutation, useContactMutation } = extendedApi
