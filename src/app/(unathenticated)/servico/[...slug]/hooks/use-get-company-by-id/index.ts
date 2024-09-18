import { createQuery } from 'react-query-kit'
import { keepPreviousData } from '@tanstack/react-query'

import { companies } from '@/services/companies'

import { type IProps } from './types'

export function useGetCompanyById(props: IProps) {
  const { id } = props

  const query = createQuery({
    queryKey: ['get-service-by-id'],
    fetcher: companies.getById,
    placeholderData: keepPreviousData,
  })

  const queryResponse = query({ variables: id })

  return {
    ...queryResponse,
  }
}
