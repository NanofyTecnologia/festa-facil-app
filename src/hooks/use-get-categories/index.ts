import { createQuery } from 'react-query-kit'

import { keepPreviousData } from '@tanstack/react-query'

import { categories } from '@/services/categories'

export function useGetCategories() {
  const query = createQuery({
    queryKey: ['get-categories'],
    fetcher: categories.get,
    placeholderData: keepPreviousData,
  })

  const queryResponse = query()

  return {
    ...queryResponse,
    queryKey: query.getKey(),
  }
}
