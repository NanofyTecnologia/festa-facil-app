import Image from 'next/image'
import Link from 'next/link'

import {
  IoLogoLinkedin,
  IoLogoFacebook,
  IoLogoInstagram,
} from 'react-icons/io5'

import ImageLogo from '@/assets/images/celebra_logo.png'

export default function Footer() {
  return (
    <footer className="mt-auto border-t px-4 py-6">
      <div className="flex flex-col items-center justify-center">
        <Image src={ImageLogo} alt="" className="h-auto w-40" />
        <p className="text-sm text-zinc-300">
          Desenvolvido por Nanofy Tecnologia
        </p>
      </div>

      <div className="mt-4 flex items-center justify-center gap-4 text-app-primary">
        <Link href="#">
          <IoLogoInstagram className="size-5" />
        </Link>

        <Link href="#">
          <IoLogoLinkedin className="size-5" />
        </Link>

        <Link href="#">
          <IoLogoFacebook className="size-5" />
        </Link>
      </div>
    </footer>
  )
}
