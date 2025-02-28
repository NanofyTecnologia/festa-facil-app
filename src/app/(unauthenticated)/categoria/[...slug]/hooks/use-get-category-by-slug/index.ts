import { keepPreviousData } from '@tanstack/react-query'
import { createQuery } from 'react-query-kit'

import { categories } from '@/services/categories'

import { IProps } from './types'

export function useGetCategoryBySlug(props: IProps) {
  const { slug } = props

  const query = createQuery({
    queryKey: ['get-category-by-slug'],
    fetcher: categories.getBySlug,
    placeholderData: keepPreviousData,
  })

  const queryResponse = query({ variables: { slug } })

  return { ...queryResponse }
}
