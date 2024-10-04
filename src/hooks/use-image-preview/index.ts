'use client'

import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'

export function useImagePreview(
  file: FileList | File[] | null,
): [string, Dispatch<SetStateAction<string>>] {
  const [src, setSrc] = useState<string>('')

  useEffect(() => {
    if (file && file[0]) {
      const preview = URL.createObjectURL(file[0])

      if (preview !== src) {
        setSrc(preview)
      }
    }
  }, [file])

  return [src, setSrc]
}
