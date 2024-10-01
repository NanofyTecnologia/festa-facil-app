'use client'

import Image from 'next/image'
import { useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Image as ImageIcon } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import { zodResolver } from '@hookform/resolvers/zod'

import { useImagePreview } from '@/hooks/use-image-preview'

import { serviceSchema, type ServiceData } from './schema'

export default function Content() {
  const { watch, setValue, reset, register, handleSubmit } =
    useForm<ServiceData>({
      resolver: zodResolver(serviceSchema),
    })

  const { banner, profilePic } = watch()

  const [imagePreviewBanner] = useImagePreview(banner)
  const [imagePreviewPicture] = useImagePreview(profilePic)

  const onSubmit: SubmitHandler<ServiceData> = (data) => {
    console.log(data)
  }

  const onDropBanner = useCallback((acceptedFiles: File[]) => {
    setValue('banner', acceptedFiles)
  }, [])

  const onDropPicture = useCallback((acceptedFiles: File[]) => {
    setValue('profilePic', acceptedFiles)
  }, [])

  const {
    getRootProps: getRootPropsPicture,
    getInputProps: getInputPropsPicture,
  } = useDropzone({
    onDrop: onDropPicture,
  })

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onDropBanner,
  })

  return (
    <>
      <div className="mx-auto max-w-7xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div
            {...getRootProps()}
            className="group flex h-72 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed transition-colors hover:border-black"
          >
            {!imagePreviewBanner && (
              <>
                <ImageIcon className="size-12 text-border transition-colors group-hover:text-black" />

                <h1>
                  Arraste e solte alguns arquivos aqui ou clique para selecionar
                  os arquivos
                </h1>
                <p className="text-sm text-zinc-400">
                  O tamanho máximo das imagens é 10MB
                </p>
              </>
            )}

            {imagePreviewBanner && (
              <Image
                width={1280}
                height={288}
                src={imagePreviewBanner}
                alt="pre visualizacao de imagem"
                className="h-full w-full object-cover transition-opacity group-hover:opacity-80"
              />
            )}

            <input type="file" hidden {...getInputProps} />
          </div>

          <div className="flex items-center">
            <div
              {...getRootPropsPicture()}
              className="group flex size-40 -translate-y-20 translate-x-10 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed bg-white transition-colors hover:border-black"
            >
              {!imagePreviewPicture && (
                <>
                  <ImageIcon className="size-10 text-border transition-colors group-hover:text-black" />
                  <h2 className="text-center text-xs">
                    Arraste e solte uma imagem
                  </h2>
                </>
              )}

              {imagePreviewPicture && (
                <Image
                  width={160}
                  height={160}
                  src={imagePreviewPicture}
                  alt="pre visualizacao de imagem"
                  className="h-full w-full object-cover transition-opacity group-hover:opacity-80"
                />
              )}

              <input {...getInputPropsPicture} type="file" hidden />
            </div>

            <div className="-translate-y-14 translate-x-12 space-y-2">
              <h1>
                <input
                  type="text"
                  className="h-9 rounded-lg bg-secondary px-2"
                  placeholder="Insira o nome do serviço"
                />
              </h1>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
