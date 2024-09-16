import { createQuery } from 'react-query-kit'

import { keepPreviousData } from '@tanstack/react-query'

import { services } from '@/services/services'

export function useGetServiceByRating() {
  const query = createQuery({
    queryKey: ['get-service-by-rating'],
    fetcher: services.getByRating,
    placeholderData: keepPreviousData,
  })

  const queryResponse = query()

  return {
    ...queryResponse,
  }
}
