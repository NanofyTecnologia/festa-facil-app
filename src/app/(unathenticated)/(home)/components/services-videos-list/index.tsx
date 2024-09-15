'use client'

import Link from 'next/link'
import { Fragment } from 'react'

import { Badge } from '@/components/ui/badge'
import { Carousel } from '@/components/ui/carousel'

import { useGetServices } from '@/hooks/use-get-services'
import RatingStars from '@/app/(unathenticated)/components/rating-stars'

export default function ServicesVideosList() {
  const { data: services } = useGetServices()

  return (
    <>
      <Carousel.Root>
        <Carousel.Content>
          {services
            ?.filter((service) => {
              return service.video
            })
            .map((service) => (
              <Carousel.Item
                key={service.id}
                className="sm:basis-1/2 lg:basis-1/3 2xl:basis-1/4"
              >
                <Link href={`/servico/${service.id}`}>
                  <div className="rounded-md bg-secondary p-4">
                    <video loop muted autoPlay className="rounded">
                      <source src={service.video} type="video/mp4" />
                      <track
                        src={service.video}
                        kind="subtitles"
                        srcLang="pt-br"
                        label="Português (Brasil)"
                      />
                    </video>

                    <div className="mt-4 flex items-start justify-between">
                      <h3 className="font-semibold">{service.name}</h3>

                      <div className="mb-1 flex items-center gap-1 rounded-full border bg-white p-0.5">
                        <RatingStars rating={service.rating} />
                      </div>
                    </div>

                    <div className="mt-4">
                      <Badge.Root>{service.category.name}</Badge.Root>
                    </div>
                  </div>
                </Link>
              </Carousel.Item>
            ))}
        </Carousel.Content>
        <Carousel.Previous className="left-0.5" />
        <Carousel.Next className="right-0.5" />
      </Carousel.Root>
    </>
  )
}
