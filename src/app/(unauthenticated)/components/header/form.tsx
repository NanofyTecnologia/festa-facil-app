'use client'

import { z } from 'zod'
import { signIn } from 'next-auth/react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import axios from '@/lib/axios'

const signInSchema = z.object({
  email: z
    .string()
    .email({ message: 'E-mail inválido' })
    .min(1, { message: 'Insira seu e-mail' }),
})

type SignInData = z.infer<typeof signInSchema>

export default function Form() {
  const { register, handleSubmit } = useForm<SignInData>()

  const onSubmit: SubmitHandler<SignInData> = async (data) => {
    const response = await signIn('email', {
      ...data,
      redirect: false,
    })

    console.log(response)

    axios.interceptors.request.use((config) => {
      config.headers.Authorization = 'token'

      return config
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 text-end">
      <Input.Root placeholder="E-mail" {...register('email')} />

      <Button.Root type="submit" size="sm" className="px-6">
        Enviar
      </Button.Root>
    </form>
  )
}
