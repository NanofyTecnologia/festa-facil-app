import { type PropsWithChildren } from 'react'

export function Root({ ...props }: PropsWithChildren) {
  return <nav className="ms-auto flex items-center gap-10" {...props} />
}
