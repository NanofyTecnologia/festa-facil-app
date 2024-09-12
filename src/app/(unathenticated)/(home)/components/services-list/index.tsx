'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Star } from 'lucide-react'

import { loadImageUrl } from '@/utils/image-url'

import { Carousel } from '@/components/ui/carousel'
import { useGetServiceByRating } from '@/hooks/use-get-services-by-rating'

export default function ServiceList() {
  const { data: services } = useGetServiceByRating()

  return (
    <Carousel.Root>
      <Carousel.Content>
        {services?.map((service) => (
          <Carousel.Item key={service.id}>
            <Link href={`/servico/${service.id}`}>
              <div className="rounded-md bg-secondary p-4">
                <Image
                  width={256}
                  height={256}
                  src={loadImageUrl(service.image)}
                  className="h-64 w-full rounded object-cover"
                  alt=""
                />
              </div>

              <div className="mt-4 flex items-center justify-between">
                <h3 className="font-semibold">{service.name}</h3>

                <p className="flex items-center gap-1 rounded-full border bg-secondary px-1">
                  <Star className="size-4 text-yellow-500" />

                  <span className="text-sm">{service.rating}</span>
                </p>
              </div>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel.Content>
      <Carousel.Previous className="left-0.5" />
      <Carousel.Next className="right-0.5" />
    </Carousel.Root>
  )
}
