import { mockLoginApi } from '../mock/auth'
import type { ApiError, LoginRequest, LoginResponse } from '../types/auth'
import { clearAuthSession, saveAuthSession } from '../utils/storage'

function normalizeApiError(error: unknown): ApiError {
  if (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    'message' in error
  ) {
    return error as ApiError
  }

  return {
    status: 500,
    message: '系統發生未預期錯誤，請稍後再試。',
  }
}

function handleUnauthorized(error: ApiError) {
  if (error.status === 401) {
    clearAuthSession()
  }
}

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  try {
    const response = await mockLoginApi(payload)
    saveAuthSession(response)
    return response
  } catch (error) {
    const apiError = normalizeApiError(error)
    handleUnauthorized(apiError)
    throw apiError
  }
}
