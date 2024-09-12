import { Search } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import CategoryList from './components/category-list'
import ServiceList from './components/services-list'

export default function Page() {
  return (
    <>
      <main className="bg-secondary px-4 py-12">
        <h1 className="text-start text-5xl">
          <b>Encontre tudo</b> para <b>planejar</b> sua <b>festa</b> dos sonhos
        </h1>

        <div className="relative mt-12 flex items-center">
          <Input.Root
            placeholder="Pesquisar..."
            className="h-10 bg-white pe-12"
          />

          <Button.Root size="icon" variant="ghost" className="absolute right-2">
            <Search className="size-4" />
          </Button.Root>
        </div>
      </main>

      <section className="px-4 py-6">
        <h2 className="mb-2 font-semibold">Categorias</h2>

        <CategoryList />
      </section>

      <section className="px-4 py-6">
        <h2 className="mb-2 font-semibold">Recomendados</h2>

        <ServiceList />
      </section>
    </>
  )
}
