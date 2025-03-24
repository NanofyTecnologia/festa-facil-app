'use client'

import NextLink, { type LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'

import { HTMLAttributes } from 'react'

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
        'font-semibold data-[active=true]:text-muted-foreground data-[active=true]:no-underline hover:underline',
      )}
      {...props}
    />
  )
}
