// src/redux/services/enquiry.api.ts

import { api } from '../api.config'

export interface EnquiryItem {
  id: number
  email: string
  fullName: string
  phone: string
  subject: string
  message: string
  status: 'PENDING' | 'RESOLVED' | 'CLOSED' | string
  createdAt: string
  updatedAt: string
}

export interface EnquiryListItem {
  id: number
  name: string
  email: string
  message: string
  createdAt: string
}

export interface EnquiryListResponse {
  statusCode: number
  message: string
  list: EnquiryListItem[]
  totalItems: number
  currentPage: number
  totalPages: number
}

export interface EnquiryQueryParams {
  page?: number
  limit?: number
  search?: string
}

// ------ SINGLE ENQUIRY RESPONSE ------
export interface EnquiryDetailsResponse {
  statusCode: number
  message: string
  data: EnquiryItem
}

// ------ UPDATE RESPONSE ------
export interface EnquiryUpdateResponse {
  statusCode: number
  message: string
  data: {
    statusCode: number
    message: string
  }
}

export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // ---- GET ALL ENQUIRIES ----
    getEnquiries: builder.query<EnquiryListResponse, EnquiryQueryParams>({
      query: ({ page = 1, limit = 10, search = '' }) => {
        const params = new URLSearchParams()
        params.append('page', String(page))
        params.append('limit', String(limit))
        if (search) params.append('search', search)

        return {
          url: `/enquiry?${params.toString()}`,
          method: 'GET',
        }
      },
      providesTags: ['Enquiry'],
      transformResponse: (response: EnquiryListResponse) => response,
    }),

    // ---- GET SINGLE ENQUIRY DETAILS ----
    getEnquiryById: builder.query<EnquiryDetailsResponse, number>({
      query: (id) => ({
        url: `/enquiry/${id}`,
        method: 'GET',
      }),
      providesTags: ['Enquiry'],

      transformResponse: (response: EnquiryDetailsResponse) => response,
    }),

    // ---- UPDATE ENQUIRY STATUS ----
    updateEnquiry: builder.mutation<EnquiryUpdateResponse, { id: number; status: string }>({
      query: ({ id, status }) => ({
        url: `/enquiry/${id}`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Enquiry'],
      transformResponse: (response: EnquiryUpdateResponse) => response,
    }),
    deleteEnquiry: builder.mutation({
      query: (id: number) => ({
        url: `/enquiry/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Enquiry'],
    }),
  }),
})

export const { useGetEnquiriesQuery, useGetEnquiryByIdQuery, useUpdateEnquiryMutation, useDeleteEnquiryMutation } = extendedApi
