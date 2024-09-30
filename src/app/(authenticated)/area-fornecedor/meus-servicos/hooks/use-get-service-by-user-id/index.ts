import { createQuery } from 'react-query-kit'
import { keepPreviousData } from '@tanstack/react-query'

import { companies } from '@/services/companies'

export function useGetServiceByUserId() {
  const query = createQuery({
    queryKey: ['get-services'],
    fetcher: companies.getByUserId,
    placeholderData: keepPreviousData,
  })

  const queryResponse = query()

  return {
    ...queryResponse,
  }
}
