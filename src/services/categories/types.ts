export type Category = {
  id: string
  slug: string
  name: string
}

export type GetCategoriesResponse = Category[]

export type PostCategoriesResponse = Omit<Category, 'id'>
