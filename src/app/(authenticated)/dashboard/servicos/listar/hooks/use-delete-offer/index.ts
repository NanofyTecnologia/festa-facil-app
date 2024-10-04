import { toast } from 'react-toastify'
import { createMutation } from 'react-query-kit'
import { useQueryClient } from '@tanstack/react-query'

import { offerings } from '@/services/offerings'
import { GetOfferingsResponse } from '@/services/offerings/types'

import { IProps } from './types'

export function useDeleteOffer({ queryKey }: IProps) {
  const queryClient = useQueryClient()

  const mutation = createMutation({
    mutationFn: offerings.delete,
    mutationKey: ['delete-offer'],
    onMutate: async (params) => {
      await queryClient.cancelQueries({ queryKey })

      const previousOffers = queryClient.getQueryData(queryKey)

      queryClient.setQueryData(queryKey, (old?: GetOfferingsResponse) => {
        if (old) {
          return old.filter((offer) => offer.id !== params.id)
        }

        return old
      })

      return { previousOffers }
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(queryKey, context?.previousOffers)

      toast.error('Ops! Algo deu errado. Tente novamente.')

      return error
    },
  })

  return mutation()
}
