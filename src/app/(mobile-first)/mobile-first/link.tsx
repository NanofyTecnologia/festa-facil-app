'use client'

import { ComponentProps } from 'react'
import { usePathname } from 'next/navigation'
import NextLink, { type LinkProps } from 'next/link'

import { cn } from '@/lib/shadcn'

export default function Link(props: LinkProps & ComponentProps<'a'>) {
  const { className, href, ...restProps } = props

  const pathname = usePathname()

  const isActive = href === pathname

  return (
    <NextLink
      href={href}
      data-active={isActive ? 'true' : 'false'}
      className={cn(
        'block rounded p-2 font-medium transition-all data-[active=true]:bg-secondary hover:bg-secondary hover:text-black',
        className,
      )}
      {...restProps}
    />
  )
}
