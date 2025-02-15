import * as React from 'react'

import { cn } from '@/lib/shadcn'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'

export const Ellipsis = ({
  className,
  ...props
}: React.ComponentProps<'span'>) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    {...props}
  >
    <DotsHorizontalIcon className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
)
Ellipsis.displayName = 'BreadcrumbElipssis'
