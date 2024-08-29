'use client'

import * as React from 'react'

import { type CarouselContextProps } from './types'

export const Context = React.createContext<CarouselContextProps | null>(null)

export function useCarousel() {
  const context = React.useContext(Context)

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />')
  }

  return context
}
