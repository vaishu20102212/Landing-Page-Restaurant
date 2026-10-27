import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import Logo from '../components/Logo'
import ModalPortal from '../components/ModalPortal'

type OrderTime = 'now' | 'later'
type OrderMethod = 'delivery' | 'takeaway'
type PaymentMethod = 'cod' | 'bca' | 'card'

export default function Checkout() {
  const { clearCart } = useCart()
  const navigate = useNavigate()

  const [address, setAddress] = useState('1131 Ogden Ave, Bronx, NY 10452, Amerika Serikat')
  const [modalAddress, setModalAddress] = useState('1131 Ogden Ave, Bronx, NY 10452, Amerika Serikat')
  const [showAddressModal, setShowAddressModal] = useState(false)
  const [confirmedAnimation, setConfirmedAnimation] = useState(false)

  const [selectedLocation, setSelectedLocation] = useState({
    title: 'Highbridge House',
    address: '1131 Ogden Ave, Bronx, NY 10452, Amerika Serikat',
    coords: '40.885147,-73.9220459',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=200&h=200&fit=crop',
  })

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    note: '',
  })

  const [orderTime, setOrderTime] = useState<OrderTime>('now')
  const [orderMethod, setOrderMethod] = useState<OrderMethod>('delivery')
  const [payment, setPayment] = useState<PaymentMethod>('cod')
  const [placed, setPlaced] = useState(false)

  const set = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSearchAddress = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    const query = modalAddress.trim() || '1131 Ogden Ave, Bronx, NY 10452, Amerika Serikat'
    setSelectedLocation({
      title: query.split(',')[0] || 'Selected Location',
      address: query,
      coords: '40.885147,-73.9220459',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=200&h=200&fit=crop',
    })
  }

  const handleUseCurrentLocation = () => {
    const loc = '1131 Ogden Ave, Bronx, NY 10452, Amerika Serikat'
    setModalAddress(loc)
    setSelectedLocation({
      title: 'Highbridge House',
      address: loc,
      coords: '40.885147,-73.9220459',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=200&h=200&fit=crop',
    })
  }

  const handleConfirmAddress = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    const finalAddress = selectedLocation.address || modalAddress || '1131 Ogden Ave, Bronx, NY 10452, Amerika Serikat'
    setAddress(finalAddress)
    setConfirmedAnimation(true)
    setTimeout(() => {
      setShowAddressModal(false)
      setConfirmedAnimation(false)
    }, 350)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setPlaced(true)
  }

  if (placed) {
    return (
      <div className="container-x py-16 sm:py-24 max-w-md mx-auto text-center animate-page-in">
        <div className="w-20 h-20 rounded-full bg-[#2fae5f]/15 text-[#2fae5f] flex items-center justify-center mx-auto text-3xl font-bold">
          ✓
        </div>
        <h1 className="font-serif font-bold text-3xl text-[#2b1c10] dark:text-white mt-6">
          Order placed successfully!
        </h1>
        <p className="text-muted text-xs sm:text-sm mt-3 leading-relaxed">
          Thanks {form.firstName || 'there'}! Your order has been placed and is being prepared with love.
          A confirmation has been sent to {form.email || 'your email'}.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <button
            onClick={() => {
              clearCart()
              navigate('/order')
            }}
            className="px-6 py-3 rounded-full bg-[#f5821f] text-white text-xs sm:text-sm font-semibold hover:bg-[#d96a12] transition-colors shadow-sm cursor-pointer"
          >
            Order more
          </button>
          <button
            onClick={() => {
              clearCart()
              navigate('/')
            }}
            className="px-6 py-3 rounded-full bg-cream-2 dark:bg-[#252525] text-ink dark:text-white text-xs sm:text-sm font-semibold hover:bg-cream-2/70 transition-colors cursor-pointer"
          >
            Back to home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container-x py-8 sm:py-12 max-w-2xl mx-auto">
      {/* Top Title Row: Circular Back Button & Centered "Checkout" */}
      <div className="relative flex items-center justify-center mb-8 sm:mb-10">
        <button
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="absolute left-0 w-9 h-9 rounded-full bg-[#2b1c10] text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#2b1c10] dark:text-white text-center">
          Checkout
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-7">
        {/* 1. Shipping address Section (at the TOP) */}
        <div>
          <h2 className="font-bold text-sm sm:text-base text-[#1c1c1c] dark:text-white mb-3">
            Shipping address
          </h2>

          <div className="flex items-center gap-3">
            <div
              onClick={() => setShowAddressModal(true)}
              className="flex-1 bg-[#f8f9fa] dark:bg-[#1c1c1c] rounded-2xl px-5 py-3.5 border border-black/5 dark:border-white/5 flex items-center min-w-0 cursor-pointer hover:border-primary/50 transition-colors"
            >
              <input
                type="text"
                readOnly
                value={address}
                onClick={() => setShowAddressModal(true)}
                placeholder="Please type your address"
                className="w-full bg-transparent outline-none text-xs sm:text-sm text-[#1c1c1c] dark:text-white placeholder:text-[#a8a29e] truncate cursor-pointer"
              />
            </div>
            <button
              type="button"
              onClick={() => setShowAddressModal(true)}
              className="px-6 py-3.5 rounded-2xl bg-[#4aa7e5] hover:bg-[#3b9fe2] active:scale-95 text-white font-semibold text-xs sm:text-sm transition-all shadow-sm cursor-pointer shrink-0"
            >
              Change
            </button>
          </div>
        </div>

        {/* 2. Order data Section */}
        <div>
          <h2 className="font-bold text-sm sm:text-base text-[#1c1c1c] dark:text-white mb-3">
            Order data
          </h2>

          <div className="space-y-3.5">
            {/* First name & Last name (2 Columns) */}
            <div className="grid grid-cols-2 gap-3.5">
              <input
                required
                placeholder="First name"
                value={form.firstName}
                onChange={set('firstName')}
                className="w-full bg-[#f8f9fa] dark:bg-[#1c1c1c] rounded-2xl px-5 py-4 text-xs sm:text-sm placeholder:text-[#a8a29e] outline-none border border-black/5 dark:border-white/5 focus:border-primary text-[#1c1c1c] dark:text-white transition-colors"
              />
              <input
                required
                placeholder="Last name"
                value={form.lastName}
                onChange={set('lastName')}
                className="w-full bg-[#f8f9fa] dark:bg-[#1c1c1c] rounded-2xl px-5 py-4 text-xs sm:text-sm placeholder:text-[#a8a29e] outline-none border border-black/5 dark:border-white/5 focus:border-primary text-[#1c1c1c] dark:text-white transition-colors"
              />
            </div>

            {/* Phone number with Flag & Email address (2 Columns) */}
            <div className="grid grid-cols-2 gap-3.5">
              {/* Phone with flag */}
              <div className="flex items-center bg-[#f8f9fa] dark:bg-[#1c1c1c] rounded-2xl px-3 border border-black/5 dark:border-white/5 focus-within:border-primary transition-colors">
                <div className="flex items-center gap-1 pr-2 border-r border-black/10 dark:border-white/10 shrink-0">
                  <span className="text-base leading-none">🇪🇸</span>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#a8a29e]">
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <input
                  required
                  type="tel"
                  placeholder="Phone number"
                  value={form.phone}
                  onChange={set('phone')}
                  className="w-full bg-transparent px-2.5 py-4 text-xs sm:text-sm outline-none placeholder:text-[#a8a29e] text-[#1c1c1c] dark:text-white min-w-0"
                />
              </div>

              {/* Email address */}
              <input
                required
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={set('email')}
                className="w-full bg-[#f8f9fa] dark:bg-[#1c1c1c] rounded-2xl px-5 py-4 text-xs sm:text-sm placeholder:text-[#a8a29e] outline-none border border-black/5 dark:border-white/5 focus:border-primary text-[#1c1c1c] dark:text-white transition-colors"
              />
            </div>

            {/* Note textarea (Full width) */}
            <textarea
              placeholder="Note"
              rows={4}
              value={form.note}
              onChange={set('note')}
              className="w-full bg-[#f8f9fa] dark:bg-[#1c1c1c] rounded-2xl p-5 text-xs sm:text-sm placeholder:text-[#a8a29e] outline-none resize-none border border-black/5 dark:border-white/5 focus:border-primary text-[#1c1c1c] dark:text-white transition-colors"
            />
          </div>
        </div>

        {/* 2. Order time Section */}
        <div>
          <h2 className="font-bold text-sm sm:text-base text-[#1c1c1c] dark:text-white mb-3">
            Order time
          </h2>
          <div className="flex items-center gap-8">
            {/* Order now */}
            <label
              onClick={() => setOrderTime('now')}
              className="flex items-center gap-2.5 cursor-pointer select-none text-xs sm:text-sm text-[#1c1c1c] dark:text-white font-medium"
            >
              <div className="w-5 h-5 rounded-full border-2 border-[#2fae5f] flex items-center justify-center p-0.5">
                {orderTime === 'now' && <div className="w-2.5 h-2.5 rounded-full bg-[#2fae5f]" />}
              </div>
              <span>Order now</span>
            </label>

            {/* Order later */}
            <label
              onClick={() => setOrderTime('later')}
              className="flex items-center gap-2 cursor-pointer select-none text-xs sm:text-sm text-[#1c1c1c] dark:text-white font-medium"
            >
              <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center p-0.5">
                {orderTime === 'later' && <div className="w-2.5 h-2.5 rounded-full bg-[#2fae5f]" />}
              </div>
              <span>Order later</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#a8a29e] ml-0.5">
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </label>
          </div>
        </div>

        {/* 3. Order method Section */}
        <div>
          <h2 className="font-bold text-sm sm:text-base text-[#1c1c1c] dark:text-white mb-3">
            Order method
          </h2>
          <div className="flex items-center gap-8">
            {/* Delivery */}
            <label
              onClick={() => setOrderMethod('delivery')}
              className="flex items-center gap-2.5 cursor-pointer select-none text-xs sm:text-sm text-[#1c1c1c] dark:text-white font-medium"
            >
              <div className="w-5 h-5 rounded-full border-2 border-[#2fae5f] flex items-center justify-center p-0.5">
                {orderMethod === 'delivery' && <div className="w-2.5 h-2.5 rounded-full bg-[#2fae5f]" />}
              </div>
              <span>Delivery</span>
            </label>

            {/* Take a way */}
            <label
              onClick={() => setOrderMethod('takeaway')}
              className="flex items-center gap-2.5 cursor-pointer select-none text-xs sm:text-sm text-[#1c1c1c] dark:text-white font-medium"
            >
              <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center p-0.5">
                {orderMethod === 'takeaway' && <div className="w-2.5 h-2.5 rounded-full bg-[#2fae5f]" />}
              </div>
              <span>Take a way</span>
            </label>
          </div>
        </div>

        {/* 4. Payment method Section */}
        <div>
          <h2 className="font-bold text-sm sm:text-base text-[#1c1c1c] dark:text-white mb-3">
            Payment method
          </h2>
          <div className="space-y-3">
            {/* Cash On Delivery */}
            <div
              onClick={() => setPayment('cod')}
              className="bg-[#f8f9fa] dark:bg-[#1c1c1c] rounded-2xl px-5 py-4 flex items-center gap-4 border border-black/5 dark:border-white/5 cursor-pointer transition-colors"
            >
              <div className="w-5 h-5 rounded-full border-2 border-[#2fae5f] flex items-center justify-center p-0.5 shrink-0">
                {payment === 'cod' && <div className="w-2.5 h-2.5 rounded-full bg-[#2fae5f]" />}
              </div>
              <span className="font-semibold text-xs sm:text-sm text-[#1c1c1c] dark:text-white">
                Cash On Delivery
              </span>
            </div>

            {/* BCA Virtual Account */}
            <div
              onClick={() => setPayment('bca')}
              className="bg-[#f8f9fa] dark:bg-[#1c1c1c] rounded-2xl px-5 py-4 flex items-center gap-4 border border-black/5 dark:border-white/5 cursor-pointer transition-colors"
            >
              <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center p-0.5 shrink-0">
                {payment === 'bca' && <div className="w-2.5 h-2.5 rounded-full bg-[#2fae5f]" />}
              </div>
              <span className="font-semibold text-xs sm:text-sm text-[#1c1c1c] dark:text-white">
                BCA Virtual Account
              </span>
            </div>

            {/* Credit Card */}
            <div
              onClick={() => setPayment('card')}
              className="bg-[#f8f9fa] dark:bg-[#1c1c1c] rounded-2xl px-5 py-4 flex items-center gap-4 border border-black/5 dark:border-white/5 cursor-pointer transition-colors"
            >
              <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center p-0.5 shrink-0">
                {payment === 'card' && <div className="w-2.5 h-2.5 rounded-full bg-[#2fae5f]" />}
              </div>
              <span className="font-semibold text-xs sm:text-sm text-[#1c1c1c] dark:text-white">
                Credit Card
              </span>
            </div>
          </div>
        </div>

        {/* 5. Order now Button (Centered) */}
        <div className="pt-4 flex justify-center pb-12">
          <button
            type="submit"
            className="w-full max-w-sm py-4 rounded-2xl bg-[#f5821f] hover:bg-[#d96a12] active:scale-[0.99] text-white font-bold text-base shadow-md shadow-[#f5821f]/20 transition-all cursor-pointer"
          >
            Order now
          </button>
        </div>
      </form>

      {/* Shipping Address Search Modal matching Figma */}
      {showAddressModal && (
        <ModalPortal>
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-page-in">
            {/* Circular Close Button (X) above card */}
            <button
              onClick={() => setShowAddressModal(false)}
              aria-label="Close"
              className="w-10 h-10 rounded-full bg-white text-[#2b1c10] flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all mb-3 shrink-0 cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Modal Card */}
            <div className="w-full max-w-xl bg-white dark:bg-[#1a1a1a] rounded-[28px] sm:rounded-[32px] shadow-2xl overflow-hidden border border-black/5 dark:border-white/10 flex flex-col">
              {/* Header inside modal */}
              <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-black/5 dark:border-white/5">
                <Logo />
                <div className="flex items-center gap-2">
                  <Link to="/login">
                    <button
                      type="button"
                      className="px-5 py-1.5 rounded-full bg-[#f5821f] text-white text-xs sm:text-sm font-semibold hover:bg-[#d96a12] transition-colors cursor-pointer"
                    >
                      Sign in
                    </button>
                  </Link>
                  <Link to="/signup">
                    <button
                      type="button"
                      className="px-5 py-1.5 rounded-full bg-[#2fae5f] text-white text-xs sm:text-sm font-semibold hover:bg-[#279852] transition-colors cursor-pointer"
                    >
                      Sign up
                    </button>
                  </Link>
                </div>
              </div>

              {/* Upper Section: Shipping address inputs */}
              <div className="p-6 sm:p-8 pb-5">
                <h3 className="font-bold text-base sm:text-lg text-[#1c1c1c] dark:text-white mb-3.5">
                  Shipping address
                </h3>

                {/* Search input + button */}
                <form onSubmit={handleSearchAddress} className="flex items-center gap-3">
                  <div className="flex-1 bg-[#f8f9fa] dark:bg-[#252525] rounded-2xl px-5 py-3.5 border border-black/5 dark:border-white/5 flex items-center min-w-0">
                    <input
                      type="text"
                      value={modalAddress}
                      onChange={(e) => setModalAddress(e.target.value)}
                      placeholder="Please type your address"
                      className="w-full bg-transparent outline-none text-xs sm:text-sm text-[#1c1c1c] dark:text-white placeholder:text-[#a8a29e]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3.5 rounded-2xl bg-[#4aa7e5] hover:bg-[#3b9fe2] active:scale-95 text-white font-semibold text-xs sm:text-sm transition-all shadow-sm cursor-pointer shrink-0"
                  >
                    Search
                  </button>
                </form>

                {/* Use your current location pill */}
                <button
                  type="button"
                  onClick={handleUseCurrentLocation}
                  className="w-full bg-[#f8f9fa] dark:bg-[#252525] rounded-2xl px-5 py-3.5 mt-3 flex items-center gap-2.5 border border-black/5 dark:border-white/5 hover:bg-gray-100 dark:hover:bg-[#2e2e2e] transition-colors cursor-pointer text-left"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f04438" strokeWidth="2.5" className="shrink-0">
                    <polygon points="3 11 22 2 13 21 11 13 3 11" fill="#f04438" />
                  </svg>
                  <span className="text-[#f04438] text-xs font-semibold">
                    Use your current location
                  </span>
                </button>
              </div>

              {/* Lower Section: Full Edge-to-Edge Map Preview */}
              <div className="relative h-80 sm:h-96 w-full overflow-hidden bg-[#e8ecef]">
                {/* Embedded Map */}
                <iframe
                  title="Delivery Location Map"
                  className="w-full h-full border-0 pointer-events-none select-none"
                  loading="lazy"
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24151.78280652796!2d-73.93510526708785!3d40.844781447039014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2f42a59a72df9%3A0x6b1d4eb3c3d59644!2s${encodeURIComponent(selectedLocation.address || 'Highbridge, Bronx, NY')}!5e0!3m2!1sen!2sus!4v1714500000000!5m2!1sen!2sus`}
                />

                {/* Floating Property Card in the Center of the Map */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[340px] bg-white/95 dark:bg-[#1e1e1e]/95 backdrop-blur-md rounded-2xl p-3.5 shadow-2xl border border-black/5 dark:border-white/10 z-30 pointer-events-auto flex gap-3.5 items-center"
                >
                  {/* Thumbnail of house/pool */}
                  <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-cream-2 shadow-inner">
                    <img
                      src={selectedLocation.image}
                      alt={selectedLocation.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Card Details */}
                  <div className="flex-1 min-w-0 text-left">
                    <h4 className="font-bold text-xs sm:text-sm text-[#1c1c1c] dark:text-white truncate">
                      {selectedLocation.title}
                    </h4>
                    <p className="text-[10px] text-[#7a7168] dark:text-gray-400 mt-0.5 line-clamp-2 leading-tight">
                      {selectedLocation.address}
                    </p>
                    <p className="text-[9px] text-[#a8a29e] mt-0.5">
                      {selectedLocation.coords}
                    </p>
                    <button
                      type="button"
                      onClick={handleConfirmAddress}
                      className={`w-full mt-2 py-2 rounded-xl text-white font-bold text-xs shadow-md transition-all cursor-pointer text-center active:scale-95 flex items-center justify-center gap-1.5 ${
                        confirmedAnimation ? 'bg-[#2fae5f]' : 'bg-[#f04438] hover:bg-red-600'
                      }`}
                    >
                      {confirmedAnimation ? (
                        <>
                          <span>Confirmed</span>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </>
                      ) : (
                        'Confirmation'
                      )}
                    </button>
                  </div>
                </div>

                {/* Red location pin marker below the card */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none drop-shadow-md z-20">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="#f04438">
                    <path
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                      fill="#f04438"
                      stroke="#ffffff"
                      strokeWidth="1"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </ModalPortal>
      )}
    </div>
  )
}



