import { PropsWithChildren } from 'react'

import Header from './components/header'
import Footer from './components/footer'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="flex h-screen flex-col">
        <Header />
        <div className="flex-1">
          <div className="md:mx-auto md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl">
            {children}
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
