'use client'

import { useParams, useRouter } from 'next/navigation'

import { ChevronLeft, CircleHelp } from 'lucide-react'

import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useHookFormMask } from 'use-mask-input'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Tooltip } from '@/components/ui/tooltip'
import { useGetUserById } from '@/hooks/services/use-get-by-user-id'
import { normalizeSlug } from '@/utils/normalize-slug'

import { useCreateUser } from './hooks/use-create-user'
import { useUpdateUser } from './hooks/use-update-user'
import { IParams } from './page'
import { CreateUserData, userSchema } from './schema'

export default function Content() {
  const { back, push } = useRouter()
  const params = useParams<IParams>()
  const { id, isEditing } = normalizeSlug(params.slug)

  const [isSubmitting, setIsSubmitting] = useState(false)

  const { data: user } = useGetUserById({ id })
  const { mutate: handleCreateUser } = useCreateUser()
  const { mutate: handleUpdateUser } = useUpdateUser()

  const { watch, handleSubmit, register, setValue, reset } =
    useForm<CreateUserData>({
      resolver: zodResolver(userSchema),
      defaultValues: {
        isActive: true,
        role: isEditing ? user?.role : 'CUSTOMER',
      },
    })
  const { role, isActive } = watch()
  const registerWithHook = useHookFormMask(register)

  const handleDefaultValues = useCallback(() => {
    if (!user) return

    const { name, role, email, cpf, isActive } = user

    reset({
      cpf,
      name,
      role,
      email,
      isActive,
    })
  }, [user, reset])

  const onSubmit: SubmitHandler<CreateUserData> = (data) => {
    setIsSubmitting(true)

    if (id) {
      handleUpdateUser(
        {
          id,
          ...data,
        },
        {
          onSuccess: () => {
            toast.success('Usuário editado com sucesso!')
          },
          onError: (error) => {
            if (error instanceof AxiosError) {
              return toast.error(error.response?.data.message)
            }
          },
          onSettled: () => {
            setIsSubmitting(false)
          },
        },
      )

      return
    }

    handleCreateUser(
      { ...data },
      {
        onSuccess: () => {
          push('/dashboard/usuarios/listar')
          toast.success('Usuário criado com sucesso!')
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            return toast.error(error.response?.data.message)
          }
        },
        onSettled: () => {
          setIsSubmitting(false)
        },
      },
    )
  }

  useEffect(() => {
    handleDefaultValues()
  }, [handleDefaultValues])

  return (
    <>
      <div className="mx-auto mt-6 max-w-4xl">
        <div className="mb-6 flex items-center justify-start gap-2">
          <h1 className="text-xl font-semibold">
            {isEditing ? 'Editando usuário' : 'Novo usuário'}
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 space-y-10">
          <div className="rounded-md border bg-white">
            <div className="border-b p-6">
              <h2 className="text-lg font-medium">Informações principais</h2>
            </div>

            <div className="space-y-6 p-6">
              <div className="space-y-0.5">
                <Label.Root htmlFor="name">Nome completo</Label.Root>

                <Input.Root
                  id="name"
                  placeholder="Nome completo"
                  {...register('name')}
                />

                <p className="text-xs text-destructive"></p>
              </div>

              <div className="space-y-0.5">
                <Label.Root htmlFor="name">E-mail</Label.Root>

                <Input.Root
                  id="name"
                  placeholder="E-mail"
                  {...register('email')}
                />

                <p className="text-xs text-destructive"></p>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="space-y-0.5">
                  <Label.Root>Função</Label.Root>

                  <Select.Root
                    value={role}
                    onValueChange={(value: 'ADMIN' | 'CUSTOMER' | 'SUPPLIER') =>
                      setValue('role', value)
                    }
                  >
                    <Select.Trigger>
                      <Select.Value placeholder="Selecionar função" />
                    </Select.Trigger>

                    <Select.Content>
                      <Select.Item value="ADMIN">Administrador</Select.Item>
                      <Select.Item value="CUSTOMER">Consumidor</Select.Item>
                      <Select.Item value="SUPPLIER">Fornecedor</Select.Item>
                    </Select.Content>
                  </Select.Root>
                </div>

                <div className="space-y-0.5">
                  <Label.Root htmlFor="cpf">CPF</Label.Root>

                  <Input.Root
                    id="cpf"
                    placeholder="123.456.789-99"
                    {...registerWithHook('cpf', ['999.999.999-99'], {
                      showMaskOnFocus: false,
                      showMaskOnHover: false,
                    })}
                  />
                </div>

                <div className="space-y-0.5">
                  <Label.Root>Usuário ativo?</Label.Root>

                  <div className="flex h-12 items-center gap-2">
                    <Switch.Root
                      checked={isActive}
                      onCheckedChange={(value) => setValue('isActive', value)}
                    />

                    <Tooltip.Provider>
                      <Tooltip.Root>
                        <Tooltip.Trigger>
                          <CircleHelp className="size-4 text-zinc-400" />
                        </Tooltip.Trigger>
                        <Tooltip.Content>
                          Você poderá ativar ou inativar um usuário na
                          plataforma. OBS: Se o usuário estiver desativado o
                          mesmo não poderá acessar a plataforma
                        </Tooltip.Content>
                      </Tooltip.Root>
                    </Tooltip.Provider>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-full flex items-center justify-end">
            <Button.Root type="submit" className="w-36" disabled={isSubmitting}>
              {isSubmitting ? 'Carregando...' : 'Cadastrar'}
            </Button.Root>
          </div>
        </form>
      </div>
    </>
  )
}
