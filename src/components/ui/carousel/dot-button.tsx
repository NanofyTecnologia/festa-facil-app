import * as React from 'react'

import { useCarousel } from './context'

export const DotButton = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className }) => {
  return <button></button>
})
DotButton.displayName = 'CarouseDotButton'
