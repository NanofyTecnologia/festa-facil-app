import { getServerSession } from 'next-auth'
import { type NextRequest, NextResponse } from 'next/server'

import { authOptions } from '@/lib/next-auth'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)

  const searchParams = new URL(req.url).searchParams

  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'

  const url = new URL(callbackUrl, req.url)

  return NextResponse.redirect(url.toString(), {
    headers: {
      'Set-Cookie': `csrfToken=${session?.user.id}; HttpOnly; Path=/; Max-Age=2592000; SameSite=None; Secure`,
    },
  })
}
