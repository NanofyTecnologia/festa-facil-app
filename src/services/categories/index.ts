import axios from '@/lib/axios'
import { GetCategoriesResponse } from './types'

export const categories = {
  async get() {
    const { data } = await axios.get<GetCategoriesResponse>('/categories')

    return data
  },

  async create() {
    const { data } = await axios.post('/categories')

    return data
  },
}
