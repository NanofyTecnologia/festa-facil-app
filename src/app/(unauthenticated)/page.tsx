'use client'

import Image from 'next/image'
import { Fragment } from 'react'
import { Image as ImageIcon, Play, Star } from 'lucide-react'
import { SiFacebook, SiX, SiLinkedin, SiInstagram } from 'react-icons/si'

import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { Carousel } from '@/components/ui/carousel'

import { useGetStates } from './hooks/use-get-states'

import ImgIcon from '@/assets/images/image.svg'

const categories = [
  'Buffet',
  'Decoração',
  'Música e Entretenimento',
  'Animação Infantil',
  'Fotografia e Filmagem',
  'Espaço para Eventos',
]

const mostPopulars = [
  {
    id: '1',
    rating: 4.5,
    name: 'Empresa XPTO',
    category: 'Música e Entretenimento',
  },
  {
    id: '2',
    rating: 4.7,
    name: 'Empresa ABCD',
    category: 'Fotografia e Filmagem',
  },
  {
    id: '3',
    rating: 4.7,
    name: 'Empresa EFGH',
    category: 'Buffet',
  },
  {
    id: '31',
    rating: 4.2,
    name: 'Empresa EFGH',
    category: 'Buffet',
  },
  {
    id: '32',
    rating: 4.9,
    name: 'Empresa EFGH',
    category: 'Buffet',
  },
]

const reviews = [
  {
    id: '4',
    name: 'Review 1',
    review:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis rem deserunt soluta doloremque ipsum molestiae nihil optio expedita laboriosam. Ipsum vitae et eveniet quo rerum fuga quis, quaerat quae dignissimos.',
  },
  {
    id: '5',
    name: 'Review 2',
    review:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis rem deserunt soluta doloremque ipsum molestiae nihil optio expedita laboriosam. Ipsum vitae et eveniet quo rerum fuga quis, quaerat quae dignissimos.',
  },
  {
    id: '6',
    name: 'Review 3',
    review:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis rem deserunt soluta doloremque ipsum molestiae nihil optio expedita laboriosam. Ipsum vitae et eveniet quo rerum fuga quis, quaerat quae dignissimos.',
  },
  {
    id: '7',
    name: 'Review 4',
    review:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis rem deserunt soluta doloremque ipsum molestiae nihil optio expedita laboriosam. Ipsum vitae et eveniet quo rerum fuga quis, quaerat quae dignissimos.',
  },
  {
    id: '8',
    name: 'Review 5',
    review:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis rem deserunt soluta doloremque ipsum molestiae nihil optio expedita laboriosam. Ipsum vitae et eveniet quo rerum fuga quis, quaerat quae dignissimos.',
  },
  {
    id: '9',
    name: 'Review 6',
    review:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis rem deserunt soluta doloremque ipsum molestiae nihil optio expedita laboriosam. Ipsum vitae et eveniet quo rerum fuga quis, quaerat quae dignissimos.',
  },
]

export default function Home() {
  const { data: states } = useGetStates()

  return (
    <>
      <main className="bg-secondary">
        <section className="mx-auto flex min-h-96 max-w-sm flex-col items-center justify-end gap-8 pb-6 md:max-w-7xl">
          <h2 className="text-3xl font-semibold">
            Organize sua festa de forma fácil
          </h2>

          <div className="grid w-full gap-4 sm:grid-cols-1 md:grid-cols-3">
            <Select.Root>
              <Select.Trigger>
                <Select.Value placeholder="Selecione a categoria" />
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="buffet">Buffet</Select.Item>
                <Select.Item value="decoracao">Decoração</Select.Item>
                <Select.Item value="musica_entretenimento">
                  Música e Entretenimento
                </Select.Item>
                <Select.Item value="animacao_infantil">
                  Animação Infantil
                </Select.Item>
                <Select.Item value="fotografia_filmagem">
                  Fotografia e Filmagem
                </Select.Item>
                <Select.Item value="espaco">Espaço para Eventos</Select.Item>
              </Select.Content>
            </Select.Root>

            <Select.Root>
              <Select.Trigger>
                <Select.Value placeholder="Selecione o estado" />
              </Select.Trigger>
              <Select.Content>
                {states && states.length > 0 ? (
                  states?.map((state) => (
                    <Fragment key={state.name}>
                      <Select.Item value={state.acronym}>
                        {state.name}
                      </Select.Item>
                    </Fragment>
                  ))
                ) : (
                  <Select.Item disabled value="select_loading">
                    Carregando...
                  </Select.Item>
                )}
              </Select.Content>
            </Select.Root>

            <Button.Root>Pesquisar</Button.Root>
          </div>
        </section>
      </main>

      <section className="mx-auto max-w-sm space-y-16 py-12 md:max-w-7xl">
        <div className="flex flex-col gap-4">
          <div className="flex items-center">
            <h3 className="text-lg font-semibold">Pesquisar por categoria</h3>

            <span className="ms-auto block text-sm">
              Mostrar tudo ({categories.length})
            </span>
          </div>

          <Carousel.Root
            opts={{ align: 'start' }}
            className="w-full max-w-full"
          >
            <Carousel.Content>
              {categories.map((category) => (
                <Carousel.Item
                  key={category}
                  className="md:basis-1/2 lg:basis-1/4"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex min-h-56 items-center justify-center rounded-md border">
                      <ImageIcon className="size-12 text-zinc-400" />
                    </div>
                  </div>
                  <h3 className="mt-1 font-semibold">{category}</h3>
                </Carousel.Item>
              ))}
            </Carousel.Content>
            <Carousel.Previous />
            <Carousel.Next />
          </Carousel.Root>
        </div>

        <div className="flex w-full flex-col gap-4">
          <div className="flex items-center">
            <h3 className="text-lg font-semibold">Mais populares</h3>

            <span className="ms-auto block text-sm">
              Mostrar tudo ({mostPopulars.length})
            </span>
          </div>

          <Carousel.Root
            opts={{ align: 'start' }}
            className="w-full max-w-full"
          >
            <Carousel.Content>
              {mostPopulars.map((popular) => (
                <Carousel.Item
                  key={popular.id}
                  className="md:basis-1/2 lg:basis-1/4"
                >
                  <div className="relative flex min-w-72 flex-col gap-2">
                    <div className="flex min-h-56 items-center justify-center rounded-md border">
                      <ImageIcon className="size-12 text-zinc-400" />
                    </div>

                    <p className="absolute bottom-2 right-2 flex items-center space-x-1 rounded-full bg-zinc-100 px-1 font-semibold text-yellow-500">
                      <Star className="size-4" />{' '}
                      <span className="text-sm">{popular.rating}</span>
                    </p>
                  </div>
                  <h3 className="mt-1 font-semibold">{popular.name}</h3>
                </Carousel.Item>
              ))}
            </Carousel.Content>
            <Carousel.Previous />
            <Carousel.Next />
          </Carousel.Root>
        </div>
      </section>

      <section className="mx-auto max-w-sm md:max-w-7xl">
        <div className="flex flex-wrap rounded-md bg-secondary p-6 sm:flex-nowrap">
          <Image src={ImgIcon} className="w-full" alt="" />

          <div className="m-4 space-y-4">
            <h2 className="text-2xl font-bold">Lorem ipsum dolor sit amet</h2>
            <p className="text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur recusandae provident molestias unde quaerat quasi
              voluptate officia et eaque? Deleniti earum doloremque quas
              delectus quae? Rem voluptates accusantium quo voluptatum. Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Consequuntur
              recusandae provident molestias unde quaerat quasi voluptate
              officia et eaque? Deleniti earum doloremque quas delectus quae?
              Rem voluptates accusantium quo voluptatum.
            </p>

            <p className="text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur recusandae provident molestias unde quaerat quasi
              voluptate officia et eaque? Deleniti earum doloremque quas
              delectus quae? Rem voluptates accusantium quo voluptatum.
            </p>

            <div className="flex justify-end">
              <Button.Root className="px-6">Visualizar</Button.Root>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-sm space-y-16 py-12 md:max-w-7xl">
        <div className="flex w-full flex-col gap-4">
          <div className="flex items-center">
            <h3 className="text-lg font-semibold">Videos dos fornecedores</h3>

            <span className="ms-auto block text-sm">
              Mostrar tudo ({mostPopulars.length})
            </span>
          </div>

          <Carousel.Root
            opts={{ align: 'start' }}
            className="w-full max-w-full"
          >
            <Carousel.Content>
              {mostPopulars.map((popular) => (
                <Carousel.Item
                  key={popular.id}
                  className="md:basis-1/2 lg:basis-1/4"
                >
                  <div className="relative flex min-w-72 flex-col rounded-md border">
                    <div className="flex min-h-56 items-center justify-center rounded-lg border-b">
                      <Play className="size-12 text-zinc-400" />
                    </div>

                    <div className="py-4 text-center">
                      <h3 className="font-semibold">{popular.name}</h3>
                    </div>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel.Content>
            <Carousel.Previous />
            <Carousel.Next />
          </Carousel.Root>
        </div>
      </section>

      <section className="mx-auto max-w-sm space-y-16 py-12 md:max-w-7xl">
        <div className="flex w-full flex-col gap-4">
          <div className="flex items-center">
            <h3 className="text-lg font-semibold">Avaliações</h3>

            <span className="ms-auto block text-sm">
              Mostrar tudo ({mostPopulars.length})
            </span>
          </div>

          <Carousel.Root
            opts={{ align: 'start', loop: true }}
            className="w-full max-w-full"
          >
            <Carousel.Content>
              {reviews.map((review, index) => (
                <Carousel.Item
                  index={index}
                  key={review.id}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <div className="col-span-1 grid grid-cols-6 items-start justify-center gap-6 rounded-md bg-secondary p-4">
                    <div className="size-16 rounded-full bg-zinc-200"></div>

                    <div className="col-span-5 space-y-0.5">
                      <h2 className="font-semibold">{review.name}</h2>
                      <p className="text-justify text-sm">{review.review}</p>
                    </div>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel.Content>
            <Carousel.Previous />
            <Carousel.Next />
          </Carousel.Root>
        </div>
      </section>

      <footer className="bg-secondary p-4">
        <div className="mx-auto grid max-w-sm grid-cols-1 text-center sm:text-start md:max-w-7xl md:grid-cols-5">
          <div className="space-y-4">
            <h1 className="text-2xl font-semibold">Company Name</h1>

            <div className="space-y-1">
              <h2 className="text-sm font-bold">Redes Sociais</h2>
              <div className="flex items-center justify-center gap-2 sm:justify-start">
                <SiFacebook className="size-5" />
                <SiX className="size-5" />
                <SiLinkedin className="size-5" />
                <SiInstagram className="size-5" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-sm font-semibold">Fornecedores</h2>

            <div className="space-y-1">
              <p>Empresa ABCD</p>
              <p>Empresa EFGH</p>
              <p>Empresa IJKL</p>
              <p>Empresa MNPO</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-sm font-semibold">Links Rápidos</h2>

            <div className="space-y-1">
              <p>Fornecedores</p>
              <p>Sobre</p>
              <p>Contato</p>
              <p>Autenticação</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-sm font-semibold">Categorias</h2>

            <div className="space-y-1">
              <p>Buffet</p>
              <p>Decoração</p>
              <p>Música e Entretenimento</p>
              <p>Fotografia e Filmagem</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-sm font-semibold">Contato</h2>

            <div className="space-y-1">
              <p>E-mail: example@email.com</p>
              <p>Telefone: (99) 99999-9999</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
