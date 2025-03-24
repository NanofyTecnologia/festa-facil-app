import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { type IPagination, paginationSchema } from './types'

export function usePagination() {
  const { control, watch } = useForm<IPagination>({
    resolver: zodResolver(paginationSchema),
    defaultValues: {
      page: 1,
      limit: 10,
    },
  })

  const { page, limit } = watch()

  return { page, limit, control }
}
