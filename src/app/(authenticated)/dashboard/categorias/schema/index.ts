import { z } from 'zod'

export const categorySchema = z.object({
  name: z.string().min(1, 'Insira a categoria'),
  slug: z.string().min(1, 'Insira o caminho da URL'),
})

export type CategoryData = z.infer<typeof categorySchema>
