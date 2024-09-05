import axios from '@/lib/axios'
import { type UpdateUserData } from './types'

export const user = {
  async update({
    userId,
    data,
  }: {
    userId: string | null
    data: UpdateUserData
  }) {
    const { data: updatedData } = await axios.put('/user', data, {
      headers: {
        Authorization: userId,
      },
    })

    return updatedData
  },
}
