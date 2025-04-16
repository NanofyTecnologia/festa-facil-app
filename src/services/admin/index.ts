import axios from '@/lib/axios'

import type { UpdateOfferingData } from './types'

export const admin = {
  async updateOffering(params: UpdateOfferingData) {
    const { data } = await axios.put('/admin/offering', params)

    return data
  },

  async getDashboardData() {
    const { data } = await axios.get('/admin/dashboard')

    return data
  },
}
