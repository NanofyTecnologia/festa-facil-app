'use client'

import * as React from 'react'

import { cn } from '@/lib/shadcn'

export const Shortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn('ml-auto text-xs tracking-widest opacity-60', className)}
      {...props}
    />
  )
}
Shortcut.displayName = 'DropdownMenuShortcut'
