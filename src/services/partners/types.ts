export type Partner = {
  id: string
  name: string
  slug: string
  picture: string
  createdAt: Date
  updatedAt: Date
}

export type GetPartnersResponse = Partner[]

export type DeletePartnerParams = {
  id: string
}
