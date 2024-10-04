'use client'

import NextLink from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { Fragment, useState } from 'react'
import {
  Menu,
  LogOut,
  Settings,
  MoveRight,
  ChartArea,
  ChevronDown,
} from 'lucide-react'

import Link from './link'

import { Sheet } from '@/components/ui/sheet'
import { Dialog } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Dropdown } from '@/components/ui/dropdown'
import { Accordion } from '@/components/ui/accordion'

import { useGetCategories } from '@/hooks/use-get-categories'

import SignIn from '../sign-in'

export default function Header() {
  const { data } = useSession()

  const [showDialog, setShowDialog] = useState(false)
  const [showSideMenu, setShowSideMenu] = useState(false)

  const { data: categories } = useGetCategories()

  const isAuthenticated = !!data?.user.id

  return (
    <>
      <header className="border-b">
        <nav className="mx-auto flex max-w-full justify-between px-4 py-4 md:hidden">
          <h1 className="text-2xl font-semibold">Festa Fácil</h1>

          <Button.Root
            size="icon"
            variant="secondary"
            onClick={() => setShowSideMenu(true)}
          >
            <Menu />
          </Button.Root>
        </nav>

        <div className="mx-auto hidden h-[68px] max-w-7xl justify-between px-4 py-4 md:flex 2xl:px-0">
          <h1 className="text-2xl font-semibold">Festa Fácil</h1>

          <nav className="flex items-center gap-4 text-zinc-500">
            <Link
              href="/"
              className="block rounded p-2 font-medium transition-all hover:bg-secondary hover:text-black"
            >
              Inicio
            </Link>

            <Link
              href="#"
              className="block rounded p-2 font-medium transition-all hover:bg-secondary hover:text-black"
            >
              Fornecedores
            </Link>

            <Link
              href="#"
              className="block rounded p-2 font-medium transition-all hover:bg-secondary hover:text-black"
            >
              Sobre
            </Link>

            <Link
              href="#"
              className="block rounded p-2 font-medium transition-all hover:bg-secondary hover:text-black"
            >
              Entre em contato
            </Link>

            <div className="ms-6">
              {!isAuthenticated && (
                <Button.Root
                  variant="outline"
                  onClick={() => setShowDialog(true)}
                  className="rounded p-2 px-4 font-medium text-zinc-500 transition-all hover:bg-secondary"
                >
                  Entrar
                </Button.Root>
              )}

              {isAuthenticated && (
                <Dropdown.Root>
                  <Dropdown.Trigger asChild>
                    <Button.Root
                      variant="link"
                      className="px-0 text-base text-zinc-600"
                    >
                      Minha conta
                      <ChevronDown className="ms-1 size-4" />
                    </Button.Root>
                  </Dropdown.Trigger>
                  <Dropdown.Content className="w-full max-w-sm">
                    <Dropdown.Label>Conta</Dropdown.Label>
                    <Dropdown.Separator />
                    <Dropdown.Item asChild>
                      <NextLink href="/conta/configuracoes">
                        <Settings className="me-2 size-4" /> Configurações
                      </NextLink>
                    </Dropdown.Item>
                    <Dropdown.Item asChild>
                      <NextLink href="/dashboard">
                        <ChartArea className="me-2 size-4" /> Área do Fornecedor
                      </NextLink>
                    </Dropdown.Item>
                    <Dropdown.Separator />
                    <Dropdown.Item onClick={() => signOut()}>
                      <LogOut className="me-2 size-4" /> Desconectar
                    </Dropdown.Item>
                  </Dropdown.Content>
                </Dropdown.Root>
              )}
            </div>
          </nav>
        </div>
      </header>

      <Sheet.Root open={showSideMenu} onOpenChange={setShowSideMenu}>
        <Sheet.Content
          side="left"
          className="flex flex-col"
          aria-describedby="opened sidebar menu"
        >
          <Sheet.Header>
            <Sheet.Title className="text-2xl font-semibold">
              Festa Fácil
            </Sheet.Title>
            <Sheet.Description />
          </Sheet.Header>

          <div className="h-full space-y-0.5">
            {!isAuthenticated && (
              <Button.Root
                asChild
                variant="link"
                onClick={() => {
                  setShowDialog(true)
                  setShowSideMenu(false)
                }}
                className="w-full justify-start rounded p-2 text-base font-normal text-zinc-500 hover:bg-secondary hover:no-underline"
              >
                <Link href="#">Entrar</Link>
              </Button.Root>
            )}

            <Accordion.Root type="single" collapsible>
              {isAuthenticated && (
                <Accordion.Item value="account" className="border-0">
                  <Accordion.Trigger className="rounded p-2 text-base font-normal text-zinc-500 hover:bg-secondary hover:no-underline">
                    Minha conta
                  </Accordion.Trigger>
                  <Accordion.Content>
                    <ul className="mt-2 space-y-1 pl-4 text-base text-zinc-500">
                      <li>
                        <Link
                          href="#"
                          className="flex items-center justify-between rounded px-2 py-2 hover:bg-secondary hover:no-underline"
                        >
                          Configurações
                          <MoveRight className="size-4" />
                        </Link>
                      </li>

                      <li>
                        <Link
                          href="/dashboard"
                          className="flex items-center justify-between rounded px-2 py-2 hover:bg-secondary hover:no-underline"
                        >
                          Área do Fornecedor
                          <MoveRight className="size-4" />
                        </Link>
                      </li>
                    </ul>
                  </Accordion.Content>
                </Accordion.Item>
              )}

              <Accordion.Item value="categories" className="border-0">
                <Accordion.Trigger className="rounded p-2 text-base font-normal text-zinc-500 hover:bg-secondary hover:no-underline">
                  Ver categorias
                </Accordion.Trigger>
                <Accordion.Content>
                  <ul className="mt-2 space-y-1 pl-4 text-base text-zinc-500">
                    {categories?.map((category) => (
                      <Fragment key={category.id}>
                        <li>
                          <Link
                            href={`/categoria/${category.slug}`}
                            className="flex items-center justify-between rounded px-2 py-2 hover:bg-secondary hover:no-underline"
                          >
                            {category.name}
                            <MoveRight className="size-4" />
                          </Link>
                        </li>
                      </Fragment>
                    ))}
                  </ul>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>

            <Button.Root
              asChild
              variant="link"
              className="w-full justify-start rounded p-2 text-base font-normal text-zinc-500 hover:bg-secondary hover:no-underline"
            >
              <Link href="#">Fornecedores</Link>
            </Button.Root>

            <Button.Root
              asChild
              variant="link"
              className="w-full justify-start rounded p-2 text-base font-normal text-zinc-500 hover:bg-secondary hover:no-underline"
            >
              <Link href="#">Sobre</Link>
            </Button.Root>

            <Button.Root
              asChild
              variant="link"
              className="w-full justify-start rounded p-2 text-base font-normal text-zinc-500 hover:bg-secondary hover:no-underline"
            >
              <Link href="#">Entre em contato</Link>
            </Button.Root>
          </div>

          {isAuthenticated && (
            <Button.Root
              className="w-full"
              variant="destructive"
              onClick={() => signOut()}
            >
              Desconectar
            </Button.Root>
          )}
        </Sheet.Content>
      </Sheet.Root>

      <Dialog.Root open={showDialog} onOpenChange={setShowDialog}>
        <Dialog.Content className="flex h-full max-w-2xl flex-col justify-start sm:h-auto sm:max-w-md">
          <Dialog.Header>
            <Dialog.Title>Acessar conta</Dialog.Title>
            <Dialog.Description>
              Acesse sua conta na plataforma da Festa Fácil ou crie uma nova
            </Dialog.Description>
          </Dialog.Header>

          <SignIn />
        </Dialog.Content>
      </Dialog.Root>
    </>
  )
}
