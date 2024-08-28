'use client'

import * as React from 'react'
import { ArrowRight } from 'lucide-react'

import { cn } from '@/lib/shadcn'
import { Button } from '@/components/ui/button'
import { useCarousel } from './context'

export const Next = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button.Root>
>(({ className, variant = 'outline', size = 'icon', ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button.Root
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        'absolute h-8 w-8 rounded-full',
        orientation === 'horizontal'
          ? '-right-12 top-1/2 -translate-y-1/2'
          : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
        className,
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button.Root>
  )
})
Next.displayName = 'CarouselNext'