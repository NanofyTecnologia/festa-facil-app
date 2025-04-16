'use client'

import { usePathname } from 'next/navigation'

import axios from 'axios'
import { useCallback, useEffect } from 'react'

function TrackVisit() {
  const pathname = usePathname()

  const trackUser = useCallback(async () => {
    if (!pathname) return

    const screen = `${window.screen.width}X${window.screen.height}`

    await axios.post('/api/track', { pathname, screen })
  }, [pathname])

  useEffect(() => {
    trackUser()
  }, [trackUser])

  return null
}

export { TrackVisit }
