import axios from '@/lib/axios'

import {
  type ServicesPreview,
  type GetServicesResponse,
  type UpdateServiceParams,
  type CreateServiceParams,
} from './types'

export const services = {
  async create(data: CreateServiceParams) {
    const { data: createdData } = await axios.post<ServicesPreview>(
      '/services',
      data,
    )

    return createdData
  },

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

  async getByRating() {
    const { data } = await axios.get<ServicesPreview>('/services/rating')

    return data
  },

  async getByUserId() {
    const { data } = await axios.get<GetServicesResponse>('/user/services')

    return data
  },

  async getByCategory({ q }: { q: string }) {
    const { data } = await axios.get<GetServicesResponse>(
      '/services/category',
      {
        params: {
          q,
        },
      },
    )

    return data
  },
}
