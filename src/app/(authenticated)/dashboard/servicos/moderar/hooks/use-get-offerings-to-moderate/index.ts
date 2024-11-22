import { createQuery } from 'react-query-kit'

import { keepPreviousData } from '@tanstack/react-query'

import { offerings } from '@/services/offerings'

export function useGetOfferingsToModerate() {
  const query = createQuery({
    queryKey: ['get-offerings-to-moderate'],
    fetcher: offerings.getOfferingsToModerate,
    placeholderData: keepPreviousData,
  })

  const queryResponse = query()

  return {
    ...queryResponse,
    queryKey: query.getKey(),
  }
}
