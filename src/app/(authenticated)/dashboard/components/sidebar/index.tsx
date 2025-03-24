'use client'

import { MoveRight } from 'lucide-react'

import { signOut, useSession } from 'next-auth/react'

import { Accordion } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'

import Link from './link'

export default function Sidebar() {
  const { data: session } = useSession()

  return (
    <>
      <div className="sticky top-0 hidden max-h-screen min-h-screen w-full max-w-64 border-e bg-white md:flex md:flex-col">
        <div className="h-16 border-b p-4 text-center">
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </div>

        <div className="flex-1 space-y-2 p-4">
          <Link href="/dashboard">
            Dashboard
            <MoveRight className="size-4" />
          </Link>

          <Accordion.Root type="single" collapsible>
            <Accordion.Item value="category" className="border-0">
              <Accordion.Trigger className="rounded p-2 text-base font-medium text-zinc-500 hover:bg-secondary hover:text-black hover:no-underline">
                Serviços
              </Accordion.Trigger>
              <Accordion.Content className="pb-0">
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

                  {session?.user.role === 'ADMIN' && (
                    <li>
                      <Link href="/dashboard/servicos/moderar">
                        Moderar
                        <MoveRight className="size-4" />
                      </Link>
                    </li>
                  )}
                </ul>
              </Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>

          <Link href="/conta/configuracoes">
            Minha conta <MoveRight className="size-4" />
          </Link>

          {session?.user.role === 'ADMIN' && (
            <div className="space-y-2 border-t">
              <p className="mb-2 mt-4 text-xs font-semibold text-zinc-700">
                Área Administrativa
              </p>

              <Accordion.Root type="single" collapsible>
                <Accordion.Item value="category" className="border-0">
                  <Accordion.Trigger className="rounded p-2 text-base font-medium text-zinc-500 hover:bg-secondary hover:text-black hover:no-underline">
                    Usuários
                  </Accordion.Trigger>
                  <Accordion.Content className="pb-0">
                    <ul className="mt-2 space-y-1 pl-4 text-base text-zinc-500">
                      <li>
                        <Link href="/dashboard/usuarios/listar">
                          Listar
                          <MoveRight className="size-4" />
                        </Link>
                      </li>
                      <li>
                        <Link href="/dashboard/usuarios/criar">
                          Criar
                          <MoveRight className="size-4" />
                        </Link>
                      </li>
                    </ul>
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion.Root>

              <Accordion.Root type="single" collapsible>
                <Accordion.Item value="category" className="border-0">
                  <Accordion.Trigger className="rounded p-2 text-base font-medium text-zinc-500 hover:bg-secondary hover:text-black hover:no-underline">
                    Serviços
                  </Accordion.Trigger>
                  <Accordion.Content className="pb-0">
                    <ul className="mt-2 space-y-1 pl-4 text-base text-zinc-500">
                      <li>
                        <Link href="/dashboard/servicos/admin/listar">
                          Listar
                          <MoveRight className="size-4" />
                        </Link>
                      </li>

                      <li>
                        <Link href="/dashboard/servicos/moderar">
                          Moderar
                          <MoveRight className="size-4" />
                        </Link>
                      </li>
                    </ul>
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion.Root>

              <Accordion.Root type="single" collapsible>
                <Accordion.Item value="category" className="border-0">
                  <Accordion.Trigger className="rounded p-2 text-base font-medium text-zinc-500 hover:bg-secondary hover:text-black hover:no-underline">
                    Empresas
                  </Accordion.Trigger>
                  <Accordion.Content className="pb-0">
                    <ul className="mt-2 space-y-1 pl-4 text-base text-zinc-500">
                      <li>
                        <Link href="/dashboard/empresas/listar">
                          Listar
                          <MoveRight className="size-4" />
                        </Link>
                      </li>
                      <li>
                        <Link href="/dashboard/empresas/criar">
                          Criar
                          <MoveRight className="size-4" />
                        </Link>
                      </li>
                    </ul>
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion.Root>

              <Link href="/dashboard/categorias">
                Categorias
                <MoveRight className="size-4" />
              </Link>

              <Link href="/dashboard/parceiros">
                Parceiros
                <MoveRight className="size-4" />
              </Link>
            </div>
          )}
        </div>

        <div className="p-4">
          <Button.Root
            size="sm"
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
