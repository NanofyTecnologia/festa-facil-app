'use client'

import Image from 'next/image'
import Link from 'next/link'

import { Star, MapPin } from 'lucide-react'

import { Carousel } from '@/components/ui/carousel'
import { useLocation } from '@/context/location-context'
import { useGetOfferingByRating } from '@/hooks/services/use-get-offering-by-rating'

export default function CompanyList() {
  const { data: offerings } = useGetOfferingByRating()
  const { location } = useLocation()

  const filteredOfferings = offerings?.filter((item) => item.city === location)

  return (
    <Carousel.Root>
      <Carousel.Content>
        {filteredOfferings?.map((offering) => (
          <Carousel.Item
            key={offering.id}
            className="sm:basis-1/2 lg:basis-1/3 2xl:basis-1/4"
          >
            <Link
              href={`/servico/${offering.id}`}
              className="bg-app-white block rounded-lg border bg-white p-2 transition-all hover:scale-95 hover:border-app-darkpurple"
            >
              {offering.banner && (
                <Image
                  width={256}
                  height={256}
                  src={offering.banner}
                  className="h-48 w-full rounded-md border bg-white object-cover"
                  alt=""
                />
              )}

              <div className="mt-4">
                <h3 className="font-semibold">{offering.name}</h3>

                <p className="mt-1 line-clamp-3 text-wrap text-xs text-gray-600">
                  {offering.summary}
                </p>
              </div>
              <div className="mt-4 flex justify-between">
                <div className="flex items-center gap-1">
                  <MapPin className="size-6 text-app-primary" />

                  <span className="text-sm">{offering.city}</span>
                </div>

                <div className="flex items-center gap-1">
                  <Star className="size-4 fill-app-secondary text-app-secondary" />

                  <span className="text-sm">{offering.rating}</span>
                </div>
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
