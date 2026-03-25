import type { LoginResponse } from '../types/auth'

const ACCESS_TOKEN_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsZXggS29obWFubiIsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoxNzQyODgzOTgyLCJyb2xlcyI6WyJhZG1pbiIsImV4cGVydCJdLCJzY29wZSI6InJlYWQ6c3lzdGVtIHdyaXRlOmFwaSJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
const USER_KEY = "auth_provider_v1_user_claims";

export function saveAuthSession(session: LoginResponse) {
  localStorage.setItem(ACCESS_TOKEN_KEY, session.accessToken)
  localStorage.setItem(USER_KEY, JSON.stringify(session.user))
}

export function clearAuthSession() {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export function getStoredAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

export function getStoredUser() {
  const rawUser = localStorage.getItem(USER_KEY)

  if (!rawUser) {
    return null
  }

  try {
    return JSON.parse(rawUser) as LoginResponse['user']
  } catch {
    clearAuthSession()
    return null
  }
}
