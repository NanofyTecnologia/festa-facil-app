import axios from '@/lib/axios'

export const upload = {
  async create(file: FormData) {
    const { data } = await axios.post<string>('/upload', file, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return data
  },
}
