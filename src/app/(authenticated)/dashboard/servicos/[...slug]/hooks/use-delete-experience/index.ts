import { createMutation } from 'react-query-kit'
import { toast } from 'react-toastify'

import { experiences } from '@/services/experiences'

export function useDeleteExperience() {
  const mutation = createMutation({
    mutationKey: ['delete-experience'],
    mutationFn: experiences.delete,
    onSuccess: () => {
      toast.success('Informação deletada com sucesso!')
    },
    onError: () => {
      toast.error('Ops! Houve um problema ao deletar.')
    },
  })

  return mutation()
}
