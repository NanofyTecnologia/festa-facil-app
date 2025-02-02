'use client'

import Image from 'next/image'
import { useFormContext } from 'react-hook-form'
import { Camera, Trash } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

import { useImagePreview } from '@/hooks/use-image-preview'

import { ServiceData } from '../../schema'
import { useDeleteExperience } from '../../hooks/use-delete-experience'

interface CardExperienceProps {
  index: number
  remove: (index: number) => void
}

export default function CardExperience(props: CardExperienceProps) {
  const { index, remove } = props

  const { mutate: handleDeleteExperience } = useDeleteExperience()
  const { register, watch } = useFormContext<ServiceData>()
  const { experiences } = watch()

  const [imagePreview] = useImagePreview(
    experiences && experiences[index]?.image,
  )

  const handleRemoveExperience = () => {
    remove(index)

    if (experiences && experiences[index].id) {
      handleDeleteExperience({
        id: experiences[index].id,
      })
    }
  }

  if (!experiences) return <></>
  const defaultImageURL = experiences[index]?.image

  return (
    <div className="space-y-4 rounded-md border p-4">
      <div className="flex justify-end">
        <Button.Root
          size="sm"
          variant="destructive"
          className="h-8 px-2 text-xs"
          onClick={handleRemoveExperience}
        >
          <Trash className="me-2 size-4" /> Remover
        </Button.Root>
      </div>

      <div className="flex flex-col items-start gap-6 md:flex-row">
        <div className="w-full md:w-80">
          <div className="flex h-[302px] items-center justify-center rounded-md border border-dashed">
            <Camera className="size-8 text-zinc-400" />

            <Image
              width={1280}
              height={360}
              className="h-full w-full rounded-md object-cover"
              src={imagePreview || defaultImageURL}
              alt=""
            />
          </div>
        </div>

        <div className="w-full flex-1 space-y-6">
          <div className="space-y-0.5">
            <Label.Root>Título</Label.Root>

            <Input.Root
              {...register(`experiences.${index}.title`)}
              placeholder="Casamento no Campo"
            />
          </div>

          <div className="space-y-0.5">
            <Label.Root>Descrição</Label.Root>

            <Textarea.Root
              {...register(`experiences.${index}.description`)}
              className="resize-none"
              placeholder="Detalhes sobre o trabalho realizado, desafios e soluções aplicadas"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-0.5">
              <Label.Root>Data do serviço</Label.Root>

              <Input.Root
                {...register(`experiences.${index}.serviceDate`)}
                placeholder="Exemplo: 12 de Janeiro de 2024"
              />
            </div>

            <div className="space-y-0.5">
              <Label.Root>Local do evento</Label.Root>

              <Input.Root
                {...register(`experiences.${index}.location`)}
                placeholder="Exemplo: São Carlos, Rio de Janeiro"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
