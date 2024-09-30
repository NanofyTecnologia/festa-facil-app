'use client'

import { Table } from '@/components/ui/table'

import { createColumnHelper } from '@tanstack/react-table'

import { useGetOfferingsByUserId } from './hooks/use-get-offerings-by-user-id'
import { Offering } from '@/services/offerings/types'

export default function Content() {
  const { data } = useGetOfferingsByUserId()

  const columnHelper = createColumnHelper<Offering>()

  const columns = [
    columnHelper.accessor('name', {
      header: ({ header }) => (
        <Table.Head header={header}>Nome do serviço</Table.Head>
      ),
      cell: ({ cell, getValue }) => (
        <Table.Cell cell={cell}>{getValue()}</Table.Cell>
      ),
    }),
  ]

  console.log(data)

  return (
    <>
      <Table.Root>
        <Table.Content columns={columns} data={data ?? []} />
      </Table.Root>
    </>
  )
}
