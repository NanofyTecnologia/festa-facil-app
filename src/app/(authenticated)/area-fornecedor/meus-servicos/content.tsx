'use client'

import { Fragment } from 'react'
import { useGetServiceByUserId } from './hooks/use-get-service-by-user-id'

export function Content() {
  const { data: services } = useGetServiceByUserId({
    id: 'cm0fcccu60000ly9rcif76xeg',
  })

  return (
    <>
      <main className="px-4 py-6">
        <div className="rounded-md border p-4">
          <div className="mb-4 space-y-1 border-b pb-4">
            <h2 className="text-xl font-semibold">Meus serviços</h2>

            <p className="text-sm text-muted-foreground">
              Visualize todos os serviços que você criou ou para os quais foi
              designado como responsável.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {services?.map((service) => (
              <Fragment key={service.id}>
                <div className="rounded-md border"></div>
              </Fragment>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
