'use client'

import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useCallback, useMemo } from 'react'

export function useTablePagination(defaultLimit = 10) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const page = Number(searchParams.get('page') || 1)
  const limit = Number(searchParams.get('limit') || defaultLimit)

  const updateParams = useCallback(
    (key: string, value: string | number) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(key, String(value))

      // Use router.replace to update URL without adding to browser history
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [router, searchParams, pathname],
  )

  const setPage = useCallback(
    (newPage: number) => {
      updateParams('page', newPage)
    },
    [updateParams],
  )

  const setLimit = useCallback(
    (newLimit: number) => {
      // Reset to page 1 when changing limit
      const params = new URLSearchParams(searchParams.toString())
      params.set('limit', String(newLimit))
      params.set('page', '1')
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [router, searchParams, pathname],
  )

  return useMemo(
    () => ({
      page,
      limit,
      setPage,
      setLimit,
    }),
    [page, limit, setPage, setLimit],
  )
}
