import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export default function CartPanel() {
  const {
    items,
    incrementItem,
    decrementItem,
    removeItem,
    subtotal,
    taxFee,
    voucherDiscount,
    voucherCode,
    applyVoucher,
    total,
  } = useCart()

  const { isLoggedIn } = useAuth()
  const [code, setCode] = useState(voucherCode || 'FREETOEAT')
  const navigate = useNavigate()
  const location = useLocation()

  const handleCheckout = () => {
    if (!isLoggedIn) {
      navigate('/login', { state: { from: location.pathname } })
      return
    }
    navigate('/checkout')
  }

  return (
    <aside className="bg-white dark:bg-[#1a1a1a] rounded-[28px] p-6 shadow-sm border border-black/[0.04] dark:border-white/[0.06] w-full max-w-[340px] mx-auto h-fit lg:sticky lg:top-24">
      {/* Top Purple Header */}
      <div className="bg-[#543b8a] text-white text-center font-bold text-base sm:text-lg rounded-2xl py-3.5 mb-6 shadow-sm tracking-wide">
        Order list
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-muted text-center py-8">Your cart is empty. Add something tasty!</p>
      ) : (
        <ul className="space-y-6">
          {items.map(({ item, qty }) => (
            <li key={item.id} className="space-y-2.5">
              {/* Row 1: Dish Name & Trash Icon */}
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm sm:text-base text-[#1c1c1c] dark:text-white">
                  {item.name}
                </span>
                <button
                  onClick={() => removeItem(item.id)}
                  aria-label={`Remove ${item.name}`}
                  className="text-[#ff6b6b] hover:text-red-600 transition-colors cursor-pointer p-0.5"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              {/* Row 2: Stepper Pill & Price */}
              <div className="flex items-center justify-between">
                {/* Stepper capsule */}
                <div className="inline-flex items-center gap-3 bg-[#f8f9fa] dark:bg-[#252525] rounded-full px-3.5 py-1 border border-black/[0.02] dark:border-white/[0.04]">
                  <button
                    onClick={() => decrementItem(item.id)}
                    className="text-[#ff6b6b] hover:text-red-600 font-bold text-base leading-none transition-colors cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="text-xs sm:text-sm font-semibold text-[#1c1c1c] dark:text-white w-3 text-center">
                    {qty}
                  </span>
                  <button
                    onClick={() => incrementItem(item.id)}
                    className="text-[#34d399] hover:text-green-600 font-bold text-base leading-none transition-colors cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Price */}
                <span className="font-bold text-base sm:text-[17px] text-[#f5821f]">
                  ${(item.price * qty).toFixed(1)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Dotted Divider */}
      <div className="border-t border-dashed border-black/15 dark:border-white/15 my-6" />

      {/* Voucher Code Section */}
      <div>
        <label className="block font-bold text-sm text-[#1c1c1c] dark:text-white mb-2.5">
          Voucher Code
        </label>
        <div className="flex items-center gap-2.5">
          <div className="flex-1 bg-[#f8f9fa] dark:bg-[#252525] rounded-xl px-4 py-2.5 border border-black/[0.02] dark:border-white/[0.04]">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="FREETOEAT"
              className="w-full bg-transparent outline-none text-xs sm:text-sm font-bold text-[#4aa7e5] placeholder:text-[#4aa7e5]/70 tracking-wider uppercase"
            />
          </div>
          <button
            onClick={() => applyVoucher(code || 'FREETOEAT')}
            className="w-11 h-10 shrink-0 rounded-xl bg-[#4aa7e5] hover:bg-[#3b9fe2] active:scale-95 text-white flex items-center justify-center font-bold text-xl transition-all cursor-pointer shadow-sm"
            aria-label="Apply voucher"
          >
            +
          </button>
        </div>
      </div>

      {/* Dotted Divider */}
      <div className="border-t border-dashed border-black/15 dark:border-white/15 my-6" />

      {/* Pricing Summary */}
      <div className="space-y-3.5 text-sm sm:text-base">
        <div className="flex justify-between items-center">
          <span className="font-bold text-[#1c1c1c] dark:text-white">Subtotal</span>
          <span className="font-bold text-[#f5821f]">${subtotal.toFixed(1)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-bold text-[#1c1c1c] dark:text-white">Tax fee</span>
          <span className="font-bold text-[#f5821f]">${taxFee.toFixed(1)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-bold text-[#1c1c1c] dark:text-white">Voucher</span>
          <span className="font-bold text-[#f5821f]">${(voucherDiscount || 5.0).toFixed(1)}</span>
        </div>
        <div className="flex justify-between items-center pt-1">
          <span className="font-bold text-base sm:text-lg text-[#1c1c1c] dark:text-white">Total</span>
          <span className="font-bold text-base sm:text-lg text-[#f5821f]">${total.toFixed(1)}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        type="button"
        disabled={items.length === 0}
        onClick={handleCheckout}
        className="w-full py-3.5 rounded-2xl bg-[#34c759] hover:bg-[#2fae5f] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm sm:text-base shadow-sm transition-all cursor-pointer mt-6"
      >
        Checkout
      </button>
    </aside>
  )
}

