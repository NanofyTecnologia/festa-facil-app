'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Fragment } from 'react'
import { useParams } from 'next/navigation'

import { useGetServicesByCategory } from './hooks/use-get-services-by-category'
import { env } from '@/lib/env/index.mjs'

export default function Page() {
  const { slug } = useParams()

  const { data: services } = useGetServicesByCategory({ q: slug[0] })

  return (
    <>
      <div className="bg-secondary">
        <section className="mx-auto flex min-h-96 max-w-sm flex-col items-center justify-end gap-8 pb-6 md:max-w-7xl">
          <h2 className="text-3xl font-semibold capitalize">{slug[0]}</h2>
        </section>
      </div>

      <main className="mx-auto mt-6 max-w-7xl">
        <div className="grid grid-cols-4 gap-4">
          {services?.length === 0 && (
            <div className="col-span-full text-center">
              <h2 className="text-xl font-semibold">
                Não há nenhum serviço para exibir!
              </h2>
            </div>
          )}

          {services?.map((service, index) => (
            <Fragment key={index}>
              <Link href={`/${service.id}`} className="flex flex-col">
                <div className="w-full overflow-hidden rounded-md border">
                  <Image
                    width={256}
                    height={256}
                    className="max-h-56 w-full object-cover"
                    src={`${env.NEXT_PUBLIC_API_URL}/uploads/${service.image}`}
                    alt=""
                  />
                </div>
                <h2 className="mt-1 font-semibold">{service.name}</h2>
              </Link>
            </Fragment>
          ))}
        </div>
      </main>
    </>
  )
}
