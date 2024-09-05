import axios from '@/lib/axios'

import {
  type ServicesPreview,
  type GetServicesResponse,
  type UpdateServiceParams,
} from './types'

export const services = {
  async update({ id, data }: UpdateServiceParams) {
    const { data: updatedData } = await axios.put<ServicesPreview>(
      '/services/' + id,
      data,
    )

    return updatedData
  },

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
