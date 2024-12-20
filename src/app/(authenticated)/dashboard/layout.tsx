import { type PropsWithChildren } from 'react'

import SwitchRole from './switch-role'
import Header from './components/header'
import Sidebar from './components/sidebar'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="flex min-h-screen bg-secondary">
        <Sidebar />

        <div className="flex flex-1 flex-col">
          <Header />

          <div className="max-w-[100vw] px-4 py-6 md:px-6">{children}</div>
        </div>

        <SwitchRole />
      </div>
    </>
  )
}
