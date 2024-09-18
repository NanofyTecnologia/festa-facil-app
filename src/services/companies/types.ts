export type CompanyPreview = {
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

export type GetCompanyByCategoryResponse = {
  name: string
  result: CompanyPreview[]
}
export type GetCompaniesResponse = CompanyPreview[]
export type CreateCompanyParams = Partial<CompanyPreview>
export type UpdateCompanyParams = {
  id: string
  data: Partial<CompanyPreview>
}
