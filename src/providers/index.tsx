'use client'

import { type PropsWithChildren } from 'react'

import { ToastProvider } from './react-toast'
import { NextAuthProvider } from './next-auth'
import { ReactQueryProvider } from './react-query'

export function Providers({ children }: PropsWithChildren) {
  return (
    <ReactQueryProvider>
      <NextAuthProvider>
        {children}
        <ToastProvider />
      </NextAuthProvider>
    </ReactQueryProvider>
  )
}
