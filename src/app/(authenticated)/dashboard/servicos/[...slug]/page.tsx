import { type Metadata } from 'next'

import { normalizeSlug } from '@/utils/normalize-slug'

import Content from './content'

export interface IParams {
  [key: string]: string[]
}

export function generateMetadata({ params }: { params: IParams }): Metadata {
  const { isEditing } = normalizeSlug(params.slug)

  const title = isEditing ? 'Editar serviço' : 'Novo serviço'

  return {
    title,
  }
}

export default function Page() {
  return (
    <>
      <Content />
    </>
  )
}
