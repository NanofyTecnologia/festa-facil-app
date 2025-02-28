import axios from '@/lib/axios'

import type {
  GetUsersResponse,
  GetUserByIdParams,
  GetUserResponse,
  UpdateUserParams,
  CreateUserParams,
  DeleteUserParams,
} from './types'

export const user = {
  async getById(params: GetUserByIdParams) {
    const { data: user } = await axios.get<GetUserResponse>(
      '/user/' + params.id,
    )

    return user
  },

  async create(params: CreateUserParams) {
    const { data } = await axios.post('/user', params)

    return data
  },

  async update({ id, ...restData }: UpdateUserParams) {
    const { data } = await axios.put('/user/' + id, restData)

    return data
  },

  async delete(params: DeleteUserParams) {
    const { data } = await axios.delete('/user/' + params.id)

    return data
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
