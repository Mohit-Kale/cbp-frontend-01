import { api } from './api.config'
import { Speciality } from '@/dto/Speciality'
import { ResumeResponse } from '@/dto/ResumeResponse.dto'
import { Currencies } from '@/dto/Currencies.dto'

// ✅ Consultant DTO matching the actual API response
export interface ConsultantProfile {
  qualification: string | null
  skills: string[] // still part of profile, not filter
  city: string
  state: string
  currencyId: number
  hourlyRate: string
}

export interface ConsultantDocument {
  parsedData?: {
    summary?: string
    projects?: any[]
    education?: string[]
    workExperience?: string[]
  }
}

export interface ConsultantRole {
  id: number
  name: string
}

export interface Consultant {
  id: number
  email: string
  fullName: string
  phone: string
  status: string
  isVerified: boolean
  roles: ConsultantRole[]
  profile?: ConsultantProfile | null
  consultantDocuments?: ConsultantDocument[]
  consultantSpecialties?: any[]
  currency?: Currencies | null
}

// ✅ API Response structure
export interface ConsultantsResponse {
  list: Consultant[]
  totalItems: number
  currentPage: number
  totalPages: number
}
export interface ConsultantSchedule {
  id: number
  startDate: string
  endDate: string
  availableDays: string[]
  availableHours: number[]
  freq: string
}
// ✅ Query params for /consultant
export interface ConsultantQueryParams {
  page?: number
  limit?: number
  name?: string
  specialtyId?: number[] // only specialtyId remains
}
export interface ConsultantAvailabilityEvent {
  id: string
  title: string
  type: string
  slot: string
  start: string
  end: string
  timeSlot: string
  isAvailable: boolean
  backgroundColor?: string
  borderColor?: string
  textColor?: string
}

export interface ConsultantAvailabilityResponse {
  userId: number
  startDate: string
  endDate: string
  availability: ConsultantAvailabilityEvent[]
}
// ✅ Booking payload (what you send to the server)
export interface BookingPayload {
  consultantId: number
  bookingDate: string
  scheduleDate: string
  startTime: string
  endTime: string
  notes: string
}

// ✅ Booking response (what the server returns)
export interface BookingResponse {
  bookingId: number
  clientUserId: number
  providerId: number
  serviceId: number
  timeSlotId: number
  bookingDate: string
  startTime: string
  endTime: string
  status: string
  notes?: string
  createdAt: string
  updatedAt: string
  client: Record<string, any>
  provider: Record<string, any>
  service: Record<string, any>
}
export interface MyBooking {
  id: number
  customerId: number
  consultantId: number
  bookingDate: string
  startTime: string
  endTime: string
  status: string
  notes?: string
  totalPrice?: number | null
  scheduleDate: string
  createdAt: string
  updatedAt: string
  customer: {
    id: number
    fullName: string
    email: string
    phone: string
  }
}

export interface MyBookingsResponse {
  list: MyBooking[]
  totalItems: number
  currentPage: number
  totalPages: number
}
export interface ShowMyBookingParams {
  page?: number
  limit?: number
  status?: string
}
// ✅ Main API
export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Get paginated consultants list with filters
    consultants: builder.query<ConsultantsResponse, ConsultantQueryParams>({
      query: ({ page = 1, limit = 10, name, specialtyId }) => {
        const params = new URLSearchParams()
        params.set('page', page.toString())
        params.set('limit', limit.toString())

        if (name) params.set('search', name)

        // ✅ Serialize specialtyId as JSON array
        if (specialtyId && specialtyId.length > 0) {
          params.set('specialtyId', JSON.stringify(specialtyId))
        }

        const url = `/consultants?${params.toString()}`
        console.log('🌐 API Call URL:', url)

        return {
          url,
          method: 'GET',
        }
      },
      providesTags: ['Consultants'],
    }),
    showMyBookings: builder.query<MyBookingsResponse, ShowMyBookingParams>({
      query: ({ page = 1, limit = 10, status = 'confirmed' }) => {
        const params = new URLSearchParams()
        params.set('page', page.toString())
        params.set('limit', limit.toString())
        if (status) params.set('status', status)

        const url = `/booking/bookings?${params.toString()}`
        console.log('🌐 Show My Bookings API URL:', url)

        return {
          url,
          method: 'GET',
        }
      },
      transformResponse: (response: { data: MyBookingsResponse }) => response.data,
      providesTags: ['Consultants'], // optional: you can create a separate tag for bookings if needed
    }),
    createBooking: builder.mutation<BookingResponse, BookingPayload>({
      query: (payload) => ({
        url: '/booking/create', // replace with your actual endpoint
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Consultants'], // optional: refresh bookings cache
    }),
    // ✅ Fetch all specialties
    specialists: builder.query<Speciality[], void>({
      query: () => ({
        url: '/specialties',
        method: 'GET',
      }),
    }),
    currencies: builder.query<Currencies[], void>({
      query: () => {
        return {
          url: '/currencies',
          method: 'GET',
        }
      },
    }),
    mySchedules: builder.query<ConsultantSchedule[], void>({
      query: () => ({
        url: '/consultant/schedule/my-schedule',
        method: 'GET',
      }),
      transformResponse: (response: { data: ConsultantSchedule[] }) => response.data,
      providesTags: ['Consultants'],
    }),
    updateSchedule: builder.mutation<{ message: string }, { id: number; rrule: string }>({
      query: ({ id, rrule }) => ({
        url: `/consultant/schedule/${id}`,
        method: 'PUT',
        body: { rrule },
      }),
      invalidatesTags: ['Consultants'],
    }),
    // ✅ Get availability for a consultant between date range
    consultantAvailability: builder.query<ConsultantAvailabilityResponse, { id: number; startDate: string; endDate: string }>({
      query: ({ id, startDate, endDate }) => ({
        url: `/consultant/schedule/${id}/availability`,
        method: 'GET',
        params: { startDate, endDate },
      }),
      transformResponse: (response: { data: ConsultantAvailabilityResponse }) => response.data,
      providesTags: ['Consultants'],
    }),

    // ✅ Resume file upload
    uploadFile: builder.mutation<ResumeResponse, { file: File }>({
      query: ({ file }) => {
        const formData = new FormData()
        formData.append('file', file)
        return {
          url: '/resume/parse',
          method: 'POST',
          body: formData,
        }
      },
    }),
    saveSchedule: builder.mutation<
      { message: string }, // Response type (adjust if backend sends something else)
      { rrule: string } // Only sending rrule string for now
    >({
      query: (data) => ({
        url: '/consultant/schedule',
        method: 'POST',
        body: data, // { rrule: "FREQ=WEEKLY;BYDAY=MO,WE,FR" }
      }),
      invalidatesTags: ['Consultants'], // So schedule view updates if needed
    }),
  }),
})

export const {
  useConsultantsQuery,
  useSpecialistsQuery,
  useUploadFileMutation,
  useCurrenciesQuery,
  useSaveScheduleMutation,
  useMySchedulesQuery,
  useUpdateScheduleMutation,
  useConsultantAvailabilityQuery,
  useCreateBookingMutation,
  useShowMyBookingsQuery,
} = extendedApi
