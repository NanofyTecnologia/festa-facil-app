import { toast } from 'react-toastify'
import { createMutation } from 'react-query-kit'

import { offerings } from '@/services/offerings'

export function useCreateOffer() {
  const mutation = createMutation({
    mutationFn: offerings.create,
    mutationKey: ['create-offer'],
    onError: () => {
      return toast.error('Ops! Algo deu errado. Tente novamente.', {
        toastId: 'create-offer-error',
      })
    },
  })

  return mutation()
}
