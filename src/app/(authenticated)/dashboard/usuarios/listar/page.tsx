import { type Metadata } from 'next'

import { Breadcrumb } from '@/components/ui/breadcrumb'

import Content from './content'

export const metadata: Metadata = {
  title: 'Usuários',
}

export default function Page() {
  return (
    <>
      <Breadcrumb.Root>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/dashboard">Dashboard</Breadcrumb.Link>
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

      <Content />
    </>
  )
}
