export type ServicesPreview = {
  id: string
  name: string
  description: string
  address: string | null
  state: string | null
  city: string | null
  image: string
  createdAt: Date
  updatedAt: Date
  images: {
    filename: string
    alt: string
  }[]
  category: {
    name: string
    slug: string
  }
}
