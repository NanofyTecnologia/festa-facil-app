export type Offering = {
  id: string
  name: string
  email: string
  phone: string
  city: string
  cep: string
  slug: string
  state: string
  description: string
  rating: number
  createdAt: string
  updatedAt: string
  banner: string
  profilePic: string
  categoryId: string
  category: {
    name: string
    slug: string
  }
}

export type GetOfferingsResponse = Offering[]
