import { Area } from 'react-easy-crop'

export default function getCroppedImg(
  imageSrc: string,
  crop: Area,
): Promise<{ fileUrl: string; blob: Blob }> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.crossOrigin = 'anonymous'
    image.src = imageSrc
    image.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      const scaleX = image.naturalWidth / image.width
      const scaleY = image.naturalHeight / image.height

      canvas.width = crop.width
      canvas.height = crop.height

      if (ctx) {
        ctx.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height,
        )
      }

      canvas.toBlob((blob) => {
        if (blob) {
          const fileUrl = URL.createObjectURL(blob)
          resolve({ fileUrl, blob })
        } else {
          reject(new Error('Falha ao cortar a imagem'))
        }
      }, 'image/jpeg')
    }
    image.onerror = (err) => reject(err)
  })
}
