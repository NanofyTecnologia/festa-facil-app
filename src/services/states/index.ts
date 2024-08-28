import axios from '@/lib/axios'

import { State } from './types'

export const states = {
  async get() {
    const { data } = await axios.get<State[]>('/states')

    return data
  },
}
