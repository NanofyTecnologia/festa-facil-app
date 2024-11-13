import Image from 'next/image'
import { Search } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'

import ImageFrame from '@/assets/images/image.png'

import OfferingList from './components/offering-list'
import CategoryList from './components/category-list'
import PartnersList from './components/partners-list'
import ServicesVideosList from './components/services-videos-list'

export default function Page() {
  return (
    <>
      <main className="bg-secondary px-4 py-12 sm:m-4 sm:rounded-md md:mx-auto md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl">
        <div className="md:mx-auto md:max-w-md">
          <h1 className="text-start text-5xl">
            <b>Encontre tudo</b> para <b>planejar</b> sua <b>festa</b> dos
            sonhos
          </h1>

          <div className="mt-12 grid grid-cols-2 items-center gap-4">
            <div className="relative flex items-center">
              <Input.Root
                placeholder="Pesquisar..."
                className="h-10 bg-white pe-12"
              />

              <Button.Root
                size="icon"
                variant="ghost"
                className="absolute right-2"
              >
                <Search className="size-4" />
              </Button.Root>
            </div>

            <Select.Root>
              <Select.Trigger>
                <Select.Value placeholder="Selecione a cidade" />
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="sao carlos">São Carlos</Select.Item>
              </Select.Content>
            </Select.Root>
          </div>
        </div>
      </main>

      <section className="px-4 py-6 md:mx-auto md:max-w-3xl md:px-0 lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl">
        <h2 className="mb-2 font-semibold">Categorias</h2>

        <CategoryList />
      </section>

      <section className="px-4 py-6 md:mx-auto md:max-w-3xl md:px-0 lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl">
        <h2 className="mb-2 font-semibold">Recomendados</h2>

        <OfferingList />
      </section>

      <section className="px-4 py-6 md:mx-auto md:max-w-3xl md:px-0 lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl">
        <div className="flex flex-col items-start gap-4 rounded bg-secondary p-4 md:flex-row">
          <Image
            width={396}
            height={396}
            src={ImageFrame}
            className="w-full rounded-md object-contain lg:max-w-80"
            alt=""
          />

          <div className="flex flex-col">
            <p className="text-justify text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur recusandae provident molestias unde quaerat quasi
              voluptate officia et eaque? Deleniti earum doloremque quas
            </p>

            <p className="mt-4 text-justify text-base">
              delectus quae? Rem voluptates accusantium quo voluptatum. Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Consequuntur
              recusandae provident molestias unde quaerat quasi voluptate
              officia et eaque? Deleniti earum doloremque quas delectus quae?
              Rem voluptates accusantium quo voluptatum.
            </p>

            <p className="mt-4 text-justify text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur recusandae provident molestias unde quaerat quasi
              voluptate officia et eaque? Deleniti earum doloremque quas
            </p>

            <div className="mt-6 text-end">
              <Button.Root className="px-6">Ver Mais</Button.Root>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-6 md:mx-auto md:max-w-3xl md:px-0 lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl">
        <h2 className="mb-2 font-semibold">Videos dos Fornecedores</h2>

        <ServicesVideosList />
      </section>

      <section className="px-4 py-6 md:mx-auto md:max-w-3xl md:px-0 lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl">
        <h2 className="mb-2 text-xl font-semibold">Lorem ipsum dolor</h2>

        <p className="text-justify">
          orem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor
          imperdiet dictum. Nunc ac cursus est, sit amet vehicula dolor. Aliquam
          felis libero, viverra fermentum ligula et, iaculis porta ligula.
          Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus
          consectetur nisi ut enim pulvinar aliquam. Duis sit amet leo ligula.
          In fermentum sed purus sit amet convallis. Nam sem velit, ullamcorper
          a blandit gravida, cursus a eros. Ut a ultricies ipsum. Donec tempor
          nulla eget odio bibendum, et consequat dui rutrum.
        </p>

        <p className="mt-4 text-justify">
          Praesent porta erat ut justo hendrerit, et eleifend quam placerat.
          Aenean a nibh tincidunt, hendrerit velit at, laoreet felis. Duis in mi
          nec urna egestas volutpat eu vitae massa. Suspendisse ligula ante,
          aliquet vel velit et, fringilla hendrerit diam. Donec ornare dui ut
          pretium dictum. Aenean bibendum augue nibh, vel varius tellus
          tristique id. Vivamus blandit pulvinar quam vel eleifend.
        </p>
      </section>

      <section className="px-4 py-6 md:mx-auto md:max-w-3xl md:px-0 lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl">
        <h2 className="mb-2 font-semibold">Parceiros</h2>

        <PartnersList />
      </section>
    </>
  )
}
