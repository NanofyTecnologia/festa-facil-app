export type Category = {
  id: string
  slug: string
  name: string
  _count: {
    offering: number
  }
}

export type GetCategoriesResponse = Category[]

export type CreateCategoriesResponse = Omit<Category, 'id' | '_count'>

export type DeleteCategoryResponse = {
  id: string
}
