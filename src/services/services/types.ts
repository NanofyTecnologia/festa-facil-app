export type ServicesPreview = {
  id: string
  name: string
  description: string
  address: string | null
  state: string | null
  city: string | null
  image: string
  phone: string
  email: string
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
