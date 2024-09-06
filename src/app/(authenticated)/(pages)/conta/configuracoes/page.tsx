'use client'

import { z } from 'zod'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useHookFormMask } from 'use-mask-input'
import { MoveLeft, User } from 'lucide-react'
import { toast } from 'react-toastify'

import { Input } from '@/components/ui/input'
import { Dialog } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

import { validateCPF } from '@/utils/validate-cpf'

import { useGetUser } from '../hooks/use-get-user'
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
  const { back } = useRouter()
  const { data, update } = useSession()

  const [showModal, setShowModal] = useState(false)

  const { data: user, isPending } = useGetUser({ id: data?.user.id ?? '' })
  const { mutate: handleUpdateUser } = useUpdateUser()

  const { reset, register, handleSubmit } = useForm<UpdateUserData>()
  const registerWithMask = useHookFormMask(register)

  const onSubmit: SubmitHandler<UpdateUserData> = (updateUserData) => {
    handleUpdateUser({
      userId: data?.user.id ?? '',
      data: { ...updateUserData },
    })
  }

  const handleDefaultValues = () => {
    if (!user) {
      return
    }

    const { name, email, cpf } = user

    reset({
      name,
      email,
      cpf,
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

          toast.success('Sua conta agora é fornecedora!')

          setShowModal(false)
        },
      },
    )
  }

  useEffect(handleDefaultValues, [reset, user])

  return (
    <main className="mx-auto mt-6 max-w-5xl">
      <div className="">
        <Button.Root onClick={back} variant="link" className="px-0">
          <MoveLeft className="me-1 size-5" />
          Voltar
        </Button.Root>
      </div>

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

      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4 text-end">
        {data?.user.image ? (
          <Image width={64} height={64} src={data.user.image} alt="" />
        ) : (
          <>
            <label className="flex h-48 w-48 cursor-pointer items-center justify-center overflow-hidden rounded-md bg-secondary transition-all">
              <User className="size-16 text-zinc-500" />
            </label>

            <input type="file" hidden />
          </>
        )}

        <div className="w-full max-w-md space-y-4">
          <Input.Root {...register('name')} placeholder="Nome" />

          <Input.Root {...register('email')} placeholder="E-mail" />

          <Input.Root
            {...registerWithMask('cpf', ['999.999.999-99'], {
              showMaskOnFocus: false,
              showMaskOnHover: false,
            })}
            placeholder="CPF"
          />

          <Button.Root type="submit" size="sm" className="px-8">
            {isPending ? 'Atualizando...' : 'Atualizar'}
          </Button.Root>
        </div>
      </form>

      <div className="my-6 border-b pb-4">
        <h3 className="text-lg font-semibold">Zona de Perigo</h3>
        <p className="text-sm text-zinc-400">
          Cuidado! Nessa zona é possível trocar o tipo de sua conta, excluir
          dados da mesma ou até mesmo excluir a conta.
        </p>
      </div>

      {data?.user.role === 'CUSTOMER' ? (
        <Button.Root onClick={() => setShowModal(true)} variant="outline">
          Trocar conta para fornecedor
        </Button.Root>
      ) : (
        <Button.Root variant="secondary" disabled>
          Você já é um fornecedor
        </Button.Root>
      )}

      <Dialog.Root open={showModal} onOpenChange={setShowModal}>
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
