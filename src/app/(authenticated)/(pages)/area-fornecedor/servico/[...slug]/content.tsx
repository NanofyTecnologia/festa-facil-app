'use client'

import { Fragment, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useHookFormMask } from 'use-mask-input'
import { z } from 'zod'
import { CircleAlert } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/input'
import { Editor } from '@/components/ui/editor'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { Tooltip } from '@/components/ui/tooltip'

import { normalizeSlug } from '@/utils/normalize-slug'
import { useGetCategories } from '@/hooks/use-get-categories'

import { IParams } from './page'
import { useGetServiceById } from './hook/use-get-service-by-id'
import { useUpdateService } from './hook/use-update-service'

const serviceSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Insira o nome do serviço' })
    .max(255, { message: 'Nome muito longo' }),
  description: z
    .string()
    .min(1, { message: 'Insira uma descrição para o serviço' }),
  categoryId: z.string().min(1, { message: 'Insira a categoria' }),
  phone: z.string().min(1, { message: 'Insira o telefone de contato' }),
  email: z.string().email({ message: 'Insira o e-mail de contato' }),
  address: z.string().min(1, { message: 'Insira o endereço' }),
  city: z.string().min(1, { message: 'Insira a cidade' }),
  state: z.string().min(1, { message: 'Insira o estado' }),
})

type CreateServiceData = z.infer<typeof serviceSchema>

export default function Content() {
  const { slug } = useParams<IParams>()
  const { id, isEditing } = normalizeSlug(slug)

  const { data: categories } = useGetCategories()
  const { data: service } = useGetServiceById({ id })
  const { mutate: handleUpdateService, isPending } = useUpdateService()

  const {
    watch,
    reset,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateServiceData>({
    resolver: zodResolver(serviceSchema),
  })
  const registerWithMask = useHookFormMask(register)

  const onSubmit: SubmitHandler<CreateServiceData> = (data) => {
    if (id) {
      handleUpdateService({ id, data })
    }
  }

  const handleDefaultValues = () => {
    if (!service) {
      return
    }

    const {
      name,
      city,
      phone,
      email,
      state,
      address,
      description,
      category: { id },
    } = service

    reset({
      name,
      city,
      phone,
      email,
      state,
      address,
      description,
      categoryId: id,
    })
  }

  useEffect(handleDefaultValues, [reset, service])

  if (id && !service) {
    return <>Carregando...</>
  }

  return (
    <>
      <main className="mx-auto max-w-sm px-4 py-6 md:max-w-screen-xl">
        <h2 className="mb-6 text-lg">
          {isEditing ? (
            <Fragment>
              Editando serviço:{' '}
              <span className="font-bold">{service?.name}</span>
            </Fragment>
          ) : (
            <Fragment>Criando novo serviço</Fragment>
          )}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-end">
          <div className="relative flex items-center">
            <Input.Root
              {...register('name')}
              data-error={errors.name ? 'true' : 'false'}
            />

            {errors.name && (
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger className="absolute right-2">
                    <CircleAlert className="size-5 text-destructive" />
                  </Tooltip.Trigger>
                  <Tooltip.Content>{errors.name.message}</Tooltip.Content>
                </Tooltip.Root>
              </Tooltip.Provider>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="relative flex items-center">
              <Select.Root
                value={watch('categoryId')}
                defaultValue={service?.category.id}
                onValueChange={(value) => setValue('categoryId', value)}
              >
                <Select.Trigger
                  data-error={errors.categoryId ? 'true' : 'false'}
                >
                  <Select.Value placeholder="Selecione a categoria" />
                </Select.Trigger>
                <Select.Content>
                  {categories?.map((category) => (
                    <Fragment key={category.id}>
                      <Select.Item value={category.id}>
                        {category.name}
                      </Select.Item>
                    </Fragment>
                  ))}
                </Select.Content>
              </Select.Root>

              {errors.categoryId && (
                <Tooltip.Provider>
                  <Tooltip.Root>
                    <Tooltip.Trigger className="absolute right-8">
                      <CircleAlert className="size-5 text-destructive" />
                    </Tooltip.Trigger>
                    <Tooltip.Content>
                      {errors.categoryId.message}
                    </Tooltip.Content>
                  </Tooltip.Root>
                </Tooltip.Provider>
              )}
            </div>

            <div className="relative flex items-center">
              <Input.Root
                {...registerWithMask(
                  'phone',
                  ['(99) 9999-9999', '(99) 99999-9999'],
                  {
                    showMaskOnFocus: false,
                    showMaskOnHover: false,
                  },
                )}
                data-error={errors.phone ? 'true' : 'false'}
              />

              {errors.phone && (
                <Tooltip.Provider>
                  <Tooltip.Root>
                    <Tooltip.Trigger className="absolute right-2">
                      <CircleAlert className="size-5 text-destructive" />
                    </Tooltip.Trigger>
                    <Tooltip.Content>{errors.phone.message}</Tooltip.Content>
                  </Tooltip.Root>
                </Tooltip.Provider>
              )}
            </div>

            <div className="relative flex items-center">
              <Input.Root
                {...register('email')}
                data-error={errors.email ? 'true' : 'false'}
              />

              {errors.email && (
                <Tooltip.Provider>
                  <Tooltip.Root>
                    <Tooltip.Trigger className="absolute right-2">
                      <CircleAlert className="size-5 text-destructive" />
                    </Tooltip.Trigger>
                    <Tooltip.Content>{errors.email.message}</Tooltip.Content>
                  </Tooltip.Root>
                </Tooltip.Provider>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="relative flex items-center">
              <Input.Root
                placeholder="Endereço"
                {...register('address')}
                data-error={errors.address ? 'true' : 'false'}
              />

              {errors.address && (
                <Tooltip.Provider>
                  <Tooltip.Root>
                    <Tooltip.Trigger className="absolute right-2">
                      <CircleAlert className="size-5 text-destructive" />
                    </Tooltip.Trigger>
                    <Tooltip.Content>{errors.address.message}</Tooltip.Content>
                  </Tooltip.Root>
                </Tooltip.Provider>
              )}
            </div>

            <div className="relative flex items-center">
              <Input.Root
                placeholder="Cidade"
                {...register('city')}
                data-error={errors.city ? 'true' : 'false'}
              />

              {errors.city && (
                <Tooltip.Provider>
                  <Tooltip.Root>
                    <Tooltip.Trigger className="absolute right-2">
                      <CircleAlert className="size-5 text-destructive" />
                    </Tooltip.Trigger>
                    <Tooltip.Content>{errors.city.message}</Tooltip.Content>
                  </Tooltip.Root>
                </Tooltip.Provider>
              )}
            </div>

            <div className="relative flex items-center">
              <Input.Root
                placeholder="Estado"
                {...register('state')}
                data-error={errors.state ? 'true' : 'false'}
              />

              {errors.state && (
                <Tooltip.Provider>
                  <Tooltip.Root>
                    <Tooltip.Trigger className="absolute right-2">
                      <CircleAlert className="size-5 text-destructive" />
                    </Tooltip.Trigger>
                    <Tooltip.Content>{errors.state.message}</Tooltip.Content>
                  </Tooltip.Root>
                </Tooltip.Provider>
              )}
            </div>
          </div>

          <Editor.Root
            value={service?.description}
            onValueChange={(value) => setValue('description', value)}
          />

          <Button.Root type="submit">
            {isPending ? 'Atualizando...' : 'Enviar'}
          </Button.Root>
        </form>
      </main>
    </>
  )
}
