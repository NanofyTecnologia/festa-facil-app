'use client'

import { useSession } from 'next-auth/react'

import { Button } from '@/components/ui/button'

export default function UpdateRole() {
  const { data, update } = useSession()

  return (
    <>
      <div className="absolute bottom-12 right-12 space-y-2">
        <span className="font-bold">Cargo: {data?.user.role}</span>

        <div className="flex items-center gap-4">
          <Button.Root size="sm" onClick={() => update({ role: 'ADMIN' })}>
            ADMIN
          </Button.Root>

          <Button.Root size="sm" onClick={() => update({ role: 'SUPPLIER' })}>
            SUPPLIER
          </Button.Root>

          <Button.Root size="sm" onClick={() => update({ role: 'CUSTOMER' })}>
            CUSTOMER
          </Button.Root>
        </div>
      </div>
    </>
  )
}
