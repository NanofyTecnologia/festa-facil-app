import axios from 'axios'

import { env } from '../env/index.mjs'

const BASE_URL = env.NEXT_PUBLIC_API_URL

function getAPIClient() {
  const instance = axios.create({
    baseURL: BASE_URL,
  })

  instance.interceptors.request.use(async (config) => {
    const csrftoken = localStorage.getItem('csrftoken')

    if (csrftoken) {
      config.headers.Authorization = csrftoken
    }

    return config
  })

  return instance
}

const api = getAPIClient()

export default api
