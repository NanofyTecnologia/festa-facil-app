'use client'

import { PropsWithChildren } from 'react'

import { ReactQueryProvider } from './react-query'

export function Providers({ children }: PropsWithChildren) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>
}
