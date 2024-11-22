export type Partner = {
  id: string
  name: string
  slug: string
  picture: string
  createdAt: Date
  updatedAt: Date
}

export type GetPartnersResponse = Partner[]

export type CreatePartnerParams = Omit<
  Partner,
  'id' | 'createdAt' | 'updatedAt'
>

export type DeletePartnerParams = {
  id: string
}
