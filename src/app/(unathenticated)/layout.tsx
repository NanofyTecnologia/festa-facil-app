import { PropsWithChildren } from 'react'

import Header from './components/header'
import Footer from './components/footer'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="flex h-screen flex-col">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </div>
    </>
  )
}
