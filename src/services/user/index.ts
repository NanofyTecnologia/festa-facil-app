import axios from '@/lib/axios'

import { type GetUserResponse, type UpdateUserData } from './types'

export const user = {
  async getById(id: string) {
    const { data: user } = await axios.get<GetUserResponse>('/user', {
      headers: {
        Authorization: id,
      },
    })

    return user
  },

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
