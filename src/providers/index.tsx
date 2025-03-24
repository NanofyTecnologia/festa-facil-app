'use client'

import { type PropsWithChildren } from 'react'

import { NextAuthProvider } from './next-auth'
import { ReactQueryProvider } from './react-query'
import { ToastProvider } from './react-toast'

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
