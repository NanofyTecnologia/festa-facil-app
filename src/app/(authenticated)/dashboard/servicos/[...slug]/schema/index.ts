import { z } from 'zod'

import { experienceSchema } from '../components/form-experience/schema'

export const serviceSchema = z.object({
  name: z.string().min(1, 'Insira o nome do serviço'),
  banner: z.any().optional(),
  profilePic: z.any().optional(),
  summary: z
    .string()
    .min(1, 'Insira um resumo')
    .max(150, 'Máximo de 300 caracteres'),
  description: z.string().min(1, 'Insira uma descrição'),
  phone: z.string().min(1, 'Insira o telefone de contato'),
  email: z.string().min(1, 'Insira o e-mail de contato'),
  state: z.string().min(1, 'Insira o estado'),
  city: z.string().min(1, 'Insira a cidade'),
  cep: z.string().min(1, 'Insira o CEP'),
  active: z.boolean().default(true),
  slug: z.string().min(1, 'Insira uma URL amigável'),
  categoryId: z
    .string({ message: 'Selecione a categoria' })
    .min(1, 'Selecione a categoria'),
  experiences: z.array(experienceSchema).optional(),
})

export type ServiceData = z.infer<typeof serviceSchema>
