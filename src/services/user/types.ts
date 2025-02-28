export type UserPreview = {
  id: string
  name: string
  email: string
  cpf: string
  isActive: boolean
  role: 'ADMIN' | 'CUSTOMER' | 'SUPPLIER'
}

export type GetUserByIdParams = {
  id?: string
}

export type GetUserResponse = UserPreview
export type UpdateUserData = Partial<UserPreview>

export type CreateUserParams = Omit<UserPreview, 'id'>

export type UpdateUserParams = Partial<UserPreview>

export type DeleteUserParams = {
  id: string
}

export type GetUsersResponse = UserPreview[]
