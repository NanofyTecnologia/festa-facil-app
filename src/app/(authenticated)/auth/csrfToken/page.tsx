'use client'

import { useRouter, useSearchParams } from 'next/navigation'

export default function Page() {
  const { replace } = useRouter()
  const searchParams = useSearchParams()

  const callbackUrl = searchParams.get('callbackUrl')

  return replace(callbackUrl ?? '/')
}
