'use client'

import Image from 'next/image'
import { useParams } from 'next/navigation'

import { Star, StarHalf } from 'lucide-react'

import { Fragment } from 'react'

import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/shadcn'

import { useGetCategoryBySlug } from './hooks/use-get-category-by-slug'

export default function Content() {
  const { slug } = useParams()

  const { data: category } = useGetCategoryBySlug({ slug: slug[0] })

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating)
    const halfStar = rating % 1 !== 0
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0)

    const stars = []

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          className="size-4 fill-yellow-500 text-yellow-500"
          key={`full-${i}`}
        />,
      )
    }

    if (halfStar) {
      stars.push(
        <StarHalf
          className="size-4 fill-yellow-500 text-yellow-500"
          key="half"
        />,
      )
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star className="size-4" key={`empty-${i}`} />)
    }

    return stars
  }

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-6 xl:px-0">
        <div className="h-96">
          <div
            className={cn('flex h-full items-center rounded-md bg-cover')}
            style={{ backgroundImage: `url(${category?.background})` }}
          >
            <div className="flex h-full w-full flex-col justify-center rounded-md bg-black/55 px-6">
              <h1 className="text-4xl font-semibold text-white">
                {category?.name}
              </h1>

              <div className="my-4">
                <Breadcrumb.Root>
                  <Breadcrumb.List>
                    <Breadcrumb.Item>
                      <Breadcrumb.Link
                        href="/"
                        className="text-zinc-200 hover:text-white"
                      >
                        Inicio
                      </Breadcrumb.Link>
                    </Breadcrumb.Item>

                    <Breadcrumb.Separator className="text-zinc-200" />

                    <Breadcrumb.Item>
                      <Breadcrumb.Link
                        href="/servicos"
                        className="text-zinc-200 hover:text-white"
                      >
                        Todos serviços
                      </Breadcrumb.Link>
                    </Breadcrumb.Item>

                    <Breadcrumb.Separator className="text-zinc-200" />

                    <Breadcrumb.Item>
                      <Breadcrumb.Page className="text-white">
                        {category?.name}
                      </Breadcrumb.Page>
                    </Breadcrumb.Item>
                  </Breadcrumb.List>
                </Breadcrumb.Root>
              </div>
            </div>
          </div>
        </div>

        <div className="my-6 space-y-6">
          <Input.Root placeholder="Pesquisar..." />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {category?.offering.map((offering) => {
              const rating = Math.round(offering.rating * 2) / 2

              return (
                <div
                  key={offering.slug}
                  className="transform cursor-pointer space-y-4 rounded-lg border bg-white p-6 transition-all duration-300 ease-in-out hover:scale-105"
                >
                  <Image
                    src={offering.banner}
                    width={384}
                    height={192}
                    className="h-48 w-full rounded-md object-cover"
                    alt={`Banner de ${offering.name}`}
                  />

                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {offering.name}
                    </h3>

                    <p className="text-sm text-zinc-600">{offering.summary}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    {renderStars(rating)}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
