import Link from 'next/link'

import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'

export default function Header() {
  return (
    <>
      <header className="mx-auto flex max-w-7xl flex-col">
        <div className="flex justify-end space-x-2 pt-2">
          <Button.Root className="px-0" size="sm" variant="link" asChild>
            <Link href="/login">Entrar / Cadastrar</Link>
          </Button.Root>
        </div>

        <div className="flex items-center">
          <h1 className="text-2xl font-semibold">Company Name</h1>

          <Navbar.Root>
            <Navbar.Link href="/">Inicio</Navbar.Link>

            <Navbar.Link href="/fornecedores">Fornecedores</Navbar.Link>

            <Navbar.Link href="/sobre">Sobre</Navbar.Link>

            <Navbar.Link href="/contato">Entre em contato</Navbar.Link>
          </Navbar.Root>
        </div>
      </header>
    </>
  )
}
