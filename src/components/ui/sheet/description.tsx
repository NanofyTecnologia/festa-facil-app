'use client'

import * as SheetPrimitive from '@radix-ui/react-dialog'
import * as React from 'react'

import { cn } from '@/lib/shadcn'

export const Description = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
Description.displayName = SheetPrimitive.Description.displayName
