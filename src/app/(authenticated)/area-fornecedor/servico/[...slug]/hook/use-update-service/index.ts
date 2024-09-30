import { createMutation } from 'react-query-kit'

import { companies } from '@/services/companies'

export const useUpdateService = () => {
  const mutation = createMutation({
    mutationFn: companies.update,
    mutationKey: ['update-service'],
    onError: () => {
      return 'error'
    },
  })

  return mutation()
}
