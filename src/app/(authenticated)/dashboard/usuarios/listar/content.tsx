'use client'

import Link from 'next/link'

import { Pencil, Trash, UserPlus } from 'lucide-react'

import { createColumnHelper } from '@tanstack/react-table'
import { AxiosError } from 'axios'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'

import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { Table } from '@/components/ui/table'
import { UserPreview } from '@/services/user/types'

import { useGetUsers } from '../hooks/use-get-users'
import { useDeleteUser } from './hooks/use-delete-user'

export default function Content() {
  const { data: session } = useSession()

  const { data: users, isLoading } = useGetUsers({
    userId: session?.user.id ?? '',
  })
  const { mutate: handleDeleteUser, isPending } = useDeleteUser()

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
            <Button.Root asChild size="icon" className="h-8 w-8 rounded-md">
              <Link href={`/dashboard/usuarios/${row.original.id}/editar`}>
                <Pencil className="size-4" />
              </Link>
            </Button.Root>

            <Dialog.Root>
              <Dialog.Trigger asChild>
                <Button.Root
                  size="icon"
                  variant="destructive"
                  className="h-8 w-8 rounded-md"
                >
                  <Trash className="size-4" />
                </Button.Root>
              </Dialog.Trigger>

              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>
                    Deseja realmente excluir esse usuário?
                  </Dialog.Title>

                  <Dialog.Description>
                    Atenção! Ao excluir o usuário não poderá ser recuperado.
                  </Dialog.Description>
                </Dialog.Header>

                <Dialog.Footer>
                  <Dialog.Close asChild>
                    <Button.Root variant="secondary" className="h-10">
                      Cancelar
                    </Button.Root>
                  </Dialog.Close>

                  <Button.Root
                    className="h-10"
                    variant="destructive"
                    onClick={() => {
                      handleDeleteUser(
                        { id: row.original.id },
                        {
                          onSuccess: () => {
                            console.log('sucess')
                            toast.success('Usuário deletado com sucesso.')
                          },
                          onError: (error) => {
                            if (error instanceof AxiosError) {
                              toast.error(error.response?.data.message)
                            }
                          },
                        },
                      )
                    }}
                  >
                    {isPending ? 'Excluindo...' : 'Sim, excluir!'}
                  </Button.Root>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Root>
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
