'use client'

import Link from 'next/link'
import { Fragment } from 'react'
import { IoStar, IoStarHalf, IoStarOutline } from 'react-icons/io5'

import { Badge } from '@/components/ui/badge'
import { Carousel } from '@/components/ui/carousel'

import { useGetServices } from '@/hooks/use-get-services'

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
            .map((service) => {
              const ratingRounded = Math.round(service.rating * 2) / 2
              const fullStars = Math.floor(ratingRounded)
              const halfStars = ratingRounded % 1 !== 0
              const emptyStar = 5 - Math.ceil(ratingRounded)

              return (
                <Carousel.Item key={service.id}>
                  <Link href={`/servico/${service.id}`}>
                    <div className="rounded-md bg-secondary p-4">
                      <video autoPlay muted loop className="rounded">
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
                          {Array.from({ length: fullStars }).map((_, index) => (
                            <Fragment key={index + 'fullstar'}>
                              <IoStar className="size-4 text-yellow-500" />
                            </Fragment>
                          ))}

                          {halfStars && (
                            <IoStarHalf className="size-4 text-yellow-500" />
                          )}

                          {Array.from({ length: emptyStar }).map((_, index) => (
                            <Fragment key={index + 'empty'}>
                              <IoStarOutline className="size-4 text-yellow-500" />
                            </Fragment>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4">
                        <Badge.Root>{service.category.name}</Badge.Root>
                      </div>
                    </div>
                  </Link>
                </Carousel.Item>
              )
            })}
        </Carousel.Content>
        <Carousel.Previous className="left-0.5" />
        <Carousel.Next className="right-0.5" />
      </Carousel.Root>
    </>
  )
}
