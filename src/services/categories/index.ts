import axios from '@/lib/axios'
import { GetCategoriesResponse } from './types'

export const categories = {
  async get() {
    const { data } = await axios.get<GetCategoriesResponse>('/categories')

    return data
  },
}
