'use client'

import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { Check, X } from 'lucide-react'
import { createColumnHelper } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { Table } from '@/components/ui/table'
import { Dialog } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

import { Offering } from '@/services/offerings/types'

import { useGetOfferingsToModerate } from './hooks/use-get-offerings-to-moderate'
import { useUpdateOfferingAdmin } from './hooks/use-update-offering-admin'

export default function Content() {
  const { data, refetch } = useGetOfferingsToModerate()
  const { mutate: handleUpdateOffering } = useUpdateOfferingAdmin()

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
    columnHelper.accessor('email', {
      header: ({ header }) => <Table.Head header={header}>E-mail</Table.Head>,
      cell: ({ cell, getValue }) => (
        <Table.Cell cell={cell}>
          <div className="text-center text-sm">{getValue()}</div>
        </Table.Cell>
      ),
      size: 256,
    }),
    columnHelper.accessor('banner', {
      header: ({ header }) => <Table.Head header={header}>Banner</Table.Head>,
      cell: ({ cell, getValue, row }) => (
        <Table.Cell cell={cell}>
          <div className="flex justify-center text-center text-sm">
            <Dialog.Root>
              <Dialog.Trigger>
                <Image
                  width={64}
                  height={64}
                  src={getValue()}
                  className="rounded-md"
                  alt=""
                />
              </Dialog.Trigger>
              <Dialog.Content className="w-full max-w-4xl">
                <Dialog.Header>
                  <Dialog.Title className="font-medium">
                    Foto de:{' '}
                    <span className="font-bold">{row.original.name}</span>
                  </Dialog.Title>
                </Dialog.Header>
                <div className="pt-4">
                  <Image
                    width={1280}
                    height={720}
                    src={getValue()}
                    className="rounded-md"
                    alt=""
                  />
                </div>

                <Dialog.Footer>
                  <Dialog.Close asChild>
                    <Button.Root>Fechar</Button.Root>
                  </Dialog.Close>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Root>
          </div>
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
            <div className="flex items-center justify-end gap-4">
              <Button.Root
                size="icon"
                onClick={() => {
                  handleUpdateOffering(
                    {
                      id: row.original.id,
                      status: 'APPROVED',
                    },
                    {
                      onSuccess: () => {
                        refetch()
                      },
                    },
                  )
                }}
                className="rounded-md bg-green-500 hover:bg-green-500/90"
              >
                <Check className="size-5" />
              </Button.Root>

              <Button.Root
                size="icon"
                onClick={() => {
                  handleUpdateOffering(
                    {
                      id: row.original.id,
                      status: 'REFUSED',
                    },
                    {
                      onSuccess: () => {
                        refetch()
                      },
                    },
                  )
                }}
                className="rounded-md bg-red-500 hover:bg-red-500/90"
              >
                <X className="size-5" />
              </Button.Root>
            </div>
          </Table.Cell>
        )
      },
    }),
  ]

  return (
    <>
      <Table.Root className="overflow-x-auto bg-white">
        <Table.Content
          columns={columns}
          data={data ?? []}
          emptyMessageComponent={() => (
            <Table.EmptyMessage>
              <div className="p-4 text-center">
                <p>Nenhum serviço encontrado</p>
              </div>
            </Table.EmptyMessage>
          )}
        />
      </Table.Root>
    </>
  )
}
