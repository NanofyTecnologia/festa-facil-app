import { toast } from 'react-toastify'
import { createMutation } from 'react-query-kit'

import { services } from '@/services/companies'

export function useCreateService() {
  const mutation = createMutation({
    mutationFn: services.create,
    mutationKey: ['create-service'],
    onError: () => {
      return toast.error('Ops! Algo deu errado. Tente novamente.', {
        toastId: 'create-service-error',
      })
    },
  })

  return mutation()
}
