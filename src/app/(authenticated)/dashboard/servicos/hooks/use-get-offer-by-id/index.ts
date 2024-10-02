import { createQuery } from 'react-query-kit'
import { keepPreviousData } from '@tanstack/react-query'

import { offerings } from '@/services/offerings'

import { IProps } from './types'

export function useGetOfferById(props: IProps) {
  const { id } = props

  const query = createQuery({
    queryKey: ['get-service-by-id'],
    fetcher: offerings.getById,
    placeholderData: keepPreviousData,
  })

  const queryResponse = query({ variables: { id } })

  return {
    ...queryResponse,
  }
}
