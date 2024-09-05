import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

import './globals.css'
import { Providers } from '@/providers'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    template: '%s | Festa Fácil',
    default: 'Festa Fácil',
  },
  description: 'Aplicação em Desenvolvimento',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-Br">
      <body className={poppins.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
