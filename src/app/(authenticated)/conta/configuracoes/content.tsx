'use client'

import Image from 'next/image'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { ChevronLeft, MoveRight, Pencil, User } from 'lucide-react'
import { z } from 'zod'
import { toast } from 'react-toastify'
import { useHookFormMask } from 'use-mask-input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import { validateCPF } from '@/utils/validate-cpf'

import { useGetUser } from '../hooks/use-get-user'
import { useUpdateUser } from '../hooks/use-update-user'

const role: { [key: string]: string } = {
  ADMIN: 'Administrador',
  SUPPLIER: 'Fornecedor',
  CONSUMER: 'Normal',
}

const userSchema = z.object({
  name: z.string().min(1, { message: 'Insira seu nome' }),
  email: z
    .string()
    .email({ message: 'E-mail inválido' })
    .min(1, { message: 'Insira seu e-mail' }),
  cpf: z.string().refine(validateCPF, { message: 'CPF inválido' }),
})

type UserData = z.infer<typeof userSchema>

export default function Content() {
  const { back } = useRouter()
  const { data, update } = useSession()

  const { mutate: handleUpdateUser } = useUpdateUser()
  const { data: user } = useGetUser({ id: data?.user.id })

  const { reset, register, handleSubmit } = useForm<UserData>({
    resolver: zodResolver(userSchema),
  })
  const registerWithMask = useHookFormMask(register)

  const onSubmit: SubmitHandler<UserData> = (data) => {
    if (!user?.id) {
      return toast.error('Usuário não encontrado!')
    }

    handleUpdateUser(
      {
        data: {
          ...data,
        },
        userId: user.id,
      },
      {
        onSuccess: () => {
          update({ ...data })
        },
      },
    )
  }

  const handleDefaultValues = () => {
    if (!user) {
      return
    }

    const { cpf, name, email } = user

    reset({
      cpf,
      name,
      email,
    })
  }

  useEffect(handleDefaultValues, [user, reset])

  if (!data?.user) {
    return (
      <div className="rouded-md bg-secondary p-6">
        <h2 className="text-center text-2xl">Carregando...</h2>
      </div>
    )
  }

  return (
    <>
      <div className="mt-4 flex items-center gap-4 px-4 sm:m-4 sm:rounded-md md:mx-auto md:max-w-lg">
        <Button.Root
          size="icon"
          variant="default"
          className="rounded-md"
          onClick={back}
        >
          <ChevronLeft className="size-5" />
        </Button.Root>

        <h1 className="text-lg font-medium">Minha conta</h1>
      </div>

      <main className="px-4 py-6 sm:m-4 sm:rounded-md md:mx-auto md:max-w-lg">
        <form className="flex items-start gap-2">
          {data?.user.image && <Image src={data?.user.image} alt="" />}

          {!data?.user.image && (
            <>
              <label htmlFor="picture">
                <div className="relative flex size-16 items-center justify-center rounded-full bg-secondary p-4">
                  <span className="absolute -right-1 -top-1 rounded-full border-4 border-white bg-blue-400 p-1">
                    <Pencil className="size-3 text-white" />
                  </span>

                  <User className="size-10 text-zinc-600" />
                </div>
              </label>

              <input id="picture" type="file" hidden />
            </>
          )}

          <div>
            <h2 className="font-semibold">{data?.user.name}</h2>

            <Badge.Root variant="outline">Free</Badge.Root>
          </div>
        </form>

        <div className="mt-6 rounded-md border bg-secondary p-4">
          <h2 className="mb-4 font-semibold">Seu perfil</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input.Root
              placeholder="Nome"
              className="bg-white"
              {...register('name')}
            />

            <Input.Root
              placeholder="E-mail"
              className="bg-white"
              {...register('email')}
            />

            <Input.Root
              placeholder="CPF"
              className="bg-white"
              {...registerWithMask('cpf', ['999.999.999-99'], {
                showMaskOnFocus: false,
                showMaskOnHover: false,
              })}
            />

            <Button.Root type="submit" size="sm" className="w-full">
              Salvar
            </Button.Root>
          </form>
        </div>

        <div className="mt-6 rounded-md border bg-secondary">
          <div className="flex items-center justify-between p-4">
            <div className="5 space-y-0">
              <h2 className="text-sm">Conta</h2>
              <p className="text-base font-semibold">{role[data?.user.role]}</p>
            </div>

            {data.user.role !== 'SUPPLIER' && (
              <Button.Root>Tornar-se fornecedor</Button.Root>
            )}
          </div>

          <div className="flex justify-center bg-zinc-200 px-4 py-2">
            <Button.Root variant="link">
              Sobre minha conta <MoveRight className="ms-2 size-5" />
            </Button.Root>
          </div>
        </div>
      </main>
    </>
  )
}
