import type { LoginRequest, LoginResponse } from '../types/auth'

export const mockLoginAccount = {
  email: 'demo@gmail.com',
  password: 'wang8119',
}

const mockUser = {
  id: 'usr_admin_01',
  name: 'ShowExam Admin',
  email: mockLoginAccount.email,
  role: 'Admin',
} as const

const NETWORK_DELAY_MS = 2000

function wait(duration: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, duration)
  })
}

export async function mockLoginApi(
  payload: LoginRequest,
): Promise<LoginResponse> {
  await wait(NETWORK_DELAY_MS)

  const normalizedEmail = payload.email.trim().toLowerCase()

  if (normalizedEmail === 'unauthorized@showexam.dev') {
    throw {
      status: 401,
      message: '登入已失效，請重新登入後再試一次。',
    }
  }

  if (
    normalizedEmail !== mockLoginAccount.email ||
    payload.password !== mockLoginAccount.password
  ) {
    throw {
      status: 400,
      message: '帳號或密碼錯誤，請確認後重新輸入。',
    }
  }

  return {
    accessToken: 'mock-access-token-showexam-admin',
    user: mockUser,
  }
}
