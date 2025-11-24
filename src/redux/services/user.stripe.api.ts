import { api } from './api.config'
interface RateBookingRequest {
  bookingId: number
  consultantId: number
  rating: number
  note: string
}
interface RateBookingResponse {
  status: string
  message: string
}

interface GetRatingResponse {
  bookingId: number
  rating: number
  note: string
}
export const stripeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createPaymentIntent: builder.query<
      { clientSecret: string }, // response shape
      { consultantAccountId: string | undefined }
    >({
      query: ({ consultantAccountId }) => ({
        url: `/stripe/create-payment-intent/${consultantAccountId}`,
        method: 'GET',
      }),
    }),
    rateBooking: builder.mutation<RateBookingResponse, RateBookingRequest>({
      query: (body) => ({
        url: '/rating',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['BookingRating'],
    }),
    getBookingRating: builder.query<GetRatingResponse, { bookingId: number }>({
      query: ({ bookingId }) => ({
        url: `/rating/${bookingId}`,
        method: 'GET',
      }),
      providesTags: ['BookingRating'],
    }),
  }),
})
export const { useCreatePaymentIntentQuery, useLazyCreatePaymentIntentQuery, useRateBookingMutation, useGetBookingRatingQuery } = stripeApi
