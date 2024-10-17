'use client'

import { Plus } from 'lucide-react'
import { createColumnHelper } from '@tanstack/react-table'

import { Table } from '@/components/ui/table'
import { Button } from '@/components/ui/button'

import { Category } from '@/services/categories/types'
import { useGetCategories } from '@/hooks/use-get-categories'

export default function Content() {
  const { data } = useGetCategories()

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
  ]

  return (
    <>
      <div className="mb-4">
        <Button.Root size="sm">
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
    </>
  )
}
