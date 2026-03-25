import type { ReactNode } from 'react'
import { EmptyState } from '../components/ui/EmptyState'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'
import { Notice } from '../components/ui/Notice'
import { PageHeader } from '../components/ui/PageHeader'
import { Panel } from '../components/ui/Panel'
import { useLoginForm } from '../hooks/useLoginForm'
import { mockLoginAccount } from '../mock/auth'
import { cn } from '../utils/cn'

type FieldProps = {
  id: 'email' | 'password'
  label: string
  value: string
  placeholder: string
  type?: 'text' | 'email' | 'password'
  error?: string
  disabled?: boolean
  onChange: (value: string) => void
  onBlur: () => void
  trailingAction?: ReactNode
}

function Field({
  id,
  label,
  value,
  placeholder,
  type = 'text',
  error,
  disabled,
  onChange,
  onBlur,
  trailingAction,
}: FieldProps) {
  return (
    <label className="block space-y-2.5">
      <span className="text-sm font-semibold text-ink-950">{label}</span>
      <div
        className={cn(
          'flex items-center rounded-[22px] border bg-white px-4 py-3 shadow-[0_12px_30px_rgba(16,32,51,0.06)] transition',
          error
            ? 'border-rose-500/60 ring-4 ring-rose-500/10'
            : 'border-mist-200 hover:border-mist-300 focus-within:border-teal-500 focus-within:ring-4 focus-within:ring-teal-500/10'
        )}
      >
        <input
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
          className="min-w-0 flex-1 border-none bg-transparent text-sm text-ink-950 outline-none placeholder:text-mist-400"
        />
        {trailingAction}
      </div>
      <p className={cn('min-h-5 text-xs', error ? 'text-rose-500' : 'text-transparent')}>
        {error || 'placeholder'}
      </p>
    </label>
  )
}

export function LoginPage() {
  const {
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
  } = useLoginForm()

  const emailError = touched.email ? errors.email : ''
  const passwordError = touched.password ? errors.password : ''

  return (
    <>
      <PageHeader
        title="Question One : Login Form"
        description="Build a login page featuring frontend validation, mock API integration, and session state display, with a focus on intuitive user feedback"
        actions={
          <div className="glass-outline rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink-700">
            Frontend Validation Demo
          </div>
        }
      />

      <div className="grid gap-6">
        <Panel className="overflow-hidden p-0">
          <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
            <div className="bg-[linear-gradient(160deg,_rgba(16,32,51,0.98),_rgba(39,71,107,0.92))] px-6 py-7 text-white sm:px-8 sm:py-8">
              <div className="flex h-full flex-col">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/12 bg-white/8 px-3 py-2 text-xs uppercase tracking-[0.2em] text-white/72">
                    SECURE ACCESS
                </div>
                <div className="mt-6 space-y-4">
                  <h2 className="font-display text-3xl font-semibold tracking-tight">
                     Login Flow Demo
                  </h2>
                  <p className="max-w-md text-sm leading-7 text-white/72">
                      This page mocks a call to 
                        <code className="mx-1 rounded bg-white/10 px-2 py-1 text-xs text-white">
                          /api/login
                        </code>
                       . Upon success, the access token persists to localStorage.
                </p>
                </div>

                <div className="mt-8 grid gap-4">
                  <div className="rounded-[24px] border border-white/10 bg-white/8 p-5">
                    <p className="text-xs uppercase tracking-[0.18em] text-white/50">
                      Demo Account
                    </p>
                    <p className="mt-3 text-sm font-medium">{mockLoginAccount.email}</p>
                    <p className="mt-1 text-sm text-white/72">{mockLoginAccount.password}</p>
                  </div>
                  <div className="rounded-[24px] border border-amber-400/30 bg-amber-400/10 p-5">
                    <p className="text-xs uppercase tracking-[0.18em] text-amber-400">
                      401 Demo
                    </p>
                    <p className="mt-3 text-sm leading-6 text-white/76">
                        Use <span className="font-medium text-white">unauthorized@showexam.dev</span>{' '}
                       to trigger a 401 API response and verify that the token is cleared and re-authentication is enforced.
                    </p>
                  </div>
                </div>

              <div className="mt-auto hidden pt-8 lg:block">
  <div className="rounded-[26px] border border-white/10 bg-white/6 p-5">
    <p className="text-sm font-medium text-white">Interaction Highlights</p>
    <ul className="mt-4 space-y-3 text-sm leading-6 text-white/68">
      <li>Error messages display only after field blur</li>
      <li>Buttons are disabled with a loading state during submission</li>
      <li>Session status updates instantly upon successful login</li>
      <li>401 responses will clear existing tokens</li>
    </ul>
  </div>
</div>
              </div>
            </div>

            <div className="bg-[linear-gradient(180deg,_rgba(255,255,255,0.96),_rgba(244,247,251,0.92))] px-6 py-7 sm:px-8 sm:py-8">
              <div className="mx-auto flex max-w-lg flex-col gap-6">
                <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-600">
                Account Sign In
              </p>
              <h3 className="font-display text-3xl font-semibold tracking-tight text-ink-950">
                Sign in to your account
              </h3>
          <p className="text-sm leading-7 text-ink-700">
            Please enter your email and password. Fields will display validation results on blur, 
            and clear status feedback will be provided during submission.
          </p>
      </div>

                {sessionNotice ? <Notice variant="warning">{sessionNotice}</Notice> : null}
                {apiError ? <Notice variant="error">{apiError}</Notice> : null}
                {successMessage ? <Notice variant="success">{successMessage}</Notice> : null}

                <form
                  className="space-y-2"
                  onSubmit={(event) => {
                    event.preventDefault()
                    void handleSubmit()
                  }}
                >
                  <Field
                    id="email"
                    label="Account Email"
                    type="email"
                    value={values.email}
                    placeholder="name@company.com"
                    error={emailError}
                    disabled={isSubmitting}
                    onChange={(value) => handleChange('email', value)}
                    onBlur={() => handleBlur('email')}
                  />

                  <Field
                    id="password"
                    label="Password"
                    type={passwordVisible ? 'text' : 'password'}
                    value={values.password}
                    placeholder="At least 6 characters"
                    error={passwordError}
                    disabled={isSubmitting}
                    onChange={(value) => handleChange('password', value)}
                    onBlur={() => handleBlur('password')}
                    trailingAction={
                      <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={() => setPasswordVisible((visible) => !visible)}
                        className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-ink-700 transition hover:bg-mist-100 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {passwordVisible ? 'Hide' : 'Show'}
                      </button>
                    }
                  />

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={!canSubmit}
                      className={cn(
                        'flex w-full items-center justify-center rounded-[22px] px-5 py-4 text-sm font-semibold text-white transition',
                        canSubmit
                          ? 'bg-ink-950 shadow-[0_18px_36px_rgba(16,32,51,0.18)] hover:-translate-y-0.5 hover:bg-ink-900 active:translate-y-0'
                          : 'cursor-not-allowed bg-ink-800/50'
                      )}
                    >
                      {isSubmitting ? (
                        <LoadingSpinner className="text-white" label="Login..." />
                      ) : (
                        'Login & Authenticate'
                      )}
                    </button>
                  </div>
                </form>

                {session ? (
                  <div className="rounded-[26px] border border-emerald-500/20 bg-[linear-gradient(180deg,_rgba(47,158,117,0.08),_rgba(255,255,255,0.9))] p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-500">
                          Login Success
                        </p>
                        <h4 className="mt-2 font-display text-2xl font-semibold text-ink-950">
                          {session.user.name}
                        </h4>
                        <p className="mt-2 text-sm leading-6 text-ink-700">
                          {session.user.email} | {session.user.role}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="rounded-full border border-mist-200 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink-700 transition hover:border-mist-300 hover:bg-white"
                      >
                        Logout
                      </button>
                    </div>
                    <div className="mt-4 rounded-[20px] border border-white/70 bg-white/80 p-4">
                      <p className="text-xs uppercase tracking-[0.16em] text-ink-700/70">
                        Access Token
                      </p>
                      <p className="mt-2 break-all font-mono text-sm text-ink-950">
                        {session.accessToken}
                      </p>
                    </div>
                  </div>
                ) : (
                  <EmptyState
                    title="Session not established"
                    description="Once signed in, the current user info and access token will be displayed here for you to verify the authentication flow."
                  />
                )}
              </div>
            </div>
          </div>
        </Panel>
      </div>
    </>
  )
}
