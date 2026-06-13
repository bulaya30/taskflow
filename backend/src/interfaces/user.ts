

export interface LoginDto {
  idToken: string
}

export interface UserInput {
  name: string,
  email: string,
  password: string
}
export interface User {
  id?: string
  firstName?: string
  lastName?: string
  email: string

  active?: boolean
  deletedAt?: string | object
  updatedAt?: string | object
  createdAt?: string | object
}