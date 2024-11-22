import { z } from 'zod'

export const partnerSchema = z.object({
  name: z.string().min(1, 'Insira o nome do parceiro'),
  slug: z.string().min(1, 'Insira a URL amigável'),
  picture: z.any().optional(),
})

export type PartnerData = z.infer<typeof partnerSchema>
