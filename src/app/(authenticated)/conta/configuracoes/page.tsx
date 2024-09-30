import { type Metadata } from 'next'

import Content from './content'

export const metadata: Metadata = {
  title: 'Configurações da conta',
}

export default function Page() {
  return <Content />
}
