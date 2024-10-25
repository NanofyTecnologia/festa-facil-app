'use client'

import Image from 'next/image'
import { useParams } from 'next/navigation'

import { normalizeSlug } from '@/utils/normalize-slug'

import { useGetOfferingById } from './hooks/use-get-offering-by-id'
import { Badge } from '@/components/ui/badge'

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

        <div className="mt-4 flex items-center justify-between">
          <h1 className="text-3xl font-semibold">{data?.name}</h1>

          <Badge.Root>{data?.category.name}</Badge.Root>
        </div>

        <div
          className="tiptap mt-6"
          dangerouslySetInnerHTML={{ __html: data?.description ?? '' }}
        />
      </div>
    </>
  )
}
