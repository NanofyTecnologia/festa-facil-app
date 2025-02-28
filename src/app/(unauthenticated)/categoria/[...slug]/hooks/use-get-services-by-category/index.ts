import { keepPreviousData } from '@tanstack/react-query'
import { createQuery } from 'react-query-kit'

import { companies } from '@/services/companies'

import { type IProps } from './types'

export function useGetServicesByCategory(props: IProps) {
  const { id } = props

  const query = createQuery({
    queryKey: ['get-services-by-category'],
    fetcher: companies.getByCategory,
    placeholderData: keepPreviousData,
  })

  const queryResponse = query({ variables: { id } })

  return { ...queryResponse, queryKey: query.getKey({ id }) }
}
