import { createQuery } from 'react-query-kit'

import { keepPreviousData } from '@tanstack/react-query'

import { partners } from '@/services/partners'

export function useGetPartners() {
  const query = createQuery({
    queryKey: ['get-services'],
    fetcher: partners.get,
    placeholderData: keepPreviousData,
  })

  const queryResponse = query()

  return {
    ...queryResponse,
  }
}
