import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/config/prisma'

export async function POST(req: NextRequest) {
  const { pathname, screen } = await req.json()

  const ip = req.headers.get('x-forwarded-for') || req.ip || 'unknown'

  try {
    await prisma.applicationVisits.create({
      data: {
        ip,
        screen,
        pathname,
        accessedAt: new Date(),
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao registrar visita:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
