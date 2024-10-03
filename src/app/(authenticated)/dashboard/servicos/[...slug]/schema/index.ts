import { z } from 'zod'

const MAX_FILE_SIZE = 5000000
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

export const serviceSchema = z.object({
  name: z.string().min(1, 'Insira o nome do serviço'),
  banner: z
    .any()
    .refine(
      (file) => file[0]?.size <= MAX_FILE_SIZE * 2,
      'Insira uma imagem de no máximo 10MB',
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file[0]?.type),
      'Insira uma imagem JPEG | JPG | PNG | WEBP',
    ),
  profilePic: z
    .any()
    .refine(
      (file) => file[0]?.size <= MAX_FILE_SIZE,
      'Insira uma imagem de no máximo 5MB',
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file[0]?.type),
      'Insira uma imagem JPEG | JPG | PNG | WEBP',
    ),
  description: z.string().min(100, 'Insira uma descrição maior'),
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
