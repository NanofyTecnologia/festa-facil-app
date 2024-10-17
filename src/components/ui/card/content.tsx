import * as React from 'react'

import { cn } from '@/lib/shadcn'

export const Content = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
))
Content.displayName = 'CardContent'
