import { z } from 'zod'

export const serviceSchema = z.object({
  name: z.string().min(1, 'Insira o nome do serviço'),
  banner: z
    .array(z.instanceof(File).refine((file) => file.size < 2 * 1024 * 1024 * 5))
    .min(1, 'Insira o banner principal do serviço'),
  profilePic: z
    .array(z.instanceof(File).refine((file) => file.size < 2 * 1024 * 1024 * 5))
    .min(1, 'Insira a imagem principal do serviço'),
  description: z.string().min(100, 'Insira uma descrição maior'),
  phone: z.string().min(1, 'Insira o telefone de contato'),
  email: z.string().min(1, 'Insira o e-mail de contato'),
  state: z.string().min(1, 'Insira o estado'),
  city: z.string().min(1, 'Insira a cidade'),
  cep: z.string().min(1, 'Insira o CEP'),
  slug: z.string().min(1, 'Insira uma URL amigável'),
  categoryId: z.string().min(1, 'Selecione a categoria'),
})

export type ServiceData = z.infer<typeof serviceSchema>
