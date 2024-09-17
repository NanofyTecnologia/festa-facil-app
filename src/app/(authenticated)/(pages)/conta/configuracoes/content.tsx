'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { ChevronLeft, CircleHelp, Pencil, User } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Tooltip } from '@/components/ui/tooltip'

const role: { [key: string]: string } = {
  ADMIN: 'Administrador',
  SUPPLIER: 'Fornecedor',
  CONSUMER: 'Normal',
}

export default function Content() {
  const { back } = useRouter()
  const { data } = useSession()

  if (!data?.user) {
    return (
      <div className="rouded-md bg-secondary p-6">
        <h2 className="text-center text-2xl">Carregando...</h2>
      </div>
    )
  }

  return (
    <>
      <div className="mt-4 flex items-center gap-4 px-4">
        <Button.Root
          size="icon"
          variant="default"
          className="rounded-md"
          onClick={back}
        >
          <ChevronLeft className="size-5" />
        </Button.Root>

        <h1 className="text-lg font-medium">Minha conta</h1>
      </div>

      <main className="px-4 py-6 sm:m-4 sm:rounded-md md:mx-auto md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl">
        <form className="flex items-start gap-2">
          {data?.user.image && <Image src={data?.user.image} alt="" />}

          {!data?.user.image && (
            <>
              <label htmlFor="picture">
                <div className="relative flex size-16 items-center justify-center rounded-full bg-secondary p-4">
                  <span className="absolute -right-1 -top-1 rounded-full border-4 border-white bg-blue-400 p-1">
                    <Pencil className="size-3 text-white" />
                  </span>

                  <User className="size-10 text-zinc-600" />
                </div>
              </label>

              <input id="picture" type="file" hidden />
            </>
          )}

          <div className="space-y-0.5">
            <h2 className="font-semibold">{data?.user.name}</h2>

            <div className="flex gap-2">
              <p className="font-medium text-zinc-500">
                {role[data?.user.role]}
              </p>

              <Tooltip.Provider>
                <Tooltip.Root delayDuration={5000}>
                  <Tooltip.Trigger type="button">
                    <CircleHelp className="size-4" />
                  </Tooltip.Trigger>
                  <Tooltip.Content>
                    Esse é o nivel de acesso da sua conta
                  </Tooltip.Content>
                </Tooltip.Root>
              </Tooltip.Provider>
            </div>
          </div>
        </form>
      </main>
    </>
  )
}
