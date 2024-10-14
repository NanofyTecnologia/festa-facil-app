'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Carousel } from '@/components/ui/carousel'

import { useGetCategories } from '@/hooks/use-get-categories'

export default function CategoryList() {
  const { data: categories } = useGetCategories()

  return (
    <Carousel.Root>
      <Carousel.Content>
        {categories?.map((category) => (
          <Carousel.Item key={category.id} className="basis-auto">
            <Button.Root asChild size="sm" className="rounded-md">
              <Link href={`/categoria/${category.slug}`}>{category.name}</Link>
            </Button.Root>
          </Carousel.Item>
        ))}
      </Carousel.Content>
    </Carousel.Root>
  )
}
