import { PropsWithChildren } from 'react'

import Header from './components/header'
import Footer from './components/footer'
import { LocationProvider } from '@/context/location-context'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <LocationProvider>
        <div className="flex h-screen flex-col">
          <Header />
          <div className="flex-1">
            <div>{children}</div>
          </div>
          <Footer />
        </div>
      </LocationProvider>
    </>
  )
}
