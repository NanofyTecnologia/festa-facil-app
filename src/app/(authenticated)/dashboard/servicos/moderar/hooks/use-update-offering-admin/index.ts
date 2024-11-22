import { createMutation } from 'react-query-kit'

import { admin } from '@/services/admin'

export function useUpdateOfferingAdmin() {
  const mutation = createMutation({
    mutationKey: ['update-offering-admin'],
    mutationFn: admin.updateOffering,
  })

  return mutation()
}
