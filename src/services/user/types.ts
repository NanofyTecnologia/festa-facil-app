export type UserPreview = {
  id: string
  name: string
  email: string
  cpf: string
  isActive: boolean
  role: 'ADMIN' | 'CUSTOMER' | 'SUPPLIER'
}

export type GetUserResponse = UserPreview
export type UpdateUserData = Partial<UserPreview>

export type GetUsersResponse = UserPreview[]
