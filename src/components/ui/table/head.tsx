import { type ComponentProps } from 'react'
import { type Header } from '@tanstack/react-table'

import { cn } from '@/lib/shadcn'

interface Props<T> extends ComponentProps<'th'> {
  header: Header<T, unknown>
}

export function Head<T>({
  style,
  header,
  children,
  className,
  ...rest
}: Props<T>) {
  return (
    <th
      className={cn('border-b p-4 text-sm font-medium', className)}
      style={{
        ...style,
        width:
          header.getSize() === Number.MAX_SAFE_INTEGER
            ? 'auto'
            : header.getSize(),
      }}
      {...rest}
    >
      <div>{children}</div>
    </th>
  )
}
