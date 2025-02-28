import { PropsWithChildren } from 'react'

import { LocationProvider } from '@/context/location-context'

import Footer from './components/footer'
import Header from './components/header'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <LocationProvider>
        <div className="flex min-h-screen flex-col">
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
      </LocationProvider>
    </>
  )
}
