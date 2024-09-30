import { createQuery } from 'react-query-kit'

import { keepPreviousData } from '@tanstack/react-query'

import { offerings } from '@/services/offerings'

export function useGetOfferingsByUserId() {
  const query = createQuery({
    queryKey: ['get-services-by-user-id'],
    fetcher: offerings.getByUserId,
    placeholderData: keepPreviousData,
  })

  const queryResponse = query()

  return {
    ...queryResponse,
  }
}
