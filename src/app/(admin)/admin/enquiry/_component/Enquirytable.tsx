'use client'

import React, { useState, useEffect } from 'react'
import { MessageSquare, Search } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { DataTable } from '@/components/dataTable/DataTable.component'
import { RenderComponent } from '@/components/renderComponent/RenderComponent.component'
import TableSkeleton from '@/components/skeletons/tableView/TableSkeleton.component'

import { useTablePagination } from '@/hooks/useTablePagination'
import { pageSize } from '@/utils'
import { useGetEnquiriesQuery, useGetEnquiryByIdQuery } from '@/redux/services/admin/enquiry.api'
import useEnquiryColumns from './useEnquiryColumns.hook'

function EnquiryTable() {
  const { page, limit, setPage } = useTablePagination(pageSize)

  // --------------------------
  // Search state + debounce
  // --------------------------
  const [searchInput, setSearchInput] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  // Prevent user from entering spaces
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, '') // remove all spaces
    setSearchInput(value)
  }

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(searchInput), 400)
    return () => clearTimeout(timeout)
  }, [searchInput])

  // --------------------------
  // ID detection logic
  // --------------------------
  const isIdSearch = Boolean(debouncedSearch && /^\d+$/.test(debouncedSearch))

  // RTK Query MUST always receive a number, never undefined/NaN
  const idParam = isIdSearch ? Number(debouncedSearch) : 0

  // --------------------------
  // Queries
  // --------------------------
  const listQuery = useGetEnquiriesQuery({ page, limit, search: isIdSearch ? '' : debouncedSearch }, { skip: isIdSearch })

  const idQuery = useGetEnquiryByIdQuery(idParam, {
    skip: !isIdSearch,
  })

  // Extract states
  const { data: listData, isFetching: listLoading, isError: listError } = listQuery

  const { data: idData, isFetching: idLoading, isError: idError } = idQuery

  // --------------------------
  // Final table data
  // --------------------------
  const tableData = isIdSearch ? (idData ? [idData] : []) : listData?.list || []

  const totalPages = isIdSearch ? 1 : listData?.totalPages || 1
  const loading = isIdSearch ? idLoading : listLoading
  const error = isIdSearch ? idError : listError

  const { columns } = useEnquiryColumns()

  // Reset pagination only when switching out of ID search mode
  const prevSearchMode = React.useRef(isIdSearch)

  useEffect(() => {
    // Only trigger when mode changes from ID search → normal search
    if (prevSearchMode.current === true && isIdSearch === false) {
      setPage(1)
    }
    prevSearchMode.current = isIdSearch
  }, [isIdSearch, setPage])

  // --------------------------
  // Render
  // --------------------------
  console.log('tableData', idData)

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MessageSquare className="w-6 h-6 text-gray-700" />
          <h2 className="text-xl font-medium text-gray-700">Enquiries</h2>
        </div>

        {/* Search */}
        <div className="relative w-72">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <Input placeholder="Search enquiries by Id" className="pl-10" value={searchInput} onChange={handleSearchChange} />
        </div>
      </div>

      {/* Table */}
      <RenderComponent isLoading={loading} isError={error} loader={<TableSkeleton />}>
        <DataTable columns={columns} data={tableData} page={page} setPage={setPage} totalPages={totalPages} isPaginationEnabled={!isIdSearch} />
      </RenderComponent>
    </div>
  )
}

export default EnquiryTable
