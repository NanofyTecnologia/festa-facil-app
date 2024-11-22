import axios from '@/lib/axios'

import {
  type PostOfferingParams,
  type PostOfferingResponse,
  type GetOfferingsResponse,
  type PutOfferingParams,
  type PutOfferingResponse,
  type GetByIdOfferingParams,
  type GetbyIdOfferingResponse,
  type DeleteOfferingParams,
  type GetOfferingByCategoryParams,
  type GetOfferingByCategoryResponse,
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

  async getByCategory(params: GetOfferingByCategoryParams) {
    const { data } = await axios.get<GetOfferingByCategoryResponse>(
      '/offering/companies',
      {
        params: {
          q: params.q,
        },
      },
    )

    return data
  },

  async getByRating() {
    const { data } = await axios.get<GetOfferingsResponse>('/offering/rating')

    return data
  },

  async getOfferingsToModerate() {
    const { data } = await axios.get<GetOfferingsResponse>('/offering/moderate')

    return data
  },

  async create(params: PostOfferingParams) {
    const { data } = await axios.post<PostOfferingResponse>('/offering', params)

    return data
  },

  async update(params: PutOfferingParams) {
    const { data } = await axios.put<PutOfferingResponse>(
      '/offering/' + params.id,
      params,
    )

    return data
  },

  async delete(params: DeleteOfferingParams) {
    const { data } = await axios.delete('/offering/' + params.id)

    return data
  },
}
