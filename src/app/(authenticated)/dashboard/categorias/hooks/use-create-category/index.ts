import { createMutation } from 'react-query-kit'

import { categories } from '@/services/categories'

export function useCreateCategory() {
  const mutation = createMutation({
    mutationKey: ['create-category'],
    mutationFn: categories.create,
  })

  return mutation()
}
