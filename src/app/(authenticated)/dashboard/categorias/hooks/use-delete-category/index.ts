import { createMutation } from 'react-query-kit'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'

import { categories } from '@/services/categories'
import { GetCategoriesResponse } from '@/services/categories/types'

import { IProps } from './types'

export function useDeleteCategory({ queryKey }: IProps) {
  const queryClient = useQueryClient()

  const mutation = createMutation({
    mutationKey: ['delete-category'],
    mutationFn: categories.delete,
    onMutate: async (params) => {
      await queryClient.cancelQueries({ queryKey })

      const previous = queryClient.getQueryData(queryKey)

      queryClient.setQueryData(queryKey, (old?: GetCategoriesResponse) => {
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
