import { type Metadata } from 'next'

import Content from './content'

export const metadata: Metadata = {
  title: 'Serviços',
}

export default function Page() {
  return (
    <>
      <main className="px-4 md:px-0">
        <Content />
      </main>
    </>
  )
}
