import { signIn } from 'next-auth/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FcGoogle } from 'react-icons/fc'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'

const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Insira seu e-mail' })
    .email({ message: 'E-mail inválido' }),
})

type SignInData = z.infer<typeof signInSchema>

export default function SignIn() {
  const pathname = usePathname()

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
  })

  const onSubmit: SubmitHandler<SignInData> = async (data) => {
    await toast.promise(
      signIn('email', {
        ...data,
        redirect: false,
        callbackUrl: `/auth/csrfToken?callbackUrl=${pathname}`,
      }),
      {
        pending: 'Enviando...',
        success: 'E-mail enviado com sucesso!',
      },
    )
  }

  return (
    <div className="mt-12 sm:mt-4">
      {!isSubmitted && (
        <>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input.Root
              placeholder="E-mail"
              {...register('email')}
              disabled={isSubmitting}
              data-invalid={errors.email ? 'true' : 'false'}
              className="rounded data-[invalid=true]:focus-visible:ring-destructive"
            />

            <Button.Root
              type="submit"
              className="w-full"
              disabled={isSubmitting}
              size="sm"
            >
              Acessar
            </Button.Root>
          </form>

          <span className="my-6 block text-center text-zinc-500">Ou</span>

          <Button.Root variant="outline" className="w-full" disabled>
            <FcGoogle className="me-1 size-5" /> Entrar com Google
          </Button.Root>
        </>
      )}

      {isSubmitted && (
        <>
          <div className="mb-6 text-center">
            <p className="text-2xl font-semibold">
              E-mail enviado com sucesso!
              <span className="block text-base font-normal text-zinc-500">
                Verifique sua caixa de mensagens para acessar sua conta.
              </span>
            </p>
          </div>

          <Button.Root
            variant="secondary"
            className="w-full text-base"
            onClick={() => reset()}
          >
            Enviar novamente
          </Button.Root>
        </>
      )}
    </div>
  )
}
