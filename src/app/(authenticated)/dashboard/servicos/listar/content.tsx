'use client'

import Link from 'next/link'
import { format } from 'date-fns'
import { Edit, Plus, Trash } from 'lucide-react'
import { createColumnHelper } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { Table } from '@/components/ui/table'
import { Dialog } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

import { Offering } from '@/services/offerings/types'

import { useDeleteOffer } from './hooks/use-delete-offer'
import { useGetOfferingsByUserId } from './hooks/use-get-offerings-by-user-id'

export default function Content() {
  const { data, queryKey } = useGetOfferingsByUserId()
  const { mutate: handleDeleteOffer } = useDeleteOffer({ queryKey })

  const columnHelper = createColumnHelper<Offering>()

  const columns = [
    columnHelper.accessor('name', {
      header: ({ header }) => (
        <Table.Head header={header}>Nome do serviço</Table.Head>
      ),
      cell: ({ cell, getValue }) => (
        <Table.Cell cell={cell}>
          <div className="text-center text-sm">{getValue()}</div>
        </Table.Cell>
      ),
    }),
    columnHelper.accessor('phone', {
      header: ({ header }) => <Table.Head header={header}>Telefone</Table.Head>,
      cell: ({ cell, getValue }) => (
        <Table.Cell cell={cell}>
          <div className="text-center text-sm">{getValue()}</div>
        </Table.Cell>
      ),
    }),
    columnHelper.accessor('email', {
      header: ({ header }) => <Table.Head header={header}>E-mail</Table.Head>,
      cell: ({ cell, getValue }) => (
        <Table.Cell cell={cell}>
          <div className="text-center text-sm">{getValue()}</div>
        </Table.Cell>
      ),
      size: 256,
    }),
    columnHelper.accessor('category.name', {
      header: ({ header }) => (
        <Table.Head header={header}>Categoria</Table.Head>
      ),
      cell: ({ row, cell, getValue }) => (
        <Table.Cell cell={cell}>
          <div className="flex justify-center text-sm">
            <Link href={`/categoria/${row.original.category.slug}`}>
              <Badge.Root>{getValue()}</Badge.Root>
            </Link>
          </div>
        </Table.Cell>
      ),
    }),
    columnHelper.accessor('cep', {
      header: ({ header }) => <Table.Head header={header}>CEP</Table.Head>,
      cell: ({ cell, getValue }) => (
        <Table.Cell cell={cell}>
          <div className="text-center text-sm">{getValue()}</div>
        </Table.Cell>
      ),
    }),
    columnHelper.accessor('rating', {
      header: ({ header }) => (
        <Table.Head header={header}>Avaliação</Table.Head>
      ),
      cell: ({ cell, getValue }) => (
        <Table.Cell cell={cell}>
          <div className="text-center text-sm">{getValue()}</div>
        </Table.Cell>
      ),
    }),
    columnHelper.accessor('slug', {
      header: ({ header }) => <Table.Head header={header}>URL</Table.Head>,
      cell: ({ cell, getValue }) => (
        <Table.Cell cell={cell}>
          <div className="flex justify-center text-sm">
            <Link href={`/servico/${getValue()}`}>
              <Badge.Root>{getValue()}</Badge.Root>
            </Link>
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
            {format(getValue(), 'dd/MM/yyyy HH:mm')}
          </div>
        </Table.Cell>
      ),
    }),
    columnHelper.accessor('updatedAt', {
      header: ({ header }) => (
        <Table.Head header={header}>Atualizado em</Table.Head>
      ),
      cell: ({ cell, getValue }) => (
        <Table.Cell cell={cell}>
          <div className="text-center text-sm">
            {format(getValue(), 'dd/MM/yyyy HH:mm')}
          </div>
        </Table.Cell>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      header: ({ header }) => <Table.Head header={header}></Table.Head>,
      cell: ({ cell, row }) => {
        return (
          <Table.Cell cell={cell}>
            <div className="flex items-center justify-end gap-2">
              <Button.Root
                asChild
                size="icon"
                className="bg-yellow-500 hover:bg-yellow-500/90"
              >
                <Link href={`/dashboard/servicos/${row.original.id}/editar`}>
                  <Edit className="size-4" />
                </Link>
              </Button.Root>

              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <Button.Root size="icon" variant="destructive">
                    <Trash className="size-4" />
                  </Button.Root>
                </Dialog.Trigger>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>
                      Tem certeza que deseja excluir esse serviço?
                    </Dialog.Title>
                    <Dialog.Description>
                      Ao excluir um serviço o mesmo não poderá ser recuperado!
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
                      onClick={() => handleDeleteOffer({ id: row.original.id })}
                    >
                      Excluir
                    </Button.Root>
                  </Dialog.Footer>
                </Dialog.Content>
              </Dialog.Root>
            </div>
          </Table.Cell>
        )
      },
    }),
  ]

  return (
    <>
      <div className="mb-4">
        <Button.Root size="sm" variant="outline" asChild>
          <Link href="/dashboard/servicos/criar">
            <Plus className="me-2 size-5" />
            Novo serviço
          </Link>
        </Button.Root>
      </div>

      <Table.Root>
        <Table.Content
          columns={columns}
          data={data ?? []}
          emptyMessageComponent={() => (
            <Table.EmptyMessage>
              <div className="p-4 text-center">
                <p className="mb-2">Nenhum serviço encontrado</p>

                <Link
                  href="/dashboard/servicos/criar"
                  className="text-sm text-zinc-500 hover:underline"
                >
                  Criar novo serviço
                </Link>
              </div>
            </Table.EmptyMessage>
          )}
        />
      </Table.Root>
    </>
  )
}
