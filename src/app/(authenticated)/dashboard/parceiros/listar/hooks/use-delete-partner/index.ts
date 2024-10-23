import { toast } from 'react-toastify'
import { createMutation } from 'react-query-kit'
import { useQueryClient } from '@tanstack/react-query'

import { partners } from '@/services/partners'
import { type GetPartnersResponse } from '@/services/partners/types'

import { type IProps } from './types'

export function useDeletePartner({ queryKey }: IProps) {
  const queryClient = useQueryClient()

  const mutation = createMutation({
    mutationKey: ['delete-partnet'],
    mutationFn: partners.delete,
    onMutate: async (params) => {
      await queryClient.cancelQueries({ queryKey })

      const previous = queryClient.getQueryData(queryKey)

      queryClient.setQueryData(queryKey, (old?: GetPartnersResponse) => {
        if (old) {
          return old.filter((item) => item.id !== params.id)
        }

        return old
      })

      return { previous }
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(queryKey, context?.previous)

      toast.error('Ops! Algo deu errado. Tente novamente.')

      return error
    },
  })

  return mutation()
}
