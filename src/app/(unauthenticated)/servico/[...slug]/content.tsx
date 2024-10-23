'use client'

import Image from 'next/image'
import { useParams } from 'next/navigation'

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
      <div className="mx-auto max-w-7xl py-6">
        {data?.banner && (
          <Image
            width={1280}
            height={384}
            src={data?.banner}
            className="max-h-96 w-full rounded-lg object-cover"
            alt=""
          />
        )}

        <h1 className="mt-4 text-xl font-semibold">{data?.name}</h1>

        <div
          className="tiptap mt-6"
          dangerouslySetInnerHTML={{ __html: data?.description ?? '' }}
        />
      </div>
    </>
  )
}
