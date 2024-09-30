'use client'

import { useEffect } from 'react'
import { setCookie } from 'nookies'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function Page() {
  const { data } = useSession()
  const { replace } = useRouter()
  const searchParams = useSearchParams()

  const callbackUrl = searchParams.get('callbackUrl')

  useEffect(() => {
    if (!data?.user.id) {
      return
    }

    setCookie(null, 'csrfToken', data.user.id, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
      httpOnly: true,
    })

    localStorage.setItem('csrfToken', data?.user.id)

    replace(callbackUrl ?? '/')
  }, [data?.user, replace, setCookie, callbackUrl])

  return <></>
}
