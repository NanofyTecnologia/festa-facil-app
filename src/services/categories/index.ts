import axios from '@/lib/axios'
import {
  type GetCategoriesResponse,
  type CreateCategoriesResponse,
  type DeleteCategoryResponse,
} from './types'

export const categories = {
  async get() {
    const { data } = await axios.get<GetCategoriesResponse>('/categories')

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
