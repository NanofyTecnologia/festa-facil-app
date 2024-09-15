'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { Fragment } from 'react'
import { Star } from 'lucide-react'

import { useGetServicesByCategory } from './hooks/use-get-services-by-category'

export default function Content() {
  const { slug } = useParams()

  const { data: services } = useGetServicesByCategory({ q: slug[0] })

  return (
    <>
      <main className="h-64 bg-secondary px-4 sm:m-4 sm:rounded-md md:mx-auto md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl">
        <div className="flex h-full items-end justify-center pb-6">
          <h2 className="text-3xl font-bold">{services?.name}</h2>
        </div>
      </main>

      <section className="py-6 sm:m-4 sm:rounded-md md:mx-auto md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl">
        <div className="grid w-full grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
          {services?.result.map((service, index) => (
            <Fragment key={index}>
              <Link href={`/servico/${service.id}`}>
                <div className="rounded-md border bg-secondary p-4">
                  <Image
                    width={256}
                    height={256}
                    src={service.image}
                    alt={service.name}
                    className="max-h-60 w-full rounded-md object-cover"
                  />

                  <div className="mt-4 flex items-center justify-between">
                    <h3 className="font-semibold">{service.name}</h3>

                    <p className="flex items-center gap-1 rounded-full border bg-secondary bg-white px-1">
                      <Star className="size-4 text-yellow-500" />

                      <span className="text-sm font-semibold">
                        {service.rating}
                      </span>
                    </p>
                  </div>
                </div>
              </Link>
            </Fragment>
          ))}
        </div>
      </section>
    </>
  )
}
