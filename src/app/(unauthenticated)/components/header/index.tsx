'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  List,
  Menu,
  LogOut,
  Settings,
  ChartArea,
  ChevronDown,
} from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'

import { Navbar } from '@/components/navbar'
import { Sheet } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { Dropdown } from '@/components/ui/dropdown'

import Form from './form'

export default function Header() {
  const { data } = useSession()

  const [open, setOpen] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const roleIsSupplier = data?.user.role === 'SUPPLIER'

  return (
    <>
      <header className="mx-auto flex max-w-7xl flex-col p-4 sm:p-0">
        <div className="hidden justify-end space-x-2 pt-2 sm:flex">
          {!data?.user && (
            <Button.Root
              size="sm"
              variant="link"
              className="px-0"
              onClick={() => setShowModal(true)}
            >
              Entrar / Cadastrar
            </Button.Root>
          )}

          {data?.user && (
            <Dropdown.Root>
              <Dropdown.Trigger asChild>
                <Button.Root variant="link" className="px-0">
                  Minha conta <ChevronDown className="size-4" />
                </Button.Root>
              </Dropdown.Trigger>
              <Dropdown.Content>
                <Dropdown.Label>Conta</Dropdown.Label>
                <Dropdown.Separator />

                <Dropdown.Item className="cursor-pointer" asChild>
                  <Link href="/conta/configuracoes">
                    <Settings className="me-1 size-4" /> Configurações
                  </Link>
                </Dropdown.Item>

                <Dropdown.Separator />

                <Dropdown.Item
                  disabled={!roleIsSupplier}
                  className="cursor-pointer"
                  asChild
                >
                  <Link href="/area-fornecedor/meus-servicos">
                    <List className="me-1 size-4" /> Meus serviços
                  </Link>
                </Dropdown.Item>

                <Dropdown.Item
                  disabled={!roleIsSupplier}
                  className="cursor-pointer"
                  asChild
                >
                  <Link href="/area-fornecedor">
                    <ChartArea className="me-1 size-4" /> Área de Fornecedor
                  </Link>
                </Dropdown.Item>

                <Dropdown.Separator />

                <Dropdown.Item onClick={() => signOut()}>
                  <LogOut className="me-1 size-4" /> Desconectar
                </Dropdown.Item>
              </Dropdown.Content>
            </Dropdown.Root>
          )}
        </div>

        <div className="flex items-center">
          <h1 className="text-2xl font-semibold">Company Name</h1>

          <Navbar.Root className="hidden sm:flex">
            <Navbar.Link href="/">Inicio</Navbar.Link>

            <Navbar.Link href="/fornecedores">Fornecedores</Navbar.Link>

            <Navbar.Link href="/sobre">Sobre</Navbar.Link>

            <Navbar.Link href="/contato">Entre em contato</Navbar.Link>
          </Navbar.Root>

          <div className="ms-auto block sm:hidden">
            <Button.Root
              onClick={() => setOpen(true)}
              variant="secondary"
              type="button"
              size="icon"
            >
              <Menu className="size-6" />
            </Button.Root>
          </div>
        </div>
      </header>

      <div className="">
        <Sheet.Root open={open} onOpenChange={setOpen}>
          <Sheet.Content side="left">
            <Sheet.Header>
              <Sheet.Title>Company Name</Sheet.Title>
            </Sheet.Header>
          </Sheet.Content>
        </Sheet.Root>
      </div>

      <Dialog.Root open={showModal} onOpenChange={setShowModal}>
        <Dialog.Content className="max-w-sm">
          <Dialog.Header>
            <Dialog.Title>Acessar / Cadastrar conta</Dialog.Title>
          </Dialog.Header>

          <Form />
        </Dialog.Content>
      </Dialog.Root>
    </>
  )
}
