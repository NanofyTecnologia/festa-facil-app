import { createQuery } from 'react-query-kit'
import { keepPreviousData } from '@tanstack/react-query'

import { user } from '@/services/user'

import { IProps } from './types'

export function useGetUser(props: IProps) {
  const { id } = props

  const query = createQuery({
    queryKey: ['get-user'],
    fetcher: user.getById,
    placeholderData: keepPreviousData,
  })

  const queryResponse = query({ variables: id })

  return {
    ...queryResponse,
  }
}
