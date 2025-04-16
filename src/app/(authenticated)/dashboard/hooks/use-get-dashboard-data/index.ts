import { createQuery } from 'react-query-kit'

import { admin } from '@/services/admin'

function useGetDashboardData() {
  const query = createQuery({
    queryKey: ['get-dashboard-data'],
    fetcher: admin.getDashboardData,
  })

  const queryResponse = query()

  return {
    ...queryResponse,
  }
}

export { useGetDashboardData }
