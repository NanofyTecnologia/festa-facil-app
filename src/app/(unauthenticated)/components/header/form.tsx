'use client'

import { z } from 'zod'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const signInSchema = z.object({
  email: z
    .string()
    .email({ message: 'E-mail inválido' })
    .min(1, { message: 'Insira seu e-mail' }),
})

type SignInData = z.infer<typeof signInSchema>

export default function Form() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    reset,
    register,
    handleSubmit,
    formState: { isSubmitted },
  } = useForm<SignInData>()

  const onSubmit: SubmitHandler<SignInData> = async (data) => {
    setIsSubmitting(true)

    const response = await signIn('email', {
      ...data,
      redirect: false,
    })

    console.log(response)

    setIsSubmitting(false)
  }

  return (
    <>
      {!isSubmitted && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 text-end">
          <Input.Root
            placeholder="E-mail"
            {...register('email')}
            disabled={isSubmitting}
          />

          <Button.Root
            type="submit"
            size="sm"
            className="px-6"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar'}
          </Button.Root>
        </form>
      )}

      {isSubmitted && (
        <div className="text-center">
          <h1 className="mb-2 text-lg">
            E-mail enviado com sucesso! Verifique sua caixa de mensagem para
            acessar sua conta.
          </h1>

          <Button.Root size="sm" onClick={() => reset()}>
            Enviar novamente
          </Button.Root>
        </div>
      )}
    </>
  )
}
