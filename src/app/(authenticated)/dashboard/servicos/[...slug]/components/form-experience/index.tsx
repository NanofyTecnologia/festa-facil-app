import Image from 'next/image'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { useForm, SubmitHandler, UseFieldArrayAppend } from 'react-hook-form'
import { FaRegImage } from 'react-icons/fa'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

import { useImagePreview } from '@/hooks/use-image-preview'

import { ExperienceData, experienceSchema } from './schema'

interface FormExperienceProps {
  append: UseFieldArrayAppend<ExperienceData>
}

export default function FormExperience(props: FormExperienceProps) {
  const { append } = props

  const { watch, handleSubmit, register, setValue } = useForm<ExperienceData>({
    resolver: zodResolver(experienceSchema),
  })
  const { image } = watch()
  const [imagePreview] = useImagePreview(image)

  const onDrop = useCallback((acceptedFiles: FileList | File[] | null) => {
    setValue('image', acceptedFiles)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const onSubmit: SubmitHandler<ExperienceData> = (data) => {
    append(data)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-start gap-6 md:flex-row">
          <div className="w-full md:w-80">
            <div
              {...getRootProps()}
              className="flex h-[250px] items-center justify-center rounded-md border border-dashed md:h-[302px]"
            >
              {!imagePreview && (
                <div className="flex flex-col items-center space-y-1">
                  <FaRegImage className="size-10" />
                  <p>Arraste e solte sua imagem aqui</p>
                  <p className="text-xs">A imagem deve ter no máximo 10MB.</p>
                </div>
              )}

              {imagePreview && (
                <Image
                  width={798}
                  height={384}
                  src={imagePreview}
                  className="h-full w-full rounded-md object-cover"
                  alt=""
                />
              )}

              <input {...getInputProps()} hidden />
            </div>
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

                <Input.Root
                  {...register('serviceDate')}
                  placeholder="12 de Janeiro de 2024"
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
          <Dialog.Close asChild>
            <Button.Root variant="secondary">Cancelar</Button.Root>
          </Dialog.Close>

          <Button.Root type="submit">Adicionar</Button.Root>
        </Dialog.Footer>
      </form>
    </>
  )
}
