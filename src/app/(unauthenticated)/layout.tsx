import { type PropsWithChildren } from 'react'

import Header from './components/header'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />

      {children}
    </>
  )
}
