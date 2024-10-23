'use client'

import Image from 'next/image'
import { useCallback, useState } from 'react'
import { format } from 'date-fns'
import { toast } from 'react-toastify'
import { FaRegImage } from 'react-icons/fa'
import { useDropzone } from 'react-dropzone'
import { Info, Link, Plus, Trash } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createColumnHelper } from '@tanstack/react-table'

import { Table } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Tooltip } from '@/components/ui/tooltip'

import { upload } from '@/services/upload'
import { Partner } from '@/services/partners/types'
import { useImagePreview } from '@/hooks/use-image-preview'

import { useGetPartners } from './hooks/use-get-partners'
import { useDeletePartner } from './hooks/use-delete-partner'
import { useCreatePartner } from './hooks/use-create-partner'
import { PartnerData, partnerSchema } from './schema'

export default function Content() {
  const { watch, reset, setValue, register, handleSubmit } =
    useForm<PartnerData>({
      resolver: zodResolver(partnerSchema),
    })
  const [showDialog, setShowDialog] = useState(false)

  const { data, queryKey, refetch } = useGetPartners()
  const { mutate: handleCreatePartner } = useCreatePartner()
  const { mutate: handleDeletePartner } = useDeletePartner({ queryKey })

  const columnHelper = createColumnHelper<Partner>()

  const columns = [
    columnHelper.accessor('picture', {
      header: ({ header }) => <Table.Head header={header}></Table.Head>,
      cell: ({ cell, getValue }) => (
        <Table.Cell cell={cell}>
          <Image
            width={32}
            height={32}
            src={getValue()}
            className="rounded-md"
            alt=""
          />
        </Table.Cell>
      ),
    }),
    columnHelper.accessor('name', {
      header: ({ header }) => <Table.Head header={header}>Parceiro</Table.Head>,
      cell: ({ cell, getValue }) => (
        <Table.Cell cell={cell}>
          <div className="text-center text-sm">{getValue()}</div>
        </Table.Cell>
      ),
    }),
    columnHelper.accessor('slug', {
      header: ({ header }) => (
        <Table.Head header={header}>URL do parceiro</Table.Head>
      ),
      cell: ({ cell, getValue }) => (
        <Table.Cell cell={cell}>
          <div className="text-center text-sm">
            <Badge.Root>{getValue()}</Badge.Root>
          </div>
        </Table.Cell>
      ),
    }),
    columnHelper.accessor('createdAt', {
      header: ({ header }) => (
        <Table.Head header={header}>Criado em</Table.Head>
      ),
      cell: ({ cell, getValue }) => (
        <Table.Cell cell={cell}>
          <div className="text-center text-sm">
            {format(getValue(), 'dd/MM/yyyy - HH:mm')}
          </div>
        </Table.Cell>
      ),
    }),
    columnHelper.accessor('updatedAt', {
      header: ({ header }) => (
        <Table.Head header={header}>Ultima atualização</Table.Head>
      ),
      cell: ({ cell, getValue }) => (
        <Table.Cell cell={cell}>
          <div className="text-center text-sm">
            {format(getValue(), 'dd/MM/yyyy - HH:mm')}
          </div>
        </Table.Cell>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      header: ({ header }) => <Table.Head header={header}></Table.Head>,
      cell: ({ cell, row }) => (
        <Table.Cell cell={cell}>
          <div className="flex items-center justify-end gap-2">
            {/* <Button.Root
              size="icon"
              className="bg-yellow-500 hover:bg-yellow-500/90"
            >
              <Edit className="size-4" />
            </Button.Root> */}

            <Dialog.Root>
              <Dialog.Trigger asChild>
                <Button.Root size="icon" variant="destructive">
                  <Trash className="size-4" />
                </Button.Root>
              </Dialog.Trigger>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>
                    Tem certeza que deseja excluir esse parceiro?
                  </Dialog.Title>
                  <Dialog.Description>
                    Ao confirmar a exclusão você não poderá recuperar os dados
                    do parceiro. Parceiro a ser deletado{' '}
                    <Badge.Root>{row.original.name}</Badge.Root>
                  </Dialog.Description>
                </Dialog.Header>

                <Dialog.Footer>
                  <Button.Root size="sm" variant="ghost">
                    Fechar
                  </Button.Root>

                  <Button.Root
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDeletePartner({ id: row.original.id })}
                  >
                    Sim, excluir
                  </Button.Root>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Root>
          </div>
        </Table.Cell>
      ),
    }),
  ]

  const { name, picture } = watch()
  const [imagePreview] = useImagePreview(picture)

  const handleCreateSafeURL = () => {
    if (!name) return

    const pathname = name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9]/g, '-')
      .toLowerCase()

    setValue('slug', pathname)
  }

  const uploadFile = async (file: File[]): Promise<string> => {
    if (!file) return ''

    const formData = new FormData()
    formData.append('file', file[0])

    const fileURL = await upload.create(formData)

    return fileURL
  }

  const onSubmit: SubmitHandler<PartnerData> = async (data) => {
    const { picture, ...dataWithoutFile } = data

    const picturePath = await uploadFile(picture)

    handleCreatePartner(
      {
        ...dataWithoutFile,
        picture: picturePath,
      },
      {
        onSuccess: () => {
          reset()
          refetch()
          setShowDialog(false)
          toast.success('Parceiro adicionado')
        },
      },
    )
  }

  const onDrop = useCallback((acceptedFiles: FileList | File[] | null) => {
    setValue('picture', acceptedFiles)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  })

  return (
    <>
      <div className="mb-4">
        <Button.Root size="sm" onClick={() => setShowDialog(true)}>
          <Plus className="me-2 size-5" />
          Novo parceiro
        </Button.Root>
      </div>

      <Table.Root className="overflow-x-auto bg-white">
        <Table.Content
          columns={columns}
          data={data ?? []}
          emptyMessageComponent={() => (
            <Table.EmptyMessage>
              <div className="p-4 text-center">
                <p className="mb-2">Nenhum serviço encontrado</p>
              </div>
            </Table.EmptyMessage>
          )}
        />
      </Table.Root>

      <Dialog.Root open={showDialog} onOpenChange={setShowDialog}>
        <Dialog.Content className="w-full max-w-xl">
          <Dialog.Header>
            <Dialog.Title>Adicionar novo parceiro</Dialog.Title>
            <Dialog.Description />
          </Dialog.Header>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex items-start gap-4"
          >
            <div
              {...getRootProps()}
              className="flex h-40 w-52 cursor-pointer items-center justify-center overflow-hidden rounded-md border-2 border-dashed transition-colors hover:border-foreground hover:text-zinc-500"
            >
              {!imagePreview && (
                <div className="flex flex-col items-center justify-center space-y-1">
                  <FaRegImage className="size-10" />
                  <p className="text-center text-sm">
                    Arraste e solte sua imagem aqui
                  </p>
                  <p className="text-center text-xs">
                    A imagem deve ter no máximo 10MB.
                  </p>
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

            <div className="flex-1 space-y-4">
              <div className="space-y-0.5">
                <Label.Root htmlFor="name">Parceiro</Label.Root>

                <Input.Root
                  id="name"
                  {...register('name')}
                  placeholder="Ex: Nanofy Tecnologia"
                />
              </div>

              <div className="space-y-0.5">
                <Label.Root htmlFor="url" className="flex items-center gap-2">
                  URL amigável
                  <Tooltip.Provider>
                    <Tooltip.Root>
                      <Tooltip.Trigger type="button">
                        <Info className="size-4" />
                      </Tooltip.Trigger>
                      <Tooltip.Content>
                        Esse é o caminho para simplificar a URL do serviço.
                        Exemplo da URL com a opção{' '}
                        {"'/parceiros/decoracoes-para-festa'"}
                      </Tooltip.Content>
                    </Tooltip.Root>
                  </Tooltip.Provider>
                </Label.Root>

                <div className="relative flex items-center">
                  <Input.Root
                    id="url"
                    {...register('slug')}
                    placeholder="Ex: nanofy-tecnologia"
                  />

                  <Button.Root
                    size="icon"
                    variant="ghost"
                    className="absolute right-2"
                    onClick={() => handleCreateSafeURL()}
                  >
                    <Link className="size-4" />
                  </Button.Root>
                </div>
              </div>

              <Dialog.Footer>
                <Dialog.Close asChild>
                  <Button.Root size="sm" variant="ghost">
                    Fechar
                  </Button.Root>
                </Dialog.Close>

                <Button.Root type="submit" size="sm">
                  Adicionar parceiro
                </Button.Root>
              </Dialog.Footer>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Root>
    </>
  )
}
