import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Logo from '../components/Logo'
import Button from '../components/Button'
import { useAuth } from '../context/AuthContext'

export default function Signup() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, isLoggedIn } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/', { replace: true })
    }
  }, [isLoggedIn, navigate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login(form.email)
    const redirectTo = (location.state as { from?: string } | null)?.from || '/'
    navigate(redirectTo, { replace: true })
  }

  if (isLoggedIn) {
    return null
  }

  return (
    <div className="min-h-screen grid min-[430px]:grid-cols-2">
      <div className="flex flex-col px-6 sm:px-12 lg:px-16 py-8">
        <Logo iconOnly />
        <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full py-10">
          <h1 className="font-display font-bold text-3xl sm:text-4xl">Sign up</h1>
          <p className="text-muted text-sm mt-2">
            Already have an account?{' '}
            <Link to="/login" className="text-[#3b82f6] font-medium">Log in</Link>
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="text-sm font-semibold block mb-2">Full name</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Robert Martine"
                className="input-field"
              />
            </div>
            <div>
              <label className="text-sm font-semibold block mb-2">Email address</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="you@example.com"
                className="input-field"
              />
            </div>
            <div>
              <label className="text-sm font-semibold block mb-2">Password</label>
              <input
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                placeholder="••••••••••••"
                className="input-field"
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-muted">
                <input type="checkbox" className="rounded" />
                Remember me
              </label>
              <a href="#" className="text-primary font-medium">Forget Password?</a>
            </div>

            <Button type="submit" full size="lg">Sign up</Button>
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
              Sign up with google
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
    </div>
  )
}
