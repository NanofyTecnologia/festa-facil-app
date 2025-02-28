import Link from 'next/link'

import { Home } from 'lucide-react'

import { Metadata } from 'next'

import { Breadcrumb } from '@/components/ui/breadcrumb'
import { normalizeSlug } from '@/utils/normalize-slug'

import Content from './content'

export interface IParams {
  [key: string]: string[]
}

export function generateMetadata({ params }: { params: IParams }): Metadata {
  const { isEditing } = normalizeSlug(params.slug)

  const title = isEditing ? 'Editar usuário' : 'Cadastrar usuário'

  return {
    title,
  }
}

export default function Page({ params }: { params: IParams }) {
  const { isEditing } = normalizeSlug(params.slug)

  return (
    <>
      <div className="flex items-center">
        <h1 className="me-6 border-e pe-6 text-xl font-medium">
          {isEditing ? 'Editar usuário' : 'Novo usuário'}
        </h1>

        <Breadcrumb.Root>
          <Breadcrumb.List>
            <Breadcrumb.Item>
              <Breadcrumb.Link href="/dashboard">
                <Home className="size-5" />
              </Breadcrumb.Link>
            </Breadcrumb.Item>

            <Breadcrumb.Separator />

            <Breadcrumb.Item>
              <Breadcrumb.Link asChild>
                <Link href="/dashboard/usuarios/listar">Usuários</Link>
              </Breadcrumb.Link>
            </Breadcrumb.Item>

            <Breadcrumb.Separator />

            <Breadcrumb.Item>
              <Breadcrumb.Page>
                {isEditing ? 'Editar usuário' : 'Novo usuário'}
              </Breadcrumb.Page>
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb.Root>
      </div>

      <Content />
    </>
  )
}
