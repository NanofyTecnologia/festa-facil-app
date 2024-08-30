import { Link } from './active-link'

export function Header() {
  return (
    <header className="flex items-center border-b p-4">
      <div className="me-4 border-r pe-4">
        <h1 className="text-xl font-semibold">Company Logo</h1>
      </div>

      <nav className="flex items-center space-x-2.5">
        <Link href="/area-fornecedor">Inicio</Link>

        <Link href="/area-fornecedor/meus-servicos">Meus serviços</Link>
      </nav>
    </header>
  )
}
