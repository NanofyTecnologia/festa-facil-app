'use client'

import { useSession } from 'next-auth/react'

import { Button } from '@/components/ui/button'

export default function SwitchRole() {
  const { update } = useSession()

  return (
    <div className="absolute bottom-4 right-4 flex items-center gap-2">
      <Button.Root size="sm" onClick={() => update({ role: 'ADMIN' })}>
        Admin
      </Button.Root>

      <Button.Root size="sm" onClick={() => update({ role: 'SUPPLIER' })}>
        Fornecedor
      </Button.Root>
    </div>
  )
}
