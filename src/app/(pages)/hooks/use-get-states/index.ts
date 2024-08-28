import { createQuery } from 'react-query-kit'
import { keepPreviousData } from '@tanstack/react-query'

import { states } from '@/services/states'

export function useGetStates() {
  const query = createQuery({
    queryKey: ['get-states'],
    fetcher: states.get,
    placeholderData: keepPreviousData,
  })

  const queryResponse = query()

  return {
    ...queryResponse,
  }
}
