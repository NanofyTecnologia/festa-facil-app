import { zodResolver } from '@hookform/resolvers/zod'
import { isValid } from 'date-fns'
import { useRef } from 'react'
import { useForm, SubmitHandler, UseFieldArrayAppend } from 'react-hook-form'

import { ImagePicker } from '@/components/image-picker'
import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/date-picker'
import { Dialog } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

import { ExperienceData, experienceSchema } from './schema'

interface FormExperienceProps {
  append: UseFieldArrayAppend<ExperienceData>
}

export default function FormExperience(props: FormExperienceProps) {
  const { append } = props

  const dialogCloseRef = useRef<HTMLButtonElement>(null)

  const { watch, handleSubmit, register, setValue } = useForm<ExperienceData>({
    resolver: zodResolver(experienceSchema),
  })
  const { serviceDate } = watch()

  const onSubmit: SubmitHandler<ExperienceData> = (data) => {
    append(data)

    dialogCloseRef.current?.click()
  }

  const date = isValid(new Date(serviceDate))
    ? new Date(serviceDate)
    : undefined

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-start gap-6 md:flex-row">
          <div className="h-[250px] w-full md:h-[302px] md:w-80">
            <ImagePicker onValueChange={(value) => setValue('image', value)} />
          </div>

          <div className="w-full flex-1 space-y-6">
            <div className="space-y-0.5">
              <Label.Root htmlFor="">Título</Label.Root>

              <Input.Root
                {...register('title')}
                placeholder="Casamento no Campo"
              />
            </div>

            <div className="space-y-0.5">
              <Label.Root>Descrição</Label.Root>

              <Textarea.Root
                {...register('description')}
                className="resize-none"
                placeholder="Detalhes sobre o trabalho realizado, desafios e soluções aplicadas"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-0.5">
                <Label.Root>Data do serviço</Label.Root>

                <DatePicker.Root
                  date={date}
                  setDate={(value) => {
                    if (!value) return

                    setValue(`serviceDate`, value.toISOString())
                  }}
                />
              </div>

              <div className="space-y-0.5">
                <Label.Root>Local do evento</Label.Root>

                <Input.Root
                  {...register('location')}
                  placeholder="São Carlos"
                />
              </div>
            </div>
          </div>
        </div>

        <Dialog.Footer className="mt-6 gap-y-4">
          <Dialog.Close asChild ref={dialogCloseRef}>
            <Button.Root variant="secondary">Cancelar</Button.Root>
          </Dialog.Close>

          <Button.Root type="submit">Adicionar</Button.Root>
        </Dialog.Footer>
      </form>
    </>
  )
}
