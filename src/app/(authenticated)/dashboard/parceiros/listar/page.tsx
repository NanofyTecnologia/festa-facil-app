import { type Metadata } from 'next'
import Content from './content'

export const metadata: Metadata = {
  title: 'Parceiros',
}

export default function Page() {
  return (
    <>
      <Content />
    </>
  )
}
