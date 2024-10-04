'use client'

import { useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { CircleUser, Menu, MoveRight } from 'lucide-react'

import { Sheet } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Accordion } from '@/components/ui/accordion'

import Link from '../sidebar/link'

export default function Header() {
  const { data } = useSession()

  const [showSideMenu, setShowSideMenu] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-white px-4 md:justify-end md:px-12">
        <div className="flex gap-1">
          <CircleUser className="size-6" />

          <div className="space-y-1">
            <h2>{data?.user.name?.split(' ')[0]}</h2>
          </div>
        </div>

        <Button.Root
          size="icon"
          variant="ghost"
          className="md:hidden"
          onClick={() => setShowSideMenu(true)}
        >
          <Menu className="size-5" />
        </Button.Root>
      </header>

      <Sheet.Root open={showSideMenu} onOpenChange={setShowSideMenu}>
        <Sheet.Content
          side="left"
          className="flex flex-col"
          aria-describedby="opened sidebar menu"
        >
          <Sheet.Header className="border-b">
            <Sheet.Title>Menu</Sheet.Title>
            <Sheet.Description />
          </Sheet.Header>

          <div className="h-full space-y-4">
            <Link href="/conta/configuracoes">
              Minha conta <MoveRight className="size-4" />
            </Link>

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
                  </ul>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>
          </div>

          <Button.Root
            className="w-full"
            variant="destructive"
            onClick={() => signOut()}
          >
            Desconectar
          </Button.Root>
        </Sheet.Content>
      </Sheet.Root>
    </>
  )
}
