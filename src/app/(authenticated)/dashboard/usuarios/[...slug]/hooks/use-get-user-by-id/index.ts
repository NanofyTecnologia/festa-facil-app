import { keepPreviousData } from '@tanstack/react-query'
import { createQuery } from 'react-query-kit'

import { user } from '@/services/user'

import { IProps } from './types'

export function useGetUserById({ id }: IProps) {
  const query = createQuery({
    queryKey: ['get-user-by-id-edit'],
    fetcher: user.getById,
    placeholderData: keepPreviousData,
    enabled: !!id,
  })

  const queryResponse = query()

  return {
    ...queryResponse,
  }
}
