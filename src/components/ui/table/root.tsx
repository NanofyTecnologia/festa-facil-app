import { ComponentProps } from 'react'

import { cn } from '@/lib/shadcn'

interface Props extends ComponentProps<'div'> {}

export function Root({ className, ...rest }: Props) {
  return <div className={cn('', className)} {...rest} />
}
