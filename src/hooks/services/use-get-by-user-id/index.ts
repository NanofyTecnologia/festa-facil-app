import { createQuery } from 'react-query-kit'
import { keepPreviousData } from '@tanstack/react-query'

import { user } from '@/services/user'

import { IProps } from './types'

export function useGetUserById(props: IProps) {
  const { id } = props

  const query = createQuery({
    queryKey: ['get-user-by-id'],
    fetcher: user.getById,
    placeholderData: keepPreviousData,
    enabled: !!id,
  })

  const queryResponse = query({ variables: { id } })

  return {
    ...queryResponse,
  }
}
