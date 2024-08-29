import * as React from 'react'

export const DotButton = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLDivElement>
>(() => {
  return <button></button>
})
DotButton.displayName = 'CarouseDotButton'
