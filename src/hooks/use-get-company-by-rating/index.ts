import { createQuery } from 'react-query-kit'

import { keepPreviousData } from '@tanstack/react-query'

import { companies } from '@/services/companies'

export function useGetCompanyByRating() {
  const query = createQuery({
    queryKey: ['get-service-by-rating'],
    fetcher: companies.getByRating,
    placeholderData: keepPreviousData,
  })

  const queryResponse = query()

  return {
    ...queryResponse,
  }
}
