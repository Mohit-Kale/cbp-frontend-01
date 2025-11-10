export type TPaginationApiParams = {
  page?: number
  limit?: number
  searchVal?: string
  sortOrder?: 'desc' | 'asc'
  searchByStatus?: string | string[]
  sortBy?: string
  // specialty?: string
  searchBySpecialty?: string[]
  location?: string
  experience?: string
}
