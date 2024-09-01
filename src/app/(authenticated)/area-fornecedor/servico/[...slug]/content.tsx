'use client'

import { Fragment, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useHookFormMask } from 'use-mask-input'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

import { normalizeSlug } from '@/utils/normalize-slug'
import { useGetCategories } from '@/hooks/use-get-categories'

import { IParams } from './page'
import { useGetServiceById } from './hook/use-get-service-by-id'

const serviceSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Insira o nome do serviço' })
    .max(255, { message: 'Nome muito longo' }),
  description: z
    .string()
    .min(1, { message: 'Insira uma descrição para o serviço' }),
  categoryId: z.string().cuid(),
  phone: z.string().min(1, { message: 'Insira o telefone de contato' }),
  email: z.string().email({ message: 'Insira o e-mail de contato' }),
})

type CreateServiceData = z.infer<typeof serviceSchema>

export default function Content() {
  const { slug } = useParams<IParams>()
  const { id, isEditing } = normalizeSlug(slug)

  const { data: categories } = useGetCategories()
  const { data: service } = useGetServiceById({ id })

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
    console.log(data)
  }

  const handleDefaultValues = () => {
    if (!service) {
      return
    }

    const {
      name,
      phone,
      email,
      description,
      category: { id },
    } = service

    reset({
      name,
      phone,
      email,
      description,
      categoryId: id,
    })
  }

  useEffect(handleDefaultValues, [reset, service])

  console.log(categories)

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
        {/* <div className="relative mb-4 flex items-start gap-2 rounded-md bg-secondary p-4">
          <Image
            width={64}
            height={64}
            className="rounded-md"
            src={`${env.NEXT_PUBLIC_API_URL}/uploads/${service?.image}`}
            alt=""
          />

          <div className="space-y-2">
            <input
              type="text"
              disabled={isDisabled}
              className="rounded-sm border border-transparent bg-transparent ps-1 font-semibold outline-none enabled:border-zinc-300 enabled:bg-white"
              {...register('name')}
            />
            <h2 className="hidden font-semibold">{service?.name}</h2>

            <div className="items-STAR flex gap-4">
              <div className="flex items-center gap-1">
                <Phone className="size-4" />{' '}
                <input
                  type="text"
                  disabled={isDisabled}
                  className="w-32 rounded-sm border border-transparent bg-transparent ps-1 text-sm outline-none enabled:border-zinc-300 enabled:bg-white"
                  {...register('phone')}
                />
              </div>

              <div className="flex items-center gap-2">
                <Mail className="size-4" />{' '}
                <input
                  type="text"
                  disabled={isDisabled}
                  className="w-52 rounded-sm border border-transparent bg-transparent ps-1 text-sm outline-none enabled:border-zinc-300 enabled:bg-white"
                  {...register('email')}
                />
              </div>
            </div>
          </div>

          <Button.Root
            size="icon"
            type="button"
            className="ms-auto size-8"
            onClick={() => setIsDisabled(!isDisabled)}
          >
            {isDisabled ? (
              <Pencil className="size-4" />
            ) : (
              <PencilOff className="size-4" />
            )}
          </Button.Root>
        </div>
 */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-end">
          <Input.Root
            {...register('name')}
            data-error={errors.name ? 'true' : 'false'}
          />

          <div className="grid grid-cols-3 gap-4">
            <Select.Root
              value={watch('categoryId')}
              onValueChange={(value) => setValue('categoryId', value)}
            >
              <Select.Trigger>
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

            <Input.Root
              {...register('email')}
              data-error={errors.email ? 'true' : 'false'}
            />
          </div>

          <Textarea.Root
            rows={6}
            className="resize-none"
            {...register('description')}
            data-error={errors.description ? 'true' : 'false'}
          />

          <Button.Root type="submit">Enviar</Button.Root>
        </form>
      </main>
    </>
  )
}
