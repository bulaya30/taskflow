

export interface LoginDto {
  idToken: string
}

export interface RegisterUserInput {
  name: string,
  email: string,
  password: string
}
export interface User {
  id?: string
  firstName?: string
  lastName?: string
  email: string

  contact?: string
  company?: string
  address?: string

  facebook?: string
  linkedin?: string
  twitter?: string
  github?: string
  instagram?: string

  about?: string
  photo?: string
  title?: string
  date?: Date
  active?: boolean
  deletedAt?: string | object
  updatedAt?: string | object
  createdAt?: string | object
}