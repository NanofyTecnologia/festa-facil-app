import { createQuery } from 'react-query-kit'
import { keepPreviousData } from '@tanstack/react-query'

import { services } from '@/services/services'

export function useGetServiceByUserId() {
  const query = createQuery({
    queryKey: ['get-services'],
    fetcher: services.getByUserId,
    placeholderData: keepPreviousData,
  })

  const queryResponse = query()

  return {
    ...queryResponse,
  }
}
