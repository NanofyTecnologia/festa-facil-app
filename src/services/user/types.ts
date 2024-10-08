export type User = {
  id: string
  name: string
  email: string
  cpf: string
  role: 'ADMIN' | 'CUSTOMER' | 'SUPPLIER'
}

export type GetUserResponse = User
export type UpdateUserData = Partial<User>
