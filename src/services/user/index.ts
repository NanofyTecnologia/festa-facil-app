import axios from '@/lib/axios'

import type { GetUsersResponse, GetUserResponse, UpdateUserData } from './types'

export const user = {
  async getById(id: string) {
    const { data: user } = await axios.get<GetUserResponse>('/user/' + id)

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

export const userAdmin = {
  async get({ userId }: { userId: string }) {
    const { data } = await axios.get<GetUsersResponse>('/admin/user', {
      headers: {
        Authorization: userId,
      },
    })

    return data
  },
}
