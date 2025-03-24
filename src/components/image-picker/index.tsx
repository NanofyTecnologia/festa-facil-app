import Image from 'next/image'

import { Check, ImageIcon, Repeat } from 'lucide-react'

import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Cropper from 'react-easy-crop'
import { toast } from 'react-toastify'

import { useImagePreview } from '@/hooks/use-image-preview'
import getCroppedImg from '@/utils/cropped-image'

import { Button } from '../ui/button'

interface ImagePickerProps {
  type?: 'banner' | 'profile'
  value?: string
  onValueChange: (value: FileList | File[]) => void
}

export type Area = {
  width: number
  height: number
  x: number
  y: number
}

const MAX_FILE_SIZE = 5 * 1024 * 1024
const ACCEPTED_FILE_TYPES = [
  'image/jpg',
  'image/jpeg',
  'image/png',
  'image/tiff',
  'image/bmp',
]

function ImagePicker(props: ImagePickerProps) {
  const { type = 'banner', value, onValueChange } = props

  const [file, setFile] = useState<FileList | File[] | null>(null)
  const [imagePreview] = useImagePreview(file)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [showCropper, setShowCropper] = useState(false)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>()
  const [croppedImage, setCroppedImage] = useState<string | null>()

  const onDrop = useCallback(
    (acceptedFiles: FileList | File[] | null) => {
      if (!acceptedFiles) return

      const file = acceptedFiles[0]

      if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
        toast.warn('Insira uma imagem do tipo JPEG | PNG | TIFF | BMP')
        return
      }

      if (file.size > MAX_FILE_SIZE) {
        toast.warn('O arquivo deve ser menor que 5MB')
        return
      }

      setFile(acceptedFiles)
      setShowCropper(true)
    },
    [setFile],
  )

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: false,
  })

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const handleConfirmCrop = useCallback(async () => {
    if (imagePreview && croppedAreaPixels) {
      const { fileUrl: croppedImageUrl, blob } = await getCroppedImg(
        imagePreview,
        croppedAreaPixels,
      )

      if (!croppedImageUrl) {
        return
      }

      const croppedFile = new File([blob], 'cropped-img.png', {
        type: blob.type,
      })

      setCroppedImage(croppedImageUrl)
      onValueChange([croppedFile])
      setShowCropper(false)
    }
  }, [imagePreview, croppedAreaPixels, onValueChange])

  useEffect(() => {
    if (!value) return

    setCroppedImage(value)
  }, [value])

  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center">
      <div
        data-hidden={!(!imagePreview && !croppedImage)}
        {...getRootProps({ className: 'dropzone' })}
        className="w-full data-[hidden=true]:hidden"
      >
        <div className="flex flex-1 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-md border-2 border-dashed transition-all duration-500 hover:border-muted-foreground">
          <div className="flex flex-col items-center px-4 py-24">
            <ImageIcon className="size-10 text-black" />

            <span className="text-center text-sm">
              Selecione ou arraste a imagem aqui
            </span>
            <p className="text-xs text-zinc-400">Tamanho máximo 5MB</p>

            <input id="file" type="file" {...getInputProps()} hidden />
          </div>
        </div>
      </div>

      {imagePreview && showCropper && (
        <div className="relative mt-4 h-56 w-full rounded-lg border-2 border-dashed">
          <Cropper
            image={imagePreview}
            crop={crop}
            maxZoom={10}
            zoom={zoom}
            aspect={type === 'banner' ? 3 / 2 : 1}
            onCropChange={setCrop}
            classes={{ containerClassName: 'rounded-lg' }}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />

          <div className="absolute right-2 top-1/2 flex -translate-y-1/2 flex-col items-center gap-2">
            <Button.Root
              size="icon"
              onClick={handleConfirmCrop}
              className="bg-green-600 hover:bg-green-600/80"
            >
              <Check className="size-5" />
            </Button.Root>

            <Button.Root
              size="icon"
              onClick={open}
              className="bg-blue-600 hover:bg-blue-600/80"
            >
              <Repeat className="size-5" />
            </Button.Root>
          </div>
        </div>
      )}

      {croppedImage && !showCropper && (
        <div className="relative h-full w-full rounded-lg border-2 border-dashed">
          <Image
            width={384}
            height={224}
            src={croppedImage}
            className="h-full w-full rounded-lg object-contain"
            alt="cropped image"
          />

          <div className="absolute bottom-1 left-1/2 flex -translate-x-1/2 gap-2">
            <Button.Root
              size="icon"
              onClick={open}
              className="bg-blue-600 hover:bg-blue-600/80"
            >
              <Repeat className="size-5" />
            </Button.Root>
          </div>
        </div>
      )}
    </div>
  )
}

export { ImagePicker }
