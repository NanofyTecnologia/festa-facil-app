import { type ComponentProps } from 'react'

import { cn } from '@/lib/shadcn'

import { useCtx } from './content'

interface Props extends ComponentProps<'td'> {}

export function EmptyMessage({ className, ...rest }: Props) {
  const { columnsLength } = useCtx()

  return <td colSpan={columnsLength} className={cn('', className)} {...rest} />
}
