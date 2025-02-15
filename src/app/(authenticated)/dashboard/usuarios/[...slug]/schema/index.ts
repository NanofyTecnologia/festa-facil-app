import { z } from 'zod'

import { validateCPF } from '@/utils/validate-cpf'

export const userSchema = z.object({
  name: z.string().min(1, 'Insira o nome completo do usuário'),
  role: z.enum(['ADMIN', 'SUPPLIER', 'CUSTOMER']).default('CUSTOMER'),
  email: z
    .string()
    .min(1, 'Insira o e-mail do usuário')
    .email('E-mail inválido'),
  cpf: z
    .string()
    .min(1, 'Insira o CPF do usuário')
    .refine((value) => validateCPF(value), {
      message: 'CPF inválido',
    }),
  isActive: z.boolean().default(true),
})

export type CreateUserData = z.infer<typeof userSchema>
