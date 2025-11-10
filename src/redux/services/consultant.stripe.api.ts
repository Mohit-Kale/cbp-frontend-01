import { api } from './api.config'

export const stripeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createStripeSession: builder.mutation<{ accountId: string }, { email: string }>({
      query: (payload) => ({
        url: '/stripe/account',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
})

export const { useCreateStripeSessionMutation } = stripeApi
