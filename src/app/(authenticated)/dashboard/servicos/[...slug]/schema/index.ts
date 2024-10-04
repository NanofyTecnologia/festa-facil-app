import { z } from 'zod'

export const serviceSchema = z.object({
  name: z.string().min(1, 'Insira o nome do serviço'),
  banner: z.any().optional(),
  profilePic: z.any().optional(),
  description: z.string().min(1, 'Insira uma descrição'),
  phone: z.string().min(1, 'Insira o telefone de contato'),
  email: z.string().min(1, 'Insira o e-mail de contato'),
  state: z.string().min(1, 'Insira o estado'),
  city: z.string().min(1, 'Insira a cidade'),
  cep: z.string().min(1, 'Insira o CEP'),
  slug: z.string().min(1, 'Insira uma URL amigável'),
  categoryId: z
    .string({ message: 'Selecione a categoria' })
    .min(1, 'Selecione a categoria'),
})

export type ServiceData = z.infer<typeof serviceSchema>
