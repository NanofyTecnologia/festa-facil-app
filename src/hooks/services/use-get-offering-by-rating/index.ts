import { createQuery } from 'react-query-kit'

import { keepPreviousData } from '@tanstack/react-query'

import { offerings } from '@/services/offerings'

export function useGetOfferingByRating() {
  const query = createQuery({
    queryKey: ['get-offering-by-rating'],
    fetcher: offerings.getByRating,
    placeholderData: keepPreviousData,
  })

  const queryResponse = query()

  return {
    ...queryResponse,
  }
}
