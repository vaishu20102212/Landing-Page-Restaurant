import { useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import Button from './Button'

export default function MiniCart({ onClose }: { onClose: () => void }) {
  const { items, incrementItem, decrementItem, removeItem, subtotal, total, count } = useCart()
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  const goToCart = () => {
    navigate('/order')
    onClose()
  }

  const handleCheckout = () => {
    if (!isLoggedIn) {
      navigate('/login', { state: { from: location.pathname } })
      onClose()
      return
    }
    navigate('/checkout')
    onClose()
  }

  return (
    <>
      {/* backdrop: closes the cart when clicking anywhere outside it */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      <div
        ref={ref}
        className="absolute right-0 top-full mt-3 w-[22rem] max-w-[90vw] bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-xl border border-ink/10 dark:border-white/10 z-50 overflow-hidden animate-page-in"
      >
      <div className="flex items-center justify-between px-5 py-4 border-b border-ink/10 dark:border-white/10">
        <p className="font-semibold">Your cart {count > 0 && <span className="text-muted font-normal">({count})</span>}</p>
        <button onClick={onClose} aria-label="Close cart" className="text-muted hover:text-ink">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {items.length === 0 ? (
        <div className="px-5 py-10 text-center">
          <p className="text-sm text-muted">Your cart is empty.</p>
          <p className="text-xs text-muted mt-1">Add something tasty from the menu!</p>
        </div>
      ) : (
        <>
          <ul className="max-h-72 overflow-y-auto divide-y divide-ink/10 dark:divide-white/10">
            {items.map(({ item, qty }) => (
              <li key={item.id} className="flex items-center gap-3 px-5 py-3.5">
                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-cream-2">
                  <img src={item.image} alt={item.name} className="w-full h-full object-fill" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{item.name}</p>
                  <p className="text-xs text-primary font-semibold mt-0.5">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => decrementItem(item.id)}
                    className="w-6 h-6 rounded-full border border-ink/20 flex items-center justify-center text-xs"
                    aria-label={`Decrease ${item.name}`}
                  >
                    −
                  </button>
                  <span className="text-xs w-4 text-center">{qty}</span>
                  <button
                    onClick={() => incrementItem(item.id)}
                    className="w-6 h-6 rounded-full border border-ink/20 flex items-center justify-center text-xs"
                    aria-label={`Increase ${item.name}`}
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  aria-label={`Remove ${item.name}`}
                  className="text-danger shrink-0"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>

          <div className="px-5 py-4 border-t border-ink/10 dark:border-white/10 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted">Subtotal</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base">
              <span className="font-semibold">Total</span>
              <span className="font-bold">${total.toFixed(2)}</span>
            </div>
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <Button variant="outline" size="sm" onClick={goToCart}>View cart</Button>
              <Button variant="success" size="sm" onClick={handleCheckout}>Checkout</Button>
            </div>
          </div>
        </>
      )}
      </div>
    </>
  )
}
