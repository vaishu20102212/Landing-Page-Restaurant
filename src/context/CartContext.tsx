import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { CartItem, MenuItem } from '../types'
import { menuItems } from '../data/menu'

interface CartContextValue {
  items: CartItem[]
  addItem: (item: MenuItem) => void
  removeItem: (id: string) => void
  incrementItem: (id: string) => void
  decrementItem: (id: string) => void
  clearCart: () => void
  count: number
  subtotal: number
  taxFee: number
  voucherDiscount: number
  voucherCode: string
  applyVoucher: (code: string) => void
  total: number
}

const TAX_RATE = 0.045
const VALID_VOUCHER = 'FREETOEAT'
const VOUCHER_AMOUNT = 5

const initialItems: CartItem[] = [
  { item: menuItems.find((m) => m.id === 'spaghetti') || menuItems[0], qty: 2 },
  { item: menuItems.find((m) => m.id === 'pizza') || menuItems[9], qty: 2 },
  { item: menuItems.find((m) => m.id === 'caesar-salad') || menuItems[12], qty: 2 },
]

const CartContext = createContext<CartContextValue | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(initialItems)
  const [voucherCode, setVoucherCode] = useState('FREETOEAT')
  const [voucherApplied, setVoucherApplied] = useState(true)

  const addItem = (item: MenuItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.item.id === item.id)
      if (existing) {
        return prev.map((i) => (i.item.id === item.id ? { ...i, qty: i.qty + 1 } : i))
      }
      return [...prev, { item, qty: 1 }]
    })
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.item.id !== id))
  }

  const incrementItem = (id: string) => {
    setItems((prev) => prev.map((i) => (i.item.id === id ? { ...i, qty: i.qty + 1 } : i)))
  }

  const decrementItem = (id: string) => {
    setItems((prev) =>
      prev
        .map((i) => (i.item.id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0),
    )
  }

  const clearCart = () => {
    setItems([])
    setVoucherCode('')
    setVoucherApplied(false)
  }

  const applyVoucher = (code: string) => {
    setVoucherCode(code)
    setVoucherApplied(code.trim().toUpperCase() === VALID_VOUCHER)
  }

  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.item.price * i.qty, 0), [items])
  const count = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items])
  const taxFee = useMemo(() => Number((subtotal * TAX_RATE).toFixed(2)), [subtotal])
  const voucherDiscount = voucherApplied && subtotal > 0 ? VOUCHER_AMOUNT : 0
  const total = Math.max(0, Number((subtotal + taxFee - voucherDiscount).toFixed(2)))

  const value: CartContextValue = {
    items,
    addItem,
    removeItem,
    incrementItem,
    decrementItem,
    clearCart,
    count,
    subtotal,
    taxFee,
    voucherDiscount,
    voucherCode,
    applyVoucher,
    total,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
