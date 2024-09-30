import { type PropsWithChildren } from 'react'

import Header from './components/header'
import Sidebar from './components/sidebar'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="flex flex-1 flex-col">
          <Header />

          <div className="py-6 md:px-12">{children}</div>
        </div>
      </div>
    </>
  )
}
