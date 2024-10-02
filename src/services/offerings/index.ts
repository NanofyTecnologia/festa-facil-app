import axios from '@/lib/axios'

import {
  type PostOfferingParams,
  type PostOfferingResponse,
  type GetOfferingsResponse,
  type PutOfferingParams,
  type PutOfferingResponse,
  type GetByIdOfferingParams,
  type GetbyIdOfferingResponse,
} from './types'

export const offerings = {
  async getById(params: GetByIdOfferingParams) {
    const { data } = await axios.get<GetbyIdOfferingResponse>(
      '/offering/' + params.id,
    )

    return data
  },

  async getByUserId() {
    const { data } = await axios.get<GetOfferingsResponse>('/offering/user')

    return data
  },

  async create(params: PostOfferingParams) {
    const { data } = await axios.post<PostOfferingResponse>('/offering', params)

    return data
  },

  async update(params: PutOfferingParams) {
    const { data } = await axios.put<PutOfferingResponse>('/offering', params)

    return data
  },
}
