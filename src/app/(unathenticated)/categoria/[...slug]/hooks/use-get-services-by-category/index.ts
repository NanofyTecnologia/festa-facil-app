import { createQuery } from 'react-query-kit'
import { keepPreviousData } from '@tanstack/react-query'

import { companies } from '@/services/companies'

import { type IProps } from './types'

export function useGetServicesByCategory(props: IProps) {
  const { q } = props

  const query = createQuery({
    queryKey: ['get-services-by-category'],
    fetcher: companies.getByCategory,
    placeholderData: keepPreviousData,
  })

  const queryResponse = query({ variables: { q } })

  return { ...queryResponse, queryKey: query.getKey({ q }) }
}
