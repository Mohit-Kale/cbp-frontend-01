'use client'

import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import NoRecordsFound from '../noRecordsFound/NoRecordFound.component'

import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  page?: number
  setPage?: (page: number) => void
  totalPages?: number
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
  })

  return (
    <>
      <div className="rounded-lg overflow-x-auto">
        <Table className="border-separate border-spacing-0 [&_tr]:border-b [&_tr]:border-primary/10 [&_th]:border-b [&_th]:border-primary/10 [&_td]:border-b [&_td]:border-primary/10">
          <TableHeader className="sticky top-0 z-10 bg-primary/10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="p-4">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'} className="hover:bg-primary/5">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="p-4">
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

      {isPaginationEnabled && totalPages && totalPages > 1 && (
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between py-4 text-sm">
          <div className="text-gray-600 flex items-center gap-1">
            {page}-{data.length} of {totalPages}
          </div>
          <div className="flex items-center gap-1 md:gap-4">
            <button className="cursor-pointer p-1 rounded bg-primary/10 text-primary hover:bg-primary/20" onClick={() => setPage && setPage(page! - 1)} disabled={page === 1}>
              <ChevronLeft />
            </button>

            {(() => {
              const pages: (number | string)[] = []
              const maxVisible = 1 // current page ke dono taraf kitne show karne

              if (totalPages <= maxVisible + 1) {
                // agar pages kam hain to saare show
                for (let i = 1; i <= totalPages; i++) pages.push(i)
              } else {
                pages.push(1) // first page
                if (page! > maxVisible + 2) pages.push('...') // left dots

                const start = Math.max(2, page! - maxVisible)
                const end = Math.min(totalPages - 1, page! + maxVisible)

                for (let i = start; i <= end; i++) pages.push(i)

                if (page! < totalPages - maxVisible - 1) pages.push('...') // right dots
                pages.push(totalPages) // last page
              }

              return pages.map((p, i) =>
                p === '...' ? (
                  <span key={Math.random()}>...</span>
                ) : (
                  <button
                    key={Math.random()}
                    className={page === p ? 'cursor-pointer mx-1 bg-primary font-medium text-white px-2 py-1 rounded' : 'cursor-pointer mx-1 font-medium p-1'}
                    onClick={() => setPage && setPage(p as number)}
                  >
                    {p}
                  </button>
                ),
              )
            })()}

            <button className="cursor-pointer p-1 rounded bg-primary/10 text-primary hover:bg-primary/20" onClick={() => setPage && setPage(page! + 1)} disabled={page === totalPages}>
              <ChevronRight />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
