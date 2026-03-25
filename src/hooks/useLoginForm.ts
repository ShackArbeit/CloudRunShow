import { useEffect, useState } from 'react'
import { login } from '../services/authService'
import type {
  ApiError,
  LoginFormErrors,
  LoginFormValues,
  LoginResponse,
} from '../types/auth'
import {
  clearAuthSession,
  getStoredAccessToken,
  getStoredUser,
} from '../utils/storage'

const defaultValues: LoginFormValues = {
  email: '',
  password: '',
}

type FieldName = keyof LoginFormValues

function validateEmail(email: string) {
  if (!email.trim()) {
    return 'Please type email'
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailPattern.test(email.trim())) {
    return 'Please enter a valid email address.'
  }

  return ''
}

function validatePassword(password: string) {
  if (!password) {
    return 'Please type password'
  }

  if (password.length < 6) {
    return 'At least 6 characters'
  }

  return ''
}

function validateField(name: FieldName, value: string) {
  if (name === 'email') {
    return validateEmail(value)
  }

  return validatePassword(value)
}

function getFormErrors(values: LoginFormValues): LoginFormErrors {
  return {
    email: validateEmail(values.email),
    password: validatePassword(values.password),
  }
}

function hasErrors(errors: LoginFormErrors) {
  return Object.values(errors).some(Boolean)
}

export function useLoginForm() {
  const [values, setValues] = useState<LoginFormValues>(defaultValues)
  const [errors, setErrors] = useState<LoginFormErrors>({})
  const [touched, setTouched] = useState<Record<FieldName, boolean>>({
    email: false,
    password: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [session, setSession] = useState<LoginResponse | null>(null)
  const [sessionNotice, setSessionNotice] = useState<string | null>(null)

  useEffect(() => {
    const storedToken = getStoredAccessToken()
    const storedUser = getStoredUser()

    if (!storedToken || !storedUser) {
      return
    }

    setSession({
      accessToken: storedToken,
      user: storedUser,
    })
    setSuccessMessage('已從 localStorage 恢復登入狀態。')
  }, [])

  useEffect(() => {
    if (!successMessage) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setSuccessMessage(null)
    }, 3000)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [successMessage])

  useEffect(() => {
    if (!sessionNotice) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setSessionNotice(null)
    }, 3000)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [sessionNotice])

  function handleChange(name: FieldName, value: string) {
    setValues((current) => ({
      ...current,
      [name]: value,
    }))

    if (touched[name]) {
      setErrors((current) => ({
        ...current,
        [name]: validateField(name, value),
      }))
    }

    setApiError(null)
    setSessionNotice(null)
  }

  function handleBlur(name: FieldName) {
    setTouched((current) => ({
      ...current,
      [name]: true,
    }))

    setErrors((current) => ({
      ...current,
      [name]: validateField(name, values[name]),
    }))
  }

  async function handleSubmit() {
    if (isSubmitting) {
      return
    }

    const nextTouched = {
      email: true,
      password: true,
    }
    const nextErrors = getFormErrors(values)

    setTouched(nextTouched)
    setErrors(nextErrors)
    setApiError(null)
    setSuccessMessage(null)
    setSessionNotice(null)

    if (hasErrors(nextErrors)) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await login({
        email: values.email.trim().toLowerCase(),
        password: values.password,
      })

      setSession(response)
      setSuccessMessage('登入成功，accessToken 已寫入 localStorage。')
      setValues(defaultValues)
      setTouched({
        email: false,
        password: false,
      })
      setErrors({})
      setPasswordVisible(false)
    } catch (error) {
      const apiErrorResponse = error as ApiError
      setSession(null)
      setApiError(apiErrorResponse.message)
      setSuccessMessage(null)
      setValues(defaultValues)
      setTouched({
        email: false,
        password: false,
      })
      setErrors({})
      setPasswordVisible(false)

      if (apiErrorResponse.status === 401) {
        setSessionNotice('偵測到 401 未授權，系統已自動清除 token。')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleLogout() {
    clearAuthSession()
    setSession(null)
    setSuccessMessage(null)
    setApiError(null)
    setSessionNotice('Login session cleared. Please sign in again !!')
  }

  const canSubmit =
    !isSubmitting &&
    values.email.trim().length > 0 &&
    values.password.length > 0

  return {
    values,
    errors,
    touched,
    isSubmitting,
    passwordVisible,
    apiError,
    successMessage,
    session,
    sessionNotice,
    canSubmit,
    setPasswordVisible,
    handleChange,
    handleBlur,
    handleSubmit,
    handleLogout,
  }
}
