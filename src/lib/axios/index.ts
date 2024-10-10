import axios from 'axios'
import { parseCookies } from 'nookies'

import { env } from '../env/index.mjs'

const BASE_URL = env.NEXT_PUBLIC_API_URL

function getAPIClient() {
  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  instance.interceptors.request.use(async (config) => {
    const { csrfToken } = parseCookies()

    if (csrfToken) {
      config.headers.Authorization = `Bearer ${csrfToken}`
    }

    return config
  })

  return instance
}

export default getAPIClient()
