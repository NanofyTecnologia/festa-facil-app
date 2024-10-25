import { createMutation } from 'react-query-kit'

import { partners } from '@/services/partners'

export function useCreatePartner() {
  const mutation = createMutation({
    mutationKey: ['create-partner'],
    mutationFn: partners.create,
  })

  return mutation()
}
