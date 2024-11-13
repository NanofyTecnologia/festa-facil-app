'use client'

import Image from 'next/image'

import { Carousel } from '@/components/ui/carousel'

import { useGetPartners } from '@/hooks/use-get-partners'

export default function PartnersList() {
  const { data: partners } = useGetPartners()

  return (
    <>
      <Carousel.Root>
        <Carousel.Content>
          {partners?.map((partner) => (
            <Carousel.Item
              key={partner.id}
              className="basis-1/4 sm:basis-1/6 md:basis-[12.5%] xl:basis-[10%]"
            >
              {partner.picture && (
                <Image
                  width={256}
                  height={256}
                  src={partner.picture}
                  className="rounded-lg object-cover"
                  alt={partner.name}
                />
              )}
            </Carousel.Item>
          ))}
        </Carousel.Content>
      </Carousel.Root>
    </>
  )
}
