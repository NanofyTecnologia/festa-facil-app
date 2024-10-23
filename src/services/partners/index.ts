import axios from '@/lib/axios'

import { type DeletePartnerParams, type GetPartnersResponse } from './types'

export const partners = {
  async get() {
    const { data } = await axios.get<GetPartnersResponse>('/partner')

    return data
  },

  async create(params) {
    const { data } = await axios.post('/partner', params)

    return data
  },

  async delete(params: DeletePartnerParams) {
    const { data } = await axios.delete('/partner/' + params.id)

    return data
  },
}
