import { keepPreviousData } from '@tanstack/react-query'
import { createQuery } from 'react-query-kit'

import { partners } from '@/services/partners'

export function useGetPartners() {
  const query = createQuery({
    queryKey: ['get-partners'],
    fetcher: partners.get,
    placeholderData: keepPreviousData,
  })

  const queryResponse = query()

  return {
    ...queryResponse,
    queryKey: query.getKey(),
  }
}
