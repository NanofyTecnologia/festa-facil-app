import { z } from 'zod'

export const paginationSchema = z.object({
  page: z.number().min(1),
  limit: z.number().min(10),
})

export type IPagination = z.infer<typeof paginationSchema>
