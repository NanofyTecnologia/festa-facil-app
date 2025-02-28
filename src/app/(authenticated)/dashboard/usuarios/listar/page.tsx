import { Home } from 'lucide-react'

import { type Metadata } from 'next'

import { Breadcrumb } from '@/components/ui/breadcrumb'

import Content from './content'

export const metadata: Metadata = {
  title: 'Usuários',
}

export default function Page() {
  return (
    <>
      <div className="flex items-center">
        <h1 className="me-6 border-e pe-6 text-xl font-medium">
          Listar usuários
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
              <Breadcrumb.Link>Usuários</Breadcrumb.Link>
            </Breadcrumb.Item>

            <Breadcrumb.Separator />

            <Breadcrumb.Item>
              <Breadcrumb.Page>Listar</Breadcrumb.Page>
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb.Root>
      </div>

      <Content />
    </>
  )
}
