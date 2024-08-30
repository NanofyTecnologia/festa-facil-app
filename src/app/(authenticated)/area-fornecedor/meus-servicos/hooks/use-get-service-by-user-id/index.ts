import { createQuery } from 'react-query-kit'

import { keepPreviousData } from '@tanstack/react-query'

import { IProps } from './types'
import { services } from '@/services/services'

export function useGetServiceByUserId(props: IProps) {
  const { id } = props

  const query = createQuery({
    queryKey: ['get-services'],
    fetcher: services.getByUserId,
    placeholderData: keepPreviousData,
  })

  const queryResponse = query({ variables: id })

  return {
    ...queryResponse,
  }
}
