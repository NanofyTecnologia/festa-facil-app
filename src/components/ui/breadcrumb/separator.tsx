import * as React from 'react'

import { cn } from '@/lib/shadcn'
import { ChevronRightIcon } from '@radix-ui/react-icons'

export const Separator = ({
  children,
  className,
  ...props
}: React.ComponentProps<'li'>) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn('[&>svg]:h-3.5 [&>svg]:w-3.5', className)}
    {...props}
  >
    {children ?? <ChevronRightIcon />}
  </li>
)
Separator.displayName = 'BreadcrumbSeparator'
