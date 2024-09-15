export type ServicesPreview = {
  id: string
  name: string
  description: string
  address: string
  state: string
  city: string
  image: string
  video: string
  phone: string
  email: string
  about: string
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

export type GetServicesByCategoryParams = {
  name: string
  result: ServicesPreview[]
}
export type GetServicesResponse = ServicesPreview[]
export type CreateServiceParams = Partial<ServicesPreview>
export type UpdateServiceParams = {
  id: string
  data: Partial<ServicesPreview>
}
