'use client'

import { useEffect, useState } from 'react'

export function useImagePreview(file: FileList | File[] | null): [string] {
  const [src, setSrc] = useState<string>('')

  useEffect(() => {
    if (file && file[0]) {
      const preview = URL.createObjectURL(file[0])

      if (preview !== src) {
        setSrc(preview)
      }
    }
  }, [file])

  return [src]
}
