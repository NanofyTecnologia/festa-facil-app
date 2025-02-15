'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Pencil, UserPlus } from 'lucide-react'
import { createColumnHelper } from '@tanstack/react-table'

import { Table } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { UserPreview } from '@/services/user/types'

import { useGetUsers } from '../hooks/use-get-users'

export default function Content() {
  const { data: session } = useSession()

  const { data: users, isLoading } = useGetUsers({
    userId: session?.user.id ?? '',
  })

  const columnHelper = createColumnHelper<UserPreview>()

  const columns = [
    columnHelper.accessor('name', {
      header: ({ header }) => (
        <Table.Head header={header} className="text-start">
          Nome
        </Table.Head>
      ),
      cell: ({ cell, getValue }) => (
        <Table.Cell cell={cell} className="px-4 py-2.5 text-sm">
          {getValue()}
        </Table.Cell>
      ),
    }),
    columnHelper.accessor('cpf', {
      header: ({ header }) => (
        <Table.Head header={header} className="text-start">
          CPF
        </Table.Head>
      ),
      cell: ({ cell, getValue }) => (
        <Table.Cell cell={cell} className="px-4 py-2.5 text-sm">
          {getValue()}
        </Table.Cell>
      ),
    }),
    columnHelper.accessor('email', {
      header: ({ header }) => (
        <Table.Head header={header} className="text-start">
          E-mail
        </Table.Head>
      ),
      cell: ({ cell, getValue }) => (
        <Table.Cell cell={cell} className="px-4 py-2.5 text-sm">
          {getValue()}
        </Table.Cell>
      ),
    }),
    columnHelper.accessor('role', {
      header: ({ header }) => (
        <Table.Head header={header} className="text-start">
          Cargo
        </Table.Head>
      ),
      cell: ({ cell, getValue }) => (
        <Table.Cell cell={cell} className="px-4 py-2.5 text-sm">
          {getValue() === 'ADMIN'
            ? 'Administrador'
            : getValue() === 'CUSTOMER'
              ? 'Cliente'
              : 'Fornecedor'}
        </Table.Cell>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      header: ({ header }) => <Table.Head header={header} />,
      cell: ({ cell, row }) => (
        <Table.Cell cell={cell} className="px-4 py-2.5 text-sm">
          <div className="flex items-center gap-2">
            <Button.Root
              asChild
              size="icon"
              variant="outline"
              className="h-8 w-8 rounded-md"
            >
              <Link href={`/dashboard/usuarios/${row.original.id}/editar`}>
                <Pencil className="size-4" />
              </Link>
            </Button.Root>
          </div>
        </Table.Cell>
      ),
    }),
  ]

  return (
    <>
      <div className="mt-6 space-y-6">
        <Button.Root size="sm" asChild>
          <Link href="/dashboard/usuarios/criar">
            <UserPlus className="me-2 size-4" /> Adicionar usuários
          </Link>
        </Button.Root>

        <Table.Root>
          <Table.Content
            data={users ?? []}
            columns={columns}
            emptyMessageComponent={() => (
              <Table.EmptyMessage className="p-4 text-center">
                {isLoading ? 'Carregando...' : 'Usuários não encontrado.'}
              </Table.EmptyMessage>
            )}
          />
        </Table.Root>
      </div>
    </>
  )
}
