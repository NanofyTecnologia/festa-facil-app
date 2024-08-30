import { ComponentProps } from 'react'

import { cn } from '@/lib/shadcn'

interface Props extends ComponentProps<'footer'> {}

export function Footer({ className, ...rest }: Props) {
  return <footer className={cn('mt-4', className)} {...rest} />
}
