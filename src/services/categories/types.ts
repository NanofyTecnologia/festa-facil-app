export type Category = {
  id: string
  slug: string
  name: string
  _count: {
    offering: number
  }
}

export type GetCategoriesResponse = Category[]

export type GetCategoriesOfferingParams = {
  id: string | undefined
}

export type GetCategoryBySlugParams = {
  slug: string
}
export type GetCategoryBySlugResponse = {
  name: string
  background: string
  offering: {
    name: string
    city: string
    slug: string
    state: string
    banner: string
    rating: number
  }[]
}

export type CreateCategoriesResponse = Omit<Category, 'id' | '_count'>

export type DeleteCategoryResponse = {
  id: string
}
