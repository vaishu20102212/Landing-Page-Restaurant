import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import ModalPortal from '../components/ModalPortal'

interface LocationState {
  date?: string
  time?: string
  partySize?: string
  bookingId?: number
}

export default function ReservationCancel() {
  const { state } = useLocation() as { state: LocationState | null }
  const navigate = useNavigate()
  const [cancelled, setCancelled] = useState(false)
  const bookingId = state?.bookingId ?? 123456

  return (
    <ModalPortal>
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-page-in">
        {/* Floating circular Close button above the card */}
        <button
          onClick={() => navigate(-1)}
          aria-label="Close"
          className="w-10 h-10 rounded-full bg-white text-[#2b1c10] flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all mb-3 shrink-0"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Modal Card matching Figma design in screenshot */}
        <div className="w-full max-w-2xl bg-white dark:bg-[#1a1a1a] rounded-[28px] sm:rounded-[32px] shadow-2xl overflow-hidden border border-black/5 dark:border-white/10 flex flex-col">
          {/* Header inside modal */}
          <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-black/5 dark:border-white/5">
            <Logo />
            <div className="flex items-center gap-2">
              <Link to="/login">
                <button
                  type="button"
                  className="px-5 py-1.5 rounded-full bg-[#f5821f] text-white text-xs sm:text-sm font-semibold hover:bg-[#d96a12] transition-colors"
                >
                  Sign in
                </button>
              </Link>
              <Link to="/signup">
                <button
                  type="button"
                  className="px-5 py-1.5 rounded-full bg-[#2fae5f] text-white text-xs sm:text-sm font-semibold hover:bg-[#279852] transition-colors"
                >
                  Sign up
                </button>
              </Link>
            </div>
          </div>

          {cancelled ? (
            /* Cancelled Confirmation View */
            <div className="text-center p-8 sm:p-12 animate-page-in">
              <div className="w-16 h-16 rounded-full bg-[#f04438]/15 text-[#f04438] flex items-center justify-center mx-auto text-3xl font-bold">
                ✕
              </div>
              <h2 className="font-serif font-bold text-2xl text-[#2b1c10] dark:text-white mt-5">
                Reservation cancelled
              </h2>
              <p className="text-muted text-xs sm:text-sm mt-2 max-w-sm mx-auto leading-relaxed">
                Booking #{bookingId} has been successfully cancelled. We hope to see you another time!
              </p>
              <div className="mt-8 flex justify-center gap-3">
                <Link to="/reservation">
                  <button className="px-6 py-3 rounded-full bg-[#f5821f] text-white text-xs sm:text-sm font-semibold hover:bg-[#d96a12] transition-colors shadow-sm">
                    Book a new table
                  </button>
                </Link>
                <Link to="/">
                  <button className="px-6 py-3 rounded-full bg-cream-2 dark:bg-[#252525] text-ink dark:text-white text-xs sm:text-sm font-semibold hover:bg-cream-2/70 transition-colors">
                    Back to home
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Full-width Orange Banner matching the screenshot */}
              <div className="w-full bg-[#f5821f] text-white px-6 sm:px-10 py-7 relative overflow-hidden shadow-inner">
                {/* Decorative bubbles / circular shapes */}
                <div className="absolute right-6 -bottom-10 w-32 h-32 rounded-full bg-white/15 pointer-events-none" />
                <div className="absolute right-28 -top-8 w-24 h-24 rounded-full bg-white/10 pointer-events-none" />
                <div className="absolute left-[42%] -bottom-2 w-5 h-5 rounded-full bg-white/20 pointer-events-none" />
                <div className="absolute left-8 top-3 w-8 h-8 rounded-full bg-white/10 pointer-events-none" />

                <h2 className="font-sans font-bold text-xl sm:text-3xl leading-snug max-w-md">
                  Are you sure you want to cancel the reservation?
                </h2>

                <div className="mt-3.5 flex items-center gap-2.5 text-xs sm:text-sm text-white/95 font-medium">
                  <div className="w-5 h-5 rounded border border-white/80 flex items-center justify-center shrink-0">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>
                  <span>Booking ID : #{bookingId}</span>
                </div>
              </div>

              {/* Body: Circular Photo on Left, Details & Right-Aligned Red Cancel Button */}
              <div className="p-6 sm:p-10">
                <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start">
                  {/* Circular Table Photo with wide outer cream ring */}
                  <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-[#fbf7f1] dark:bg-white/5 p-3.5 sm:p-4.5 flex items-center justify-center shrink-0 shadow-sm">
                    <div className="w-full h-full rounded-full overflow-hidden shadow-inner">
                      <img
                        src="/images/res 2.png"
                        alt="Reserved Table"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Reservation Details */}
                  <div className="flex-1 space-y-3.5 text-left w-full sm:pt-2">
                    <h3 className="font-bold text-base sm:text-lg text-[#2b1c10] dark:text-white">
                      Reservation detail
                    </h3>
                    <ul className="space-y-3 text-xs sm:text-sm text-[#2b1c10]/85 dark:text-gray-300 font-medium">
                      <li className="flex items-center gap-3">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted shrink-0">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        <span>{state?.date || 'Saturday, 28 february 2022'}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted shrink-0">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <span>{state?.time || '04:30 pm'}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted shrink-0">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                        <span>{state?.partySize || '2 people (Standar seating)'}</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Red Cancel Button Aligned to the Bottom Right */}
                <div className="flex justify-end mt-6 sm:mt-8">
                  <button
                    type="button"
                    onClick={() => setCancelled(true)}
                    className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 rounded-2xl bg-[#ff3838] hover:bg-red-600 active:scale-95 text-white font-bold text-sm sm:text-base shadow-md transition-all text-center cursor-pointer"
                  >
                    Cancel reservation
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </ModalPortal>
  )
}

