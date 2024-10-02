'use client'

import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import { useHookFormMask } from 'use-mask-input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, Search } from 'lucide-react'
import { toast } from 'react-toastify'
import { zodResolver } from '@hookform/resolvers/zod'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { Editor } from '@/components/ui/editor'

import { address } from '@/services/address'
import { normalizeSlug } from '@/utils/normalize-slug'
import { useGetCategories } from '@/hooks/use-get-categories'

import { type IParams } from './page'
import { serviceSchema, type ServiceData } from './schema'

import { useCreateOffer } from '../hooks/use-create-offer'
import { useUpdateOffer } from '../hooks/use-update-offer'
import { useGetOfferById } from '../hooks/use-get-offer-by-id'
import { upload } from '@/services/upload'

export default function Content() {
  const { slug } = useParams<IParams>()
  const { id, isEditing } = normalizeSlug(slug)

  const {
    watch,
    reset,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ServiceData>({
    resolver: zodResolver(serviceSchema),
  })

  const { cep, name } = watch()

  const { data: categories } = useGetCategories()
  const registerWithMask = useHookFormMask(register)

  const { data: offering } = useGetOfferById({ id })
  const { mutate: handleUpdateOffer } = useUpdateOffer()
  const { mutate: handleCreateOffer } = useCreateOffer()

  const uploadFile = async (file: File[]): Promise<string> => {
    if (file?.length === 0) return ''

    const formData = new FormData()
    formData.append('file', file[0])

    const fileURL = await upload.create(formData)

    return fileURL
  }

  const onSubmit: SubmitHandler<ServiceData> = async (data) => {
    const { banner, profilePic, ...dataWithoutFile } = data

    const bannerPath = await uploadFile(banner)
    const profilePath = await uploadFile(profilePic)

    if (banner.length)
      if (id) {
        handleUpdateOffer(
          {
            id,
            ...dataWithoutFile,
            banner: bannerPath,
            profilePic: profilePath,
          },
          {
            onSuccess: () => {
              toast.success('Atualizado com sucesso!')
            },
          },
        )

        return
      }

    handleCreateOffer(
      {
        ...dataWithoutFile,
        banner: bannerPath,
        profilePic: profilePath,
      },
      {
        onSuccess: () => {
          toast.success('Criado com sucesso!')
        },
      },
    )
  }

  const handleDefaultValues = () => {
    if (!offering) {
      return
    }

    const { cep, name, city, phone, state, email, categoryId, description } =
      offering

    reset({
      cep,
      name,
      city,
      phone,
      state,
      email,
      categoryId,
      description,
    })
  }

  const handleCreateSafeURL = () => {
    if (!name) return

    const safeURL = name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9]/g, '-')
      .toLowerCase()

    setValue('slug', safeURL)
  }

  const handleLoadingAddress = async () => {
    const data = await address.get(cep)

    setValue('state', data.estado)
    setValue('city', data.localidade)
  }

  const cepRegex = /^[0-9]{5}-[0-9]{3}$/
  const isValidCep = cepRegex.test(cep)

  useEffect(handleDefaultValues, [reset, offering])

  return (
    <>
      <div className="px-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-semibold">
            {isEditing ? 'Editando serviço' : 'Novo serviço'}
          </h1>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid flex-1 grid-cols-4 gap-4"
        >
          <div className="space-y-0.5">
            <Label.Root htmlFor="name">Nome do serviço</Label.Root>
            <Input.Root
              id="name"
              {...register('name')}
              placeholder="Decorações para festas"
            />

            <p className="text-sm text-destructive">{errors.name?.message}</p>
          </div>

          <div className="space-y-0.5">
            <Label.Root htmlFor="image">Imagem do perfil</Label.Root>
            <Input.Root
              id="image"
              type="file"
              {...register('profilePic')}
              className="px-2 py-1.5"
              placeholder="Decorações para festas"
            />

            <p className="text-sm text-destructive">
              {errors.profilePic?.message}
            </p>
          </div>

          <div className="space-y-0.5">
            <Label.Root htmlFor="banner">Banner do perfil</Label.Root>
            <Input.Root
              id="banner"
              type="file"
              {...register('banner')}
              className="px-2 py-1.5"
              placeholder="Decorações para festas"
            />

            <p className="text-sm text-destructive">{errors.banner?.message}</p>
          </div>

          <div className="space-y-0.5">
            <Label.Root htmlFor="slug">URL amigável</Label.Root>

            <div className="relative flex items-center">
              <Input.Root
                id="slug"
                {...register('slug')}
                className="px-2 py-1.5"
                placeholder="decoracoes-para-festa"
              />

              <button
                type="button"
                className="absolute right-4 disabled:text-zinc-500"
                onClick={() => handleCreateSafeURL()}
              >
                <Link className="size-4" />
              </button>
            </div>

            <p className="text-sm text-destructive">{errors.banner?.message}</p>
          </div>

          <div className="space-y-0.5">
            <Label.Root htmlFor="category">Categoria</Label.Root>
            <Select.Root>
              <Select.Trigger id="category">
                <Select.Value placeholder="Selecione a categoria" />
              </Select.Trigger>
              <Select.Content>
                {categories?.map((category) => (
                  <Select.Item key={category.id} value={category.id}>
                    {category.name}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>

            <p className="text-sm text-destructive">
              {errors.categoryId?.message}
            </p>
          </div>

          <div className="space-y-0.5">
            <Label.Root htmlFor="phone">Telefone</Label.Root>
            <Input.Root
              id="phone"
              placeholder="(12) 3456-7890"
              {...registerWithMask(
                'phone',
                ['(99) 9999-9999', '(99) 99999-9999'],
                {
                  showMaskOnFocus: false,
                  showMaskOnHover: false,
                  removeMaskOnSubmit: true,
                },
              )}
            />

            <p className="text-sm text-destructive">{errors.phone?.message}</p>
          </div>

          <div className="space-y-0.5">
            <Label.Root htmlFor="email">E-mail</Label.Root>
            <Input.Root
              id="email"
              placeholder="exemplo@email.com.br"
              {...register('email')}
            />

            <p className="text-sm text-destructive">{errors.email?.message}</p>
          </div>

          <div className="space-y-0.5">
            <Label.Root htmlFor="cep">CEP</Label.Root>

            <div className="relative flex items-center">
              <Input.Root
                id="cep"
                placeholder="12345-678"
                {...registerWithMask('cep', ['99999-999'], {
                  showMaskOnFocus: false,
                  showMaskOnHover: false,
                  removeMaskOnSubmit: true,
                })}
              />

              <button
                type="button"
                className="absolute right-4 disabled:text-zinc-500"
                disabled={!isValidCep}
                onClick={() => handleLoadingAddress()}
              >
                <Search className="size-4" />
              </button>
            </div>

            <p className="text-sm text-destructive">{errors.cep?.message}</p>
          </div>

          <div className="space-y-0.5">
            <Label.Root htmlFor="city">Cidade</Label.Root>

            <Input.Root
              id="city"
              placeholder="São Carlos"
              {...register('city')}
            />

            <p className="text-sm text-destructive">{errors.city?.message}</p>
          </div>

          <div className="space-y-0.5">
            <Label.Root htmlFor="state">Estado</Label.Root>

            <Input.Root
              id="state"
              placeholder="São Paulo"
              {...register('state')}
            />

            <p className="text-sm text-destructive">{errors.city?.message}</p>
          </div>

          <div className="col-span-full space-y-0.5">
            <Label.Root>Descrição</Label.Root>
            <Editor.Root
              value={watch('description')}
              onValueChange={(value) => setValue('description', value)}
            />
          </div>

          <div className="col-span-full flex items-center justify-end">
            <Button.Root className="w-36">Enviar</Button.Root>
          </div>
        </form>
      </div>
    </>
  )
}
