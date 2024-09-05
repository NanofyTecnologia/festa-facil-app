'use client'

import Image from 'next/image'
import { useParams } from 'next/navigation'

import { useGetServiceById } from './hooks/use-get-service-by-id'
import { env } from '@/lib/env/index.mjs'
import { Mail, Phone } from 'lucide-react'

export default function Page() {
  const { slug } = useParams()

  const { data: service, isLoading } = useGetServiceById({ id: slug[0] })

  if (isLoading) {
    return <>Carregando...</>
  }

  return (
    <>
      <main className="mx-auto mt-6 max-w-sm sm:max-w-7xl">
        <div className="flex items-start gap-2 rounded-md bg-secondary p-4">
          {service?.image && (
            <Image
              width={64}
              height={64}
              src={`${env.NEXT_PUBLIC_API_URL}/uploads/${service.image}`}
              alt={service.name}
              className="rounded-md"
            />
          )}

          <div className="space-y-1">
            <h2 className="text-lg font-semibold">{service?.name}</h2>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Mail className="size-4" />

                <p>{service?.email}</p>
              </div>

              <div className="flex items-center gap-1">
                <Phone className="size-4" />

                <p>{service?.phone}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="my-6 flex">
          <div className="rounded-full bg-foreground px-4 text-white">
            <h2>{service?.category.name}</h2>
          </div>
        </div>

        <div
          className="tiptap"
          dangerouslySetInnerHTML={{ __html: service?.description ?? '' }}
        />
      </main>
    </>
  )
}
