'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Star } from 'lucide-react'

import { Carousel } from '@/components/ui/carousel'
import { useGetOfferingByRating } from '@/hooks/use-get-offering-by-rating'

export default function CompanyList() {
  const { data: offerings } = useGetOfferingByRating()

  return (
    <Carousel.Root>
      <Carousel.Content>
        {offerings?.map((offering) => (
          <Carousel.Item
            key={offering.id}
            className="sm:basis-1/2 lg:basis-1/3 2xl:basis-1/4"
          >
            <Link
              href={`/servico/${offering.id}`}
              className="block rounded-lg border border-transparent bg-secondary p-4 transition-all hover:scale-95 hover:border-muted-foreground"
            >
              {offering.banner && (
                <Image
                  width={256}
                  height={256}
                  src={offering.banner}
                  className="h-48 w-full rounded-lg border bg-white object-cover"
                  alt=""
                />
              )}

              <div className="mt-4 flex items-center justify-between">
                <h3 className="font-semibold">{offering.name}</h3>

                <p className="flex items-center gap-1 rounded-full bg-secondary px-1">
                  <Star className="size-4 text-yellow-500" />

                  <span className="text-sm font-semibold">
                    {offering.rating}
                  </span>
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
