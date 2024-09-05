import { type PropsWithChildren } from 'react'

import { Header } from '../../components/header'

export default function Root({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
