import Image from 'next/image'
import { Search } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import ImgIcon from '@/assets/images/image.svg'

import ServiceList from './components/services-list'
import CategoryList from './components/category-list'
import ServicesVideosList from './components/services-videos-list'

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

      <section className="px-4 py-6">
        <div className="rounded bg-secondary p-4">
          <Image src={ImgIcon} className="w-full" alt="" />

          <p className="mb-6 text-justify text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur recusandae provident molestias unde quaerat quasi
            voluptate officia et eaque? Deleniti earum doloremque quas delectus
            quae? Rem voluptates accusantium quo voluptatum. Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Consequuntur recusandae
            provident molestias unde quaerat quasi voluptate officia et eaque?
            Deleniti earum doloremque quas delectus quae? Rem voluptates
            accusantium quo voluptatum.
          </p>

          <div className="text-end">
            <Button.Root className="px-6">Ver Mais</Button.Root>
          </div>
        </div>
      </section>

      <section className="px-4 py-6">
        <h2 className="mb-2 font-semibold">Videos dos Fornecedores</h2>

        <ServicesVideosList />
      </section>
    </>
  )
}
