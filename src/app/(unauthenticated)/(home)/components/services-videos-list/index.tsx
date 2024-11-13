'use client'

import { Carousel } from '@/components/ui/carousel'

export default function ServicesVideosList() {
  return (
    <>
      <Carousel.Root>
        <Carousel.Content></Carousel.Content>
        <Carousel.Previous className="left-0.5" />
        <Carousel.Next className="right-0.5" />
      </Carousel.Root>
    </>
  )
}
