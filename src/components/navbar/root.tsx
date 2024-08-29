import { cn } from '@/lib/shadcn'
import { type HTMLAttributes } from 'react'

export function Root({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <nav
      className={cn('ms-auto flex items-center gap-10', className)}
      {...props}
    />
  )
}
