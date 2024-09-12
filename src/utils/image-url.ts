import { env } from '@/lib/env/index.mjs'

export function loadImageUrl(file: string) {
  return `${env.NEXT_PUBLIC_API_URL}/uploads/${file}`
}
