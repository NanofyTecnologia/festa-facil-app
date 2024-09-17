import { createQuery } from 'react-query-kit'
import { keepPreviousData } from '@tanstack/react-query'

import { services } from '@/services/services'

import { type IProps } from './types'

export function useGetServiceById(props: IProps) {
  const { id } = props

  const query = createQuery({
    queryKey: ['get-service-by-id'],
    fetcher: services.getById,
    placeholderData: keepPreviousData,
  })

  const queryResponse = query({ variables: id })

  return {
    ...queryResponse,
  }
}
