import { createQuery } from 'react-query-kit'

import { keepPreviousData } from '@tanstack/react-query'

import { services } from '@/services/services'

export function useGetServices() {
  const query = createQuery({
    queryKey: ['get-services'],
    fetcher: services.get,
    placeholderData: keepPreviousData,
  })

  const queryResponse = query()

  return {
    ...queryResponse,
  }
}
