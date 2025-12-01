import { api } from '../api.config'

// types/admin-bookings.types.ts
export interface AdminBookingItem {
  id: number
  customerId: number
  consultantId: number
  bookingDate: string
  startTime: string
  endTime: string
  status: string
  notes: string | null
  currencyId: number
  amount: string
  scheduleDate: string | null
  meetingLink: string | null
  createdAt: string
  updatedAt: string

  customer: {
    id: number
    fullName: string
    email: string
    phone: string
  }

  consultant: {
    id: number
    fullName: string
    email: string
    phone: string
  }

  consultantPayout: {
    id: number
    amount: number
    platformFee: number
    status: string
    createdAt: string
    currency: {
      id: number
      code: string
      symbol: string
    }
  } | null

  rating: {
    rating: number
    note: string
  } | null
}

export interface AdminBookingsResponse {
  list: AdminBookingItem[]
  totalItems: number
  totalPages: number
}

// ------------------------------------------------------------------
// booking.api.ts — FIXED + PRODUCTION-READY
// ------------------------------------------------------------------
export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    showAdminBookings: builder.query<AdminBookingsResponse, { page?: number; limit?: number; status?: string }>({
      query: ({ page = 1, limit = 10, status }) => {
        const params = new URLSearchParams()

        params.set('page', page.toString())
        params.set('limit', limit.toString())

        if (status) params.set('status', status)

        return {
          url: `/booking/bookings?${params.toString()}`,
          method: 'GET',
        }
      },

      // backend returns: { data: AdminBookingsResponse }
      transformResponse: (response: { data: AdminBookingsResponse }) => response.data,

      providesTags: [{ type: 'AdminBookings', id: 'LIST' }],
    }),
    getBookingById: builder.query<AdminBookingItem, string | number>({
      query: (id) => ({
        url: `/booking/${id}`,
        method: 'GET',
      }),
      transformResponse: (response: { data: AdminBookingItem }) => response.data,
      providesTags: (result, error, id) => [{ type: 'AdminBookings', id }],
    }),
  }),
  overrideExisting: false,
})

// auto hooks
export const { useShowAdminBookingsQuery, useGetBookingByIdQuery } = extendedApi
