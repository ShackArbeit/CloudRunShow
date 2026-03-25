export type User = {
  id: string
  name: string
  email: string
  role: 'Admin' | 'Operator'
}

export type LoginRequest = {
  email: string
  password: string
}

export type LoginResponse = {
  accessToken: string
  user: User
}

export type ApiError = {
  status: number
  message: string
}

export type LoginFormValues = LoginRequest

export type LoginFormErrors = Partial<Record<keyof LoginFormValues, string>>
