import Link from 'next/link'
import {
  IoLogoLinkedin,
  IoLogoFacebook,
  IoLogoInstagram,
} from 'react-icons/io5'

export default function Footer() {
  return (
    <footer className="border-t px-4 py-6">
      <div className="text-center">
        <h1 className="text-xl font-bold text-zinc-500">Festa Fácil</h1>
        <p className="text-sm text-zinc-300">
          Desenvolvido por Nanofy Tecnologia
        </p>
      </div>

      <div className="mt-4 flex items-center justify-center gap-4">
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
