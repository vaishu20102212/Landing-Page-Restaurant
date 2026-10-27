import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import Button from '../components/Button'
import ModalPortal from '../components/ModalPortal'
import { useAuth } from '../context/AuthContext'

interface LocationState {
  date?: string
  time?: string
  partySize?: string
}

const occasions = ['Birthday', 'Anniversary', 'Business dinner', 'Date night', 'Other']

function formatDate(value?: string) {
  if (!value) return 'Saturday, 28 February'
  const d = new Date(value)
  return d.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}

export default function ReservationConfirm() {
  const { state } = useLocation() as { state: LocationState | null }
  const navigate = useNavigate()
  const { isLoggedIn } = useAuth()
  const [form, setForm] = useState({ firstName: '', lastName: '', phone: '', email: '', occasion: '', request: '' })

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', { replace: true, state: { from: '/reservation' } })
    }
  }, [isLoggedIn, navigate])

  if (!isLoggedIn) {
    return null
  }

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/reservation/confirmed', {
      state: { ...state, ...form, bookingId: Math.floor(100000 + Math.random() * 900000) },
    })
  }

  return (
    <ModalPortal>
    <div className="fixed inset-0 z-50 bg-black/50 overflow-y-auto py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white dark:bg-[#1e1e1e] rounded-3xl relative">
        <Link
          to="/reservation"
          aria-label="Close"
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-9 h-9 rounded-full bg-cream-2 dark:bg-white/10 hover:bg-cream dark:hover:bg-white/20 flex items-center justify-center transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </Link>

        <div className="flex items-center justify-between p-6 sm:p-8 pb-0 pr-16 sm:pr-24">
          <Logo />
          <div className="flex gap-3">
            <Link to="/login"><Button variant="primary" size="sm">Sign in</Button></Link>
            <Link to="/signup"><Button variant="success" size="sm">Sign up</Button></Link>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <h1 className="font-display font-bold text-3xl text-center mt-2">Reservation</h1>

          <div className="bg-[#dff3fb] text-[#12343f] dark:bg-[#12343f] dark:text-[#dff3fb] text-sm rounded-2xl px-5 py-4 mt-6 text-center">
            Due to limited availability, we can hold this table for you for <strong>5:00 minutes</strong>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 grid sm:grid-cols-[1fr_260px] gap-8">
            <div className="space-y-4">
              <h2 className="font-semibold">Data order</h2>
              <input required placeholder="First name" value={form.firstName} onChange={set('firstName')} className="input-field" />
              <input required placeholder="Last name" value={form.lastName} onChange={set('lastName')} className="input-field" />
              <input required placeholder="Phone number" value={form.phone} onChange={set('phone')} className="input-field" />
              <input required type="email" placeholder="Email address" value={form.email} onChange={set('email')} className="input-field" />
              <select value={form.occasion} onChange={set('occasion')} className="input-field appearance-none">
                <option value="">Select an occasion</option>
                {occasions.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
              <textarea placeholder="Add a special request" rows={4} value={form.request} onChange={set('request')} className="input-field resize-none" />
              <label className="flex items-start gap-2 text-xs text-muted pt-1">
                <input type="checkbox" className="mt-0.5" />
                Sign me up to receive dining offers and news from this restaurant by email.
              </label>
              <Button type="submit" full size="lg" className="mt-2">Confirm reservation</Button>
            </div>

            <div>
              <h2 className="font-semibold mb-3">Reservation detail</h2>
              <ul className="space-y-3 text-sm text-muted">
                <li className="flex items-center gap-2">
                  <span>📅</span> {formatDate(state?.date)}
                </li>
                <li className="flex items-center gap-2">
                  <span>🕓</span> {state?.time || '04:30 pm'}
                </li>
                <li className="flex items-center gap-2">
                  <span>👤</span> {state?.partySize || '2 people (Standard seating)'}
                </li>
              </ul>
              <h2 className="font-semibold mt-6 mb-2">Restaurant informations</h2>
              <p className="text-sm text-muted leading-relaxed">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
    </ModalPortal>
  )
}
