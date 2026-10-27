import { Link, useLocation, useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import Button from '../components/Button'
import ModalPortal from '../components/ModalPortal'

interface LocationState {
  date?: string
  time?: string
  partySize?: string
  bookingId?: number
}

function formatDate(value?: string) {
  if (!value) return 'Saturday, 28 February 2022'
  const d = new Date(value)
  return d.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}

export default function ReservationConfirmed() {
  const { state } = useLocation() as { state: LocationState | null }
  const navigate = useNavigate()
  const bookingId = state?.bookingId ?? 123456

  return (
    <ModalPortal>
    <div className="fixed inset-0 z-50 bg-black/50 overflow-y-auto py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white dark:bg-[#1e1e1e] rounded-3xl relative overflow-hidden">
        <Link
          to="/"
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

        <div className="bg-success text-white rounded-3xl mx-6 sm:mx-8 mt-6 p-6 sm:p-8">
          <h1 className="font-display font-bold text-2xl sm:text-3xl">Reservation has been confirmed</h1>
          <ul className="mt-4 space-y-2 text-sm text-white/90">
            <li>✅ The confirmation result has been sent to your email</li>
            <li>🗓️ Booking ID : #{bookingId}</li>
          </ul>
        </div>

        <div className="p-6 sm:p-8 grid sm:grid-cols-[auto_1fr_auto] gap-6 items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden mx-auto sm:mx-0">
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=300&fit=crop"
              alt="Reserved table"
              className="w-full h-full object-fill"
            />
          </div>
          <div>
            <h2 className="font-semibold mb-2">Reservation detail</h2>
            <ul className="space-y-1.5 text-sm text-muted">
              <li>📅 {formatDate(state?.date)}</li>
              <li>🕓 {state?.time || '04:30 pm'}</li>
              <li>👤 {state?.partySize || '2 people (Standard seating)'}</li>
            </ul>
          </div>
          <div className="flex sm:flex-col gap-3">
            <button
              onClick={() => navigate('/reservation/confirm', { state })}
              className="px-5 py-2.5 rounded-full bg-[#dff0fd] text-[#2f6fb3] text-sm font-semibold flex items-center gap-2 justify-center"
            >
              Modify ✏️
            </button>
            <button
              onClick={() => navigate('/reservation/cancel', { state: { ...state, bookingId } })}
              className="px-5 py-2.5 rounded-full bg-[#fde3df] text-danger text-sm font-semibold flex items-center gap-2 justify-center"
            >
              Cancel ✕
            </button>
          </div>
        </div>

        <div className="px-6 sm:px-8 pb-8 grid sm:grid-cols-2 gap-6">
          <select className="input-field appearance-none" defaultValue="">
            <option value="" disabled>Select an occasion (optional)</option>
            <option>Birthday</option>
            <option>Anniversary</option>
            <option>Business dinner</option>
          </select>
          <div>
            <h2 className="font-semibold mb-1">Restaurant informations</h2>
            <p className="text-sm text-muted leading-relaxed">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
              doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
              veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
          </div>
          <textarea placeholder="Add a special request" rows={3} className="input-field resize-none sm:col-span-2" />
        </div>
      </div>
    </div>
    </ModalPortal>
  )
}
