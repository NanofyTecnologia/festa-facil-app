import { type PropsWithChildren } from 'react'

import Header from './components/header'
import Sidebar from './components/sidebar'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="flex min-h-screen bg-secondary">
        <Sidebar />

        <div className="flex flex-1 flex-col">
          <Header />

          <div className="max-w-[100vw] py-6 md:px-6">{children}</div>
        </div>
      </div>
    </>
  )
}
