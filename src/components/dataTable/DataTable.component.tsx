'use client'

import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import NoRecordsFound from '../noRecordsFound/NoRecordFound.component'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  page: number
  setPage: (page: number) => void
  totalPages: number
  isPaginationEnabled?: boolean
}

export function DataTable<TData, TValue>({ columns, data, page, setPage, totalPages, isPaginationEnabled = true }: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: totalPages,
    state: {
      pagination: {
        pageIndex: page - 1, // TanStack uses 0-based index
        pageSize: data.length,
      },
    },
  })

  return (
    <>
      <div className="rounded-lg overflow-x-auto">
        <Table className="border-separate border-spacing-0 [&_tr]:border-b [&_tr]:border-primary/10 [&_th]:border-b [&_th]:border-primary/10 [&_td]:border-b [&_td]:border-primary/10">
          <TableHeader className="sticky top-0 z-10 bg-primary/90">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="p-3 text-white">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'} className="hover:bg-primary/10">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="p-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="py-6 text-center">
                  <NoRecordsFound isCard={false} />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {isPaginationEnabled && totalPages > 1 && (
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between py-4 text-sm">
          {/* Page summary */}
          <div className="text-gray-600">
            Page <span className="font-medium">{page}</span> of <span className="font-medium">{totalPages}</span>
          </div>

          {/* Pagination buttons */}
          <div className="flex items-center gap-1 md:gap-3">
            <button className="cursor-pointer p-1 rounded bg-primary/10 text-primary hover:bg-primary/20 disabled:opacity-40 disabled:cursor-not-allowed" onClick={() => setPage(page - 1)} disabled={page === 1}>
              <ChevronLeft />
            </button>

            {/* Page numbers */}
            {(() => {
              const pages: (number | string)[] = []
              const maxVisible = 1

              if (totalPages <= maxVisible + 2) {
                for (let i = 1; i <= totalPages; i++) pages.push(i)
              } else {
                pages.push(1)
                if (page > maxVisible + 2) pages.push('...')

                const start = Math.max(2, page - maxVisible)
                const end = Math.min(totalPages - 1, page + maxVisible)

                for (let i = start; i <= end; i++) pages.push(i)

                if (page < totalPages - maxVisible - 1) pages.push('...')
                pages.push(totalPages)
              }

              return pages.map((p, i) =>
                p === '...' ? (
                  <span key={i} className="px-2">
                    ...
                  </span>
                ) : (
                  <button
                    key={i}
                    className={page === p ? 'cursor-pointer mx-1 bg-primary text-white font-medium px-2 py-1 rounded' : 'cursor-pointer mx-1 font-medium p-1 hover:bg-primary/10 rounded'}
                    onClick={() => setPage(p as number)}
                  >
                    {p}
                  </button>
                ),
              )
            })()}

            <button className="cursor-pointer p-1 rounded bg-primary/10 text-primary hover:bg-primary/20 disabled:opacity-40 disabled:cursor-not-allowed" onClick={() => setPage(page + 1)} disabled={page === totalPages}>
              <ChevronRight />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
