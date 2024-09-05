'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Fragment, useEffect, useState } from 'react'

import { env } from '@/lib/env/index.mjs'

import { useGetServiceByUserId } from './hooks/use-get-service-by-user-id'

export function Content() {
  const [location, setLocation] = useState('')

  const { data: services } = useGetServiceByUserId({
    id: 'cm0fcccu60000ly9rcif76xeg',
  })

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    setLocation(window.location.origin)
  }, [])

  return (
    <>
      <main className="mx-auto max-w-sm px-4 py-6 md:max-w-screen-xl">
        <div className="grid w-full grid-cols-6 gap-4">
          <div className="col-span-2">
            <div className="w-full space-y-4">
              <div className="col-span-full">
                <h2 className="text-lg font-semibold">
                  Visualizado recentemente
                </h2>
              </div>

              <p className="text-center font-semibold">Em desenvolvimento...</p>
            </div>
          </div>

          <div className="col-span-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-full">
                <h2 className="text-lg font-semibold">Serviços</h2>
              </div>

              {services?.map((service) => (
                <Fragment key={service.id}>
                  <Link
                    href={`/area-fornecedor/servico/${service.id}/editar`}
                    className="rounded-md border bg-secondary p-4 transition-colors hover:border-zinc-400"
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        width={32}
                        height={32}
                        src={
                          env.NEXT_PUBLIC_API_URL + `/uploads/${service.image}`
                        }
                        className="rounded-full"
                        alt={service.name}
                      />

                      <div className="space-y-px">
                        <h2 className="text-sm font-semibold">
                          {service.name}
                        </h2>
                        <p className="text-xs text-zinc-500">
                          {`${location}/${service.name.replaceAll(' ', '-')}`}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-start">
                      <div className="my-2.5 rounded-full bg-zinc-400 px-2">
                        <span className="text-sm font-semibold text-white">
                          {service.category.name}
                        </span>
                      </div>

                      <p className="text-sm text-zinc-500">
                        {service.description.slice(0, 42).concat('...')}
                      </p>
                    </div>
                  </Link>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
