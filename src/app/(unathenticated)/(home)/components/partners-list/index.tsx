'use client'

import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'

import { Carousel } from '@/components/ui/carousel'

import { useGetServices } from '@/hooks/use-get-services'

export default function PartnersList() {
  const { data: services } = useGetServices()

  return (
    <>
      <Carousel.Root
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <Carousel.Content>
          {services?.map((service) => (
            <Carousel.Item
              key={service.id}
              className="basis-1/4 sm:basis-1/6 md:basis-[12.5%] xl:basis-[10%]"
            >
              <div className="rounded-full border bg-secondary p-1">
                <Image
                  width={256}
                  height={121}
                  src={service.image}
                  className="w-full rounded-full object-cover"
                  alt={service.name}
                />
              </div>
            </Carousel.Item>
          ))}
        </Carousel.Content>
      </Carousel.Root>
    </>
  )
}
