export type TPaginationApiResponse<List> = {
  list: List[]
  currentPage: number
  totalPages: number
  totalItems: number
}
