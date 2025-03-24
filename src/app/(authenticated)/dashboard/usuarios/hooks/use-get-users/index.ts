import { keepPreviousData } from '@tanstack/react-query'
import { createQuery } from 'react-query-kit'

import { userAdmin } from '@/services/user'

import { IProps } from './types'

export function useGetUsers(props: IProps) {
  const { userId } = props

  const query = createQuery({
    queryKey: ['get-admin-users'],
    fetcher: userAdmin.get,
    placeholderData: keepPreviousData,
  })

  const queryResponse = query({ variables: { userId } })

  return {
    ...queryResponse,
  }
}
