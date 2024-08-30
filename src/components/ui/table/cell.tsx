import { type ComponentProps } from 'react'
import { type Cell as CellProps } from '@tanstack/react-table'

import { cn } from '@/lib/shadcn'

interface Props<T> extends ComponentProps<'td'> {
  cell: CellProps<T, unknown>
}

export function Cell<T>({ className, cell, style, ...rest }: Props<T>) {
  return (
    <td
      className={cn('p-2', className)}
      style={{
        width:
          cell.column.getSize() === Number.MAX_SAFE_INTEGER
            ? 'auto'
            : cell.column.getSize(),
        ...style,
      }}
      {...rest}
    />
  )
}
