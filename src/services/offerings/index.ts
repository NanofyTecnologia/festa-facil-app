import axios from '@/lib/axios'

import { type GetOfferingsResponse } from './types'

export const offerings = {
  async getByUserId() {
    const { data } = await axios.get<GetOfferingsResponse>('/offering/user')

    return data
  },
}
