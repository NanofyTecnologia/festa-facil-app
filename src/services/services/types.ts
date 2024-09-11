export type ServicesPreview = {
  id: string
  name: string
  description: string
  address: string
  state: string
  city: string
  image: string
  phone: string
  email: string
  rating: number
  createdAt: Date
  updatedAt: Date
  images: {
    filename: string
    alt: string
  }[]
  category: {
    id: string
    name: string
    slug: string
  }
}

export type GetServicesResponse = ServicesPreview[]
export type CreateServiceParams = Partial<ServicesPreview>
export type UpdateServiceParams = {
  id: string
  data: Partial<ServicesPreview>
}
