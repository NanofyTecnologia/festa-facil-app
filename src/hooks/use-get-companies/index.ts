import { createQuery } from 'react-query-kit'

import { keepPreviousData } from '@tanstack/react-query'

import { companies } from '@/services/companies'

export function useGetCompanies() {
  const query = createQuery({
    queryKey: ['get-services'],
    fetcher: companies.get,
    placeholderData: keepPreviousData,
  })

  const queryResponse = query()

  return {
    ...queryResponse,
  }
}
