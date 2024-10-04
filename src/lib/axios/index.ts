import axios from 'axios'

import { env } from '../env/index.mjs'

const BASE_URL = env.NEXT_PUBLIC_API_URL

export default axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})
