'use client'

import * as React from 'react'

import { cn } from '@/lib/shadcn'

export const Footer = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className,
    )}
    {...props}
  />
)
Footer.displayName = 'DialogFooter'