'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { Star } from 'lucide-react'

import { Fragment } from 'react'

import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/shadcn'

import { useGetCategoryBySlug } from './hooks/use-get-category-by-slug'

export default function Content() {
  const { slug } = useParams()

  const { data: category } = useGetCategoryBySlug({ slug: slug[0] })

  return (
    <>
      <div className="mx-auto h-96 max-w-7xl px-4 py-6 xl:px-0">
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

        <div className="my-6 space-y-6">
          <Input.Root placeholder="Pesquisar..." />

          <div className="grid grid-cols-3 gap-4">
            {category?.offering.map((offering) => (
              <div className="" key={offering.slug}>
                <Image src={offering.banner} alt="" width={384} height={192} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
