import { type ComponentProps } from 'react'

import { cn } from '@/lib/shadcn'

interface Props extends ComponentProps<'header'> {}

export function Header({ className, ...rest }: Props) {
  return <header className={cn('mb-4', className)} {...rest} />
}
