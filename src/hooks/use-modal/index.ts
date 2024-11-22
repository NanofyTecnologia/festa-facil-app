import { useState } from 'react'

export function useModal<T>() {
  const [data, setData] = useState<T | null>(null)

  const [opened, setOpened] = useState<boolean>(false)

  function open(data?: T) {
    if (data) {
      setData(data)
    }

    setOpened(true)
  }

  function close() {
    if (data) {
      setData(null)
    }

    setOpened(false)
  }

  function toggle() {
    if (data) {
      setData(null)
    }

    setOpened((state) => !state)
  }

  return { opened, data, open, close, toggle }
}
