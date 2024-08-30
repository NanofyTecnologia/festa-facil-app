import axios from '@/lib/axios'

import { type GetServiceByUserIdResponse } from './types'

export const services = {
  async getByUserId(id: string) {
    const { data } = await axios.get<GetServiceByUserIdResponse[]>(
      '/user/services',
      {
        headers: {
          Authorization: id,
        },
      },
    )

    return data
  },
}
