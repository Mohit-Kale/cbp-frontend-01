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
    onBoarding: builder.mutation<{ url: string }, { accountId: string }>({
      query: (payload) => ({
        url: '/stripe/onboard',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
})

export const { useCreateStripeSessionMutation, useOnBoardingMutation } = stripeApi
