'use client'

import { PropsWithChildren } from 'react'
import { usePathname } from 'next/navigation'
import NextLink, { type LinkProps } from 'next/link'

export function Link({ href, ...props }: LinkProps & PropsWithChildren) {
  const pathname = usePathname()

  const isActive = pathname === href

  return (
    <NextLink
      data-active={isActive}
      href={href}
      className="mx-0 border-b-2 border-transparent pb-2 data-[active=true]:border-black"
      {...props}
    />
  )
}
