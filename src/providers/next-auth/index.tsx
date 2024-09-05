'use client'

import { type PropsWithChildren } from 'react'
import { SessionProvider } from 'next-auth/react'

export function NextAuthProvider({ children }: PropsWithChildren) {
  return (
    <SessionProvider refetchOnWindowFocus={true}>{children}</SessionProvider>
  )
}
