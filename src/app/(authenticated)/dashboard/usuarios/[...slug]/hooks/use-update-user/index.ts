import { createMutation } from 'react-query-kit'

import { user } from '@/services/user'

export function useUpdateUser() {
  const mutation = createMutation({
    mutationKey: ['update-user'],
    mutationFn: user.update,
  })

  return mutation()
}
