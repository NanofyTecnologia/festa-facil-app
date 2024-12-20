'use client'

import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'
import { useHookFormMask } from 'use-mask-input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ChevronLeft, CircleHelp, Info, Link, Search } from 'lucide-react'
import { toast } from 'react-toastify'
import { zodResolver } from '@hookform/resolvers/zod'
import { FaRegImage } from 'react-icons/fa'
import { useDropzone } from 'react-dropzone'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { Editor } from '@/components/ui/editor'
import { Switch } from '@/components/ui/switch'
import { Tooltip } from '@/components/ui/tooltip'

import { upload } from '@/services/upload'
import { address } from '@/services/address'

import { normalizeSlug } from '@/utils/normalize-slug'

import { useImagePreview } from '@/hooks/use-image-preview'
import { useGetCategories } from '@/hooks/use-get-categories'

import { type IParams } from './page'
import { serviceSchema, type ServiceData } from './schema'

import { useCreateOffer } from '../hooks/use-create-offer'
import { useUpdateOffer } from '../hooks/use-update-offer'
import { useGetOfferById } from '../hooks/use-get-offer-by-id'

export default function Content() {
  const { replace, back } = useRouter()
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
    defaultValues: {
      active: false,
    },
  })

  const { cep, name, categoryId, banner, active } = watch()

  const { data: categories } = useGetCategories()
  const registerWithMask = useHookFormMask(register)

  const { data: offering } = useGetOfferById({ id })
  const { mutate: handleUpdateOffer, isPending: isPendingUpdate } =
    useUpdateOffer()
  const { mutate: handleCreateOffer, isPending: isPendingCreate } =
    useCreateOffer()

  const uploadFile = async (file: File[]): Promise<string> => {
    if (!file) return ''

    const formData = new FormData()
    formData.append('file', file[0])

    const fileURL = await upload.create(formData)

    return fileURL
  }

  const [imagePreview, setImagePreview] = useImagePreview(banner)

  const onDrop = useCallback((acceptedFiles: FileList | File[] | null) => {
    setValue('banner', acceptedFiles)
  }, [])

  const onSubmit: SubmitHandler<ServiceData> = async (data) => {
    const { banner, ...dataWithoutFile } = data

    const bannerPath = await uploadFile(banner)

    if (id) {
      handleUpdateOffer(
        {
          id,
          ...dataWithoutFile,
          banner: bannerPath,
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
      },
      {
        onSuccess: () => {
          toast.success('Criado com sucesso!')
          replace('/dashboard/servicos/listar')
        },
      },
    )
  }

  const handleDefaultValues = () => {
    if (!offering) {
      return
    }

    const {
      cep,
      name,
      slug,
      city,
      phone,
      state,
      email,
      banner,
      active,
      categoryId,
      description,
    } = offering

    setImagePreview(banner)
    reset({
      cep,
      name,
      slug,
      city,
      phone,
      state,
      email,
      active,
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

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const cepRegex = /^[0-9]{5}-[0-9]{3}$/
  const isValidCep = cepRegex.test(cep)

  const isLoading = isPendingUpdate || isPendingCreate

  useEffect(handleDefaultValues, [reset, offering])

  return (
    <>
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-start gap-2">
          <Button.Root variant="ghost" size="icon" onClick={() => back()}>
            <ChevronLeft className="size-5" />
          </Button.Root>

          <h1 className="text-xl font-semibold">
            {isEditing ? 'Editando serviço' : 'Novo serviço'}
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 space-y-10">
          <div className="rounded-md border bg-white">
            <div className="border-b p-6">
              <h2 className="text-lg font-medium">Informações principais</h2>
            </div>

            <div className="space-y-6 p-6">
              <div className="space-y-0.5">
                <Label.Root htmlFor="name">Nome do serviço</Label.Root>
                <Input.Root
                  id="name"
                  {...register('name')}
                  placeholder="Ex: Decorações para festas"
                />

                <p className="text-xs text-destructive">
                  {errors.name?.message}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="space-y-0.5">
                  <Label.Root htmlFor="category">Categoria</Label.Root>

                  <Select.Root
                    value={categoryId}
                    onValueChange={(value) => setValue('categoryId', value)}
                  >
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

                  <p className="text-xs text-destructive">
                    {errors.categoryId?.message}
                  </p>
                </div>

                <div className="space-y-0.5">
                  <Label.Root>Página ativa?</Label.Root>
                  <div className="flex h-12 items-center gap-2">
                    <Switch.Root
                      disabled
                      checked={active}
                      onCheckedChange={(value) => setValue('active', value)}
                    />

                    {!id && (
                      <Tooltip.Provider>
                        <Tooltip.Root>
                          <Tooltip.Trigger>
                            <CircleHelp className="size-4 text-zinc-400" />
                          </Tooltip.Trigger>
                          <Tooltip.Content>
                            Você precisará aguardar a avaliação de um
                            administrador para ativar sua página
                          </Tooltip.Content>
                        </Tooltip.Root>
                      </Tooltip.Provider>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-span-full space-y-0.5">
                <Label.Root>Descrição</Label.Root>
                <Editor.Root
                  value={watch('description')}
                  onValueChange={(value) => setValue('description', value)}
                />
              </div>
            </div>
          </div>

          <div className="rounded-md border bg-white">
            <div className="border-b p-6">
              <h2 className="text-lg font-medium">Contato</h2>
            </div>

            <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-0.5">
                <Label.Root htmlFor="email">E-mail</Label.Root>
                <Input.Root
                  id="email"
                  placeholder="exemplo@email.com.br"
                  {...register('email')}
                />

                <p className="text-xs text-destructive">
                  {errors.email?.message}
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

                <p className="text-xs text-destructive">
                  {errors.phone?.message}
                </p>
              </div>

              <div className="space-y-0.5">
                <Label.Root htmlFor="slug" className="flex items-center gap-2">
                  URL amigável{' '}
                  <Tooltip.Provider>
                    <Tooltip.Root>
                      <Tooltip.Trigger type="button">
                        <Info className="size-4" />
                      </Tooltip.Trigger>
                      <Tooltip.Content>
                        Esse é o caminho para simplificar a URL do serviço.
                        Exemplo da URL com a opção{' '}
                        {"'/servicos/decoracoes-para-festa'"}
                      </Tooltip.Content>
                    </Tooltip.Root>
                  </Tooltip.Provider>
                </Label.Root>

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

                <p className="text-xs text-destructive">
                  {errors.slug?.message}
                </p>
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

                <p className="text-xs text-destructive">
                  {errors.cep?.message}
                </p>
              </div>

              <div className="space-y-0.5">
                <Label.Root htmlFor="city">Cidade</Label.Root>

                <Input.Root
                  id="city"
                  placeholder="São Carlos"
                  {...register('city')}
                />

                <p className="text-xs text-destructive">
                  {errors.city?.message}
                </p>
              </div>

              <div className="space-y-0.5">
                <Label.Root htmlFor="state">Estado</Label.Root>

                <Input.Root
                  id="state"
                  placeholder="São Paulo"
                  {...register('state')}
                />

                <p className="text-xs text-destructive">
                  {errors.city?.message}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-md border bg-white">
            <div className="border-b p-6">
              <h2 className="text-lg font-medium">Capa da página</h2>
            </div>

            <div className="p-6">
              <div
                {...getRootProps()}
                className="flex h-96 cursor-pointer items-center justify-center overflow-hidden rounded-md border-2 border-dashed transition-colors hover:border-foreground hover:text-zinc-500"
              >
                {!imagePreview && (
                  <div className="flex flex-col items-center space-y-1">
                    <FaRegImage className="size-10" />
                    <p>Arraste e solte sua imagem aqui</p>
                    <p className="text-xs">A imagem deve ter no máximo 10MB.</p>
                  </div>
                )}

                {imagePreview && (
                  <Image
                    width={798}
                    height={384}
                    src={imagePreview}
                    alt="image preview"
                    className="h-full w-full object-cover"
                  />
                )}

                <input {...getInputProps()} hidden />
              </div>
            </div>
          </div>

          <div className="col-span-full flex items-center justify-end">
            <Button.Root type="submit" className="w-36" disabled={isLoading}>
              Enviar
            </Button.Root>
          </div>
        </form>
      </div>
    </>
  )
}
