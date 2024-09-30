export type Offering = {
  id: string
  name: string
  phone: string
  city: string
  categoryId: string
  cep: string
  slug: string
  state: string
  description: string
  rating: number
  createdAt: string
  updatedAt: string
  banner: string
  profilePic: string
}

export type GetOfferingsResponse = Offering[]
