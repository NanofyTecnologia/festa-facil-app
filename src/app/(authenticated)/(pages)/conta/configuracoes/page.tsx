'use client'

import { z } from 'zod'
import { useSession } from 'next-auth/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useHookFormMask } from 'use-mask-input'

import { Input } from '@/components/ui/input'
import { Dialog } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

import { validateCPF } from '@/utils/validate-cpf'

import { useUpdateUser } from '../hooks/use-update-user'

const userSchema = z.object({
  name: z.string().min(1, { message: 'Insira seu nome' }),
  email: z
    .string()
    .email({ message: 'E-mail inválido' })
    .min(1, { message: 'Insira seu e-mail' }),
  cpf: z
    .string()
    .min(1, { message: 'Insira seu CPF' })
    .refine(validateCPF, { message: 'CPF Inválido' }),
})

type UpdateUserData = z.infer<typeof userSchema>

export default function Page() {
  const { data, update } = useSession()

  const { mutate: handleUpdateUser } = useUpdateUser()
  const { register, handleSubmit } = useForm<UpdateUserData>()
  const registerWithMask = useHookFormMask(register)

  const onSubmit: SubmitHandler<UpdateUserData> = (updateUserData) => {
    handleUpdateUser({
      userId: data?.user.id ?? '',
      data: { ...updateUserData },
    })
  }

  const onChangeRole = () => {
    handleUpdateUser(
      {
        userId: data?.user.id ?? '',
        data: {
          role: 'SUPPLIER',
        },
      },
      {
        onSuccess: async () => {
          update({
            role: 'SUPPLIER',
          })
        },
      },
    )
  }

  console.log(data)

  return (
    <main className="mx-auto mt-6 max-w-5xl">
      <div className="mb-6 pb-6">
        <h2 className="text-xl font-semibold">Configurações da conta</h2>
        <p className="text-sm text-zinc-400">
          Explore as configurações da sua conta para gerenciar suas
          preferências, ajustar notificações e personalizar seu perfil,
          garantindo que sua experiência seja única e adaptada às suas
          necessidades.
        </p>
      </div>

      <div className="mb-4 border-b pb-4">
        <h3 className="text-lg font-semibold">Perfil</h3>
        <p className="text-sm text-zinc-400">
          Personalize as informações do seu perfil para refletir sua identidade
          e destacar o que é mais importante para você.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input.Root {...register('name')} placeholder="Nome" />

        <Input.Root {...register('email')} placeholder="E-mail" />

        <Input.Root
          {...registerWithMask('cpf', ['999.999.999-99'], {
            showMaskOnFocus: false,
            showMaskOnHover: false,
          })}
          placeholder="CPF"
        />
      </form>

      <div className="my-6 border-b pb-4">
        <h3 className="text-lg font-semibold">Zona de Perigo</h3>
        <p className="text-sm text-zinc-400">
          Cuidado! Nessa zona é possível trocar o tipo de sua conta, excluir
          dados da mesma ou até mesmo excluir a conta.
        </p>
      </div>

      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button.Root variant="outline">
            Trocar conta para fornecedor
          </Button.Root>
        </Dialog.Trigger>

        <Dialog.Content>
          <Dialog.Title>Deseja mesmo ser um fornecedor?</Dialog.Title>
          <Dialog.Description>
            Ao clicar em aceitar sua conta passará para uma conta do tipo
            fornecedor, permitindo você a divulgar seus serviços na plataforma!
          </Dialog.Description>
          <Dialog.Footer>
            <Button.Root variant="ghost" size="sm">
              Cancelar
            </Button.Root>
            <Button.Root size="sm" onClick={onChangeRole}>
              Confirmar
            </Button.Root>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
    </main>
  )
}
