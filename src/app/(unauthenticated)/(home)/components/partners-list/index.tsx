'use client'

import Image from 'next/image'

import { Carousel } from '@/components/ui/carousel'

import { useGetCompanies } from '@/hooks/use-get-companies'

export default function PartnersList() {
  const { data: companies } = useGetCompanies()

  return (
    <>
      <Carousel.Root>
        <Carousel.Content>
          {companies?.map((company) => (
            <Carousel.Item
              key={company.id}
              className="basis-1/4 sm:basis-1/6 md:basis-[12.5%] xl:basis-[10%]"
            >
              {company.image && (
                <Image
                  width={256}
                  height={256}
                  src={company.image}
                  className="size-20 rounded-full object-cover"
                  alt={company.name}
                />
              )}
            </Carousel.Item>
          ))}
        </Carousel.Content>
      </Carousel.Root>
    </>
  )
}
