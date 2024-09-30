import { createMutation } from 'react-query-kit'

import { services } from '@/services/companies'

export const useUpdateService = () => {
  const mutation = createMutation({
    mutationFn: services.update,
    mutationKey: ['update-service'],
    onError: () => {
      return 'error'
    },
  })

  return mutation()
}
