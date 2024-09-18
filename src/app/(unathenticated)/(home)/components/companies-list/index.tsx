'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Star } from 'lucide-react'

import { Carousel } from '@/components/ui/carousel'
import { useGetCompanyByRating } from '@/hooks/use-get-company-by-rating'

export default function CompanyList() {
  const { data: companies } = useGetCompanyByRating()

  return (
    <Carousel.Root>
      <Carousel.Content>
        {companies?.map((company) => (
          <Carousel.Item
            key={company.id}
            className="sm:basis-1/2 lg:basis-1/3 2xl:basis-1/4"
          >
            <Link href={`/servico/${company.id}`}>
              <div className="rounded-md bg-secondary p-4">
                <Image
                  width={256}
                  height={256}
                  src={company.image}
                  className="h-64 w-full rounded object-cover"
                  alt=""
                />
              </div>

              <div className="mt-4 flex items-center justify-between">
                <h3 className="font-semibold">{company.name}</h3>

                <p className="flex items-center gap-1 rounded-full border bg-secondary px-1">
                  <Star className="size-4 text-yellow-500" />

                  <span className="text-sm">{company.rating}</span>
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
