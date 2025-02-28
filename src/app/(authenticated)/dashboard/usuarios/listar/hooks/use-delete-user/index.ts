import { createMutation } from 'react-query-kit'

import { user } from '@/services/user'

export function useDeleteUser() {
  const mutation = createMutation({
    mutationKey: ['delete-user'],
    mutationFn: user.delete,
  })

  return mutation()
}
