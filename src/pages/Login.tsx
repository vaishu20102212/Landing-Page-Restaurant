import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Logo from '../components/Logo'
import Button from '../components/Button'
import ModalPortal from '../components/ModalPortal'
import { useAuth } from '../context/AuthContext'

interface LoginProps {
  initialForgotModal?: boolean
}

export default function Login({ initialForgotModal = false }: LoginProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, isLoggedIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Forgot password modal state
  const [showForgotModal, setShowForgotModal] = useState(initialForgotModal)
  const [forgotEmail, setForgotEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [resetSent, setResetSent] = useState(false)
  const [resendNotice, setResendNotice] = useState(false)

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/', { replace: true })
    }
  }, [isLoggedIn, navigate])

  const DEMO_EMAIL = 'demo@delizioso.com'
  const DEMO_PASSWORD = 'demo1234'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login(email)
    const redirectTo = (location.state as { from?: string } | null)?.from || '/'
    navigate(redirectTo, { replace: true })
  }

  const handleDemoLogin = () => {
    login(DEMO_EMAIL)
    const redirectTo = (location.state as { from?: string } | null)?.from || '/'
    navigate(redirectTo, { replace: true })
  }

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!forgotEmail) return
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setResetSent(true)
    }, 600)
  }

  const handleResend = () => {
    setResendNotice(true)
    setTimeout(() => setResendNotice(false), 3000)
  }

  const openForgotModal = (e: React.MouseEvent) => {
    e.preventDefault()
    setForgotEmail(email || '')
    setResetSent(false)
    setResendNotice(false)
    setShowForgotModal(true)
  }

  if (isLoggedIn) {
    return null
  }

  return (
    <div className="min-h-screen grid min-[430px]:grid-cols-2">
      <div className="flex flex-col px-6 sm:px-12 lg:px-16 py-8">
        <Logo iconOnly />
        <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full py-10">
          <h1 className="font-display font-bold text-3xl sm:text-4xl">Login</h1>
          <p className="text-muted text-sm mt-2">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#3b82f6] font-medium">Sign up</Link>
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label className="text-sm font-semibold block mb-2">Email address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="input-field"
              />
            </div>
            <div>
              <label className="text-sm font-semibold block mb-2">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="input-field"
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-muted cursor-pointer">
                <input type="checkbox" className="rounded" />
                Remember me
              </label>
              <button
                type="button"
                onClick={openForgotModal}
                className="text-primary font-medium hover:underline cursor-pointer"
              >
                Forget Password?
              </button>
            </div>

            <Button type="submit" full size="lg">Log in</Button>
            <button
              type="button"
              className="w-full border border-ink/15 rounded-full py-3.5 flex items-center justify-center gap-3 text-sm font-medium hover:bg-cream-2 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.4H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.7z" />
                <path fill="#34A853" d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.1-4 1.1-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1C3.4 21.3 7.4 24 12 24z" />
                <path fill="#FBBC05" d="M5.4 14.3c-.2-.7-.4-1.5-.4-2.3s.1-1.6.4-2.3V6.6H1.4C.5 8.3 0 10.1 0 12s.5 3.7 1.4 5.4l4-3.1z" />
                <path fill="#EA4335" d="M12 4.8c1.7 0 3.3.6 4.5 1.8l3.4-3.4C17.9 1.2 15.2 0 12 0 7.4 0 3.4 2.7 1.4 6.6l4 3.1c.9-2.8 3.5-4.9 6.6-4.9z" />
              </svg>
              Log in with google
            </button>
          </form>
        </div>
      </div>
      <div className="hidden min-[430px]:block relative">
        <img
          src="/images/auth.png"
          alt="Pancakes breakfast"
          className="absolute inset-0 w-full h-full object-fill"
        />
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <ModalPortal>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            {/* Modal Card */}
            <div className="relative w-full max-w-md bg-white dark:bg-[#1a1a1a] rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 shadow-2xl border border-black/5 dark:border-white/10 text-ink dark:text-cream animate-page-in">
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setShowForgotModal(false)}
                aria-label="Close"
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-cream-2 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 flex items-center justify-center text-ink dark:text-cream transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {!resetSent ? (
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#f5821f]/15 text-[#f5821f] flex items-center justify-center mb-4">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>

                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink dark:text-cream">
                    Forgot Password?
                  </h2>
                  <p className="text-muted text-sm mt-2 leading-relaxed">
                    Enter the email address associated with your account, and we'll send you instructions to reset your password.
                  </p>

                  <form onSubmit={handleForgotSubmit} className="mt-6 space-y-4">
                    <div>
                      <label className="text-sm font-semibold block mb-2">Email address</label>
                      <input
                        type="email"
                        required
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="input-field"
                        autoFocus
                      />
                    </div>

                    <Button type="submit" full size="lg" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending reset link...
                        </span>
                      ) : (
                        'Send Reset Link'
                      )}
                    </Button>

                    <button
                      type="button"
                      onClick={() => setShowForgotModal(false)}
                      className="w-full text-center text-sm font-semibold text-muted hover:text-ink dark:hover:text-cream transition-colors py-1"
                    >
                      Back to login
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center py-2">
                  <div className="w-16 h-16 rounded-full bg-[#2fae5f]/15 text-[#2fae5f] flex items-center justify-center mx-auto mb-4">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>

                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink dark:text-cream">
                    Check your email
                  </h2>
                  <p className="text-muted text-sm mt-2 leading-relaxed max-w-xs mx-auto">
                    We've sent password reset instructions to{' '}
                    <span className="text-ink dark:text-cream font-semibold break-all">{forgotEmail}</span>.
                  </p>

                  {resendNotice && (
                    <div className="mt-3 p-2 bg-[#2fae5f]/10 text-[#2fae5f] text-xs font-semibold rounded-lg animate-fade-in">
                      ✓ A new reset link has been sent!
                    </div>
                  )}

                  <div className="mt-6 space-y-3">
                    <Button
                      type="button"
                      full
                      size="lg"
                      onClick={() => {
                        setShowForgotModal(false)
                        setResetSent(false)
                      }}
                    >
                      Back to login
                    </Button>

                    <p className="text-xs text-muted">
                      Didn't receive the email?{' '}
                      <button
                        type="button"
                        onClick={handleResend}
                        className="text-primary font-semibold hover:underline"
                      >
                        Resend email
                      </button>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </ModalPortal>
      )}
    </div>
  )
}
