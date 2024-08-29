'use client'

import * as React from 'react'

import { cn } from '@/lib/shadcn'

import { useCarousel } from './context'

export const Item = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { index?: number }
>(({ className, index, ...props }, ref) => {
  const { orientation, api } = useCarousel()

  const isActive = api?.selectedScrollSnap() === index

  return (
    <div
      ref={ref}
      role="group"
      data-active={isActive}
      aria-roledescription="slide"
      className={cn(
        'min-w-0 shrink-0 grow-0 basis-full',
        orientation === 'horizontal' ? 'pl-4' : 'pt-4',
        className,
      )}
      {...props}
    />
  )
})
Item.displayName = 'CarouselItem'
