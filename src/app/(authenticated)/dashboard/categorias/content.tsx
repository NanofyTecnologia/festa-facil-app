'use client'

import { useState } from 'react'
import { toast } from 'react-toastify'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Info, Link, Plus, Trash } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { createColumnHelper } from '@tanstack/react-table'

import { Table } from '@/components/ui/table'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { Tooltip } from '@/components/ui/tooltip'

import { Category } from '@/services/categories/types'
import { useGetCategories } from '@/hooks/use-get-categories'

import { CategoryData, categorySchema } from './schema'
import { useCreateCategory } from './hooks/use-create-category'
import { useDeleteCategory } from './hooks/use-delete-category'

export default function Content() {
  const { data, queryKey, refetch } = useGetCategories()
  const { mutate: handleCreateCategory } = useCreateCategory()
  const { mutate: handleDeleteCategory } = useDeleteCategory({ queryKey })

  const [showDialog, setShowDialog] = useState(false)
  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryData>({
    resolver: zodResolver(categorySchema),
  })

  const { name } = watch()

  const columnHelper = createColumnHelper<Category>()

  const columns = [
    columnHelper.accessor('id', {
      header: ({ header }) => (
        <Table.Head className="p-2 text-start" header={header}>
          #
        </Table.Head>
      ),
      cell: ({ cell, getValue }) => (
        <Table.Cell cell={cell}>
          <div className="text-start text-sm">{getValue()}</div>
        </Table.Cell>
      ),
    }),
    columnHelper.accessor('name', {
      header: ({ header }) => (
        <Table.Head className="p-2 text-start" header={header}>
          Categoria
        </Table.Head>
      ),
      cell: ({ cell, getValue }) => (
        <Table.Cell cell={cell}>
          <div className="text-start text-sm">{getValue()}</div>
        </Table.Cell>
      ),
    }),
    columnHelper.accessor('slug', {
      header: ({ header }) => (
        <Table.Head className="p-2 text-start" header={header}>
          URL
        </Table.Head>
      ),
      cell: ({ cell, getValue }) => (
        <Table.Cell cell={cell}>
          <div className="text-start text-sm">{getValue()}</div>
        </Table.Cell>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      header: ({ header }) => <Table.Head header={header}></Table.Head>,
      cell: ({ cell, row }) => (
        <Table.Cell cell={cell}>
          <div className="flex items-center gap-2">
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <Button.Root size="icon" variant="destructive">
                  <Trash className="size-4" />
                </Button.Root>
              </Dialog.Trigger>

              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>
                    Deseja realmente excluir essa categoria?
                  </Dialog.Title>
                  <Dialog.Description>
                    {row.original._count.offering > 0 ? (
                      <>
                        Essa categoria possui{' '}
                        <Badge.Root>{row.original._count.offering}</Badge.Root>{' '}
                        serviços cadastrados. Você não poderá remove-la enquanto
                        não excluir ou editar esses serviços.
                      </>
                    ) : (
                      'Cuidado! Ao deletar a categoria a mesma não poderá ser recuperada.'
                    )}
                  </Dialog.Description>
                </Dialog.Header>

                <Dialog.Footer>
                  <Dialog.Close asChild>
                    <Button.Root size="sm" variant="ghost">
                      Cancelar
                    </Button.Root>
                  </Dialog.Close>

                  <Button.Root
                    size="sm"
                    variant="destructive"
                    onClick={() =>
                      handleDeleteCategory({ id: row.original.id })
                    }
                    disabled={row.original._count.offering > 0}
                  >
                    Sim, deletar
                  </Button.Root>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Root>
          </div>
        </Table.Cell>
      ),
    }),
  ]

  const handleCreateSafeURL = () => {
    if (!name) return

    const pathname = name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9]/g, '-')
      .toLowerCase()

    setValue('slug', pathname)
  }

  const onSubmit: SubmitHandler<CategoryData> = (data) => {
    const handleCreateCategoryPromise = new Promise((resolve, reject) => {
      handleCreateCategory(
        {
          ...data,
        },
        {
          onSuccess: (data) => {
            refetch()
            setShowDialog(false)
            resolve(data)
          },
          onError: (error) => reject(error),
        },
      )
    })

    toast.promise(handleCreateCategoryPromise, {
      error: 'Ops! Algo deu errado. Tente novamente',
      success: 'Categoria adicionada com sucesso!',
      pending: 'Adicionando categoria...',
    })
  }

  return (
    <>
      <div className="mb-4">
        <Button.Root size="sm" onClick={() => setShowDialog(true)}>
          <Plus className="me-2 size-5" /> Nova categoria
        </Button.Root>
      </div>

      <Table.Root className="overflow-x-auto bg-white">
        <Table.Content
          columns={columns}
          data={data ?? []}
          emptyMessageComponent={() => (
            <Table.EmptyMessage>
              <div className="p-4 text-center">
                <p className="mb-2">Nenhuma categoria encontrada</p>
              </div>
            </Table.EmptyMessage>
          )}
        />
      </Table.Root>

      <Dialog.Root open={showDialog} onOpenChange={setShowDialog}>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Adicionar categoria</Dialog.Title>
            <Dialog.Description />
          </Dialog.Header>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-0.5">
              <Label.Root htmlFor="name">Categoria</Label.Root>

              <Input.Root
                id="name"
                {...register('name')}
                data-error={!!errors.name}
                placeholder="Ex: Decoração"
                className="data-[error=true]:border-red-500 data-[error=true]:focus-visible:ring-0"
              />
            </div>

            <div className="space-y-0.5">
              <Label.Root htmlFor="slug" className="flex items-center gap-1">
                URL amigável
                <Tooltip.Provider>
                  <Tooltip.Root>
                    <Tooltip.Trigger type="button">
                      <Info className="size-4" />
                    </Tooltip.Trigger>
                    <Tooltip.Content>
                      Esse é o caminho para simplificar a URL da categoria.
                      Exemplo da URL com a opção {"'/categorias/decoracao'"}
                    </Tooltip.Content>
                  </Tooltip.Root>
                </Tooltip.Provider>
              </Label.Root>

              <div className="relative flex items-center">
                <Input.Root
                  id="slug"
                  {...register('slug')}
                  data-error={!!errors.name}
                  placeholder="Ex: decoracao"
                  className="pr-12 data-[error=true]:border-red-500"
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

            <div className="flex items-center justify-end gap-4">
              <Dialog.Close asChild>
                <Button.Root variant="ghost" size="sm">
                  Cancelar
                </Button.Root>
              </Dialog.Close>

              <Button.Root type="submit">Adicionar</Button.Root>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Root>
    </>
  )
}
