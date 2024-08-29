'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu } from 'lucide-react'

import { Navbar } from '@/components/navbar'
import { Sheet } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="mx-auto flex max-w-7xl flex-col p-4 sm:p-0">
        <div className="hidden justify-end space-x-2 pt-2 sm:flex">
          {/* <Button.Root className="px-0" size="sm" variant="link" asChild>
            <Link href="/login">Entrar / Cadastrar</Link>
          </Button.Root> */}

          <Button.Root className="px-0" size="sm" variant="link" asChild>
            <Link href="/area-fornecedor">Área do fornecedor</Link>
          </Button.Root>
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
    </>
  )
}
