import axios from '@/lib/axios'

import { DeleteExperienceParams } from './types'

export const experiences = {
  async delete(params: DeleteExperienceParams) {
    const { data } = await axios.delete('/experiences/' + params.id)

    return data
  },
}
