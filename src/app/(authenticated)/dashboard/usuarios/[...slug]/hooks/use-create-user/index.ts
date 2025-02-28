import { createMutation } from 'react-query-kit'

import { user } from '@/services/user'

export function useCreateUser() {
  const mutation = createMutation({
    mutationKey: ['create-user'],
    mutationFn: user.create,
  })

  return mutation()
}
