'use client'

import { MoveRight } from 'lucide-react'

import { Accordion } from '@/components/ui/accordion'

import Link from './link'
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'

export default function Sidebar() {
  return (
    <>
      <div className="sticky top-0 hidden max-h-screen min-h-screen w-full max-w-64 border-e bg-white md:flex md:flex-col">
        <div className="h-16 border-b p-4 text-center">
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </div>

        <div className="flex-1 space-y-4 p-4">
          <Link href="/dashboard">
            Dashboard
            <MoveRight className="size-4" />
          </Link>

          <Accordion.Root type="single" collapsible>
            <Accordion.Item value="category" className="border-0">
              <Accordion.Trigger className="rounded p-2 text-base font-medium text-zinc-500 hover:bg-secondary hover:text-black hover:no-underline">
                Serviços
              </Accordion.Trigger>
              <Accordion.Content>
                <ul className="mt-2 space-y-1 pl-4 text-base text-zinc-500">
                  <li>
                    <Link href="/dashboard/servicos/listar">
                      Listar
                      <MoveRight className="size-4" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard/servicos/criar">
                      Criar
                      <MoveRight className="size-4" />
                    </Link>
                  </li>
                </ul>
              </Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>
        </div>

        <div className="p-4">
          <Button.Root
            className="w-full"
            variant="destructive"
            onClick={() => signOut()}
          >
            Desconectar
          </Button.Root>
        </div>
      </div>
    </>
  )
}
