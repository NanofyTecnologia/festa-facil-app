import Image from 'next/image'

import ImageCelebra from '@/assets/images/Pattern.png'

export default function AnnounceBanner() {
  return (
    <>
      <div className="corner-only h-[420px] w-full">
        <div className="triangle-cut relative h-full w-full bg-app-primary">
          <div className="mr-12 flex h-full items-center justify-end">
            <p className="text-center text-2xl text-white">
              Simplificamos tudo para que seus{' '}
              <span className="block">
                momentos especiais tornem-se inesquecíveis.
              </span>
            </p>
          </div>
          <div className="absolute -left-20 top-0 rotate-90">
            <Image src={ImageCelebra} className="w-[560px]" alt="" />
          </div>
        </div>
      </div>
    </>
  )
}
