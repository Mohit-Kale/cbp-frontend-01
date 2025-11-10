import { pageSize } from '@/utils'
import React from 'react'

type TableSkeletonProps = {
  rows?: number
  className?: string
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({ rows = pageSize, className = '' }) => {
  const cols = 6

  return (
    <div className={`w-full overflow-x-auto rounded-lg ${className}`} aria-busy="true" aria-label="Loading table">
      <table className="min-w-full divide-y rounded-lg">
        <thead>
          <tr className="bg-primary/15">
            {Array.from({ length: cols }).map((_, i) => (
              <th key={i} className="p-6 text-left align-middle" />
            ))}
          </tr>
        </thead>

        <tbody className="bg-white">
          {Array.from({ length: rows }).map((_, rowIdx) => (
            <tr key={rowIdx} className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-primary/15'}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="w-36 h-4 rounded-md bg-gray-200 animate-pulse" />
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <div className="w-48 h-4 rounded-md bg-gray-200 animate-pulse" />
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <div className="w-28 h-4 rounded-md bg-gray-200 animate-pulse" />
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <div className="w-20 h-4 rounded-md bg-gray-200 animate-pulse" />
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <div className="w-28 h-4 rounded-md bg-gray-200 animate-pulse" />
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <div className="w-12 h-4 rounded-md bg-gray-200 animate-pulse" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableSkeleton
