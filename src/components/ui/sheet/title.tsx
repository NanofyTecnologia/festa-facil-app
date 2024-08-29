'use client'

import * as React from 'react'
import * as SheetPrimitive from '@radix-ui/react-dialog'

import { cn } from '@/lib/shadcn'

export const Title = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold text-foreground', className)}
    {...props}
  />
))
Title.displayName = SheetPrimitive.Title.displayName
