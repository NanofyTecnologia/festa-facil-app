import axios from '@/lib/axios'

import { type ServicesPreview, type GetServicesResponse } from './types'

export const services = {
  async getById(id: string) {
    const { data } = await axios.get<ServicesPreview>('/services/' + id)

    return data
  },

  async getByUserId(id: string) {
    const { data } = await axios.get<GetServicesResponse>('/user/services', {
      headers: {
        Authorization: id,
      },
    })

    return data
  },
}
