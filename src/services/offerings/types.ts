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

export type GetByIdOfferingParams = {
  id: string | undefined
}
export type GetbyIdOfferingResponse = Offering

export type GetOfferingsResponse = Offering[]

export type PostOfferingParams = Partial<Offering>
export type PostOfferingResponse = Offering

export type PutOfferingParams = Partial<Offering>
export type PutOfferingResponse = Offering

export type DeleteOfferingParams = { id: string }
