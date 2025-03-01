'use client'

import Image from 'next/image'
import { useParams } from 'next/navigation'

import { Star, StarHalf } from 'lucide-react'

import { CheckboxGroup, Checkbox as HeroCheckbox } from '@heroui/checkbox'
import { Fragment, useState } from 'react'

import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/shadcn'

import { useGetCategoryBySlug } from './hooks/use-get-category-by-slug'

export default function Content() {
  const { slug } = useParams()

  const [minRating, setMinRating] = useState(4)
  const { data: category } = useGetCategoryBySlug({ slug: slug[0] })

  const handleFilter = (rating: number) => {
    setMinRating(rating)
  }

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

          <div className="grid grid-cols-4 gap-6">
            <div className="col-span-1 space-y-6 rounded-md border p-4">
              <h3 className="font-medium">Filtros</h3>

              <div className="space-y-2">
                <p className="text-sm font-semibold">Avaliações</p>

                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`size-5 cursor-pointer ${
                        star <= minRating
                          ? 'fill-yellow-500 text-yellow-500'
                          : 'text-gray-300'
                      }`}
                      onClick={() => handleFilter(star)}
                    />
                  ))}

                  <span className="text-sm">e acima</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-semibold">Categorias</p>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Checkbox.Root />
                    <span className="text-sm font-normal">Aniversários</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Checkbox.Root />
                    <span className="text-sm font-normal">Infantil</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Checkbox.Root />
                    <span className="text-sm font-normal">Casamentos</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Checkbox.Root />
                    <span className="text-sm font-normal">Temática</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-3 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
              {category?.offering.map((offering) => {
                const rating = Math.round(offering.rating * 2) / 2

                return (
                  <div
                    key={offering.slug}
                    className="flex transform cursor-pointer flex-col space-y-4 rounded-lg border bg-white p-6 transition-all duration-300 ease-in-out hover:scale-105"
                  >
                    <Image
                      src={offering.banner}
                      width={384}
                      height={192}
                      className="h-48 w-full rounded-md object-cover"
                      alt={`Banner de ${offering.name}`}
                    />

                    <div className="flex flex-1 flex-col gap-y-2">
                      <h3 className="line-clamp-3 text-lg font-semibold text-gray-900">
                        {offering.name}
                      </h3>

                      <p className="line-clamp-3 text-justify text-sm text-zinc-600">
                        {offering.summary}
                      </p>

                      <div className="mt-auto flex items-center space-x-2 pt-4">
                        {renderStars(rating)}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
