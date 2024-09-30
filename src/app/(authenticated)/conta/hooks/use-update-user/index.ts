import { toast } from 'react-toastify'
import { createMutation } from 'react-query-kit'

import { user } from '@/services/user'

export function useUpdateUser() {
  const mutation = createMutation({
    mutationFn: user.update,
    mutationKey: ['update-user'],
    onError: () => {
      return toast.error('Ops! Algo deu errado. Tente novamente!', {
        toastId: 'update-user-error',
      })
    },
  })

  return mutation()
}
