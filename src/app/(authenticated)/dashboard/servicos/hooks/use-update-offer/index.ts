import { toast } from 'react-toastify'
import { createMutation } from 'react-query-kit'

import { offerings } from '@/services/offerings'

export function useUpdateOffer() {
  const mutation = createMutation({
    mutationFn: offerings.update,
    mutationKey: ['update-offer'],
    onError: () => {
      return toast.error('Ops! Algo deu errado. Tente novamente.', {
        toastId: 'update-offer-error',
      })
    },
  })

  return mutation()
}
