'use client'

import { type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import NextLink, { type LinkProps } from 'next/link'

interface IProps extends LinkProps {
  children: ReactNode
}

export default function Link(props: IProps) {
  const { href, children } = props

  const pathname = usePathname()

  const isActive = pathname === href

  return (
    <NextLink
      href={href}
      data-active={isActive}
      className="flex items-center justify-between rounded p-2 font-medium text-zinc-500 transition-all data-[active=true]:bg-secondary data-[active=true]:text-black hover:bg-secondary hover:text-black"
    >
      {children}
    </NextLink>
  )
}
