'use client'

import * as React from 'react'

import { cn } from '@/lib/shadcn'

export const Header = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col space-y-2 text-center sm:text-left',
      className,
    )}
    {...props}
  />
)
Header.displayName = 'SheetHeader'
