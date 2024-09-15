'use client'

import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { Mail, MoveLeft, Phone, Text, User } from 'lucide-react'
import { Fragment } from 'react'

import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'

import { useGetServiceById } from './hooks/use-get-service-by-id'

import RatingStars from '../../components/rating-stars'

export default function Content() {
  const { slug } = useParams()
  const { back } = useRouter()

  const { data: service, isLoading } = useGetServiceById({ id: slug[0] })

  if (isLoading || !service) {
    return (
      <div className="rouded-md bg-secondary p-6">
        <h2 className="text-center text-2xl">Carregando...</h2>
      </div>
    )
  }

  return (
    <>
      <main className="mt-4 px-4 md:mx-auto md:max-w-3xl md:px-0 lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl">
        <Button.Root variant="ghost" onClick={back}>
          <MoveLeft className="me-2 size-5" />
          Voltar
        </Button.Root>

        <div className="mt-4 gap-4 rounded bg-secondary p-4 md:flex md:items-start">
          <Image
            width={256}
            height={256}
            src={service?.image}
            alt={service?.name}
            className="max-h-64 w-full rounded-md object-cover"
          />

          <div className="flex flex-col">
            <h2 className="mt-4 text-lg font-semibold md:mt-0">
              {service.name}
            </h2>

            <div className="mt-4 space-y-4 rounded border border-zinc-300 p-2">
              <h3 className="font-semibold">Informações sobre a empresa</h3>

              <div className="flex items-center gap-2">
                <Phone className="size-5" />{' '}
                <span className="text-sm"> {service.phone}</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="size-5" />{' '}
                <span className="text-sm">{service.email}</span>
              </div>

              <div className="flex items-start gap-2">
                <div>
                  <Text className="size-5" />
                </div>
                <p className="text-justify text-sm">{service.about}</p>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-12 md:mx-auto md:mt-16 md:max-w-3xl md:px-0 lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl">
          <h2 className="text-2xl font-semibold">Descrição</h2>

          <hr />

          <div
            className="tiptap mt-4"
            dangerouslySetInnerHTML={{ __html: service.description }}
          />
        </section>

        <section className="mt-12 md:mx-auto md:mt-16 md:max-w-3xl md:px-0 lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl">
          <h2 className="text-xl font-semibold">Imagens</h2>

          <hr />

          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Fragment key={index}>
                <div className="rounded-md border bg-secondary p-12"></div>
              </Fragment>
            ))}
          </div>
        </section>

        <section className="mt-12 md:mx-auto md:mt-16 md:max-w-3xl md:px-0 lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl">
          <div className="flex items-center">
            <h2 className="text-xl font-semibold">Avaliações</h2>

            <Dialog.Root>
              <Dialog.Trigger asChild>
                <Button.Root variant="link" className="ms-auto p-0">
                  Ver mais
                </Button.Root>
              </Dialog.Trigger>
              <Dialog.Content className="max-h-full overflow-y-auto">
                <Dialog.Header>
                  <Dialog.Title>Exibir todas as avaliações</Dialog.Title>
                  <Dialog.Description>
                    Veja o que estão falando sobre o serviço{' '}
                    <b>{service.name}</b>
                  </Dialog.Description>

                  <div className="mt-4 space-y-2">
                    {Array.from({ length: 10 }).map((_, index) => (
                      <Fragment key={index}>
                        <div className="flex items-start justify-start gap-2 rounded-md bg-secondary p-2 text-start">
                          <span className="rounded-lg bg-zinc-200 p-2">
                            <User className="size-5" />
                          </span>

                          <div className="space-y-0.5">
                            <div className="flex items-center">
                              <h2 className="text-sm font-semibold">
                                Avaliador {index}
                              </h2>

                              <div className="ms-auto flex">
                                <RatingStars rating={4.2} />
                              </div>
                            </div>
                            <p className="text-sm">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit.
                            </p>
                          </div>
                        </div>
                      </Fragment>
                    ))}
                  </div>
                </Dialog.Header>
              </Dialog.Content>
            </Dialog.Root>
          </div>

          <hr />

          <div className="mb-4 mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Fragment key={index}>
                <div className="flex items-start justify-start gap-2 rounded-md bg-secondary p-2 shadow">
                  <span className="rounded-lg bg-zinc-200 p-2">
                    <User className="size-5" />
                  </span>

                  <div className="space-y-0.5">
                    <div className="flex items-center">
                      <h2 className="text-sm font-semibold">
                        Avaliador {index}
                      </h2>

                      <div className="ms-auto flex">
                        <RatingStars rating={index + 1} />
                      </div>
                    </div>
                    <p className="text-sm">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
