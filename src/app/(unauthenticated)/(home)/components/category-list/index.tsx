'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Carousel } from '@/components/ui/carousel'

import { useGetCategories } from '@/hooks/use-get-categories'

const colors = [
  { base: 'bg-app-primary', hover: 'hover:bg-app-primary/70' },
  { base: 'bg-app-cyan', hover: 'hover:bg-app-cyan/70' },
  { base: 'bg-app-lime', hover: 'hover:bg-app-lime/70' },
  { base: 'bg-app-secondary', hover: 'hover:bg-app-secondary/70' },
]

export default function CategoryList() {
  const { data: categories } = useGetCategories()

  return (
    <Carousel.Root>
      <Carousel.Content>
        {categories?.map((category, index) => (
          <Carousel.Item key={category.id} className="basis-auto">
            <Button.Root
              asChild
              size="sm"
              className={`h-16 w-60 rounded-md ${colors[index % colors.length].base} ${colors[index % colors.length].hover}`}
            >
              <Link className="text-wrap" href={`/categoria/${category.id}`}>
                {category.name}
              </Link>
            </Button.Root>
          </Carousel.Item>
        ))}
      </Carousel.Content>
    </Carousel.Root>
  )
}
