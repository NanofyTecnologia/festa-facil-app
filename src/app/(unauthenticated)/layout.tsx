import { PropsWithChildren } from 'react'

import { LocationProvider } from '@/context/location-context'

import Footer from './components/footer'
import Header from './components/header'
import { TrackVisit } from './components/track-visit'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <LocationProvider>
        <TrackVisit />
        <div className="flex min-h-screen flex-col">
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
      </LocationProvider>
    </>
  )
}
