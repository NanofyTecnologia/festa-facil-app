import { type Metadata } from 'next'

import { Content } from './content'

export const metadata: Metadata = {
  title: 'Meus serviços',
}

export default function Page() {
  return (
    <>
      <Content />
    </>
  )
}
