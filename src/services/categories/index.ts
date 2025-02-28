import axios from '@/lib/axios'

import type {
  GetCategoriesResponse,
  CreateCategoriesResponse,
  DeleteCategoryResponse,
  GetCategoriesOfferingParams,
  GetCategoryBySlugParams,
  GetCategoryBySlugResponse,
} from './types'
import { GetOfferingByCategoryResponse } from '../offerings/types'

export const categories = {
  async get() {
    const { data } = await axios.get<GetCategoriesResponse>('/categories')

    return data
  },

  async getBySlug(params: GetCategoryBySlugParams) {
    const { data } = await axios.get<GetCategoryBySlugResponse>(
      '/categories/' + params.slug,
    )

    return data
  },

  async getOfferings(params: GetCategoriesOfferingParams) {
    const { data } = await axios.get<GetOfferingByCategoryResponse>(
      '/companies/category/' + params.id,
    )

    return data
  },

  async create(params: CreateCategoriesResponse) {
    const { data } = await axios.post('/categories', params)

    return data
  },

  async delete(params: DeleteCategoryResponse) {
    const { data } = await axios.delete('/categories/' + params.id)

    return data
  },
}
