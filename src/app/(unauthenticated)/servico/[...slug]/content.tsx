'use client'

import Image from 'next/image'
import { Fragment } from 'react'
import { format } from 'date-fns'
import { useParams } from 'next/navigation'
import { Calendar, CreditCard, Mail, MapPin } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { Carousel } from '@/components/ui/carousel'

import { normalizeSlug } from '@/utils/normalize-slug'

import { useGetOfferingById } from './hooks/use-get-offering-by-id'

interface IParams {
  [key: string]: string[]
}

export default function Content() {
  const { slug } = useParams<IParams>()

  const { id } = normalizeSlug(slug)

  const { data } = useGetOfferingById({ id })

  return (
    <>
      <div className="mx-auto px-4 py-6 xl:max-w-7xl xl:px-0">
        {data?.banner && (
          <Image
            width={1280}
            height={384}
            src={data?.banner}
            className="max-h-96 w-full rounded-lg object-cover"
            alt=""
          />
        )}

        <div className="my-4 flex items-center">
          <h1 className="text-2xl font-semibold">{data?.name}</h1>

          <Dialog.Root>
            <Dialog.Trigger asChild>
              <Button.Root size="icon" className="ms-auto">
                <CreditCard className="size-5" />
              </Button.Root>
            </Dialog.Trigger>

            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Informações: {data?.name}</Dialog.Title>
              </Dialog.Header>
              <Dialog.Description />

              <div className="space-y-2">
                <p className="flex items-center gap-2">
                  <Mail className="size-5" /> {data?.email}
                </p>
              </div>

              <Dialog.Footer>
                <Dialog.Close>
                  <Button.Root size="sm" variant="secondary">
                    Fechar
                  </Button.Root>
                </Dialog.Close>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Root>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <Badge.Root>{data?.category.name}</Badge.Root>
        </div>

        <div className="space-y-4">
          <div
            className="tiptap mt-6"
            dangerouslySetInnerHTML={{ __html: data?.description ?? '' }}
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Nossa experiência</h2>

          <div className="">
            <Carousel.Root>
              <Carousel.Content>
                {data?.experiences.map((item) => (
                  <Fragment key={item.id}>
                    <Carousel.Item className="basis-1/4 py-2">
                      <div className="space-y-2 rounded-md border p-4">
                        <Image
                          width={178}
                          height={178}
                          src={item.image}
                          className="max-h-48 w-full rounded-md object-cover"
                          alt=""
                        />

                        <div className="space-y-1">
                          <h3>{item.title}</h3>

                          <p className="line-clamp-3 text-justify text-zinc-400">
                            {item.description}
                          </p>
                        </div>

                        <div className="flex items-center">
                          <p className="flex items-center gap-1">
                            <MapPin className="size-4" /> {item.location}
                          </p>

                          <p className="flex items-center gap-1">
                            <Calendar className="size-4" />{' '}
                            {format(item.serviceDate, 'PPP')}
                          </p>
                        </div>
                      </div>
                    </Carousel.Item>
                  </Fragment>
                ))}
              </Carousel.Content>
            </Carousel.Root>
          </div>
        </div>
      </div>
    </>
  )
}
