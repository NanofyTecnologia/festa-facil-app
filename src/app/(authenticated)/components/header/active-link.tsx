'use client'

import { HTMLAttributes } from 'react'
import { usePathname } from 'next/navigation'
import NextLink, { type LinkProps } from 'next/link'

import { cn } from '@/lib/shadcn'

interface Props extends LinkProps, HTMLAttributes<HTMLAnchorElement> {}

export function Link({ href, ...props }: Props) {
  const pathname = usePathname()

  const isActive = pathname === href

  return (
    <NextLink
      href={href}
      data-active={isActive}
      className={cn(
        'font-semibold hover:underline data-[active=true]:text-muted-foreground data-[active=true]:no-underline',
      )}
      {...props}
    />
  )
}
