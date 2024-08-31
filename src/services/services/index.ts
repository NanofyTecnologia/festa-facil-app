import axios from '@/lib/axios'

import { type ServicesPreview } from './types'

export const services = {
  async getByUserId(id: string) {
    const { data } = await axios.get<ServicesPreview[]>('/user/services', {
      headers: {
        Authorization: id,
      },
    })

    return data
  },
}
