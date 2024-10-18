import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'

import { env } from './lib/env/index.mjs'

export default withAuth(
  async (req) => {
    const token = await getToken({ req, secret: env.NEXTAUTH_SECRET })

    const userRole = token?.role

    const allowedRolesForRoute = {
      '/dashboard': ['ADMIN', 'SUPPLIER'],
      '/conta': ['ADMIN', 'SUPPLIER', 'CUSTOMER'],
      '/dashboard/categorias': ['ADMIN'],
      '/dashboard/servicos/listar': ['ADMIN', 'SUPPLIER'],
      '/dashboard/servicos/criar': ['ADMIN', 'SUPPLIER'],
    }

    const matchedRoute = req.nextUrl.pathname

    if (!matchedRoute) {
      return NextResponse.redirect(new URL('/', req.url))
    }

    if (
      matchedRoute &&
      // eslint-disable-next-line
      // @ts-ignore
      !allowedRolesForRoute[matchedRoute]?.includes(userRole)
    ) {
      return NextResponse.redirect(new URL('/', req.url))
    }

    return NextResponse.next()
  },
  {
    secret: env.NEXTAUTH_SECRET,
    pages: {
      signIn: '/',
      signOut: '/',
      error: '/',
    },
  },
)

export const config = {
  matcher: ['/dashboard/:path*', '/conta/:path*'],
}
