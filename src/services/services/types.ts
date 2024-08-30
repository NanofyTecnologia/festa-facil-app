export type GetServiceByUserIdResponse = {
  id: string
  name: string
  description: string
  address: string | null
  state: string | null
  city: string | null
  createdAt: Date
  updatedAt: Date
}
