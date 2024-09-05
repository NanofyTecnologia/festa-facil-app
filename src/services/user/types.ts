export type User = {
  name: string
  email: string
  cpf: string
  role: 'ADMIN' | 'CUSTOMER' | 'SUPPLIER'
}

export type UpdateUserData = Partial<User>
